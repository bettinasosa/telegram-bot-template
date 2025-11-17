/**
 * Type definitions for the bot
 * Add custom types here as your bot grows
 */

/**
 * Environment variables type definition
 */
export interface BotEnvironment {
  TELEGRAM_BOT_TOKEN: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

/**
 * Command handler function type
 */
export type CommandHandler = (ctx: any) => Promise<void>;

