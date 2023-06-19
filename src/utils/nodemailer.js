import nodemailer from "nodemailer";

export const send = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "partridgegt137@gmail.com",
      pass: "wgbqonxpkuvqbzye",
    },
  });

  const mailOpts = {
    from: "partridgegt137@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOpts);
};
