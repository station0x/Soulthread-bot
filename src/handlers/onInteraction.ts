import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { soulBondButtonRun } from "../buttons/soulBond";
import { handleWelcomeEmbed } from "./onSetup";
import { setupButtonRun } from "../buttons/setup";

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
  }
  // Run button interactions
  else if (interaction.isButton()) {
    switch (interaction.customId) {
      // Soul Bond Button
      case "soulBond": {
        soulBondButtonRun(interaction);
        break;
      }
      case "setup": {
        setupButtonRun(interaction);
      }
    }
  }
  // Run select menu interactions
  else if (interaction.isSelectMenu()) {
    switch (interaction.customId) {
      // Channel select menu from the admin embed
      case "channelSelect": {
        const channel = interaction.guild!.channels.cache.get(interaction.values[0]);
        // Send the Welcome Embed to the selected channel
        handleWelcomeEmbed(interaction, channel!)
        break;
      }
    }
  }
};
