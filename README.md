# try-puppeteer-in-bun

[![Build status](https://github.com/rgl/try-puppeteer-in-bun/workflows/build/badge.svg)](https://github.com/rgl/try-puppeteer-in-bun/actions?query=workflow%3Abuild)

**this is currently broken. see https://github.com/puppeteer/puppeteer/issues/10867**

This runs [Puppeteer](https://github.com/puppeteer/puppeteer) in [Bun](https://bun.sh).

## Usage

Install [Bun](https://bun.sh).

Execute:

```bash
bun install --frozen-lockfile
rm -rf ~/.cache/puppeteer
bun run main.js
```
