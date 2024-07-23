import { SendEmailUseCase } from './send_email_use_case';
import { SendEmailController } from "./send_email_controller";

const sendEmailUseCase = new SendEmailUseCase()
const sendEmailController = new SendEmailController(sendEmailUseCase)

export { sendEmailUseCase, sendEmailController }