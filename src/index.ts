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
  JSONEncodable,
  PermissionFlagsBits,
  Routes,
  SlashCommandBuilder,
  User,
} from "discord.js";
import { REST } from "discord.js";
import { encode } from "js-base64";
import JsonURL from "@jsonurl/jsonurl";
import { request } from "undici";
import { url } from "inspector";
const wait = require('node:timers/promises').setTimeout;

const { BOT_TOKEN, GUILD_ID, CLIENT_ID, ROLE_ID1 } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(BOT_TOKEN!);

client.on("ready", () => console.log("Soul Thread Bot Online!"));

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
                `Verify with Soul Thread by clicking the 'Verify' button below.\nConnect your wallet with Soul Thread by clicking the 'Connect' button below.`
              )
              .setColor("Navy")
              .setTitle(`Welcome to ${interaction.guild!.name}`),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>().setComponents(
              new ButtonBuilder()
                .setCustomId("verifyMember")
                .setLabel("Verify")
                .setStyle(ButtonStyle.Success)
                .setEmoji("<:check:338071972476878848>"),
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

        break;
      }
    }
  } else if (interaction.isButton()) {
    switch (interaction.customId) {
      case "verifyMember": {
        console.log("Verifying Member...");
        const role = interaction.guild?.roles.cache.get(ROLE_ID1!);
        if (!role) {
          console.log("Role does not exist");
          return;
        }
        const member = interaction.member as GuildMember;
        member.roles
          .add(role)
          .then((m) =>
            interaction.reply({
              content: `The ${role} role was assigned to you. Thanks for your support!`,
              ephemeral: false,
            })
          )
          .catch((err) =>
            interaction.reply({
              content: `Something went wrong`,
              ephemeral: false,
            })
          );
        break;
      }
      case "connectMember": {
        console.log("Connecting Member...");
        const member = interaction.member as GuildMember;
        const roleId = process.env.ROLE_ID1;
        const guild = interaction.guild;
        const interactionId = interaction.id;
        const timestamp = Date.now();
        const seed = { guildId: guild!.id, roleId: roleId!, userId: member.user.id };
        const seedString = JsonURL.stringify(seed);
        const urlEnd = encode(seedString!);
        interaction.reply({
          content: `This link will only be valid for 5 minutes\nGuild: ${
            guild!.id
          } Member: ${member.id}`,
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: "Soul Thread Bot",
                iconURL:
                  "https://cdn.discordapp.com/attachments/1043182694307209296/1045898372239859742/2.png",
              })
              .setDescription(
                "You should expect to sign the following message when prompted by a non-custodial wallet such as MetaMask:\n" +
                  "```" +
                  `Soul Thread (connect.soulthread.xyz) asks you to sign this message for the purpose of verifying your account ownership. This is READ-ONLY access and will NOT trigger any blockchain transactions or incur any fees. \n\n- Community: ${
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
                .setURL("http://soulthread.xyz/verify/" + urlEnd)
            ),
          ],
          ephemeral: false,
        });
        let bool;
        while (!bool && (Date.now() - timestamp) < 6000) {
          try {
          await wait(333);
          let result = await request("soulthread.xyz/api/isVerifiedForRole/" + urlEnd);
          let { bool } = await result.body.json();
          console.log("soulthread.xyz/api/isVerifiedForRole/" + urlEnd);
          }
          catch (err) {
            console.log(err);
          }
        }
        console.log("Verifying Member...");
        if (bool == true) {
        const role = interaction.guild?.roles.cache.get(ROLE_ID1!);
        if (!role) {
          console.log("Role does not exist");
          return;
        }
        const member = interaction.member as GuildMember;
        member.roles
          .add(role)
          .then((m) =>
            interaction.followUp({
              content: `The ${role} role was assigned to you. Thanks for your support!`,
              ephemeral: false,
            })
          )
          .catch((err) =>
            interaction.followUp({
              content: `Something went wrong`,
              ephemeral: false,
            })
          );
        }
        else if (bool == false) {
          interaction.followUp("Apologies, you do not qualify for that role")
        }
        else {
          interaction.followUp("The Soul Thread API returned a null boolean value. Please notify a server admin")
        }
        break;
      }
    }
  }
});

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
      body: [
        new SlashCommandBuilder()
          .setName("setup")
          .setDescription("Setup the Soul Thread bot")
          .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
          .addChannelOption((option) =>
            option
              .setName("channel")
              .setDescription("The channel for the verify embed")
              .addChannelTypes(ChannelType.GuildText)
              .setRequired(true)
          ),
      ],
    });
    await client.login(BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
})();
