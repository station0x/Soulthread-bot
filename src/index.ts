import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { REST } from "discord.js";
import { encode } from "js-base64";
import JsonURL from "@jsonurl/jsonurl";
import { request } from "undici";

import { onReady } from "./handlers/onReady";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./handlers/onInteraction";
const wait = require("node:timers/promises").setTimeout;

// if "dev" --> Use host http://localhost:3000 for testing, else use https://soulthread.xyz (Add HOST="dev" to local .env)

const host =
  process.env.HOST === "dev"
    ? "http://localhost:3000"
    : "https://soulthread.xyz";

(async () => {
  try {
    if (!validateEnv()) return;
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    client.on("ready", async () => await onReady(client));
    client.on(
      "interactionCreate",
      async (interaction) => await onInteraction(interaction)
    );
    await client.login(process.env.BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
})();
