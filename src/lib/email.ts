import nodemailer from "nodemailer";

export async function sendOTPEmail(
  to: string,
  otp: string,
  type: "login" | "register" = "login"
) {
  const subject =
    type === "register"
      ? "HyCare Industries - Verify Registration"
      : "HyCare Industries - Login OTP";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #f97316; margin: 0;">HYCARE INDUSTRIES</h1>
      </div>
      <h2 style="color: #1f2937;">Your OTP Code</h2>
      <p style="color: #4b5563;">Use the following OTP to ${
        type === "register" ? "complete your registration" : "login"
      }:</p>
      <div style="background: #f97316; color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 16px; border-radius: 8px; letter-spacing: 8px; margin: 24px 0;">
        ${otp}
      </div>
      <p style="color: #6b7280; font-size: 14px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #9ca3af; font-size: 12px; text-align: center;">© 2026 HyCare Industries. All rights reserved.</p>
    </div>
  `;

  const text = `Your HyCare Industries OTP is: ${otp}. Valid for 10 minutes.`;

  // 1) Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const from =
        process.env.RESEND_FROM_EMAIL || "HyCare Industries <onboarding@resend.dev>";

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html,
          text,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Resend error:", data);
        throw new Error(data?.message || "Resend failed");
      }

      console.log(`[EMAIL] OTP sent via Resend to ${to}`);
      return { success: true, provider: "resend" };
    } catch (err: any) {
      console.error("Resend failed:", err?.message || err);
    }
  }

  // 2) Gmail
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
      text,
    });

    console.log(`[EMAIL] OTP sent via Gmail to ${to}`);
    return { success: true, provider: "gmail" };
  }

  // 3) Dev mode
  console.log(`[DEV] OTP for ${to}: ${otp}`);
  return { success: true, dev: true };
}

export async function sendWelcomeEmail({
  to,
  name,
  username,
  password,
}: {
  to: string;
  name: string;
  username: string;
  password: string;
}) {
  const subject = "HyCare Industries - Your Admin Panel Credentials";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #f97316; margin: 0;">HYCARE INDUSTRIES</h1>
      </div>
      <h2 style="color: #1f2937;">Welcome, ${name}!</h2>
      <p style="color: #4b5563;">Your account has been created on the HyCare Admin Panel. Here are your login credentials:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Username</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${username}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Password</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${password}</td>
        </tr>
      </table>
      <p style="color: #6b7280; font-size: 14px;">Please log in and change your password after your first login. Do not share these credentials with anyone.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #9ca3af; font-size: 12px; text-align: center;">© 2026 HyCare Industries. All rights reserved.</p>
    </div>
  `;

  const text = `Welcome ${name}! Your HyCare Admin Panel credentials — Username: ${username}, Password: ${password}. Please change your password after first login.`;

  // 1) Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const from =
        process.env.RESEND_FROM_EMAIL || "HyCare Industries <onboarding@resend.dev>";

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html,
          text,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Resend error:", data);
        throw new Error(data?.message || "Resend failed");
      }

      console.log(`[EMAIL] Welcome email sent via Resend to ${to}`);
      return { success: true, provider: "resend" };
    } catch (err: any) {
      console.error("Resend failed:", err?.message || err);
    }
  }

  // 2) Gmail
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
      text,
    });

    console.log(`[EMAIL] Welcome email sent via Gmail to ${to}`);
    return { success: true, provider: "gmail" };
  }

  // 3) Dev mode — credentials console मध्ये दाखवत नाही, फक्त confirmation
  console.log(`[DEV] Welcome email not sent (no provider configured) — user: ${to}`);
  return { success: true, dev: true };
}