const TelegramBot = require('node-telegram-bot-api');
const token = '6676236322:AAG1t77ijj_4qiEyUsYa49e7l7XB7WJCBng';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  // Convert message text to lowercase to handle case insensitivity
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  // Respond to 'shop' keyword
  if (text.includes("shop")) {
    const shopResponse = "Shop: https://violence-shop.com";
    bot.sendMessage(chatId, shopResponse);
  }

  // Respond to 'spoof' or 'spoofing' keywords
  if (text.includes("spoof") || text.includes("spoofing")) {
    bot.sendMessage(chatId, "Take a look at our Spoofing/OTP Section at our Shop");
  }

  // Respond to 'support' or 'staff' keywords
  if (text.includes("support") || text.includes("staff")) {
    bot.sendMessage(chatId, "Here are the support tags: @oppresses, @HARDCORE369");
  }

  // Respond to 'refund' keyword
  if (text.includes("refund")) {  // Added the missing parenthesis here
    bot.sendMessage(chatId, "Please dm only one Staff Member at a time with your OrderID within 5 Minutes to get it checked. If your card is live, 1$ will be deducted from your Balance. If found dead, your balance will be refunded.");
  }

  // Respond to 'help' or 'faq' keywords
  if (text.includes("help") || text.includes("faq")) {
    bot.sendMessage(chatId, "Check out our FAQ Section on our Shop!");
  }
});

console.log('Bot has started.');
