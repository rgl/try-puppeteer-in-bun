import { PUPPETEER_REVISIONS } from "puppeteer-core/internal/revisions.js";
import * as browsers from "@puppeteer/browsers";
import puppeteer from "puppeteer";
import os from "os";

function log() {
    console.log.apply(console, [new Date().toISOString(), ...arguments]);
}

// ensure the browser is installed.
// NB this is required because Bun does not execute arbitrary dependencies
//    lifecycle scripts, such as postinstall. even if it did, currently,
//    puppeteer assumes node is being used, so that would not work either.
//    see https://github.com/puppeteer/puppeteer/blob/puppeteer-v21.6.1/packages/puppeteer/package.json#L41
//    see https://bun.sh/docs/cli/install#trusted-dependencies
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

const installedBrowser = await browserInstall();

log(`Launching the browser from ${installedBrowser.executablePath}...`);
const browser = await puppeteer.launch({
    product: installedBrowser.browser,
    executablePath: installedBrowser.executablePath,
    args: [
        "--start-maximized"
    ],
    //headless: "new",
    headless: false,
});
try {
    log(`Launched the ${await browser.version()} browser.`);

    await Bun.sleep(1000);
} finally {
    await browser.close();
}
