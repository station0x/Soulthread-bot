import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
  } from "@discordjs/builders";
  import { ChatInputCommandInteraction } from "discord.js";

  // Create custom Command interface for handling slash commands
  
  export interface Command {
    // Use SlashCommandBuilder to create the command
    data:
      | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
      | SlashCommandSubcommandsOnlyBuilder;
    // Set the received variable type to ChatInputCommandInteraction  
    run: (interaction: ChatInputCommandInteraction) => Promise<void>;
  }