import { sendEmailController } from './use_case/send_mail';
import { Router } from "express";

const router = Router()

router.post('/send-email', (request, response) => {
  return sendEmailController.handle(request, response);
});

export { router }