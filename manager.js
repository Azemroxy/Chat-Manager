const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const token = '6676236322:AAG1t77ijj_4qiEyUsYa49e7l7XB7WJCBng';
const bot = new TelegramBot(token, { polling: true });

// List of API keys
const apiKeys = ['dfaba6f6495cebf74b36b1b2f372883c61af2887 ', 'dfaba6f6495cebf74b36b1b2f372883c61af2887 ', 'API_KEY_3']; // Add your keys here
let currentKeyIndex = 0;

function getApiKey() {
  return apiKeys[currentKeyIndex % apiKeys.length];
}

function incrementApiKey() {
  currentKeyIndex++;
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id; // Added to use in reply_to_message_id
  const text = msg.text.toLowerCase();

  // Respond to 'shop' keyword
  if (text.includes("shop")) {
    const shopResponse = "Shop: https://violence-shop.com";
    bot.sendMessage(chatId, shopResponse);
  }

  // Respond to 'spoof' or 'spoofing' keywords
  if (text.includes("spoof") || text.includes("spoofing")) {
    bot.sendMessage(chatId, "Need a Spoof/OTP? Take a look at our Spoofing/OTP Section at our Shop");
  }

  // Respond to 'support' or 'staff' keywords
  if (text.includes("support") || text.includes("staff")) {
    bot.sendMessage(chatId, "Support: @violence_supp, @HARDCORE369, @trustedlizard");
  }

  // Respond to 'refund' keyword
  if (text.includes("refund")) {
    bot.sendMessage(chatId, "Please dm only one Staff Member at a time with your OrderID within 5 Minutes to get it checked. If your card is live, 1$ will be deducted from your Balance. If found dead, your balance will be refunded.");
  }

  // Respond to 'help' or 'faq' keywords
  if (text.includes("help") || text.includes("faq")) {
    bot.sendMessage(chatId, "Check out our FAQ Section on our Shop!");
  }

  // BIN check command - expecting messages like "/bin 414720"
  if (text.startsWith("/bin ")) {
  const bin = text.split(" ")[1];
  if (bin.length === 6 && /^\d+$/.test(bin)) {
    const apiKey = getApiKey();
    const url = `https://api.bintable.com/v1/${bin}?api_key=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            incrementApiKey();
            throw new Error('API key limit reached, switching to next key');
          }
          throw new Error(`Network response was not OK: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.result === 200 && data.message === "SUCCESS") {
          const card = data.data.card;
          const country = data.data.country;
          const bank = data.data.bank;

          const reply = `Card Scheme: ${card.scheme}\nType: ${card.type}\nCategory: ${card.category}\nBank: ${bank.name}\nCountry: ${country.name} ${country.flag}\nCurrency: ${country.currency} (${country.currency_code})\nWebsite: ${bank.website}\nPhone: ${bank.phone}`;
          bot.sendMessage(chatId, reply, { reply_to_message_id: messageId });
        } else {
          bot.sendMessage(chatId, "No valid data available for the provided BIN.", { reply_to_message_id: messageId });
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        bot.sendMessage(chatId, error.message, { reply_to_message_id: messageId });
      });
  } else {
    bot.sendMessage(chatId, "Please enter a valid 6-digit BIN number.", { reply_to_message_id: messageId });
  }
}
});


console.log('Bot has started.');
