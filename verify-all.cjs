const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const runUiChecks = require('./verify-ui.cjs');
const runFailureChecks = require('./verify-failures.cjs');
const runPortfolioChecks = require('./verify-portfolio.cjs');
const runAdminChecks = require('./verify-admin.cjs');
const runLanguageChecks = require('./verify-language.cjs');
const runGenerationChecks = require('./verify-generation.cjs');
const { createServer } = require('./scripts/serve.cjs');
const root = __dirname;

function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function verifyLongPdf(page, baseURL) {
  await page.goto(`${baseURL}/`);
  await page.evaluate(() => {
    const doc = getActiveDoc();
    doc.profile.summary = Array.from({ length: 5 }, (_, i) => `Mục tiêu nghề nghiệp dài ${i + 1} để kiểm tra ngắt trang khi xuất PDF.`).join('\n');
    doc.experience = Array.from({ length: 10 }, (_, i) => ({
      role: `Vị trí kiểm thử ${i + 1}`,
      company: 'Công ty kiểm thử bố cục',
      period: `202${i % 5} - 202${(i % 5) + 1}`,
      location: 'TP. Hồ Chí Minh',
      details: Array.from({ length: 5 }, (_, j) => `Nội dung dài ${j + 1} của kinh nghiệm ${i + 1}, dùng để xác minh CV nhiều trang không bị mất dữ liệu.`).join('\n'),
    }));
    doc.projects = Array.from({ length: 6 }, (_, i) => ({
      name: `Dự án kiểm thử ${i + 1}`,
      role: 'Vai trò kỹ thuật',
      period: `202${i % 5}`,
      details: 'Thiết kế và triển khai.\nĐo lường kết quả.\nTài liệu hóa và bàn giao.',
    }));
    renderAll();
  });
  await page.emulateMedia({ media: 'print' });
  const pdfPath = path.join(root, 'output', 'playwright', 'long-cv.pdf');
  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });
  const pdf = fs.readFileSync(pdfPath);
  const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
  if (pdf.length < 20_000 || pageCount < 2) throw new Error(`Long PDF verification failed: ${pdf.length} bytes, ${pageCount} pages`);
  await page.emulateMedia({ media: 'screen' });
  return `Long CV PDF: ${pageCount} pages, ${Math.round(pdf.length / 1024)} KB`;
}

(async () => {
  console.log(`PASS Generation: ${runGenerationChecks()}`);
  const server = await startServer();
  const address = server.address();
  const baseURL = `http://127.0.0.1:${address.port}`;
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const ui = await runUiChecks(page, baseURL);
    console.log(`PASS UI: ${ui.join('; ')}`);
    const failurePage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    console.log(await runFailureChecks(failurePage, baseURL));
    const pdfPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    console.log(`PASS ${await verifyLongPdf(pdfPage, baseURL)}`);
    console.log(`PASS Portfolio: ${(await runPortfolioChecks(browser, baseURL)).join('; ')}`);
    console.log(`PASS Language: ${await runLanguageChecks(browser, baseURL)}`);
    console.log(`PASS Admin: ${(await runAdminChecks(browser, baseURL)).join('; ')}`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(`FAIL: ${error.stack || error.message}`);
  process.exitCode = 1;
});
