import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { soulBondButtonRun } from "../buttons/soulBond";

// Handle all interaction events with this file

export const onInteraction = async (interaction: Interaction) => {
  // Run slash commands
  if (interaction.isChatInputCommand()) {
    for (const Command of CommandList) {
      if (interaction.commandName === Command.data.name) {
        await Command.run(interaction);
        break;
      }
    }
  } else 
  // Run button interactions
  if (interaction.isButton()) {
    switch (interaction.customId) {
      // Soul Bond Button
      case "soulBond": {
        soulBondButtonRun(interaction);
        break;
      }
    }
  }
};