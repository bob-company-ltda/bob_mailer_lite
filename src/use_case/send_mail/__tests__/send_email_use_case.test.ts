import nodemailer from "nodemailer";
import { SendEmailUseCase } from "../send_email_use_case";
import { ISendEmailDTO } from "../send_email_dto";

jest.mock("nodemailer");

const mockSendMail = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: mockSendMail,
});

describe("SendEmailUseCase", () => {
  it("should send an email successfully", async () => {
    const sendEmailUseCase = new SendEmailUseCase();
    const emailData: ISendEmailDTO = {
      sender: {
        host: "smtp.example.com",
        port: 465,
        auth: {
          user: "user@example.com",
          pass: "password",
        },
      },
      to: {
        name: "Recipient",
        address: "recipient@example.com",
      },
      from: {
        name: "Sender",
        address: "sender@example.com",
      },
      subject: "Test Email",
      html: "<p>This is a test email</p>",
    };

    mockSendMail.mockResolvedValueOnce("Email sent");

    await sendEmailUseCase.execute(emailData);

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: emailData.to,
        from: emailData.from,
        subject: emailData.subject,
        html: emailData.html,
      })
    );
  });

  it("should throw an error if required fields are missing", async () => {
    const sendEmailUseCase = new SendEmailUseCase();

    const emailData: Partial<ISendEmailDTO> = {
      sender: {
        host: "sandbox.smtp.mailtrap.io",
        port: 465,
        auth: {
          user: "6ecbdeb296a3c8",
          pass: "b88bfdbee2e9da",
        },
      },
      to: {
        name: "Recipient",
        address: "recipient@example.com",
      },
      subject: "Test Email",
      html: "<p>This is a test email</p>",
    };

    await expect(
      sendEmailUseCase.execute(emailData as ISendEmailDTO)
    ).rejects.toThrow("All fields are required.");
  });
});
