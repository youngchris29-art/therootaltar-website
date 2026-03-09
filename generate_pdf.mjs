import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, 'seo_audit_report.html');
const pdfPath = join(__dirname, 'SEO_Audit_Report_TheRootAltar_PostFix.pdf');
const userDataDir = join(__dirname, `.pdf-chrome-${Date.now()}`);

mkdirSync(userDataDir, { recursive: true });

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            userDataDir,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--headless=new',
            ],
        });
        const page = await browser.newPage();
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 2000));
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
            timeout: 60000,
        });
        console.log(`✅ PDF saved to: ${pdfPath}`);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
        try { rmSync(userDataDir, { recursive: true, force: true }); } catch { }
    }
})();
