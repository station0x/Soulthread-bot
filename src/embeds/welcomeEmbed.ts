import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SelectMenuInteraction,
} from "discord.js";

// Create the Weclome Embed, passing it the command interaction

export function welcomeEmbed(
  interaction: ChatInputCommandInteraction | SelectMenuInteraction
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
      `Start the soulbinding process by clicking the 'Soulbind' button below.`
    )
    .setColor("Aqua") // Embed Color
    .setTitle(`Welcome to ${interaction.guild!.name}`); // Embed Title
  return embed; // return the embed
}
