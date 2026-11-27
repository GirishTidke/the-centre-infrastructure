import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { BUSINESS_WHATSAPP_NUMBER } from '../src/config/business.js';

const baseUrl = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:5173';
const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
const pageErrors = [];
const consoleErrors = [];
const badLocalResponses = [];
await page.addInitScript(() => {
  window.__openedWindows = [];
  window.open = (url, target, features) => {
    window.__openedWindows.push({ url: String(url), target, features });
    return {};
  };
});
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('response', (response) => {
  if (response.url().startsWith(baseUrl) && response.status() >= 400) badLocalResponses.push(`${response.status()} ${response.url()}`);
});

const routes = [
  ['/', 'Building Beyond Boundaries'],
  ['/about', 'Baba Meshram'],
  ['/services', 'Engineering coordinated through execution.'],
  ['/portfolio', 'Our Selected Projects'],
  ['/clients', 'Good work begins with listening.'],
  ['/contact', 'Ravinagar Square'],
  ['/projects?project=horizon-business-park', 'Horizon Business Park'],
  ['/projects?project=aurora-villa', 'Aurora Villa'],
  ['/projects?project=steelcore-warehouse', 'Steelcore Warehouse'],
  ['/projects?project=greenfield-residency', 'Greenfield Residency'],
  ['/projects?project=metro-square', 'Metro Square Retail Plaza'],
  ['/projects?project=nova-logistics-hub', 'Nova Logistics Hub'],
];

try {
  for (const [route, expected] of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    assert.equal(response?.status(), 200, `${route} should return 200`);
    await page.getByText(expected, { exact: false }).first().waitFor({ state: 'visible' });
    await page.locator('.site-header .brand-symbol').waitFor({ state: 'visible' });
    await page.locator('img').evaluateAll((images) => images.forEach((image) => { image.loading = 'eager'; }));
    await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0), null, { timeout: 10000 });
    console.log(`PASS route ${route}`);
  }

  await page.goto(`${baseUrl}/project/indexbce0.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/portfolio');
  await page.getByRole('heading', { name: 'Our Selected Projects' }).waitFor();
  console.log('PASS legacy project URL redirect');

  await page.goto(`${baseUrl}/contact/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/contact');
  await page.getByText('Ravinagar Square').waitFor();
  await page.goto(`${baseUrl}/project/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/');
  await page.getByRole('heading', { name: 'Building Beyond Boundaries', exact: true }).waitFor();
  console.log('PASS legacy contact and home redirects');

  await page.goto(`${baseUrl}/projects/horizon-business-park`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: 'Horizon Business Park' }).waitFor();
  console.log('PASS project slug route');

  const headerLinks = [['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Clients', '/clients'], ['Contact Us', '/contact']];
  for (const [label, route] of headerLinks) {
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('navigation').getByRole('link', { name: label, exact: true }).click();
    await page.waitForURL(`**${route}`);
  }
  console.log('PASS header navigation links');

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.locator('#about .stat strong').first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('#about .stat strong')?.textContent === '100+', null, { timeout: 4000 });
  await page.locator('#services .service-card').first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('#services .service-card')?.classList.contains('reveal-visible'));
  await page.evaluate(() => window.scrollTo(0, 1100));
  await page.locator('.back-to-top.is-visible').waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Back to top' }).click();
  await page.waitForFunction(() => window.scrollY < 2);
  console.log('PASS stat/reveal animations and back-to-top');

  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.locator('.footer-col').filter({ hasText: 'Services' }).getByRole('link', { name: 'Engineering & Execution' }).click();
  await page.waitForURL('**/services');
  console.log('PASS footer service link');

  await page.goto(`${baseUrl}/portfolio`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Residential' }).click();
  assert.equal(await page.locator('.project-card').count(), 2, 'residential filter shows two cards');
  await page.getByRole('button', { name: 'All', exact: true }).click();
  assert.equal(await page.locator('.project-card').count(), 6, 'all filter restores all six cards');
  console.log('PASS portfolio filters');

  await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await page.getByText('Please complete this field.').first().waitFor({ state: 'visible' });
  await page.locator('#contact-name').fill('Test Visitor');
  await page.locator('#contact-email').fill('not-an-email');
  await page.locator('#contact-phone').fill('phone');
  await page.locator('#contact-message').fill('Request for an architectural design consultation.');
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await page.getByText('Enter a valid email address.').waitFor({ state: 'visible' });
  await page.getByText('Enter a valid phone number.').waitFor({ state: 'visible' });
  await page.locator('#contact-email').fill('visitor@example.com');
  await page.locator('#contact-phone').fill('+91 80552 23358');
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await page.getByRole('status').getByText('WhatsApp is opening. Please press Send to submit your enquiry.').waitFor({ state: 'visible' });
  assert.equal(await page.getByText('Thanks for your enquiry. Our team will be in touch.').count(), 0, 'the website must not claim the enquiry has been sent');
  const desktopWhatsApp = await page.evaluate(() => window.__openedWindows.at(-1));
  assert.equal(desktopWhatsApp.target, '_blank', 'WhatsApp must open in a new tab');
  assert.equal(new URL(desktopWhatsApp.url).origin + new URL(desktopWhatsApp.url).pathname, `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`);
  const desktopMessage = 'New Website Enquiry – The Centre Infrastructure\n\nName: Test Visitor\nEmail: visitor@example.com\nPhone: +91 80552 23358\nProject Details: Request for an architectural design consultation.';
  assert.equal(new URL(desktopWhatsApp.url).searchParams.get('text'), desktopMessage, 'desktop WhatsApp message contents');
  console.log('PASS desktop WhatsApp click-to-chat flow');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  const menuButton = page.getByRole('button', { name: 'Toggle navigation' });
  await menuButton.click();
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'true');
  await page.getByRole('navigation').getByRole('link', { name: 'About Us' }).click();
  await page.waitForURL('**/about');
  assert.equal(await page.getByRole('button', { name: 'Toggle navigation' }).getAttribute('aria-expanded'), 'false');
  console.log('PASS mobile navigation');

  await page.goto(`${baseUrl}/contact`, { waitUntil: 'domcontentloaded' });
  await page.locator('#contact-name').fill('Mobile Visitor');
  await page.locator('#contact-email').fill('mobile@example.com');
  await page.locator('#contact-phone').fill('+91 90000 00000');
  await page.locator('#contact-message').fill('Mobile project enquiry.');
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await page.getByRole('status').getByText('WhatsApp is opening. Please press Send to submit your enquiry.').waitFor({ state: 'visible' });
  const mobileWhatsApp = await page.evaluate(() => window.__openedWindows.at(-1));
  assert.equal(mobileWhatsApp.target, '_blank', 'mobile WhatsApp must open the universal link in a new tab');
  assert.equal(new URL(mobileWhatsApp.url).searchParams.get('text'), 'New Website Enquiry – The Centre Infrastructure\n\nName: Mobile Visitor\nEmail: mobile@example.com\nPhone: +91 90000 00000\nProject Details: Mobile project enquiry.');
  assert.equal(await page.getByText('Thanks for your enquiry. Our team will be in touch.').count(), 0);
  console.log('PASS mobile WhatsApp click-to-chat flow');

  const viewportChecks = [
    { width: 1365, height: 900, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 390, height: 844, name: 'mobile' },
  ];
  await mkdir('test-results', { recursive: true });
  for (const viewport of viewportChecks) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const [route] of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
      await page.locator('main').waitFor();
      const dimensions = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      if (dimensions.width > dimensions.viewport) {
        console.log('Overflow elements:', await page.evaluate(() => [...document.querySelectorAll('.nav-wrap,.brand,.brand-wordmark,.menu-toggle,body *')].filter((element) => { const rect = element.getBoundingClientRect(); return rect.right > innerWidth + 1 || rect.left < -1; }).map((element) => `${element.tagName.toLowerCase()}.${element.className}#${element.id} left=${Math.round(element.getBoundingClientRect().left)} right=${Math.round(element.getBoundingClientRect().right)} width=${Math.round(element.getBoundingClientRect().width)}`).slice(0, 15)));
      }
      assert.ok(dimensions.width <= dimensions.viewport, `${route} overflows at ${viewport.name}: ${dimensions.width}px > ${dimensions.viewport}px`);
    }
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: `test-results/home-${viewport.name}.png`, fullPage: true });
    console.log(`PASS responsive ${viewport.name}`);
  }

  assert.deepEqual(pageErrors, [], `browser runtime errors: ${pageErrors.join('; ')}`);
  assert.deepEqual(consoleErrors, [], `browser console errors: ${consoleErrors.join('; ')}`);
  assert.deepEqual(badLocalResponses, [], `failed local responses: ${badLocalResponses.join('; ')}`);
  console.log('PASS no browser runtime errors or failed local requests');
} finally {
  await browser.close();
}
