# Environment Setup Guide

This guide will help you create your `.env` file with the necessary credentials.

## Step-by-Step Instructions

### 1. Create a Telegram Bot

1. Open Telegram and find [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the prompts to name your bot
4. Copy the token you receive (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Create Your .env File

Create a file named `.env` in the project root with the following content:

```env
# Telegram Bot Token
# Get this from @BotFather on Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Environment (development, production)
NODE_ENV=development
```

### 3. Replace the Values

- Replace `your_bot_token_here` with your actual bot token from BotFather
- Keep `NODE_ENV=development` for local development
- Change to `NODE_ENV=production` when deploying

### 4. Verify Setup

Run the bot to verify everything works:

```bash
npm run dev
```

## Example .env File

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
NODE_ENV=development
```

## Security Notes

⚠️ **IMPORTANT**:
- Never commit your `.env` file to version control
- Never share your bot token publicly
- If your token is compromised, use `/revoke` with BotFather to get a new one
- Add `.env` to your `.gitignore` (already done in this template)

## Need Help?

If you encounter issues:
1. Check that the token is copied correctly (no extra spaces)
2. Verify the file is named exactly `.env` (not `.env.txt`)
3. Ensure the file is in the project root directory
4. Check the console output for specific error messages

