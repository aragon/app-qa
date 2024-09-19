/// ######## BANNER WITH FIXES START ########

// ---- DYNAMIC_REQUIRE_FS_FIX ----
var require = (await import("node:module")).createRequire(import.meta.url);
var __filename = (await import("node:url")).fileURLToPath(import.meta.url);
var __dirname = (await import("node:path")).dirname(__filename);
// ---- DYNAMIC_REQUIRE_FS_FIX ----

/// ######## BANNER WITH FIXES END ########


// tests/basic.setup.ts
import {
  MetaMask,
  defineWalletSetup,
  getExtensionId
} from "@synthetixio/synpress";
import "dotenv/config";
var LOCALHOST_URL = "http://localhost:5173";
var SEED_PHRASE = process.env.METAMASK_SEED_PHRASE;
var PASSWORD = process.env.METAMASK_PASSWORD;
var basic_setup_default = defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, "MetaMask");
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);
  await metamask.importWallet(SEED_PHRASE);
});
export {
  LOCALHOST_URL,
  basic_setup_default as default
};
