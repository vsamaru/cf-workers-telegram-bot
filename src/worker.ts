////////////////////////////////////////////////////////////////////
////           Telegram Bot using Cloudflare Worker             ////
////////////////////////////////////////////////////////////////////
////  Author: Nikhil John                                       ////
////  Repo: https://github.com/nikhiljohn10/telegram-bot-worker ////
////  License: MIT                                              ////
////                                                            ////
////  Author: Sean Behan                                        ////
////  Repo: https://github.com/codebam/cf-workers-telegram-bot  ////
////  License: Apache-2.0                                       ////
////////////////////////////////////////////////////////////////////

import commands from "./commands";
import Handler from "./handler";
import { responseToJSON, sortEnv } from "./libs";
import { Env } from "./types";

export default {
  fetch: async (request: Request, env: Env) =>
    ((secrets, kv) =>
      new Handler([
        {
          bot_name: "ni1njabot",
          token: secrets.SECRET_TELEGRAM_API_TOKEN,
          commands: {
            "/chatinfo": commands.chatInfo,
            "/ping": commands.ping,
            "/toss": commands.toss,
            "/balance": commands.balance,
            "/epoch": commands.epoch,
            "/kanye": commands.kanye,
            "/bored": commands.bored,
            "/joke": commands.joke,
            "/doge": commands.doge,
            "/roll": commands.roll,
            "/recursion": commands.recursion,
            "/numbers": commands.numbers,
            "/average": commands.average,
            "/get": commands._get,
            "/set": commands._set,
            "/duckduckgo": commands.duckduckgo,
            "/code": commands.code,
            "/commands": commands.commandList,
            "/start": commands.commandList,
          },
          kv: kv.KV_BOT_STORAGE,
        },
        {
          bot_name: "@duckduckbot",
          token: secrets.SECRET_TELEGRAM_API_TOKEN2,
          commands: {
            inline: commands.duckduckgo, // default inline response
            "/duckduckgo": commands.duckduckgo,
            "/code": commands.code,
            "/commands": commands.commandList,
            "/start": commands.commandList,
          },
        },
        {
          bot_name: "@ddggbot",
          token: secrets.SECRET_TELEGRAM_API_TOKEN3,
          commands: {
            inline: commands.duckduckgo,
            "/duckduckgo": commands.duckduckgo,
            "/code": commands.code,
            "/commands": commands.commandList,
            "/start": commands.commandList,
          },
        },
      ]))(...sortEnv(env))
      .handle(request)
      .then((response) => responseToJSON(response) && response),
};
