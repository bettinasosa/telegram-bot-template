#!/bin/bash

# Telegram Bot Template Setup Script
# This script helps you set up your development environment

set -e

echo "🤖 Telegram Bot Template Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18.0.0"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo "✅ .env file already exists"
else
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Telegram Bot Token
# Get this from @BotFather on Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Environment (development, production)
NODE_ENV=development
EOL
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your bot token from @BotFather"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Get your bot token from @BotFather on Telegram"
echo "   - Open Telegram and search for @BotFather"
echo "   - Send /newbot and follow the instructions"
echo "   - Copy the token you receive"
echo ""
echo "2. Edit the .env file and replace 'your_bot_token_here' with your token"
echo ""
echo "3. Start the bot:"
echo "   npm run dev"
echo ""
echo "For detailed instructions, see ENV_SETUP.md"
echo ""

