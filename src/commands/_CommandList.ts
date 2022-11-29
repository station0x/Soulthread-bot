import { Command } from "./_Command";
import { setup } from "../commands/setup";
import { soulBond } from "../commands/soulBond";

// Export a Command Array of the slash commands

export const CommandList: Command[] = [ setup, soulBond ];