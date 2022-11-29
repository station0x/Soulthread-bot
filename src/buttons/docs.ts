import { ButtonBuilder, ButtonStyle } from "discord.js";

// Create a function that takes a variable to create a Link button

export function docsButtonData(host: string) {
  // Create this button with the button builder because it will not be by itself
  const button = new ButtonBuilder()
    .setLabel("Docs") // Button Label
    .setStyle(ButtonStyle.Link)
    .setURL(`${host}/docs/`); // Button Link
  return button; // returns the button
}
