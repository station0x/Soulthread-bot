import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
} from "discord.js";
import { encode } from "js-base64";
import JsonURL from "@jsonurl/jsonurl";
import { bondEmbed } from "../embeds/bondEmbed";
import { soulbindButtonData } from "../buttons/soulbind";
import { checkRoles } from "../utils/checkRoles";
import { getHost } from "../utils/getValues";

// Create a handler for creating Soul Bonds

export async function soulBondHandler(
  interaction: ButtonInteraction | ChatInputCommandInteraction
) {
  // Report to console and load variables
  console.log("Creating a Soul Bond...");
  const host = await getHost(); // get host variable
  const member = interaction.member as GuildMember; // get Member variable
  const username = `${member.user.username + "#" + member.user.discriminator}`; // create username string
  const userId = member.id; // get User Id variable
  const guildName = interaction.guild!.name; // get server name
  const guildId = interaction.guild!.id; // get server(guild) ID
  const interactionId = interaction.id; // get interaction ID
  const timestamp = Date.now(); // create timestamp

  // create the JSON file with info for the API
  const seed = {
    guildId: guildId,
    userId: userId,
    // signing message
    timestamp: timestamp,
    interactionId: interactionId,
    guildName: guildName,
    user: username,
  };

  const seedString = JsonURL.stringify(seed); // Convert the JSON into a string
  const urlEnd = encode(seedString!); // convert the JSON string into base64

  interaction.reply({
    content: `This link will only be valid for 5 minutes\nGuild: ${guildId} Member: ${userId}`, // The message reply to send
    embeds: [bondEmbed(host, guildName, username, interactionId, timestamp)], // the Bond embed to send
    components: [soulbindButtonData(`${host}/verify/${urlEnd}`)], // the soulbind button to send
    ephemeral: true,
  });

  // Run the checkRoles function and send the info needed for the API to check the user for qualified roles
  checkRoles(interaction, timestamp, host, urlEnd);
}
