import { Telegraf } from 'telegraf';
import { helloCommand } from './hello';

/**
 * Register all bot commands
 * @param bot - Telegraf bot instance
 */
export function setupCommands(bot: Telegraf): void {
  // Register commands
  bot.command('hello', helloCommand);
  bot.command('start', helloCommand); // Same as hello for convenience

  // Register text handler LAST - this ensures all command handlers are processed first
  // Commands starting with / are handled by command handlers above
  bot.on('text', async (ctx): Promise<void> => {
    // Skip if this is a command (commands are handled by command handlers)
    if (ctx.message.text?.startsWith('/')) {
      return;
    }
    await ctx.reply("Sorry, I didn't understand that command. Try /hello to get started!");
  });
}
