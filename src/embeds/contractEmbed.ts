import { EmbedBuilder, inlineCode, codeBlock } from "discord.js";

export function contractEmbed(host: string, guildName: string, username: string, interactionId: string, timestamp: number ) {
    const rawContract = `Soulthread (${host}) asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees. \n\n- Community: ${
        guildName
      } \n- User: ${username
      } \n- Discord Interaction: ${interactionId} \n- Timestamp: ${timestamp} \n`;
    const embed = new EmbedBuilder()
    .setAuthor({
      name: "SoulThread Bot",
      iconURL:
        "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
    })
    .setDescription(
      "You should get a Soul Contract to sign when Soulbinding to a non-custodial wallet like MetaMask:\n"
      + codeBlock(rawContract) + 
      "\n**Make sure you sign the EXACT Contract, you don't want to lose your soul over nothing.(some wallets may use "
      + inlineCode("\\n") +
      "  for new lines) Never share your seed phrase or private key.**"
    )
    .setColor("Aqua")
    .setTitle(`Please read the Soulbinding instructions carefully.`);
    return embed;
}