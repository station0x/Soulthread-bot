import { EmbedBuilder, inlineCode, codeBlock } from "discord.js";

/* Export function to create the Soul Bond Embed
 ** it needs to be passed to a:
 ** host, guildName, username, interactionId and timestamp
 */

export function bondEmbed(
  host: string,
  guildName: string,
  username: string,
  interactionId: string,
  timestamp: number
) {
  // Create the message text that users will see when connecting with a non-custodial wallet
  const rawBond = `Soulthread (${host}) asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees. \n\n- Community: ${guildName} \n- User: ${username} \n- Discord Interaction: ${interactionId} \n- Timestamp: ${timestamp} \n`;

  // Create initiate embed
  const embed = new EmbedBuilder()
    // Embed Author
    .setAuthor({
      name: "SoulThread Bot",
      iconURL:
        "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
    })
    // Embed Description explaining the connection message
    .setDescription(
      "You should get a Soul Bond to sign when Soulbinding to a non-custodial wallet like MetaMask:\n" +
        // add Bond message text
        codeBlock(rawBond) +
        "\n**Make sure you sign the EXACT Bond, you don't want to lose your soul over nothing.(some wallets may use " +
        inlineCode("\\n") +
        "  for new lines) Never share your seed phrase or private key.**"
    )
    .setColor("Aqua") // Embed Color
    .setTitle(`Please read the Soulbinding instructions carefully.`); // Embed Title
  return embed; // return the embed
}
