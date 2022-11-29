import { Command } from "./_Command";
import { setup } from "../commands/setup";
import { soulContract } from "../commands/soulContract";

export const CommandList: Command[] = [ setup, soulContract ];