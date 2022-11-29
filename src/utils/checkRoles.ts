import { ButtonInteraction, ChatInputCommandInteraction, GuildMember, Interaction } from "discord.js";
import { request } from "undici";
const wait = require("node:timers/promises").setTimeout;

export async function checkRoles(interaction: ChatInputCommandInteraction|ButtonInteraction, timestamp: number, host: string, urlEnd: string) {
let gatedRoles;
while (!gatedRoles && Date.now() - timestamp < 300000) {
  try {
    await wait(333);
    let result = await request(
      `${host}/api/isVerifiedForRole/` + urlEnd
    );
    let { roleArray } = await result.body.json();
    gatedRoles = roleArray;
  } catch (err) {
    console.log(err);
  }
}
console.log("Verifying Member...");
if (gatedRoles instanceof Array && gatedRoles.length > 0) {
  if (gatedRoles.length == 0) {
    const member = interaction.member as GuildMember;

    gatedRoles.forEach(grantRole);
    function grantRole(role: string) {
      member.roles.add(role);
    }
    interaction.followUp({
      content: `You now have the folowwing role(s): ${gatedRoles.toString}.  Thanks for your support!`,
      ephemeral: false,
    });
  }
} else if (gatedRoles == 0) {
  interaction.followUp(
    "Apologies, you do not qualify for any roles, yet."
  );
} else {
  interaction.followUp(
    "The SoulThread Bot did not receive a Role Array from the API after using the 'Soulbind' button. Please notify a server admin"
  );
}
}