import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, GuildTextBasedChannel } from "discord.js";
import { handleAdminEmbed } from "../handlers/onAdmin";
import { Command } from "./_Command";

  // Create and export the admin command

export const admin: Command = {
    // Use SlashCommandBuilder to create command
    data: new SlashCommandBuilder()
      .setName("admin") // Command Name
      .setDescription("Setup Admin Embed") // Command Description
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
      handleAdminEmbed(interaction, channel);
    },
  };