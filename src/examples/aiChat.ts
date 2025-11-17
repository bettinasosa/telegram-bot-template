import { Context } from 'telegraf';
import { logger } from '../utils/logger';

/**
 * AI Chat Bot Example - OpenAI Integration
 *
 * A simple, production-ready example of integrating GPT into your Telegram bot.
 *
 * Commands:
 * - /ai <question> - Ask the AI anything
 * - /clear - Clear conversation history
 */

// Conversation history storage
// In production, use a database like PostgreSQL or Redis
interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const conversations = new Map<number, Message[]>();

// Rate limiting to prevent abuse
const lastMessageTime = new Map<number, number>();
const RATE_LIMIT_MS = 2000; // 2 seconds between messages

/**
 * Main AI chat command
 * Usage: /ai <your question>
 */
export async function aiCommand(ctx: Context): Promise<void> {
  logger.info('AI command handler triggered!');
  const userId = ctx.from?.id;
  const message = ctx.message;

  if (!userId) {
    await ctx.reply('❌ Unable to identify user.');
    return;
  }

  if (!message || !('text' in message)) {
    await ctx.reply('❌ No message text found.');
    return;
  }

  const text = message.text;
  // Extract question from command - handle both "/ai question" and "/ai@botname question"
  const question = text.replace(/^\/ai(@\w+)?\s*/, '').trim();

  // Show usage if no question provided
  if (!question) {
    await ctx.reply(
      '🤖 **AI Chat Bot**\n\n' +
        'Ask me anything!\n\n' +
        '**Usage:**\n' +
        '`/ai your question here`\n\n' +
        '**Examples:**\n' +
        '• `/ai Explain quantum computing simply`\n' +
        '• `/ai Write a haiku about coding`\n' +
        '• `/ai What is the meaning of life?`\n\n' +
        '**Other commands:**\n' +
        '• `/clear` - Clear chat history',
      { parse_mode: 'Markdown' }
    );
    return;
  }

  // Rate limiting
  const lastTime = lastMessageTime.get(userId) || 0;
  const timeSinceLastMessage = Date.now() - lastTime;

  if (timeSinceLastMessage < RATE_LIMIT_MS) {
    const waitTime = Math.ceil((RATE_LIMIT_MS - timeSinceLastMessage) / 1000);
    await ctx.reply(`⏱ Please wait ${waitTime} more second(s) before asking again.`);
    return;
  }

  // Show typing indicator
  await ctx.sendChatAction('typing');

  try {
    logger.info(`AI request from user ${userId}: "${question.substring(0, 50)}..."`);

    // Get conversation history
    const history = conversations.get(userId) || [];

    // Get AI response
    const response = await getAIResponse(question, history);

    // Update conversation history
    history.push({ role: 'user', content: question }, { role: 'assistant', content: response });

    // Keep only last 20 messages (10 exchanges) to manage token usage
    if (history.length > 20) {
      conversations.set(userId, history.slice(-20));
    } else {
      conversations.set(userId, history);
    }

    // Update rate limit
    lastMessageTime.set(userId, Date.now());

    // Send response
    await ctx.reply(response);

    logger.info(`AI response sent to user ${userId}`);
  } catch (error) {
    logger.error('AI chat error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        await ctx.reply(
          '❌ **Configuration Error**\n\n' +
            'OpenAI API key is not configured.\n\n' +
            'Please add `OPENAI_API_KEY` to your `.env` file.\n\n' +
            'Get a key at: https://platform.openai.com/'
        );
      } else if (error.message.includes('quota')) {
        await ctx.reply(
          '❌ **API Quota Exceeded**\n\n' +
            'The OpenAI API quota has been exceeded.\n\n' +
            'Please check your account at: https://platform.openai.com/'
        );
      } else {
        await ctx.reply(
          '❌ **Error**\n\n' +
            'Sorry, I encountered an error processing your request.\n\n' +
            'Please try again in a moment.'
        );
      }
    }
  }
}

/**
 * Clear conversation history
 */
export async function clearCommand(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    await ctx.reply('❌ Unable to identify user.');
    return;
  }

  conversations.delete(userId);
  lastMessageTime.delete(userId);

  await ctx.reply(
    '🗑️ **Conversation Cleared**\n\n' +
      'Your chat history has been reset.\n\n' +
      'Start fresh with `/ai your question`'
  );

  logger.info(`Conversation cleared for user ${userId}`);
}

/**
 * Get AI response
 *
 * MOCK IMPLEMENTATION (for demo/testing)
 * See below for production OpenAI implementation
 */
async function getAIResponse(question: string, _history: Message[]): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  logger.info('Using mock AI response');

  // Simple keyword-based responses for demo
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
    return '👋 Hello! How can I help you today?';
  }

  if (lowerQuestion.includes('blockchain')) {
    return (
      '🔗 **Blockchain** is a distributed ledger technology that records transactions across multiple computers in a secure, transparent, and tamper-resistant way.\n\n' +
      'Key features:\n' +
      '• Decentralized - No single authority\n' +
      "• Immutable - Records can't be changed\n" +
      '• Transparent - All transactions are visible\n' +
      '• Secure - Cryptographically protected'
    );
  }

  if (lowerQuestion.includes('quantum')) {
    return (
      '⚛️ **Quantum computing** uses quantum mechanical phenomena like superposition and entanglement to perform calculations.\n\n' +
      'Unlike classical computers that use bits (0 or 1), quantum computers use qubits that can be in multiple states simultaneously.'
    );
  }

  if (lowerQuestion.includes('haiku')) {
    return (
      "📝 Here's a coding haiku:\n\n" +
      '*Code compiles at last\n' +
      'No errors, warnings, nothing\n' +
      'Time for deploy... wait*'
    );
  }

  // Default response
  return (
    `🤖 I understand you're asking about: "${question}"\n\n` +
    `**This is a mock response** for demo purposes.\n\n` +
    `To get real AI responses:\n` +
    `1. Get an OpenAI API key at https://platform.openai.com/\n` +
    `2. Add it to your \`.env\` file: \`OPENAI_API_KEY=sk-...\`\n` +
    `3. Install OpenAI SDK: \`pnpm add openai\`\n` +
    `4. Uncomment the production code in \`aiChat.ts\`\n\n` +
    `See the code comments for details!`
  );
}

/**
 * ============================================
 * PRODUCTION IMPLEMENTATION - OpenAI
 * ============================================
 *
 * To enable real OpenAI responses:
 *
 * 1. Install the OpenAI SDK:
 *    pnpm add openai
 *
 * 2. Get an API key from https://platform.openai.com/
 *    (Requires credit card, costs ~$0.001 per message)
 *
 * 3. Add to your .env file:
 *    OPENAI_API_KEY=sk-...
 *
 * 4. Uncomment the code below and comment out the mock function above
 */

/*
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt - defines the AI's personality
const SYSTEM_PROMPT = 'You are a helpful, friendly, and knowledgeable assistant. ' +
  'Provide clear, accurate answers. Use emojis occasionally to be engaging. ' +
  'Keep responses concise but informative.';

async function getAIResponse(question: string, history: Message[]): Promise<string> {
  try {
    // Build messages array with history
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })) as OpenAI.Chat.ChatCompletionMessageParam[],
      { role: 'user', content: question },
    ];

    logger.info(`Calling OpenAI API with ${messages.length} messages`);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Fast and cheap ($0.0015 per 1K tokens)
      // model: 'gpt-4',       // Smarter but more expensive ($0.03 per 1K tokens)
      messages: messages,
      max_tokens: 500,        // Limit response length
      temperature: 0.7,       // 0 = focused, 1 = creative
    });

    const response = completion.choices[0].message.content || 
      'Sorry, I couldn\'t generate a response.';

    // Log token usage for cost tracking
    const tokens = completion.usage;
    logger.info(`OpenAI tokens used: ${tokens?.total_tokens} (prompt: ${tokens?.prompt_tokens}, completion: ${tokens?.completion_tokens})`);

    return response;
  } catch (error) {
    logger.error('OpenAI API error:', error);
    throw error;
  }
}
*/

/**
 * ============================================
 * ALTERNATIVE: Anthropic Claude
 * ============================================
 *
 * If you prefer Claude over GPT:
 *
 * 1. Install: pnpm add @anthropic-ai/sdk
 * 2. Get key from: https://console.anthropic.com/
 * 3. Add to .env: ANTHROPIC_API_KEY=sk-ant-...
 * 4. Use this code:
 */

/*
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = 'You are a helpful, friendly, and knowledgeable assistant. ' +
  'Provide clear, accurate answers. Keep responses concise but informative.';

async function getAIResponse(question: string, history: Message[]): Promise<string> {
  try {
    // Convert history to Claude format
    const claudeMessages = history.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    claudeMessages.push({
      role: 'user',
      content: question,
    });

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // Latest model
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: claudeMessages,
    });

    const response = message.content[0].type === 'text' 
      ? message.content[0].text 
      : 'Error generating response';

    logger.info(`Claude tokens used: input ${message.usage.input_tokens}, output ${message.usage.output_tokens}`);

    return response;
  } catch (error) {
    logger.error('Anthropic API error:', error);
    throw error;
  }
}
*/

/**
 * ============================================
 * WORKSHOP NOTES
 * ============================================
 *
 * Key Concepts to Teach:
 *
 * 1. API Integration
 *    - Environment variables for API keys
 *    - Error handling for external APIs
 *    - Rate limiting to prevent abuse
 *
 * 2. Conversation Context
 *    - Storing message history
 *    - Managing token limits
 *    - When to truncate history
 *
 * 3. User Experience
 *    - Typing indicators (sendChatAction)
 *    - Clear error messages
 *    - Usage instructions
 *
 * 4. Cost Management
 *    - Token counting
 *    - Model selection (gpt-3.5 vs gpt-4)
 *    - Max tokens limits
 *
 * 5. Production Considerations
 *    - Database for conversation storage
 *    - User-specific rate limits
 *    - Monitoring and logging
 *    - API quota management
 *
 * Extensions to Show:
 * - Different AI personalities
 * - Image generation with DALL-E
 * - Voice transcription with Whisper
 * - Function calling for actions
 */
