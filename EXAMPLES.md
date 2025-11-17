# 📚 Examples & Patterns

This guide shows common patterns and examples for extending your Telegram bot.

## Table of Contents

- [Basic Commands](#basic-commands)
- [Commands with Arguments](#commands-with-arguments)
- [Inline Keyboards](#inline-keyboards)
- [Conversation State](#conversation-state)
- [Error Handling](#error-handling)
- [Middleware](#middleware)
- [Database Integration](#database-integration)

## Basic Commands

### Simple Response Command

```typescript
// src/commands/ping.ts
import { Context } from 'telegraf';
import { logger } from '../utils/logger';

/**
 * Simple ping command
 */
export async function pingCommand(ctx: Context): Promise<void> {
  logger.info('Ping command received');
  await ctx.reply('🏓 Pong!');
}
```

### Command with User Info

```typescript
// src/commands/info.ts
import { Context } from 'telegraf';

export async function infoCommand(ctx: Context): Promise<void> {
  const user = ctx.from;
  
  if (!user) {
    await ctx.reply('Unable to get user information.');
    return;
  }

  const info = [
    `👤 User Information`,
    ``,
    `Name: ${user.first_name} ${user.last_name || ''}`,
    `Username: @${user.username || 'Not set'}`,
    `ID: ${user.id}`,
    `Language: ${user.language_code || 'Unknown'}`,
  ].join('\n');

  await ctx.reply(info);
}
```

## Commands with Arguments

### Echo Command

```typescript
// src/commands/echo.ts
import { Context } from 'telegraf';

export async function echoCommand(ctx: Context): Promise<void> {
  // Get message text and remove command
  const text = ctx.message?.text;
  
  if (!text) {
    await ctx.reply('Please provide text to echo!');
    return;
  }

  // Extract text after command
  const echoText = text.replace('/echo', '').trim();

  if (!echoText) {
    await ctx.reply('Usage: /echo <text to echo>');
    return;
  }

  await ctx.reply(`🔊 ${echoText}`);
}
```

### Calculate Command

```typescript
// src/commands/calculate.ts
import { Context } from 'telegraf';

export async function calculateCommand(ctx: Context): Promise<void> {
  const text = ctx.message?.text?.replace('/calculate', '').trim();

  if (!text) {
    await ctx.reply('Usage: /calculate 2 + 2');
    return;
  }

  try {
    // Simple evaluation (be cautious with eval in production!)
    // For production, use a proper expression parser
    const parts = text.split(' ');
    const num1 = parseFloat(parts[0]);
    const operator = parts[1];
    const num2 = parseFloat(parts[2]);

    let result: number;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
      case 'x':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          await ctx.reply('❌ Cannot divide by zero!');
          return;
        }
        result = num1 / num2;
        break;
      default:
        await ctx.reply('❌ Unsupported operator. Use +, -, *, or /');
        return;
    }

    await ctx.reply(`🧮 Result: ${num1} ${operator} ${num2} = ${result}`);
  } catch (error) {
    await ctx.reply('❌ Invalid calculation. Format: /calculate 2 + 2');
  }
}
```

## Inline Keyboards

### Menu Command with Buttons

```typescript
// src/commands/menu.ts
import { Context } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

export async function menuCommand(ctx: Context): Promise<void> {
  const keyboard: InlineKeyboardMarkup = {
    inline_keyboard: [
      [
        { text: '📊 Stats', callback_data: 'stats' },
        { text: '⚙️ Settings', callback_data: 'settings' },
      ],
      [
        { text: '📖 Help', callback_data: 'help' },
      ],
      [
        { text: '🔗 Visit Website', url: 'https://example.com' },
      ],
    ],
  };

  await ctx.reply('📱 Main Menu - Choose an option:', {
    reply_markup: keyboard,
  });
}

/**
 * Handle callback queries from inline keyboards
 * Register in src/commands/index.ts with: bot.on('callback_query', handleCallbacks)
 */
export async function handleCallbacks(ctx: Context): Promise<void> {
  const callbackQuery = ctx.callbackQuery;
  
  if (!callbackQuery || !('data' in callbackQuery)) {
    return;
  }

  const data = callbackQuery.data;

  // Answer callback query to remove loading state
  await ctx.answerCbQuery();

  switch (data) {
    case 'stats':
      await ctx.editMessageText('📊 Your stats:\n\nCommands used: 42\nDays active: 7');
      break;
    case 'settings':
      await ctx.editMessageText('⚙️ Settings coming soon!');
      break;
    case 'help':
      await ctx.editMessageText('📖 Help:\n\nUse /menu to see options\nUse /hello to get started');
      break;
  }
}
```

## Conversation State

### Multi-step Form Example

```typescript
// src/utils/state.ts
const userStates = new Map<number, any>();

export function getUserState(userId: number) {
  return userStates.get(userId);
}

export function setUserState(userId: number, state: any) {
  userStates.set(userId, state);
}

export function clearUserState(userId: number) {
  userStates.delete(userId);
}

// src/commands/register.ts
import { Context } from 'telegraf';
import { getUserState, setUserState, clearUserState } from '../utils/state';

export async function registerCommand(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  
  if (!userId) return;

  setUserState(userId, { step: 'awaiting_name' });
  
  await ctx.reply('Welcome to registration! What\'s your name?');
}

export async function handleRegistrationFlow(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  const text = ctx.message?.text;

  if (!userId || !text) return;

  const state = getUserState(userId);

  if (!state) return; // Not in registration flow

  switch (state.step) {
    case 'awaiting_name':
      setUserState(userId, { ...state, name: text, step: 'awaiting_age' });
      await ctx.reply(`Nice to meet you, ${text}! How old are you?`);
      break;

    case 'awaiting_age':
      const age = parseInt(text);
      if (isNaN(age) || age < 1 || age > 120) {
        await ctx.reply('Please enter a valid age:');
        return;
      }
      
      setUserState(userId, { ...state, age, step: 'awaiting_email' });
      await ctx.reply('Great! What\'s your email address?');
      break;

    case 'awaiting_email':
      if (!text.includes('@')) {
        await ctx.reply('Please enter a valid email:');
        return;
      }

      await ctx.reply(
        `✅ Registration complete!\n\n` +
        `Name: ${state.name}\n` +
        `Age: ${state.age}\n` +
        `Email: ${text}`
      );

      clearUserState(userId);
      break;
  }
}
```

## Error Handling

### Graceful Error Handling

```typescript
// src/commands/weather.ts
import { Context } from 'telegraf';
import { logger } from '../utils/logger';

export async function weatherCommand(ctx: Context): Promise<void> {
  try {
    const city = ctx.message?.text?.replace('/weather', '').trim();

    if (!city) {
      await ctx.reply('Usage: /weather <city name>');
      return;
    }

    // Simulate API call
    const weather = await fetchWeatherData(city);

    await ctx.reply(
      `🌤 Weather in ${city}:\n` +
      `Temperature: ${weather.temp}°C\n` +
      `Conditions: ${weather.conditions}`
    );
  } catch (error) {
    logger.error('Weather command error:', error);

    if (error instanceof WeatherAPIError) {
      await ctx.reply(`❌ ${error.message}`);
    } else {
      await ctx.reply('❌ Sorry, something went wrong. Please try again later.');
    }
  }
}

class WeatherAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

async function fetchWeatherData(city: string) {
  // Simulate API call
  throw new WeatherAPIError('City not found');
}
```

## Middleware

### Logging Middleware

```typescript
// src/middleware/logging.ts
import { Context } from 'telegraf';
import { logger } from '../utils/logger';

export async function loggingMiddleware(ctx: Context, next: () => Promise<void>) {
  const start = Date.now();
  const user = ctx.from?.username || ctx.from?.id || 'unknown';
  
  logger.info(`[${user}] ${ctx.updateType}`);
  
  await next();
  
  const duration = Date.now() - start;
  logger.debug(`Request processed in ${duration}ms`);
}

// In src/index.ts:
// bot.use(loggingMiddleware);
```

### Rate Limiting

```typescript
// src/middleware/rateLimit.ts
import { Context } from 'telegraf';

const userLastRequest = new Map<number, number>();
const RATE_LIMIT_MS = 1000; // 1 second

export async function rateLimitMiddleware(ctx: Context, next: () => Promise<void>) {
  const userId = ctx.from?.id;

  if (!userId) {
    await next();
    return;
  }

  const now = Date.now();
  const lastRequest = userLastRequest.get(userId) || 0;

  if (now - lastRequest < RATE_LIMIT_MS) {
    await ctx.reply('⏱ Please slow down! Try again in a moment.');
    return;
  }

  userLastRequest.set(userId, now);
  await next();
}
```

## Database Integration

### PostgreSQL Example

```typescript
// src/db/index.ts
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// src/db/users.ts
import { pool } from './index';

export async function saveUser(userId: number, username: string) {
  await pool.query(
    'INSERT INTO users (user_id, username) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET username = $2',
    [userId, username]
  );
}

export async function getUserStats(userId: number) {
  const result = await pool.query(
    'SELECT * FROM users WHERE user_id = $1',
    [userId]
  );
  return result.rows[0];
}
```

## Register Everything

Don't forget to register new commands and handlers:

```typescript
// src/commands/index.ts
import { Telegraf } from 'telegraf';
import { helloCommand } from './hello';
import { pingCommand } from './ping';
import { menuCommand, handleCallbacks } from './menu';
import { loggingMiddleware } from '../middleware/logging';

export function setupCommands(bot: Telegraf): void {
  // Middleware
  bot.use(loggingMiddleware);

  // Commands
  bot.command('hello', helloCommand);
  bot.command('start', helloCommand);
  bot.command('ping', pingCommand);
  bot.command('menu', menuCommand);

  // Callbacks
  bot.on('callback_query', handleCallbacks);

  // Default handler
  bot.on('text', async (ctx): Promise<void> => {
    await ctx.reply('Unknown command. Try /menu');
  });
}
```

---

**More Resources:**
- [Telegraf Documentation](https://telegraf.js.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

