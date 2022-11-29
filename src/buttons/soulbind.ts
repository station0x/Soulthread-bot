import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

// Create a function that takes a variable to create a Soulbind button

export function soulbindButtonData(host: string) {
  // Create this button with the row builder because it will be by itself
  const button = new ActionRowBuilder<ButtonBuilder>().setComponents(
    new ButtonBuilder()
      .setLabel("Soulbind") // Button Label
      .setStyle(ButtonStyle.Link)
      .setURL(host) // Button Link
  );
  return button; // return the button
}
