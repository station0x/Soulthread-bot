import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { soulBondHandler } from "../handlers/onSoulBond";

// Create a function that takes a variable to create a Soulbind button

export const soulBondButtonData = () => {
  // Create this button with the button builder because it will not be by itself
  const button = new ButtonBuilder()
    .setCustomId("soulBond") // Button Custom ID, used for handling the button event
    .setLabel("Soul Bond") // Button Name
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🔗"); // Button Emoji
  return button;
};

// Create a function that runs when the Soul Bond button is pressed

export function soulBondButtonRun(interaction: ButtonInteraction) {
  /* Runs the soul bond handler that creates the API link
   ** and soulbinds the Discord user to the blockchain.
   ** The handler then it assigns the necessry roles.
   */
  soulBondHandler(interaction);
}
