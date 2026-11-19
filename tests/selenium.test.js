import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { afterAll, beforeAll, expect, test } from "@jest/globals";

let server;
let driver;

beforeAll(async () => {
  server = spawn(process.execPath, ["src/server.js"], {
    stdio: "ignore",
    env: {
      ...process.env,
      PORT: "3100",
    },
  });

  let ready = false;

  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const response = await fetch("http://127.0.0.1:3100/index");

      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      // Aguarda o servidor iniciar.
    }

    await delay(300);
  }

  if (!ready) {
    throw new Error("Servidor TaskFlow não iniciou");
  }

  const options = new chrome.Options();

  options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
}, 30000);

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }

  if (server) {
    server.kill();
  }
});

test("abre a página TaskFlow no Chrome", async () => {
  await driver.get("http://127.0.0.1:3100/index");

  const title = await driver.findElement(By.css("h1")).getText();

  expect(title).toBe("Apresentacao");
});
