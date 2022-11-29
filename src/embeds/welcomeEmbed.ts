import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export function welcomeEmbed(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
    .setThumbnail("https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png")
    .setAuthor({
      name: "SoulThread Bot",
      iconURL:
        "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
    })
      .setDescription(
        `Start the soulbinding process by clicking the 'Soulbind' button below.`
      )
      .setColor("Aqua")
      .setTitle(`Welcome to ${interaction.guild!.name}`);
      return embed;
}