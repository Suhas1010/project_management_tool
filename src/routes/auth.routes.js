import { Router } from "express";
import { loginUser, logoutUser, registerUser,getCurrentUser,verifyEmail,resendEmailVerification,refreshAccessToken,forgotPasswordRequest,resetForgotPassword,changeCurrentPassword} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userRegisterValidator,userLoginValidator,userForgotPasswordValidator,userChangeCurrentPasswordValidator,userResetForgotPasswordValidator} from "../validators/index.validator.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()
// Unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetForgotPassword);
router.route("/refresh-token").post(refreshAccessToken); // usually no verifyJWT

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification);

export default router;

