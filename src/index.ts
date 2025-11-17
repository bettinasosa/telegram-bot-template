import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { setupCommands } from './commands';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

/**
 * Initialize and start the Telegram bot
 */
async function main() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    throw new Error(
      'TELEGRAM_BOT_TOKEN is not defined. Please set it in your .env file.'
    );
  }

  // Create bot instance
  const bot = new Telegraf(botToken);

  // Set up commands
  setupCommands(bot);

  // Error handling
  bot.catch((err: unknown, ctx) => {
    logger.error(`Error for ${ctx.updateType}`, err);
  });

  // Start bot
  await bot.launch();

  logger.info('Bot is running!');
  logger.info('Press Ctrl+C to stop');

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

// Run the bot
main().catch((error) => {
  logger.error('Failed to start bot:', error);
  process.exit(1);
});

