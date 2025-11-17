# ⚡ Quick Start Guide

Get your Telegram bot running in 5 minutes!

## 📦 Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- A Telegram account
- Cursor IDE (or any code editor)

> **👶 Never coded before?** Check out the [Complete Beginner's Guide](./BEGINNERS_GUIDE.md) first!

## 🚀 Setup (4 steps)

### 0️⃣ Get the Project

**Option 1: Clone in Cursor (Easiest)** ⭐

1. Open Cursor
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Git: Clone" and press Enter
4. Paste: `https://github.com/<your-username>/telegram-bot-template`
5. Choose where to save it
6. Click "Open"

**Option 2: Download ZIP**

1. Go to the GitHub repository page
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file
5. Open the folder in Cursor (File → Open Folder)

**Option 3: Command Line**

```bash
git clone https://github.com/<your-username>/telegram-bot-template.git
cd telegram-bot-template
```

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Get Your Bot Token

1. Open Telegram
2. Search for `@BotFather`
3. Send `/newbot`
4. Follow instructions to create your bot
5. Copy the token (looks like: `123456789:ABCdefGHI...`)

### 3️⃣ Configure & Run

```bash
# Quick setup (creates .env and installs everything)
npm run setup

# OR manually copy environment template
cp env.template .env

# Edit .env and paste your token
# Replace 'your_bot_token_here' with your actual token

# Start the bot
npm run dev
```

## ✅ Test Your Bot

1. Open Telegram
2. Find your bot (search for the username you created)
3. Click **Start** or send `/hello`
4. Bot should respond! 🎉

## 📝 What's Next?

### Add a New Command

1. Create file `src/commands/mycommand.ts`:

```typescript
import { Context } from 'telegraf';

export async function myCommand(ctx: Context): Promise<void> {
  await ctx.reply('Hello from my new command!');
}
```

2. Register in `src/commands/index.ts`:

```typescript
import { myCommand } from './mycommand';

export function setupCommands(bot: Telegraf): void {
  bot.command('hello', helloCommand);
  bot.command('mycommand', myCommand); // Add this
  // ...
}
```

3. Save and the bot auto-reloads! Test with `/mycommand`

## 🐳 Using Docker

```bash
# Build
docker build -t telegram-bot .

# Run
docker run -e TELEGRAM_BOT_TOKEN=your_token telegram-bot

# Or use docker-compose
docker-compose up -d
```

## 🛠️ Useful Commands

```bash
npm run dev        # Development with hot reload
npm run build      # Build for production
npm start          # Run production build
npm run lint       # Check code style
npm run format     # Auto-format code
```

## 🆘 Troubleshooting

### "TELEGRAM_BOT_TOKEN is not defined"

- Check that `.env` file exists
- Verify token is set correctly (no extra spaces)

### Bot doesn't respond

- Make sure bot is running (`npm run dev`)
- Click "Start" button in Telegram first
- Check console for errors

### "Cannot find module 'telegraf'"

- Run `npm install`

## 📖 More Documentation

- [Full README](./README.md) - Complete documentation
- [Environment Setup](./ENV_SETUP.md) - Detailed env configuration
- [Code Examples](./EXAMPLES.md) - Learn by example
- [Deployment Guide](./DEPLOYMENT.md) - How to deploy

## 💬 Need Help?

- Check the [documentation](./README.md)
- Open an [issue](https://github.com/yourusername/telegram-bot-template/issues)
- Review [Telegraf docs](https://telegraf.js.org/)

---

**Happy botting! 🤖**
