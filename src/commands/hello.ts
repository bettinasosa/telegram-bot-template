import { Context } from 'telegraf';
import { logger } from '../utils/logger';

/**
 * Handle the /hello command
 * Sends a greeting message to the user
 * Add bellow any commands as you add them to the bot
 */
export async function helloCommand(ctx: Context): Promise<void> {
  const username = ctx.from?.username || ctx.from?.first_name || 'there';

  logger.info(`Hello command received from user: ${username}`);

  await ctx.reply(
    `👋 Hello, ${username}!\n\n` +
      `Welcome to this Telegram bot template. I'm up and running!\n\n` +
      `Available commands:\n` +
      `/hello - Get this welcome message\n` +
      `/start - Same as /hello`
  );
}
