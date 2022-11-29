import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { soulbind } from "../handlers/onSoulbind";

export const soulContractButtonData = () => {
    const button = new ButtonBuilder()
    .setCustomId("soulContract")
    .setLabel("Soul Contract")
    .setStyle(ButtonStyle.Primary)
    .setEmoji("🔗");
    return button;
}
export function soulContractButtonRun(interaction: ButtonInteraction) {
    soulbind(interaction);
}