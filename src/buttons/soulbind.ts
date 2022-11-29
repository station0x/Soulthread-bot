import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"

export function soulbindButtonData(host: string) {
    const button = new ActionRowBuilder<ButtonBuilder>().setComponents(
        new ButtonBuilder()
          .setLabel("Soulbind")
          .setStyle(ButtonStyle.Link)
          .setURL(host)
      );
    return button;
}