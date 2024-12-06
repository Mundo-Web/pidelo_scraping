import { launch } from "puppeteer";

class Browser {
  static page = async () => {
    const browser = await launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage=true',
        '--disable-accelerated-2d-canvas=true',
        '--disable-gpu',
        '--use-gl=egl'
      ]
    })
    const page = await browser.newPage();
    return {browser, page};
  }
}

export default Browser;