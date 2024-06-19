const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const token = '6676236322:AAG1t77ijj_4qiEyUsYa49e7l7XB7WJCBng';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
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
    bot.sendMessage(chatId, "Support: @oppresses, @HARDCORE369, @trustedlizard");
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
      const url = `https://data.handyapi.com/bin/${bin}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.Status === "SUCCESS") {
            // Format the reply message
            const reply = `Scheme: ${data.Scheme}\nType: ${data.Type}\nTier: ${data.CardTier}\nIssuer: ${data.Issuer}\nCountry: ${data.Country.Name}`;
            bot.sendMessage(chatId, reply);
          } else {
            bot.sendMessage(chatId, "No data available for the provided BIN.");
          }
        })
        .catch(error => {
          bot.sendMessage(chatId, "Failed to retrieve BIN information due to a network error or bad response. Please try again.");
        });
    } else {
      bot.sendMessage(chatId, "Please enter a valid 6-digit BIN number.");
    }
  }
});

console.log('Bot has started.');
