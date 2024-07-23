import { Address } from "nodemailer/lib/mailer";
import SMTPConnection from "nodemailer/lib/smtp-connection";

export interface ISendEmailDTO {
  sender: SMTPConnection.Options
  to: Address
  from: Address
  domain: string
  subject: string
  html: string
}