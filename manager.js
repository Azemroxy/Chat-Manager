const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new TelegramBot(token, { polling: true });

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
    const bin = text.split(" ")[1]; // get the BIN number from the command
    if (bin.length === 6 && /^\d+$/.test(bin)) { // Check if BIN is a 6-digit number
      const url = `https://api.freebinchecker.com/bin/${bin}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            // Extracting the necessary data from the response
            const scheme = data.card.scheme;
            const type = data.card.type;
            const category = data.card.category;
            const issuerName = data.issuer.name;
            const countryName = data.country.name;

            // Format the reply message with the extracted data
            const reply = `Scheme: ${scheme}\nType: ${type}\nCategory: ${category}\nIssuer: ${issuerName}\nCountry: ${countryName}`;
            bot.sendMessage(chatId, reply, { reply_to_message_id: messageId });
          } else {
            bot.sendMessage(chatId, "No valid data available for the provided BIN.", { reply_to_message_id: messageId });
          }
        })
        .catch(error => {
          bot.sendMessage(chatId, "Failed to retrieve BIN information.", { reply_to_message_id: messageId });
        });
    } else {
      bot.sendMessage(chatId, "Please enter a valid 6-digit BIN number.", { reply_to_message_id: messageId });
    }
  }
});

console.log('Bot has started.');
