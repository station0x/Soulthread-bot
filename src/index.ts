import "dotenv/config";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  GuildMember,
  GuildTextBasedChannel,
  inlineCode,
  PermissionFlagsBits,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { REST } from "discord.js";
import { encode } from "js-base64";
import JsonURL from "@jsonurl/jsonurl";
import { request } from "undici";
const wait = require("node:timers/promises").setTimeout;

const { BOT_TOKEN, CLIENT_ID } = process.env;

// if "dev" --> Use host http://localhost:3000 for testing, else use https://soulthread.xyz (Add HOST="dev" to local .env)

const host =
  process.env.HOST === "dev"
    ? "http://localhost:3000"
    : "https://soulthread.xyz";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(BOT_TOKEN!);

client.on("ready", () => console.log("SoulThread Bot Online!"));

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    switch (interaction.commandName) {
      case "setup": {
        const channel = interaction.options.getChannel(
          "channel"
        ) as GuildTextBasedChannel;

        channel.send({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `Connect your wallet with SoulThread by clicking the 'Connect' button below.`
              )
              .setColor("Navy")
              .setTitle(`Welcome to ${interaction.guild!.name}`),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
              new ButtonBuilder()
                .setCustomId("connectMember")
                .setLabel("Connect")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🔗"),
              new ButtonBuilder()
                .setURL("http://soulthread.xyz")
                .setLabel("Docs")
                .setStyle(ButtonStyle.Link)
            ),
          ],
        });
        interaction.reply({
          content: `Soulthread Embed Successfully deployed in channel: ${channel}!`,
          ephemeral: false,
        });
        break;
      }
      case "connect": {
        console.log("Connecting Member...");
        const member = interaction.member as GuildMember;
        const roleId = process.env.ROLE_ID1;
        const guild = interaction.guild;
        const interactionId = interaction.id;
        const timestamp = Date.now();
        const seed = {
          guildId: guild!.id,
          roleId: roleId!,
          userId: member.user.id,
          // signing message
          timestamp,
          interactionId,
          guildName: guild!.name,
          user: `${member.user.username + "#" + member.user.discriminator}`,
        };
        const seedString = JsonURL.stringify(seed);
        const urlEnd = encode(seedString!);
        interaction.reply({
          content: `This link will only be valid for 5 minutes\nGuild: ${
            guild!.id
          } Member: ${member.id}`,
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: "SoulThread Bot",
                iconURL:
                  "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
              })
              .setDescription(
                "You should expect to sign the following message when prompted by a non-custodial wallet such as MetaMask:\n" +
                  "```" +
                  `SoulThread (${host}) asks you to sign this message for the purpose of verifying your account ownership. 
                  This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees. \n\n- Community: ${
                    guild!.name
                  } \n- User: ${member.user.username}#${
                    member.user.discriminator
                  } \n- Discord Interaction: ${interactionId} \n- Timestamp: ${timestamp} \n` +
                  "```" +
                  "\n**Make sure you sign the EXACT message (some wallets may use " +
                  inlineCode("\\n") +
                  " for new lines) and NEVER share your seed phrase or private key.**"
              )
              .setColor("Gold")
              .setTitle(`Please read instructions carefully before connecting`),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
              new ButtonBuilder()
                .setLabel("Connect Wallet")
                .setStyle(ButtonStyle.Link)
                .setURL(`${host}/verify/` + urlEnd)
            ),
          ],
          ephemeral: false,
        });
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
        } else if (gatedRoles.length == 0) {
          interaction.followUp(
            "Apologies, you do not qualify for any roles, yet."
          );
        } else {
          interaction.followUp(
            "The SoulThread Bot did not receive a Role Array from the API after using the '/connect' command. Please notify a server admin"
          );
        }
        break;
      }
    }
  } else if (interaction.isButton()) {
    switch (interaction.customId) {
      case "connectMember": {
        console.log("Connecting Member...");
        const member = interaction.member as GuildMember;
        const roleId = process.env.ROLE_ID1;
        const guild = interaction.guild;
        const interactionId = interaction.id;
        const timestamp = Date.now();
        const seed = {
          guildId: guild!.id,
          roleId: roleId!,
          userId: member.user.id,
          // signing message
          timestamp,
          interactionId,
          guildName: guild!.name,
          user: `${member.user.username + "#" + member.user.discriminator}`,
        };
        const seedString = JsonURL.stringify(seed);
        const urlEnd = encode(seedString!);
        interaction.reply({
          content: `This link will only be valid for 5 minutes\nGuild: ${
            guild!.id
          } Member: ${member.id}`,
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: "SoulThread Bot",
                iconURL:
                  "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
              })
              .setDescription(
                "You should expect to sign the following message when prompted by a non-custodial wallet such as MetaMask:\n" +
                  "```" +
                  `SoulThread (${host}) asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees. \n\n- Community: ${
                    guild!.name
                  } \n- User: ${member.user.username}#${
                    member.user.discriminator
                  } \n- Discord Interaction: ${interactionId} \n- Timestamp: ${timestamp} \n` +
                  "```" +
                  "\n**Make sure you sign the EXACT message (some wallets may use " +
                  inlineCode("\\n") +
                  " for new lines) and NEVER share your seed phrase or private key.**"
              )
              .setColor("Gold")
              .setTitle(`Please read instructions carefully before connecting`),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
              new ButtonBuilder()
                .setLabel("Connect Wallet")
                .setStyle(ButtonStyle.Link)
                .setURL(`${host}/verify/` + urlEnd)
            ),
          ],
          ephemeral: false,
        });
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
            "The SoulThread Bot did not receive a Role Array from the API after using the 'Connect' button. Please notify a server admin"
          );
        }
        break;
      }
    }
  }
});

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID!), {
      body: [
        new SlashCommandBuilder()
          .setName("setup")
          .setDescription("Setup the SoulThread bot")
          .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
          .addChannelOption((option) =>
            option
              .setName("channel")
              .setDescription("The channel for the verify embed")
              .addChannelTypes(ChannelType.GuildText)
              .setRequired(true)
          ),
          new SlashCommandBuilder()
            .setName("connect")
            .setDescription("Connect to SoulThread"),
      ],
    });
    await client.login(BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
})();
