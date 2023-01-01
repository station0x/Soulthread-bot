import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, GuildTextBasedChannel } from "discord.js";
import { handleAdminEmbed } from "../handlers/onAdmin";
import { Command } from "./_Command";

  // Create and export the admin command

export const admin: Command = {
    // Use SlashCommandBuilder to create command
    data: new SlashCommandBuilder()
      .setName("admin") // Command Name
      .setDescription("Setup Admin Channel") // Command Description
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Make command for use by Administrator only
    run: async (interaction) => {
      let id = interaction.guild!.roles.everyone.id;

      const findAdminChannel = interaction.guild!.channels.cache.find(
        (ch: { name: string }) => ch.name === "soulthread-admin"
      ) as GuildTextBasedChannel;
      if (!findAdminChannel) {
        const adminChannel: GuildTextBasedChannel = await interaction.guild!.channels.create(
          {
            name: "soulthread-admin",
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: id,
                deny: [PermissionFlagsBits.ViewChannel],
              },
            ],
          }
        );
        await handleAdminEmbed(adminChannel);
      }
    },
  };