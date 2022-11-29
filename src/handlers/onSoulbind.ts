import { ButtonInteraction, ChatInputCommandInteraction, GuildMember } from "discord.js";
import { encode } from "js-base64";
import JsonURL from "@jsonurl/jsonurl";
import { contractEmbed } from "../embeds/contractEmbed";
import { soulbindButtonData } from "../buttons/soulbind";
import { checkRoles } from "../utils/checkRoles";

export async function soulbind(interaction: ButtonInteraction|ChatInputCommandInteraction) {
    console.log("Soulbinding Member...");
    const host =
    process.env.HOST === "dev"
    ? "http://localhost:3000"
    : "https://soulthread.xyz";
    const member = interaction.member as GuildMember;
    const username = `${member.user.username + "#" + member.user.discriminator}`;
    const userId = member.id;
    const guildName = interaction.guild!.name;
    const guildId = interaction.guild!.id;
    const interactionId = interaction.id;
    const timestamp = Date.now();
    const seed = {
      guildId: guildId,
      userId: userId,
      // signing message
      timestamp: timestamp,
      interactionId: interactionId,
      guildName: guildName,
      user: username,
    };
    const seedString = JsonURL.stringify(seed);
    const urlEnd = encode(seedString!);
    interaction.reply({
      content: `This link will only be valid for 5 minutes\nGuild: ${guildId} Member: ${userId}`,
      embeds: [ contractEmbed(host, guildName, username, interactionId, timestamp) ],
      components: [ soulbindButtonData(`${host}/verify/${urlEnd}`) ],
      ephemeral: false,
    });
    checkRoles(interaction, timestamp, host, urlEnd);

}