import { Telegraf } from 'telegraf';
import { aiCommand, clearCommand } from './aiChat';
import { logger } from '../utils/logger';

/**
 * Setup AI chat example commands
 *
 * This registers the AI chat bot commands for your workshop.
 *
 * Usage in src/index.ts:
 * import { setupExampleCommands } from './examples';
 * setupExampleCommands(bot);
 */
export function setupExampleCommands(bot: Telegraf): void {
  logger.info('Setting up AI Chat Bot commands...');

  // AI Chat commands
  bot.command('ai', aiCommand);
  bot.command('clear', clearCommand);

  logger.info('✅ AI Chat Bot ready! Use /ai to start chatting');
}
