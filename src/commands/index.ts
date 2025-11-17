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

  // Default handler for unknown commands
  bot.on('text', async (ctx): Promise<void> => {
    await ctx.reply(
      'Sorry, I didn\'t understand that command. Try /hello to get started!'
    );
  });
}

