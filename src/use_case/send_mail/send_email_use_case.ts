import nodemailer from "nodemailer";
import { ISendEmailDTO } from "./send_email_dto";

export class SendEmailUseCase {
  async execute(data: ISendEmailDTO): Promise<void> {
    const { to, from, subject, html, sender, domain } = data;

    if (!sender || !to || !from || !subject || !html || !domain ) {
      throw new Error("All fields are required.");
    }

    const transporter = nodemailer.createTransport(sender);

    await transporter.sendMail({
      messageId: `${new Date().getMilliseconds()}${domain}`,
      date: new Date().toUTCString(),
      to,
      from,
      subject,
      html,
    });
  }
}
