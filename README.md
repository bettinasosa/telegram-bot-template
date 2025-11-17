# 🤖 Telegram Bot Template

A production-ready TypeScript template for building Telegram bots using [Telegraf](https://telegraf.js.org/).

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

> **👶 New to coding?** See the [Beginner's Guide](./BEGINNERS_GUIDE.md) for a complete walkthrough!

## ✨ Features

- 🔷 **TypeScript** - Full type safety and modern JavaScript features
- 🚀 **Hot Reload** - Instant development feedback with `tsx watch`
- 📦 **Modular Architecture** - Organized command structure
- 🔧 **Environment Variables** - Secure configuration management
- ✅ **Linting & Formatting** - ESLint + Prettier configured
- 📝 **Well Documented** - Clear code comments and documentation

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm
- A Telegram account

> **👶 Complete Beginner?** See the [Beginner's Guide](./BEGINNERS_GUIDE.md) for a step-by-step walkthrough with zero experience required!

## 🚀 Quick Start

### 1. Create Your Bot on Telegram

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Start a conversation with BotFather by clicking **Start**
3. Send the command `/newbot`
4. Follow the prompts:
   - **Bot Name**: Choose a display name (e.g., "My Awesome Bot")
   - **Username**: Choose a unique username ending in "bot" (e.g., "my_awesome_bot")
5. BotFather will respond with your bot token. It looks like this:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```
6. **⚠️ Keep this token secret!** Anyone with this token can control your bot.

### 2. Clone and Setup

#### Option A: Clone in Cursor (Easiest for Beginners) ⭐

1. Open Cursor
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Git: Clone" and press Enter
4. Paste: `https://github.com/<your-username>/telegram-bot-template`
5. Choose where to save the project
6. Click "Open" when prompted

Then run the setup:

```bash
npm run setup
```

#### Option B: Download as ZIP

1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file
4. Open the folder in Cursor (File → Open Folder)
5. Run setup:

```bash
npm run setup
```

#### Option C: Command Line

```bash
# Clone the repository
git clone https://github.com/<your-username>/telegram-bot-template.git
cd telegram-bot-template

# Run automated setup
npm run setup
```

### 3. Configure Environment Variables

Open `.env` and add your bot token:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
NODE_ENV=development
```

Replace `your_bot_token_here` with the token you received from BotFather.

### 4. Run the Bot

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

### 5. Test Your Bot

1. Open Telegram and search for your bot username
2. Click **Start** or send `/hello`
3. Your bot should respond with a welcome message! 🎉

## 📁 Project Structure

```
telegram-bot-template/
├── src/
│   ├── commands/          # Bot command handlers
│   │   ├── index.ts       # Command registration
│   │   └── hello.ts       # /hello command
│   ├── utils/             # Utility functions
│   │   └── logger.ts      # Logging utility
│   └── index.ts           # Main bot entry point
├── dist/                  # Compiled JavaScript (generated)
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start bot with hot reload
npm run type-check   # Type check without building

# Production
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled bot

# Code Quality
npm run lint         # Check code with ESLint
npm run format       # Format code with Prettier
```

## 🎯 Adding New Commands

1. Create a new file in `src/commands/`:

```typescript
// src/commands/ping.ts
import { Context } from 'telegraf';

export async function pingCommand(ctx: Context): Promise<void> {
  await ctx.reply('Pong! 🏓');
}
```

2. Register it in `src/commands/index.ts`:

```typescript
import { pingCommand } from './ping';

export function setupCommands(bot: Telegraf): void {
  bot.command('hello', helloCommand);
  bot.command('ping', pingCommand); // Add this line
  // ...
}
```

3. The bot will auto-reload in development mode!

## 🔒 Security Best Practices

- ✅ Never commit your `.env` file
- ✅ Never share your bot token publicly
- ✅ Use environment variables for all sensitive data
- ✅ Regenerate your token if it's exposed (use `/revoke` with BotFather)
- ✅ Set up proper error handling to avoid leaking sensitive information

## 🐛 Troubleshooting

### Bot doesn't respond

- Check that your bot token is correct in `.env`
- Ensure the bot is running (`npm run dev`)
- Verify you've started the bot in Telegram (click "Start")
- Check the console for error messages

### "TELEGRAM_BOT_TOKEN is not defined" error

- Make sure you created the `.env` file
- Verify the variable name is exactly `TELEGRAM_BOT_TOKEN`
- Restart the bot after changing `.env`

### Hot reload not working

- Make sure you're using `npm run dev` (not `npm start`)
- Check that `tsx` is installed in `devDependencies`

## 📚 Learn More

### Documentation

- [Beginner's Guide](./BEGINNERS_GUIDE.md) - Never coded? Start here!
- [Quick Start](./QUICK_START.md) - Get running in 5 minutes
- [Examples](./EXAMPLES.md) - Code examples and patterns
- [Deployment](./DEPLOYMENT.md) - Deploy to production

### External Resources

- [Telegraf Documentation](https://telegraf.js.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 💡 Tips

- Use `/setcommands` in BotFather to set up command autocomplete in Telegram
- Test your bot in a private chat before deploying
- Monitor your bot's logs in production
- Consider using a process manager like PM2 for production deployments

---

**Happy coding! 🚀**

If you found this template helpful, please give it a star ⭐
