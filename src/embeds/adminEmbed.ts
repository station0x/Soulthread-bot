import {
    ButtonInteraction,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } from "discord.js";
  
  // Create the Weclome Embed, passing it the command interaction
  
  export function adminEmbed(
    guildName: string
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
        `Use the **Setup** button below to send the Welcome Embed to a channel of your choosing!.`
      )
      .setColor("Aqua") // Embed Color
      .setTitle(`Welcome to ${guildName}`); // Embed Title
    return embed; // return the embed 
  }
  