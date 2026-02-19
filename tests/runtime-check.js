import fs from 'fs';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5176';
const routes = [
  '/',
  '/login',
  '/student/dashboard',
  '/student/forms',
  '/student/results',
  '/admin/dashboard',
  '/admin/create-form',
  '/admin/feedback',
  '/admin/analytics',
];

const checks = {
  '/': ['Feedback System', 'Student Portal', 'Admin Portal'],
  '/login': ['Sign in', 'Welcome back'],
  '/student/dashboard': ['dataTest:student-dashboard-header', 'Submissions', 'Avg Rating'],
  '/student/forms': ['dataTest:submit-feedback-header', 'Select Course'],
  '/student/results': ['dataTest:feedback-results-header', 'Rating Distribution'],
  '/admin/dashboard': ['dataTest:admin-dashboard-header', 'Recent Submissions', 'Total Submissions'],
  '/admin/create-form': ['dataTest:create-form-header', 'Course Name'],
  '/admin/feedback': ['dataTest:view-feedback-header', 'Feedback Submissions'],
  '/admin/analytics': ['dataTest:admin-analytics-header', 'Rating Distribution', 'Average Ratings'],
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const report = [];

  for (const route of routes) {
    const url = BASE + route;
    const page = await context.newPage();
    const errors = [];
    const warnings = [];
    const infos = [];

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') errors.push(text);
      else if (type === 'warning') warnings.push(text);
      else infos.push(text);
    });

    try {
      // If route is protected, perform a quick login first so the test can access the real pages
      if (route.startsWith('/student')) {
        try {
          await page.goto(BASE + '/login', { waitUntil: 'networkidle', timeout: 8000 });
          await page.fill('input[type="email"]', 'student@example.com');
          await page.fill('input[type="password"]', 'password');
          // default role is student; submit
          await Promise.all([
            page.click('button:has-text("Sign in")'),
            page.waitForURL('**/student/dashboard', { timeout: 6000 }).catch(() => {}),
          ]);
        } catch (e) {
          // ignore login failure and continue to try loading the page directly
        }
      } else if (route.startsWith('/admin')) {
        try {
          await page.goto(BASE + '/login', { waitUntil: 'networkidle', timeout: 8000 });
          await page.fill('input[type="email"]', 'admin@example.com');
          await page.fill('input[type="password"]', 'password');
          // select admin role then submit
          await page.click('button:has-text("Admin")').catch(() => {});
          await Promise.all([
            page.click('button:has-text("Sign in")'),
            page.waitForURL('**/admin/dashboard', { timeout: 6000 }).catch(() => {}),
          ]);
        } catch (e) {
          // ignore login failure and continue to try loading the page directly
        }
      }

      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      const status = resp && resp.status ? resp.status() : 'no-response';
      // check for expected text
      const expected = checks[route] || [];
      // wait for an h1 to appear to allow client-side rendering
      try {
        await page.waitForSelector('h1', { timeout: 5000 });
      } catch (e) {
        // ignore - we'll still capture whatever text exists
      }
      const pageText = await page.textContent('body');
      const missing = [];
      for (const ex of expected) {
        if (ex.startsWith('dataTest:')) {
          const key = ex.split(':')[1];
          const has = await page.$(`[data-testid="${key}"]`);
          if (!has) missing.push(ex);
        } else {
          if (!pageText || !pageText.includes(ex)) missing.push(ex);
        }
      }

      // take a small screenshot for debugging
      const screenshotPath = `tests/screenshots${route === '/' ? '/home' : route.replace(/\//g,'_')}.png`;
      try {
        fs.mkdirSync('tests/screenshots', { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: false });
      } catch (sErr) {
        // ignore
      }

      const pageTextSnippet = pageText ? pageText.slice(0, 200) : '';
      report.push({ route, url, status, errors, warnings, missing, screenshot: screenshotPath, pageTextSnippet });
    } catch (err) {
      report.push({ route, url, status: 'error', exception: String(err) });
    } finally {
      await page.close();
    }
  }

  await browser.close();
  const out = { timestamp: new Date().toISOString(), base: BASE, results: report };
  fs.writeFileSync('tests/runtime-report.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  // exit non-zero if any errors or missing checks
  const hasProblem = report.some(r => (r.errors && r.errors.length) || r.exception || (r.missing && r.missing.length));
  process.exit(hasProblem ? 2 : 0);
})();
