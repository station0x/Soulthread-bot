import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
} from "discord.js";
import axios from "axios";

// Export a function that asks the API which roles the user qualifies for

export async function checkRoles(
  interaction: ChatInputCommandInteraction | ButtonInteraction,
  timestamp: number,
  host: string,
  urlEnd: string
) {
  // create an undefined variable that will eventually be an Array
  let gatedRoles;
  // start a while loop that ends when gatedRoles has a value or after 5 minutes passes(whichever comes first)
  while (!gatedRoles && Date.now() - timestamp < 300000) {
    try {
      // create and run a 3.33 second timer
      const wait = require("node:timers/promises").setTimeout;
      await wait(333);
      // make an API request for the roles the user qualifies for (subscribing for member verification result)

      const isVerified = (
        await axios.get(`${host}/api/isVerifiedForRole/`, {
          params: {
            userHash: require("crypto")
              .createHash("sha256")
              .update(urlEnd)
              .digest("hex"),
          },
        })
      ).data;
      // pull the rolesArray from the isVerified object the API sends back
      let { rolesPassed } = isVerified;
      // assign gatedRoles the role array received from the API
      gatedRoles = rolesPassed;
    } catch (err) {
      // log any errors
      console.log(err);
    }
  }
  console.log("Verifying Member...");
  // Check to make sure an array was returned and has roles
  if (gatedRoles instanceof Array && gatedRoles.length > 0) {
    // create the member object
    const member = interaction.member as GuildMember;
    // grant all rles in the array to member
    gatedRoles.forEach(grantRole);
    function grantRole(role: string) {
      member.roles.add(role);
    }
    interaction.followUp({
      // report which roles a user was given
      content: `You now have the folowwing role(s): ${gatedRoles.toString}.  Thanks for your support!`,
      ephemeral: true,
    });
  } else if (gatedRoles instanceof Array && gatedRoles.length == 0) {
    // If no roles in the array
    interaction.followUp({
      // report that the user does not qualify for any roles
      content: "Apologies, you do not qualify for any roles, yet.",
      ephemeral: true,
    });
  } else {
    interaction.followUp({
      // If the API does not return an array, send a message to notify and admin
      content:
        "The SoulThread Bot did not receive a Role Array from the API after using the 'Soulbind' button. Please notify a server admin",
      ephemeral: true,
    });
  }
}
