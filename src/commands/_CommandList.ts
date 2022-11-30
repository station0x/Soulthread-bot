import { Command } from "./_Command";
import { setup } from "./setup";
import { soulBond } from "./soulBond";
import { admin } from "./admin";

// Export a Command Array of the slash commands

export const CommandList: Command[] = [setup, soulBond, admin];
