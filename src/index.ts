import "dotenv/config";
import { Client, GatewayIntentBits, GuildTextBasedChannel, GuildBasedChannel, ChannelType, PermissionFlagsBits  } from "discord.js";
import { onReady } from "./handlers/onReady";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./handlers/onInteraction";
import { handleAdminEmbed } from "./handlers/onAdmin";

// Index file

(async () => {
  try {
    // Check validity of .env file
    if (!validateEnv()) return;
    // create bot object
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    // load the onReady handler
    client.on("ready", async () => await onReady(client));
    // load the onInteraction handler
    client.on(
      "interactionCreate",
      async (interaction) => await onInteraction(interaction)
    );
    // Add an admin channel when Soulthread joins a server
client.on("guildCreate", async (guild) => {

})
    // log the bot in
    await client.login(process.env.BOT_TOKEN);
 
  } catch (err) {
    // log any errors
    console.log(err);
  }
})();
