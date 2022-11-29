import { SlashCommandBuilder } from "discord.js";
import { Command } from "./_Command";
import { soulBondHandler } from "../handlers/onSoulBond";

// Create the Soul Bond command

export const soulBond: Command = {
    // Use SlashCommandBuilder to create command 
    data: new SlashCommandBuilder()
    .setName("soul_bond") // Command Name
    .setDescription("Initiate a Soul Bond"), // Command Desription
    run: async (interaction) => {
    /* Runs the soul bond handler that creates the API link
    ** and soulbinds the Discord user to the blockchain.
    ** The handler then it assigns the necessry roles.
    */      
      soulBondHandler(interaction);
    },
  };