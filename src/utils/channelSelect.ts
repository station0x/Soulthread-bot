import { ActionRowBuilder, BaseGuildTextChannel, ButtonInteraction, GuildBasedChannel, MessageActionRowComponentBuilder, SelectMenuBuilder } from "discord.js";

export async function channelSelect(interaction: ButtonInteraction) {
      // Create array for channel options
  let guildChannels: { label: string; description: string; value: string }[] = [];
  // Function to add all server channels to an array for options
  function addChannels(channel: GuildBasedChannel) {
    if (channel.isTextBased() && !channel.isVoiceBased()) {
    guildChannels.push({ label: channel.name, description: "Channel", value: channel.id })
    }
  }
// push each channel into the array for options
interaction.guild!.channels.cache.forEach(addChannels);
// Build the Action Row and the Select Menu
const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
.addComponents(
    new SelectMenuBuilder()
        .setCustomId('channelSelect') // Menu ID
        .setPlaceholder('Select a Channel') // Placeholder text
        .addOptions(guildChannels), // Options set from the array of guild channels
);
// send the select menu to the user
await interaction.reply({ content: 'Please select a channel for the Soulthread Embed', ephemeral: true, components: [row] });
}