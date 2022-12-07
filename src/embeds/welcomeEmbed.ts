import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  GuildBasedChannel,
  GuildTextBasedChannel,
} from "discord.js";
import { setupButtonData } from "../buttons/setup";

// Create the Weclome Embed, passing it the command interaction

export async function welcomeEmbed(channel?: GuildTextBasedChannel
) {
  // Create the initial embed
  const embed = new EmbedBuilder()
    // Embed Thumbnail
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png"
    )
    // Embed Author
    .setAuthor({
      name: "SoulThread Bot",
      iconURL:
        "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
    })
    // Embed Description
    .setDescription(
      `Start the soulbinding process by clicking the 'Soul Bond' button below.`
    )
    .setColor("Aqua") // Embed Color
    .setTitle(`Create a Soul Bond`); // Embed Title

    if (channel) {
      await channel.send({
        // Send the Welcome Embed to the channel
        embeds: [embed],
        // Send buttons below
        components: [
          // Create a row builder to add the Soul Bond and Docs buttons
          new ActionRowBuilder<ButtonBuilder>().setComponents(
            setupButtonData(), // add the Setup button
          ),
        ],
      });
    }
    else {
  return embed; // return the embed
}
}
