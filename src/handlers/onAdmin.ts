import {
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    GuildTextBasedChannel,
    GuildBasedChannel,
    ButtonInteraction,
  } from "discord.js";
import { adminEmbed } from "../embeds/adminEmbed";
import { setupButtonData } from "../buttons/setup";
  
  // export a function that creates and sends the Admin Embed in a channel chosen by the admin
  
  export async function handleAdminEmbed(
    channel: GuildTextBasedChannel | GuildBasedChannel,
    interaction?: ChatInputCommandInteraction | ButtonInteraction,

  ) {
    if (channel.isTextBased()) {
      const button =
      channel.send({
        // Send the Welcome Embed to the channel
        embeds: [adminEmbed(channel.guild.name)],
        // Send buttons below
        components: [
          // Create a row builder to add the Soul Bond and Docs buttons
          new ActionRowBuilder<ButtonBuilder>().setComponents(
            setupButtonData(), // add the Setup button
          ),
        ],
      });
      if (interaction && channel.isTextBased()) {
      interaction.reply({
        // Reply that the embed has been deployed
        content: `Admin Embed Successfully deployed in channel: ${channel}!`,
        ephemeral: true,
      });
    } else if (interaction && !channel.isTextBased()) {
      interaction.reply("Please select a Text Channel");
    }
  }
  }
  