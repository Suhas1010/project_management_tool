import { Router } from "express";
import { loginUser, logoutUser, registerUser,getCurrentUser,verifyEmail,resendEmailVerification} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userRegisterValidator,userLoginValidator} from "../validators/index.validator.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(userRegisterValidator(),validate,registerUser);

router.route("/login").post(userLoginValidator(),validate,loginUser);

router.route("/logout").post(verifyJWT,logoutUser);

router.route("/current-user").get(verifyJWT,getCurrentUser);

router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification);
export default router;
