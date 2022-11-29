import { SlashCommandBuilder } from "discord.js";
import { Command } from "./_Command";
import { soulbind } from "../handlers/onSoulbind";

export const soulContract: Command = {
    data: new SlashCommandBuilder()
    .setName("soul_contract")
    .setDescription("Initiate a Soul Contract"),
    run: async (interaction) => {
      soulbind(interaction);
    },
  };