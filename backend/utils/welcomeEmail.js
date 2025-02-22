import { createTransport } from "nodemailer";

export const welcomeEmail = async (userName, userEmail, userPassword) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    const emailData = {
      from: `YourWORDS ${process.env.ADMIN_EMAIL}`,
      to: userEmail,
      subject: "Welcome to YourWORDS!",
      html: `<h2>Welcome, ${userName}!</h2> 
             <p>Thank U for signUp</p> 
             <p><b>Username: </b> ${userName}</p> 
             <p><b>Password: </b> ${userPassword}</p>`,
    };

    await transporter.sendMail(emailData);
    console.log(`signUp email send to: ${emailData}`);
  } catch (error) {
    console.error("Error sending Email: ", error);
  }
};
