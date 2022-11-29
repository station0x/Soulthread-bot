import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"

export function docsButtonData(host: string) {
    const button = 
        new ButtonBuilder()
          .setLabel("Docs")
          .setStyle(ButtonStyle.Link)
          .setURL(`${host}/docs/`)
    return button;
}