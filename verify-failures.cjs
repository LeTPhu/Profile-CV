module.exports = async (page, baseURL = 'http://127.0.0.1:8765') => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.goto(`${baseURL}/github-public-cv/`);
  await page.waitForFunction(() => !document.getElementById('print-cv').disabled);
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('Quota'); }; });
  await page.locator('#import-json').setInputFiles({name:'cv.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({profile:{fullName:'Storage test'}}))});
  await page.waitForFunction(() => document.getElementById('preview-name').textContent === 'Storage test');
  await page.route('**/data/cv-public.json', route => route.abort());
  await page.goto(`${baseURL}/github-public-cv/`);
  await page.waitForFunction(() => !document.getElementById('print-cv').disabled);
  if (!(await page.locator('#preview-name').textContent())) throw new Error('Empty fallback');
  await page.unroute('**/data/cv-public.json');
  await page.goto(`${baseURL}/`);
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('Quota'); }; scheduleSave(); });
  await page.waitForFunction(() => document.getElementById('save-status').textContent.includes('Chưa lưu'));
  if (errors.length) throw new Error(errors.join('; '));
  return 'PASS: public import with unavailable storage; network fallback; builder storage failure; no uncaught page errors.';
}
