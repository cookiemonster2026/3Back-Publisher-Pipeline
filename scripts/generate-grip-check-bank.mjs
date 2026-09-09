import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { buildGripCheckBankPdf } from "./grip-check-bank-pdf.mjs";
import { questions, dimensions } from "../src/data/grip-check-questions.js";

const normalize = text => text.replace(/\s+/g, " ").trim();

export async function validateGripCheckBankPdf(bytes) {
  const task = getDocument({ data: Uint8Array.from(bytes), useSystemFonts: true, isEvalSupported: false });
  const doc = await task.promise;
  try {
    const pages = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      pages.push(normalize(content.items.map(item => item.str ?? "").join(" ")));
    }
    const text = pages.join(" ");
    let cursor = 0;
    const expectNext = expected => {
      const index = text.indexOf(normalize(expected), cursor);
      if (index < 0) throw new Error(`Generated Grip Check PDF is missing or misorders: ${expected}`);
      cursor = index + normalize(expected).length;
    };
    expectNext("Grip Check Question Bank");
    expectNext("Internal use only");
    expectNext("Generated from src/data/grip-check-questions.js");
    expectNext("Option points by original index: first = 3, second = 2, third = 1, fourth and later = 0.");
    expectNext("Composite = round(sum(points) / (n x 3) x 100).");
    expectNext("Five dimensions; four questions per dimension, grouped in source order.");
    expectNext("Dimension score = round(sum(points in dimension) / (count x 3) x 100).");
    expectNext("Labels: 80+ STRONG; 50-79 MODERATE; under 50 WEAK.");
    for (const [i, question] of questions.entries()) {
      expectNext(dimensions[Math.floor(i / 4)]);
      expectNext(`${i + 1}. ${question.question}`);
      for (const [j, option] of question.options.entries()) {
        const points = Math.max(0, 3 - j);
        expectNext(`${String.fromCharCode(65 + j)}. ${option} (${points} ${points === 1 ? "point" : "points"})`);
      }
    }
    return { pages: doc.numPages, questions: questions.length };
  } finally { await task.destroy(); }
}

export async function generateGripCheckBankAsset(outputPath) {
  // No fallback to an old file, including when rendering or validation fails.
  await rm(outputPath, { force: true });
  try {
    const bytes = await buildGripCheckBankPdf();
    await validateGripCheckBankPdf(bytes);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, bytes);
    const result = await validateGripCheckBankPdf(await readFile(outputPath));
    console.log(`Grip Check PDF generated and verified: ${result.questions} questions, ${result.pages} pages.`);
    return result;
  } catch (error) {
    await rm(outputPath, { force: true });
    throw error;
  }
}
