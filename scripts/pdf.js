// Prints the built CV in each language to public/ with headless Chrome, using the page's print styles.
// Usage: npm run pdf   (set CHROME_PATH if Chrome is not on PATH as google-chrome)
import {execFile} from 'node:child_process';
import {copyFileSync, readFileSync} from 'node:fs';
import {promisify} from 'node:util';
import {preview} from 'vite';

// Async on purpose: a sync call would block the preview server Chrome is loading from
const run = promisify(execFile);

const chrome = process.env.CHROME_PATH ?? 'google-chrome';
const outDir = process.argv[2] ?? 'dist';
const locales = ['en', 'es'];

const server = await preview({preview: {port: 4799, strictPort: true}, build: {outDir}});
const url = server.resolvedUrls.local[0];

try {
    for (const lang of locales) {
        const {pdf} = JSON.parse(readFileSync(`src/locales/${lang}.json`, 'utf-8'));
        const target = `public/${pdf.file}`;
        await run(chrome, [
            '--headless=new',
            '--disable-gpu',
            '--no-pdf-header-footer',
            '--virtual-time-budget=5000',
            `--print-to-pdf=${target}`,
            `${url}?lang=${lang}`,
        ], {timeout: 60000});
        // The site was built before the PDFs existed, so also drop them into the build output
        copyFileSync(target, `${outDir}/${pdf.file}`);
        console.log(`✓ ${target}`);
    }
} finally {
    server.httpServer.close();
}
