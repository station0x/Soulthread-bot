import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { channelSelect } from "../utils/channelSelect";

// Create a function that takes a variable to create a Setup button

export const setupButtonData = () => {
  // Create this button with the button builder because it will not be by itself
  const button = new ButtonBuilder()
    .setCustomId("setup") // Button Custom ID, used for handling the button event
    .setLabel("Setup") // Button Name
    .setStyle(ButtonStyle.Primary)
    .setEmoji("👻"); // Button Emoji
  return button;
};

// Create a function that runs when the Setup button is pressed

export function setupButtonRun(interaction: ButtonInteraction) {
  // Run the channelSelect function to send the Channel Select Menu
  channelSelect(interaction);
}
