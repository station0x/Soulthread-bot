export const validateEnv = () => {
  // Check for BOT_TOKEN in .env
    if (!process.env.BOT_TOKEN) {
      console.warn("Missing Discord bot token.");
      return false;
    }
    // Check for CLIENT_ID in .env
    if (!process.env.CLIENT_ID) {
      console.warn("Missing Client ID.");
      return false;
    }
    // returns true if .env is valid
    return true;
  };