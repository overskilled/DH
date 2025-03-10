import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { adminAuth } from "@/functions/firebase";
import admin from "firebase-admin";
// Function to generate random password
function generateRandomPassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

// API Route to create user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, displayName } = req.body;

    // Generate a random password
    const password = generateRandomPassword(12);

    // Create the user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
      emailVerified: false,
      disabled: false,
    });

    // Send email with credentials using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "smtp.hostinger.com", // You can use your email service here (Gmail in this case)
      port: 465,
      auth: {
        user: "admin@onevisaplace.com", // Add your email here
        pass: "Micro-phone43@", // Add your email password or app password here
      },
    });

    // Email content
    const mailOptions = {
      from: "admin@onevisaplace.com",
      to: email,
      subject: "Your Account has been Created",
      text: `Hello ${displayName},\n\nYour account has been successfully created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in for security reasons.\n\nBest regards,\nYour App Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res
      .status(200)
      .json({ message: "User created successfully", userId: userRecord.uid });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
