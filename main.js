// install dependencies:
//
//      bun install
//
// execute:
//
// NB to troubleshoot set the DEBUG env variable and set {headless:false,dumpio:true} in main.js.
//
//      export DEBUG='puppeteer:*'
//      bun run main.js

import { program } from "commander";
import { PUPPETEER_REVISIONS } from "puppeteer-core/internal/revisions.js";
import * as browsers from "@puppeteer/browsers";
import puppeteer from "puppeteer";
import os from "os";

function log() {
    console.log.apply(console, [new Date().toISOString(), ...arguments]);
}

// ensure the browser is installed.
async function browserInstall() {
    let downloaded = false;
    const chromeVersion = PUPPETEER_REVISIONS.chrome;
    return await browsers.install({
        browser: "chrome",
        buildId: chromeVersion,
        cacheDir: `${os.homedir()}/.cache/puppeteer`,
        downloadProgressCallback: (downloadedBytes, totalBytes) => {
            if (!downloaded) {
                downloaded = true;
                log(`Downloading the browser Chrome/${chromeVersion}...`);
            }
        },
    });
}

async function main(options) {
    var browserConfig = {
        args: [
            "--start-maximized"
        ],
        headless: "new",
    };
    if (options.debug) {
        browserConfig = {
            ...browserConfig,
            headless: false,
            devtools: true,
            slowMo: 250,
            dumpio: false,
        };
    }

    const installedBrowser = await browserInstall();

    log(`Launching the browser from ${installedBrowser.executablePath}...`);
    const browser = await puppeteer.launch({
        ...browserConfig,
        product: installedBrowser.browser,
        executablePath: installedBrowser.executablePath,
    });
    try {
        log(`Launched the ${await browser.version()} browser.`);

        log("Setting the page viewport size...");
        const page = (await browser.pages())[0];
        await page.setViewport({
            width: parseInt(options.viewportSize.split('x')[0], 10),
            height: parseInt(options.viewportSize.split('x')[1], 10),
            deviceScaleFactor: 1,
        });

        try {
            const url = `https://en.wikipedia.org/wiki/Main_Page`;

            log(`Loading ${url}...`);
            await page.goto(url);
        } finally {
            log("Taking a screenshot...");
            await page.screenshot({ path: options.screenshotPath, fullPage: true });
        }
    } finally {
        await browser.close();
    }
}

program
    .option('--screenshot-path <path>', 'screenshot output path', 'screenshot.png')
    .option('--viewport-size <size>', 'browser viewport size', '1280x720')
    .option('--debug', 'run the browser in foreground', false)
    .parse(process.argv);

await main(program.opts());
