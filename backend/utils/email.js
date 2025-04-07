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
  } catch (error) {
    console.error("Error sending WelcomeEmail: ", error);
  }
};

export const sendResetPassLinkEmail = async (userEmail, resetLink) => {
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
      subject: "Password Reset Link!",
      html: `<p>Click below to reset your password:</p>
              <a href="${resetLink}">Reset Password</a>
              <p>This link will expire in 15 minutes.</p>`,
    };

    await transporter.sendMail(emailData);
  } catch (error) {
    console.error("failed to sent reset pass link", error);
  }
};
