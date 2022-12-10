import {
  EmbedBuilder,
} from "discord.js";

// Create the Weclome Embed, passing it the command interaction

export function welcomeEmbed() {
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
    .setTitle(`Create a Soul Bond and connect your Fantom Opera assets with Discord!`); // Embed Title
  return embed; // return the embed
}
