import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { questions, dimensions } from "../src/data/grip-check-questions.js";

// Generated during the build; question text is never maintained in a separate document.
export async function buildGripCheckBankPdf() {
  if (dimensions.length !== 5 || questions.length !== dimensions.length * 4) throw new Error("Invalid Grip Check bank dimensions.");
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.114, 0.141, 0.129), amber = rgb(0.66, 0.28, 0.03), muted = rgb(0.33, 0.38, 0.35);
  const width = 504, left = 54;
  let page, y;
  function newPage() { page = pdf.addPage([612, 792]); y = 738; }
  function lines(text, font, size, available = width) {
    const result = []; let line = "";
    for (const word of text.split(/\s+/)) {
      if (font.widthOfTextAtSize(word, size) > available) throw new Error("Question bank word exceeds PDF line width.");
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > available) { result.push(line); line = word; } else line = next;
    }
    if (line) result.push(line);
    return result;
  }
  function draw(textLines, font, size, leading, x = left, color = ink) {
    for (const text of textLines) { page.drawText(text, { x, y, font, size, color }); y -= leading; }
  }
  newPage();
  draw(["Grip Check Question Bank"], bold, 23, 34);
  draw(["Internal use only"], bold, 11, 22);
  draw(["Generated from src/data/grip-check-questions.js"], regular, 10, 28, left, muted);
  draw(["Scoring rules"], bold, 17, 28);
  const rules = [
    "Option points by original index: first = 3, second = 2, third = 1, fourth and later = 0.",
    "Composite = round(sum(points) / (n x 3) x 100).",
    "Five dimensions; four questions per dimension, grouped in source order.",
    "Dimension score = round(sum(points in dimension) / (count x 3) x 100).",
    "Labels: 80+ STRONG; 50-79 MODERATE; under 50 WEAK.",
    "The quiz shuffles questions and answers. Letters below show source order, not display order."
  ];
  for (const rule of rules) { draw(lines(rule, regular, 11), regular, 11, 16); y -= 10; }
  for (let i = 0; i < questions.length; i++) {
    const item = questions[i];
    if (typeof item.question !== "string" || !item.question.trim() || !Array.isArray(item.options) || item.options.length < 4 || item.options.some(o => typeof o !== "string" || !o.trim())) throw new Error("Invalid Grip Check bank item.");
    const heading = lines(dimensions[Math.floor(i / 4)], bold, 13);
    const question = lines(`${i + 1}. ${item.question}`, bold, 10.5);
    const options = item.options.map((option, j) => lines(`${String.fromCharCode(65 + j)}. ${option} (${Math.max(0, 3 - j)} ${Math.max(0, 3 - j) === 1 ? "point" : "points"})`, regular, 10, width - 4));
    const height = heading.length * 18 + 3 + question.length * 14 + 6 + options.reduce((sum, ls) => sum + ls.length * 13 + 5, 0) + 15;
    if (height > 678) throw new Error("Question exceeds PDF page height.");
    if (i % 4 === 0 || y - height < 60) newPage();
    draw(heading, bold, 13, 18, left, amber); y -= 3;
    draw(question, bold, 10.5, 14); y -= 6;
    for (const option of options) { draw(option, regular, 10, 13, left + 4); y -= 5; }
    y -= 15;
  }
  for (const [index, p] of pdf.getPages().entries()) {
    p.drawLine({start:{x:54,y:40},end:{x:558,y:40},thickness:0.6,color:rgb(0.8,0.78,0.74)});
    p.drawText("3Back | Internal use only | Grip Check Question Bank",{x:54,y:26,font:regular,size:8,color:muted});
    const label = `Page ${index + 1} of ${pdf.getPageCount()}`;
    p.drawText(label,{x:558-regular.widthOfTextAtSize(label,8),y:26,font:regular,size:8,color:muted});
  }
  pdf.setTitle("Grip Check Question Bank"); pdf.setAuthor("3Back");
  return pdf.save();
}
