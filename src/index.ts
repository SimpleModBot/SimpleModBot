import SETUP from "../config.json";
import { TERMINAL_COLOURS } from "./utils/const";

// checking if discord token and app id are provided
if(!SETUP.Discord.token) throw new Error(`${TERMINAL_COLOURS.ERROR_RED}ERROR =>${TERMINAL_COLOURS.DEFAULT} ${TERMINAL_COLOURS.DISCORD}DISCORD${TERMINAL_COLOURS.DEFAULT}\n token not found!`);
if(!SETUP.Discord.app_id) throw new Error(`${TERMINAL_COLOURS.ERROR_RED}ERROR =>${TERMINAL_COLOURS.DEFAULT} ${TERMINAL_COLOURS.DISCORD}DISCORD${TERMINAL_COLOURS.DEFAULT}\n app id not found!`);