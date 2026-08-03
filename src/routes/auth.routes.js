import { Router } from "express";
import { loginUser, logoutUser, registerUser,getCurrentUser} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userRegisterValidator,userLoginValidator} from "../validators/index.validator.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(userRegisterValidator(),validate,registerUser);

router.route("/login").post(userLoginValidator(),validate,loginUser);

router.route("/logout").post(verifyJWT,logoutUser);

router.route("/current-user").get(verifyJWT,getCurrentUser);
export default router;
