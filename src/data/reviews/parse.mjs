const columns = "review_id,review_year,review_date,date_display,rating,review_text,attribution,source_label,featured".split(",");

/** Parse the public snapshot only. Quoted commas, newlines and doubled quotes are preserved.
 * @param {string} csv
 */
export function parseReviews(csv) {
  const records = [];
  let row = [], value = "", quoted = false, closed = false;
  const input = csv.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (quoted) {
      if (char === '"') {
        if (input[i + 1] === '"') { value += '"'; i++; }
        else { quoted = false; closed = true; }
      } else value += char;
    } else if (char === "," || char === "\n") {
      row.push(value); value = ""; closed = false;
      if (char === "\n") { records.push(row); row = []; }
    } else if (char === '"' && !value && !closed) quoted = true;
    else {
      if (closed || char === '"') throw new Error("Reviews CSV: malformed quoting.");
      value += char;
    }
  }
  if (quoted) throw new Error("Reviews CSV: unterminated quote.");
  if (row.length || value || closed) records.push([...row, value]);
  while (records.at(-1)?.every(field => field === "")) records.pop();
  if (records.shift()?.join(",") !== columns.join(",")) throw new Error("Reviews CSV: expected exactly the nine public columns.");
  const ids = new Set();
  const reviews = records.map((fields, index) => {
    const fail = (/** @type {string} */ message) => { throw new Error(`Reviews CSV row ${index + 2}: ${message}`); };
    if (fields.length !== columns.length) fail("wrong column count.");
    if (fields.some(field => /[<>]|&(?:lt|gt|#0*6[02]|#x0*3[ce]);/i.test(field))) fail("HTML is not allowed.");
    const record = Object.fromEntries(columns.map((key, i) => [key, fields[i]]));
    for (const key of columns.filter(key => !["review_date", "date_display"].includes(key))) {
      if (!record[key]?.trim()) fail(`blank ${key}.`);
    }
    if (!/^\d{4}-\d{3}$/.test(record.review_id) || ids.has(record.review_id)) fail("malformed or duplicate id.");
    ids.add(record.review_id);
    if (!/^\d{4}$/.test(record.review_year) || !record.review_id.startsWith(record.review_year + "-")) fail("year does not match id.");
    if (!/^[1-5]$/.test(record.rating)) fail("rating must be a whole number from 1 to 5.");
    if (!["yes", "no"].includes(record.featured)) fail("featured must be yes or no.");
    if (!["Online review", "Direct feedback"].includes(record.source_label)) fail("unsupported source label.");
    if (record.review_date && (!/^\d{4}-\d{2}-\d{2}$/.test(record.review_date) ||
      !record.review_date.startsWith(record.review_year + "-") ||
      !Number.isFinite(Date.parse(record.review_date)) ||
      new Date(record.review_date).toISOString().slice(0, 10) !== record.review_date)) fail("invalid review date.");
    return {
      review_id: record.review_id, review_year: Number(record.review_year),
      review_date: record.review_date, date_display: record.date_display,
      rating: Number(record.rating), review_text: record.review_text,
      attribution: record.attribution, source_label: record.source_label, featured: record.featured,
    };
  }).sort((a, b) => b.review_id.localeCompare(a.review_id));
  const featured = reviews.filter(review => review.featured === "yes");
  if (!reviews.length || !featured.length) throw new Error("Reviews CSV: the collection and Featured must be nonempty.");
  const years = [...new Set(reviews.map(review => review.review_year))].sort((a, b) => b - a);
  const yearModes = years.slice(0, 15).map(year => ({ year, count: reviews.filter(review => review.review_year === year).length }));
  if (yearModes.some(mode => !mode.count)) throw new Error("Reviews CSV: selected mode is empty.");
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  const count = reviews.length;
  return {
    reviews, featured, yearModes, count, sum, mean: sum / count,
    // Integer arithmetic implements positive half-up rounding without floating-point ties.
    rating: (Math.floor((sum * 20 + count) / (count * 2)) / 10).toFixed(1),
    earliest: years.at(-1), latest: years[0],
    sources: ["Online review", "Direct feedback"].map(label => ({
      label, count: reviews.filter(review => review.source_label === label).length,
    })).filter(source => source.count > 0),
  };
}
