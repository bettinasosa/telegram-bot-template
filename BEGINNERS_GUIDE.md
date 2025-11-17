# 🎓 Complete Beginner's Guide

Never coded before? No problem! This guide will walk you through everything step by step.

## 📱 What You'll Build

A Telegram bot that responds to messages. Like talking to Siri or Alexa, but on Telegram!

## 🛠️ What You Need

1. **A Computer** - Mac, Windows, or Linux
2. **Telegram App** - On your phone or computer (download from telegram.org)
3. **Cursor** - A code editor (download from cursor.sh)
4. **Node.js** - The software that runs the bot (download from nodejs.org)

## 📥 Step-by-Step Setup

### Step 1: Install Node.js (5 minutes)

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the version marked "Recommended"
3. Run the installer
4. Keep clicking "Next" until it's done
5. To verify it worked:
   - **Mac**: Open "Terminal" (search in Spotlight)
   - **Windows**: Open "Command Prompt" (search in Start menu)
   - Type: `node --version`
   - You should see something like `v18.0.0`

### Step 2: Install Cursor (2 minutes)

1. Go to [cursor.sh](https://cursor.sh/)
2. Download Cursor for your operating system
3. Install it like any other app
4. Open Cursor

### Step 3: Get This Project (1 minute)

**Option 1: Clone in Cursor (Easiest)** ⭐

In Cursor:

1. Press these keys together:
   - **Mac**: `Cmd` + `Shift` + `P`
   - **Windows/Linux**: `Ctrl` + `Shift` + `P`
2. A search box appears at the top
3. Type: `Git: Clone`
4. Click on "Git: Clone"
5. Paste this: `https://github.com/<your-username>/telegram-bot-template`
6. Choose a folder (like "Documents" or "Desktop")
7. Click "Open" when it asks

**Option 2: Download as ZIP**

1. Go to the GitHub page for this project
2. Click the green "Code" button
3. Click "Download ZIP"
4. Unzip the file (double-click it)
5. In Cursor: File → Open Folder → Choose the unzipped folder

### Step 4: Install Project Dependencies (2 minutes)

Dependencies are like ingredients for a recipe - the bot needs them to work.

1. In Cursor, look at the bottom of the window
2. You'll see a panel (if not, go to View → Terminal)
3. Type this and press Enter:
   ```bash
   npm install
   ```
4. Wait for it to finish (you'll see lots of text scrolling)
5. When done, you'll see the cursor blinking again

### Step 5: Create Your Bot on Telegram (3 minutes)

1. **Open Telegram** (on phone or computer)

2. **Find BotFather**:
   - In the search bar, type: `@BotFather`
   - Click on the verified "BotFather" account

3. **Start the conversation**:
   - Click "START" button
   - BotFather will send you a welcome message

4. **Create your bot**:
   - Send this message: `/newbot`
   - BotFather asks for a name (like "My Test Bot")
   - Type a name and send it

5. **Choose a username**:
   - BotFather asks for a username
   - Must end with "bot" (like "my_test_bot" or "myawesomebot")
   - Type it and send

6. **Get your token**:
   - BotFather sends you a long text that looks like:
     ```
     123456789:ABCdefGHIjklMNOpqrsTUVwxyz
     ```
   - This is your bot token - **keep it secret!**
   - Copy it (long-press on phone, or click "Copy" on computer)

### Step 6: Configure Your Bot (2 minutes)

1. In Cursor, in the terminal at the bottom, type:

   ```bash
   npm run setup
   ```

   This creates a special file called `.env`

2. **Add your token**:
   - In Cursor's left sidebar, find the file `.env`
   - Click on it to open
   - You'll see: `TELEGRAM_BOT_TOKEN=your_bot_token_here`
   - Delete `your_bot_token_here`
   - Paste your token from BotFather
   - Save the file (Cmd+S on Mac, Ctrl+S on Windows)

### Step 7: Start Your Bot! (1 minute)

1. In the terminal at the bottom of Cursor, type:

   ```bash
   npm run dev
   ```

2. You'll see messages appear, ending with:

   ```
   [INFO] Bot is running!
   [INFO] Press Ctrl+C to stop
   ```

3. **Your bot is now alive!** 🎉

### Step 8: Test Your Bot

1. Open Telegram
2. Search for your bot's username (the one you created)
3. Click on it
4. Click "START" button
5. Send: `/hello`
6. Your bot should reply with a welcome message!

## 🎉 You Did It!

Congratulations! You just created your first Telegram bot!

## 🔧 What Just Happened?

- **Node.js**: Runs your bot's code
- **npm install**: Downloaded all the code libraries your bot needs
- **BotFather**: Registered your bot with Telegram
- **Token**: Your bot's secret password to connect to Telegram
- **.env file**: Where you keep secret information
- **npm run dev**: Started your bot

## 📝 Stopping and Starting Your Bot

**To Stop:**

- In the terminal, press `Ctrl` + `C`
- The bot stops running

**To Start Again:**

- Type: `npm run dev`
- Press Enter

## 🚨 Common Problems

### "npm: command not found"

- You need to install Node.js (Step 1)
- After installing, restart Cursor

### "TELEGRAM_BOT_TOKEN is not defined"

- Check the `.env` file
- Make sure you pasted your token correctly
- No extra spaces before or after the token

### Bot doesn't respond in Telegram

- Make sure you see "Bot is running!" in the terminal
- Try clicking "START" in Telegram first
- Check that you're messaging the correct bot

### Can't find .env file

- It might be hidden
- In Cursor, make sure you can see all files
- Or just run `npm run setup` again

## 🎓 Next Steps

### Learn by Doing

1. **Change the welcome message**:
   - Open `src/commands/hello.ts`
   - Find the text in quotes
   - Change it to something else
   - Save the file
   - The bot updates automatically!
   - Test it in Telegram

2. **Add a new command**:
   - See the [EXAMPLES.md](./EXAMPLES.md) file
   - Try copying the "ping" command example
   - Make your bot respond to `/ping` with "Pong!"

### Learning Resources

- **What is TypeScript?** - A programming language (like English, but for computers)
- **What is a command?** - A message starting with `/` that tells the bot what to do
- **Want to learn more?** Check out [EXAMPLES.md](./EXAMPLES.md) for more ideas

## 💭 Understanding the Code

Don't worry about understanding everything right away! Here's what the main files do:

- `src/index.ts` - Starts the bot
- `src/commands/hello.ts` - What happens when someone sends `/hello`
- `src/commands/index.ts` - Lists all available commands
- `.env` - Your secret bot token
- `package.json` - Lists all the dependencies (ingredients)

## 🆘 Need Help?

- **Read the docs**: Check [README.md](./README.md) for more details
- **See examples**: Look at [EXAMPLES.md](./EXAMPLES.md)
- **Ask for help**: Open an issue on GitHub
- **Learn more**: Visit [telegraf.js.org](https://telegraf.js.org/)

## 🎮 Fun Ideas for Your Bot

Once you're comfortable, try making your bot:

- Tell jokes
- Give random facts
- Play simple games
- Send reminders
- Answer questions
- Show weather information
- Translate languages

The possibilities are endless! 🚀

---

**Remember**: Everyone starts somewhere. Don't be afraid to experiment and break things - that's how you learn!

**Pro tip**: Save your work often (Cmd+S or Ctrl+S) and commit to Git regularly.

---

**Happy coding! You're now a bot developer! 🤖✨**
