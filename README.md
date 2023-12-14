# try-puppeteer-in-bun

[![Build status](https://github.com/rgl/try-puppeteer-in-bun/workflows/build/badge.svg)](https://github.com/rgl/try-puppeteer-in-bun/actions?query=workflow%3Abuild)

**installing the browser from bun is currently broken. see https://github.com/oven-sh/bun/issues/4894**

This runs [Puppeteer](https://github.com/puppeteer/puppeteer) in [Bun](https://bun.sh).

## Usage

Install [Bun](https://bun.sh).

Execute:

```bash
bun install --frozen-lockfile
# NB installing the browser from bun is currently broken.
#    see https://github.com/oven-sh/bun/issues/4894
#rm -rf ~/.cache/puppeteer
bun run main.js
```
