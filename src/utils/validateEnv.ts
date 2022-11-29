export const validateEnv = () => {
    if (!process.env.BOT_TOKEN) {
      console.warn("Missing Discord bot token.");
      return false;
    }
    
    if (!process.env.CLIENT_ID) {
      console.warn("Missing Client ID.");
      return false;
    }

    return true;
  };