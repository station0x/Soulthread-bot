import { ActionRowBuilder, ButtonBuilder, ChannelType, GuildTextBasedChannel, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { docsButtonData } from "../buttons/docs";
import { soulBondButtonData } from "../buttons/soulBond";
import { welcomeEmbed } from "../embeds/welcomeEmbed";
import { Command } from "./_Command";
import { getHost } from "../utils/getValues";

// Create and export the setup command

export const setup: Command = {
  // Use SlashCommandBuilder to create command 
    data: new SlashCommandBuilder()
    .setName("setup") // Command Name
    .setDescription("Setup the SoulThread bot") // Command Description
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Make command for use by Administrator only
    // create an option for the channel
    .addChannelOption((option) =>
      option
        .setName("channel") // Option Name
        .setDescription("The channel for the verify embed") // Option Description
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    run: async (interaction) => {
        // Get the chosen channel from the options
        const channel = interaction.options.getChannel("channel") as GuildTextBasedChannel;
        // Use the getHost function to get the hostname from the .env 
        const host = await getHost();
          channel.send({
            // Send the Welcome Embed to the channel
            embeds: [ welcomeEmbed(interaction) ],
            // Send buttons below 
            components: [
              // Create a row builder to add the Soul Bond and Docs buttons
              new ActionRowBuilder<ButtonBuilder>().setComponents(
                soulBondButtonData(), // add the Soul Bond button
                docsButtonData(host) // add the Docs button and send it the host
              ),
            ],
          });
          interaction.reply({
            // Reply that the embed has been deployed
            content: `Soulthread Embed Successfully deployed in channel: ${channel}!`,
            ephemeral: true,
          });
    },
  };