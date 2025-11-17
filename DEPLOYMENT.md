# Deployment Guide

This guide covers deploying your Telegram bot to various platforms.

## 🚀 Deployment Options

### Option 1: Railway.app (Recommended for Beginners)

[Railway](https://railway.app/) offers a simple deployment with generous free tier.

1. **Prepare Your Project**
   ```bash
   npm run build
   ```

2. **Create Railway Account**
   - Visit [railway.app](https://railway.app/)
   - Sign up with GitHub

3. **Deploy**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect Node.js

4. **Set Environment Variables**
   - Go to project settings
   - Add `TELEGRAM_BOT_TOKEN`
   - Set `NODE_ENV` to `production`

5. **Verify**
   - Check logs for "Bot is running!"
   - Test your bot on Telegram

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku login
   heroku create your-bot-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set TELEGRAM_BOT_TOKEN=your_token_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Scale Worker**
   ```bash
   heroku ps:scale worker=1
   ```

6. **Create Procfile**
   ```
   worker: npm start
   ```

### Option 3: DigitalOcean App Platform

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Create App on DigitalOcean**
   - Go to App Platform
   - Connect your GitHub repo
   - Choose "Node.js" as the environment

3. **Configure**
   - Build Command: `npm install && npm run build`
   - Run Command: `npm start`
   - Add environment variables

4. **Deploy**
   - Click "Deploy"

### Option 4: VPS (Ubuntu Server)

For more control, deploy to a VPS like DigitalOcean, AWS EC2, or Linode.

1. **Connect to Your Server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd telegram-bot-template
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Create .env File**
   ```bash
   nano .env
   # Add your bot token
   ```

6. **Build**
   ```bash
   npm run build
   ```

7. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

8. **Start Bot**
   ```bash
   pm2 start dist/index.js --name telegram-bot
   pm2 save
   pm2 startup
   ```

9. **View Logs**
   ```bash
   pm2 logs telegram-bot
   ```

### Option 5: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   CMD ["npm", "start"]
   ```

2. **Create .dockerignore**
   ```
   node_modules
   npm-debug.log
   .env
   dist
   .git
   ```

3. **Build Image**
   ```bash
   docker build -t telegram-bot .
   ```

4. **Run Container**
   ```bash
   docker run -d \
     --name telegram-bot \
     -e TELEGRAM_BOT_TOKEN=your_token \
     -e NODE_ENV=production \
     telegram-bot
   ```

### Option 6: Vercel / Netlify

⚠️ **Not Recommended**: These platforms are designed for serverless functions and HTTP requests. Telegram bots use long-polling which requires a constantly running process. Use Railway, Heroku, or a VPS instead.

## 📊 Monitoring

### PM2 Monitoring (VPS)

```bash
# Check status
pm2 status

# View logs
pm2 logs telegram-bot

# Monitor resources
pm2 monit

# Restart
pm2 restart telegram-bot
```

### Logging Best Practices

1. **Structured Logging**
   - Use the built-in logger utility
   - Log important events (commands, errors)
   - Include timestamps

2. **Error Tracking**
   - Consider services like Sentry
   - Log stack traces
   - Monitor error rates

3. **Log Levels**
   ```typescript
   logger.info('Normal operation');
   logger.warn('Something unexpected');
   logger.error('Critical error');
   logger.debug('Detailed debug info');
   ```

## 🔒 Security Checklist

- [ ] Never commit `.env` file
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS if using webhooks
- [ ] Rotate bot token if compromised
- [ ] Set up firewall rules on VPS
- [ ] Keep dependencies updated
- [ ] Use least privilege for server access
- [ ] Enable automatic security updates

## 🔄 CI/CD Setup

### GitHub Actions (Automatic Deployment)

See `.github/workflows/ci.yml` for the CI pipeline. To add CD:

```yaml
# Add to ci.yml after build job
deploy:
  needs: test
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  
  steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to Railway
      uses: bervProject/railway-deploy@main
      with:
        railway_token: ${{ secrets.RAILWAY_TOKEN }}
        service: telegram-bot
```

## 📈 Scaling Considerations

- **Single Instance**: Sufficient for most bots (<100k users)
- **Multiple Instances**: Not recommended (Telegram allows only one bot instance)
- **Optimize**: Focus on efficient code and caching
- **Database**: Add PostgreSQL/MongoDB for data persistence
- **Queue**: Use Redis/Bull for heavy background tasks

## 🆘 Troubleshooting

### Bot Doesn't Start

```bash
# Check logs
pm2 logs
# or
heroku logs --tail
```

### Common Issues

1. **Port Already in Use**: Bots don't need ports with long-polling
2. **Token Invalid**: Check `.env` configuration
3. **Out of Memory**: Increase memory limits or optimize code
4. **Connection Timeout**: Check firewall/network settings

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Docker Documentation](https://docs.docker.com/)

---

Need help? Open an issue on GitHub!

