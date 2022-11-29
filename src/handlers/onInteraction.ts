import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { soulContractButtonRun } from "../buttons/soulContract";

export const onInteraction = async (interaction: Interaction) => {
  console.log(interaction)
  if (interaction.isChatInputCommand()) {
    for (const Command of CommandList) {
      if (interaction.commandName === Command.data.name) {
        await Command.run(interaction);
        break;
      }
    }
  } else if (interaction.isButton()) {
    switch (interaction.customId) {
      case "soulContract": {
        soulContractButtonRun(interaction);
        break;
      }
    }
  }
};