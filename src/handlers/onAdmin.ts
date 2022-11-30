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
    interaction: ChatInputCommandInteraction | ButtonInteraction,
    channel: GuildTextBasedChannel | GuildBasedChannel
  ) {
    if (channel.isTextBased()) {
      channel.send({
        // Send the Welcome Embed to the channel
        embeds: [adminEmbed(interaction)],
        // Send buttons below
        components: [
          // Create a row builder to add the Soul Bond and Docs buttons
          new ActionRowBuilder<ButtonBuilder>().setComponents(
            setupButtonData(), // add the Soul Bond button
          ),
        ],
      });
      interaction.reply({
        // Reply that the embed has been deployed
        content: `Admin Embed Successfully deployed in channel: ${channel}!`,
        ephemeral: true,
      });
    } else {
      interaction.reply("Please select a Text Channel");
    }
  }
  