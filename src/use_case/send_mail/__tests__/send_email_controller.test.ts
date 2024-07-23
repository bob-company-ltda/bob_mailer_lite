import { Request, Response } from 'express';
import { SendEmailUseCase } from '../send_email_use_case';
import { SendEmailController } from '../send_email_controller';

describe('SendEmailController', () => {
  let sendEmailController: SendEmailController;
  let sendEmailUseCase: SendEmailUseCase;
  let request: Partial<Request>;
  let response: Partial<Response>;

  beforeEach(() => {
    sendEmailUseCase = new SendEmailUseCase();
    sendEmailController = new SendEmailController(sendEmailUseCase);

    request = {
      body: {
        sender: {
          host: 'smtp.example.com',
          port: 465,
          auth: {
            user: 'user@example.com',
            pass: 'password',
          },
        },
        to: 'recipient@example.com',
        from: 'sender@example.com',
        subject: 'Test Email',
        html: '<p>This is a test email</p>',
      },
    };

    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  it('should return 201 if email is sent successfully', async () => {
    jest.spyOn(sendEmailUseCase, 'execute').mockResolvedValueOnce();

    await sendEmailController.handle(request as Request, response as Response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.send).toHaveBeenCalled();
  });

  it('should return 400 if there is an error', async () => {
    const error = new Error('Test error');
    jest.spyOn(sendEmailUseCase, 'execute').mockRejectedValueOnce(error);

    await sendEmailController.handle(request as Request, response as Response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: error.message });
  });

  it('should return 400 for unexpected errors', async () => {
    jest.spyOn(sendEmailUseCase, 'execute').mockRejectedValueOnce('Unexpected error');

    await sendEmailController.handle(request as Request, response as Response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: 'Unexpected error.' });
  });
});
