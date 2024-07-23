import { Request, Response } from "express";
import { SendEmailUseCase } from "./send_email_use_case";

export class SendEmailController {
  constructor(private sendEmailUseCase: SendEmailUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.sendEmailUseCase.execute(request.body);
      return response.status(201).send();

    } catch (err) {
      if (err instanceof Error) {
        return response.status(400).json({ message: err.message });
      }

      return response.status(400).json({ message: "Unexpected error." });
    }
  }
}
