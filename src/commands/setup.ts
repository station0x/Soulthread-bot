import {
  ChannelType,
  GuildTextBasedChannel,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "./_Command";
import { handleWelcomeEmbed } from "../handlers/onSetup";

// Create and export the setup command

export const setup: Command = {
  // Use SlashCommandBuilder to create command
  data: new SlashCommandBuilder()
    .setName("setup") // Command Name
    .setDescription("Setup the SoulThread bot") // Command Description
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Make command for use by Administrator only
    // create an option for the channel to send the Soulthread embed to
    .addChannelOption((option) =>
      option
        .setName("channel") // Option Name
        .setDescription("The channel for the verify embed") // Option Description
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  run: async (interaction) => {
    // Get the chosen channel from the options
    const channel = interaction.options.getChannel(
      "channel"
    ) as GuildTextBasedChannel;
    // Run the handleWelcomeEmbed to create and send the Welcome Embed
    handleWelcomeEmbed(channel, interaction);
  },
};
