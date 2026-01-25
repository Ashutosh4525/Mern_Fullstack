import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
// Create a test account for development

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  //  port: 587,
  // secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

  // For testing, use Ethereal
  // let testAccount = await nodemailer.createTestAccount();
  // transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass
  //   }
  // });

  // console.log('Test account created:', testAccount.user, testAccount.pass);


// createTransporter().then(() => {
//   // Verify transporter
//   transporter.verify((error, success) => {
//     if (error) {
//       console.log("Transporter verification failed:", error);
//     } else {
//       console.log("Transporter is ready to send emails");
//     }
//   });
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.log("Transporter error:", error);
//   } else {
//     console.log("SMTP ready to send emails ✅");
//   }
// });


export const sendOtpEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "ashutoshpal146@gmail.com",
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial;">
          <h2>Your OTP</h2>
          <h1>${otp}</h1>
          <p>Valid for 10 minutes</p>
        </div>
      `
    });
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    // throw error; // Re-throw to handle in controller
  }
};
