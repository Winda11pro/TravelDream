const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'daszxasdza@gmail.com',
        pass: 'Maxim134598' 
    }
});


app.post('/send-booking-confirmation', async (req, res) => {
    const { email, bookingDetails, travelers } = req.body;

    const mailOptions = {
        from: 'daszxasdza@gmail.com',
        to: email,
        subject: 'Подтверждение бронирования - TravelDream',
        html: `
            <h2>Спасибо за бронирование!</h2>
            <h3>Детали вашего путешествия:</h3>
            <p>Направление: ${bookingDetails.destination}</p>
            <p>Дата: ${bookingDetails.date}</p>
            <p>Количество путешественников: ${bookingDetails.travelers}</p>
            
            <h3>Информация о путешественниках:</h3>
            ${travelers.map((traveler, index) => `
                <div>
                    <h4>Путешественник ${index + 1}</h4>
                    <p>Имя: ${traveler.firstName}</p>
                    <p>Фамилия: ${traveler.lastName}</p>
                    <p>Дата рождения: ${traveler.birthDate}</p>
                    <p>Номер паспорта: ${traveler.passport}</p>
                </div>
            `).join('')}
            
            <p>Наш менеджер свяжется с вами в ближайшее время для подтверждения деталей.</p>
            <p>С уважением,<br>Команда TravelDream</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Письмо отправлено успешно' });
    } catch (error) {
        console.error('Ошибка отправки письма:', error);
        res.status(500).json({ success: false, message: 'Ошибка отправки письма' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 