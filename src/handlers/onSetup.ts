import {
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  GuildTextBasedChannel,
  SelectMenuInteraction,
  GuildBasedChannel,
} from "discord.js";
import { docsButtonData } from "../buttons/docs";
import { soulBondButtonData } from "../buttons/soulBond";
import { welcomeEmbed } from "../embeds/welcomeEmbed";
import { getHost } from "../utils/getValues";

// export a function that creates and sends the Welcome Embed in a channel chosen by the admin

export async function handleWelcomeEmbed(
  channel: GuildTextBasedChannel | GuildBasedChannel,
  interaction?: ChatInputCommandInteraction | SelectMenuInteraction,
) {
  if (channel.isTextBased()) {
    // Use the getHost function to get the hostname from the .env
    const host = await getHost();
    channel.send({
      // Send the Welcome Embed to the channel
      embeds: [welcomeEmbed()],
      // Send buttons below
      components: [
        // Create a row builder to add the Soul Bond and Docs buttons
        new ActionRowBuilder<ButtonBuilder>().setComponents(
          soulBondButtonData(), // add the Soul Bond button
          docsButtonData(host) // add the Docs button and send it the host
        ),
      ],
    });
    if (interaction){
    interaction.reply({
      // Reply that the embed has been deployed
      content: `Soulthread Embed Successfully deployed in channel: ${channel}!`,
      ephemeral: true,
    });
  }}
}
