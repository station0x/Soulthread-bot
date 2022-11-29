import { ActionRowBuilder, ButtonBuilder, ChannelType, GuildTextBasedChannel, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { docsButtonData } from "../buttons/docs";
import { soulContractButtonData } from "../buttons/soulContract";
import { welcomeEmbed } from "../embeds/welcomeEmbed";
import { Command } from "./_Command";

export const setup: Command = {
    data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup the SoulThread bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel for the verify embed")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    run: async (interaction) => {
        const channel = interaction.options.getChannel("channel") as GuildTextBasedChannel; 
        const host =
  process.env.HOST === "dev"
    ? "http://localhost:3000"
    : "https://soulthread.xyz"; 
          channel.send({
            embeds: [ welcomeEmbed(interaction) ],
            components: [
              new ActionRowBuilder<ButtonBuilder>().setComponents(
                soulContractButtonData(),
                docsButtonData(host)
              ),
            ],
          });
          interaction.reply({
            content: `Soulthread Embed Successfully deployed in channel: ${channel}!`,
            ephemeral: false,
          });
    },
  };