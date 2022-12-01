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
  const rawBond = `SoulThread (${host}) requires verification of account ownership.\n\n Username: ${username} \n Server Name: ${guildName} \n Interaction ID: ${interactionId} \n Raw Timestamp: ${timestamp} \n\nThis Soul Bond (message) is READ-ONLY access and has NO GAS FEE associated with it. Please sign this Soul Bond (message) to verify with SoulThread`;

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
      "You should get a Soul Bond (message) to sign when Soulbinding to a non-custodial wallet like MetaMask:\n" +
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
