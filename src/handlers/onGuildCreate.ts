import { PermissionFlagsBits } from "discord-api-types/v9";
import { ChannelType, Guild, GuildTextBasedChannel } from "discord.js";
import { handleAdminEmbed } from "./onAdmin";
import { handleWelcomeEmbed } from "./onSetup";

// Handle the "ready" event with this file

export const onGuildCreate = async (guild: Guild) => {

    let id = guild.roles.everyone.id;

    const findAdminChannel = guild.channels.cache.find(
      (ch: { name: string }) => ch.name === "soulthread-admin"
    ) as GuildTextBasedChannel;
    const findConnectChannel = guild.channels.cache.find(
      (ch: { name: string }) => ch.name === "soulthread-connect"
    ) as GuildTextBasedChannel;
    
    if (!findConnectChannel) {
      const connectChannel: GuildTextBasedChannel =
        await guild.channels.create({
          name: "soulthread-connect",
          type: ChannelType.GuildText,
        });

      await handleWelcomeEmbed(connectChannel);
    }
    if (!findAdminChannel) {
      const adminChannel: GuildTextBasedChannel = await guild.channels.create(
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
};