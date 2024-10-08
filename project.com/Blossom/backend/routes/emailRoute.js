import { Router } from "express";
import nodemailer from 'nodemailer';
const emailRouter = Router();


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "giridharsaigirugu@gmail.com",
        pass: "gybv bnao qhxq bwmm"
    }
});

emailRouter.post('/', async (req, res) => {
    const { name, street, city, state, zip, country, eventName, eventDate, eventDescription, email, imageUrl } = req.body;

    const fullAddress = `${street}, ${city}, ${state}, ${zip}, ${country}`;
    const vendorEmail = 'blossomstoresalbany@gmail.com';  // Using environment variable for vendor email

    const customerMailOptions = {
        from: "giridharsaigirugu@gmail.com",
        to: email,
        subject: `Confirmation for ${eventName}`,
        html: `<h1>Event Confirmation</h1><p>Dear ${name},</p><p>Thank you for planning your event with us! Here are the details:</p><ul><li>Name: ${name}</li><li>Address: ${fullAddress}</li><li>Event: ${eventName}</li><li>Date: ${eventDate}</li><li>Description: ${eventDescription}</li></ul><p>Our team member will reach you to discuss the further details , We look forward to making your event memorable.</p><img src="${imageUrl}" alt="Event Image" style="width:100%;height:auto;"/>`
    };

    const vendorMailOptions = {
        from: "giridharsaigirugu@gmail.com",
        to: vendorEmail,
        subject: `New Event: ${eventName}`,
        html: `<h1>New Event Details</h1><p>Please see the details for the upcoming event:</p><ul><li>Client Name: ${name}</li><li>Event Address: ${fullAddress}</li><li>Event: ${eventName}</li></ul><p>Please prepare the necessary arrangements.</p><img src="${imageUrl}" alt="Event Image" style="width:100%;height:auto;"/>`
    };

    try {
        await transporter.sendMail(customerMailOptions);
        await transporter.sendMail(vendorMailOptions);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

export default emailRouter;
