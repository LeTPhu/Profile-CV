module.exports = async (page, baseURL = 'http://127.0.0.1:8765') => {
  const results = [];
  const check = (name, ok) => { if (!ok) throw new Error(name); results.push(name); };
  await page.goto(`${baseURL}/github-public-cv/?lang=en`);
  await page.waitForFunction(() => !document.getElementById('print-cv').disabled);
  check('English deep link', await page.locator('#title-summary').textContent() === 'Career Objective');
  await page.getByRole('button', {name:'Tiếng Việt', exact:true}).click();
  check('Vietnamese accents', await page.locator('#title-personal').textContent() === 'Thông tin cá nhân');
  check('Sample website is clearly labelled', await page.locator('#demo-notice').isVisible());
  check('Website section navigation matches visible CV', await page.locator('#section-nav a').count() === await page.locator('.sidebar-block:visible, .main-block:visible').count());
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Clipboard blocked'); } } });
  });
  await page.getByRole('button', {name:'Sao chép liên kết', exact:true}).click();
  check('Sharing works with blocked clipboard', await page.locator('#share-url').isVisible() && (await page.locator('#share-url').inputValue()).includes('lang=vi'));
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button', {name:'English CV', exact:true}).click();
  check('Mobile no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({path:'output/playwright/public-mobile.png', fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'output/playwright/public-desktop.png', fullPage:true});
  await page.emulateMedia({media:'print'});
  check('Print keeps two columns', await page.locator('#cv-preview').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length === 2));
  await page.emulateMedia({media:'screen'});
  await page.goto(`${baseURL}/`);
  check('Editor visible', await page.locator('#editing-language').isVisible());
  check('Malformed JSON rejected atomically', await page.evaluate(() => {
    const before = JSON.stringify(state);
    try { importCurrentDoc({experience:[null]}); return false; } catch { return JSON.stringify(state) === before; }
  }));
  check('Import keeps other language', await page.evaluate(() => {
    const before = JSON.stringify(state.documents.en);
    importCurrentDoc({profile:{fullName:'Kiểm tra tiếng Việt'}});
    renderAll();
    return state.documents.vi.profile.fullName === 'Kiểm tra tiếng Việt' && JSON.stringify(state.documents.en) === before;
  }));
  check('Missing language rejected', await page.evaluate(() => !importCurrentDoc({documents:{en:{profile:{fullName:'English'}}}})));
  check('Empty sections hide from preview', await page.evaluate(() => {
    state.documents.vi.projects = [];
    state.activeDoc = 'vi';
    renderAll();
    return getComputedStyle(document.getElementById('block-projects')).display === 'none';
  }));
  check('Document switch exposes pressed state', await page.getByRole('button', {name:'CV Tiếng Việt', exact:true}).getAttribute('aria-pressed') === 'true');
  check('Large uploaded photos are optimized', await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 900;
    const context = canvas.getContext('2d');
    const image = context.createImageData(canvas.width, canvas.height);
    let seed = 17;
    for (let i = 0; i < image.data.length; i += 4) {
      seed = (seed * 48271) % 2147483647;
      image.data[i] = seed & 255;
      image.data[i + 1] = (seed >> 8) & 255;
      image.data[i + 2] = (seed >> 16) & 255;
      image.data[i + 3] = 255;
    }
    context.putImageData(image, 0, 0);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob || blob.size <= 1024 * 1024 || blob.size > 4 * 1024 * 1024) return false;
    const result = await fileToOptimizedDataUrl(new File([blob], 'photo.png', { type: 'image/png' }));
    return result.startsWith('data:image/webp;base64,') && result.length < blob.size * 1.5;
  }));
  await page.setViewportSize({width:390,height:844});
  check('Editor mobile no overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'output/playwright/builder-desktop.png'});
  return results;
}
