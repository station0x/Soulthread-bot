import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
  Role,
} from "discord.js";
import axios from "axios";

// Export a function that asks the API which roles the user qualifies for

export async function checkRoles(
  interaction: ChatInputCommandInteraction | ButtonInteraction,
  timestamp: number,
  host: string,
  userId: string,
  guildId: string,
  username: string
) {
  // create an undefined variable that will eventually be an Array
  let gatedRoles;
  const adminChannel = interaction.guild!.channels.cache.find(
    (ch: { name: string }) => ch.name === "soulthread-admin"
  ) as GuildTextBasedChannel;

  const verifying = `Attempting to verify ${username}'s tokens`;
  console.log(verifying);

  if (adminChannel) {
    adminChannel.send(verifying);
  } else {
    console.log("No Admin Channel");
  }
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
              .update(`${userId}${guildId}`)
              .digest("hex"),
          },
        })
      ).data;
      // pull the rolesArray from the isVerified object the API sends back
      let { rolesPassed } = isVerified;
      // assign gatedRoles the role array received from the API
      gatedRoles = rolesPassed;
    } catch (err) {
      if (adminChannel) {
        interaction.followUp({
          // report that there was an issue
          content: `There was an issue reaching the host, please contact the server admin`,
          ephemeral: true,
        });
        adminChannel.send(err as string);
      } else {
        console.log("No Admin Channel");
      }
      // log any errors
      console.log(err);
    }
  }
  // Check to make sure an array was returned and has roles
  if (gatedRoles instanceof Array && gatedRoles.length > 0) {
    // create the member object
    const member = interaction.member as GuildMember;
    // grant all roles in the array to member and collect role names
    const roleNames: string[] = [];
    const ownedRoleNames: string[] = [];
    for (var i = 0; i < gatedRoles.length; i++) {
      const role = await interaction.guild!.roles.fetch(gatedRoles[i]) as Role;
      if (member.roles.cache.has(gatedRoles[i])) {
        ownedRoleNames.push(role.name);
      } else {
      await member.roles.add(role.id);
      roleNames.push(role.name)}
    }  
    // Log username and role in console and admin channel (if any)  
    if (ownedRoleNames.length > 0) {
      interaction.followUp({
        // report to the user which roles they already have
        content: `You **already have** the following roles: ${ownedRoleNames}`,
        ephemeral: true,
      });
      const message = `${username} **already has** the following role(s): ${ownedRoleNames}`;
      console.log(message);
      if (adminChannel) {
        adminChannel.send(message);
      } else {
        console.log("No Admin Channel");
      }}
      if (roleNames.length > 0) {
        interaction.followUp({
          // report the roles the user has just been granted
          content: `You have been **granted** the following roles: ${roleNames}`,
          ephemeral: true,
        });
        const message = `${username} has been **granted** the following role(s): ${roleNames}`;
        console.log(message);
        if (adminChannel) {
          adminChannel.send(message);
        } else {
          console.log("No Admin Channel");
        }}

  } else if (gatedRoles instanceof Array && gatedRoles.length == 0) {
    // If no roles in the array
    const message = `${username} does not qualify for any roles at this time`;
    console.log(message);

    if (adminChannel) {
      adminChannel.send(message);
    } else {
      console.log("No Admin Channel");
    }
    interaction.followUp({
      // report that the user does not qualify for any roles
      content: "Apologies, you do not qualify for any roles, yet.",
      ephemeral: true,
    });
  } else {
    const message = `The SoulThread API did not return an array, either ${username} did not sign the wallet transaction or is still verifying`;
    console.log(message);
    if (adminChannel) {
      adminChannel.send(message);
    } else {
      console.log("No Admin Channel");
    }
    interaction.followUp({
      // If the API does not return an array, send a message to notify and admin
      content:
        "Did you sign the wallet transaction? The SoulThread Bot did not receive a Role Array from the API after using the 'Soulbind' button. Please notify a server admin if you signed the wallet transaction and received this message",
      ephemeral: true,
    });
  }
}
