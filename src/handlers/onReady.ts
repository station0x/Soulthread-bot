import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { CommandList } from "../commands/_CommandList";

// Handle the "ready" event with this file

export const onReady = async (client: Client) => {
  // Get all slash commands from the command list
  const commandData = CommandList.map((command) => command.data.toJSON());
  // Register all slash commands
  const rest = new REST({ version: "10" }).setToken(
    process.env.BOT_TOKEN as string
  );
  await rest.put(Routes.applicationCommands(client.user!.id), {
    body: commandData,
  });
  // Send a message to the console that the bot is logged in
  console.log(`${client.user!.username} logged in!`);
};
