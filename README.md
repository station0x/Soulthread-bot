# Welcome to SoulThread!

SoulThread is a Discord bot that connects members of your Discord community with their blockchain token assets on the Fantom Opera. With SoulThread, you can automatically grant roles to your members based on the tokens they own on the Fantom Opera. These token-based roles can then be used to grant access to exclusive Discord channels.

## Installation

To install and run SoulThread, you will need to follow these steps:

1. Make sure you have Node.js and NPM installed on your machine.
2. Clone the SoulThread repository to your local machine: `git clone https://github.com/station0x/Soulthread-bot.git`
3. Navigate to the root directory of the repository: `cd Soulthread-bot`
4. Create a new file called `.env` using `.env.example` as a template. Enter your Discord Bot Token (`BOT_TOKEN`) and your Discord Bot Client ID (`CLIENT_ID`) in this file.
5. Install the necessary dependencies: `npm i`
6. Build the source code: `npm run build`
7. Start the bot: `npm start`

## Usage

Once the bot is added to a server, it will automatically create a channel called `#soulthread-connect`, containing an embed for users to create and sign a (gasless) blockchain message that will associate the Discord user with their Fantom Opera tokens. It will also create a channel called `soulthread-admin`, which will keep usage logs. 

You can add the connection embed to any channel using the `/setup` command. You can re-create the admin channel using the command `/admin`.

## Support

If you encounter any issues while using SoulThread, please don't hesitate to open an issue on the GitHub repository. We'll do our best to help you resolve any problems you might be experiencing.
