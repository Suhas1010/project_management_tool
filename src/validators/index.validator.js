import { body } from "express-validator";
import { AvailableUserRole,AvailableTaskStatuses } from "../utils/constants.js";

const userRegisterValidator = ()=>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
     body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({min :3})
      .withMessage("Username must be atleat 3 characters long"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
    body("full name")
        .optional()
        .trim()
    ]
}
const userLoginValidator =()=>{
    return [
         body("email")
         .optional()
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
    ]
    
}
const userChangeCurrentPasswordValidator = () =>{
    return[
        body("oldPassword")
         .notEmpty().withMessage("Old password is required"),
        body("newPassword")
         .notEmpty().withMessage("New password is required"),  
    ];
}

const userForgotPasswordValidator = ()=>{
    return [
        body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid")

    ]
}
const userResetForgotPasswordValidator = ()=>{
    return[
        body("newPassword")
        .notEmpty().withMessage("Password is required")
    ];
}

const createProjectValidator = () =>{
    return [
        body("name")
          .notEmpty()
          .withMessage("Name is required"),
        body("description")
          .optional(),
    ];
};

const addMembersToProjectValidator = ()=>{
    return [
        body("email")
         .trim()
         .notEmpty()
         .withMessage("Email is required")
         .isEmail()
         .withMessage("Email is invalid"),
        body("role")
         .notEmpty()
         .withMessage("Role is required")
         .isIn(AvailableUserRole)
         .withMessage("Role is invalid")
    ]
}

const createTaskValidator = ()=>{
    return [
        body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

        body("status")
        .optional()
        .isIn(AvailableTaskStatuses)
        .withMessage("Invalid task status")
    ];
};

const updateTaskValidator = ()=>{
    return [
        body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),

        body("status")
        .optional()
        .isIn(AvailableTaskStatuses)
        .withMessage("Invalid task status")
    ];
};

const createSubTaskValidator = ()=>{
    return [
        body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
    ];
};

const updateSubTaskValidator = ()=>{
    return [
        body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),

        body("isCompleted")
        .optional()
        .isBoolean()
        .withMessage("isCompleted must be a boolean")
    ];
};
 const createNoteValidator = () => {
    return [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Note content is required")
    ];
};

const updateNoteValidator = () => {
    return [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Note content is required")
    ];
};
export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
    createProjectValidator,
    addMembersToProjectValidator,
    createTaskValidator,
    updateTaskValidator,
    createSubTaskValidator,
    updateSubTaskValidator,
    createNoteValidator,
    updateNoteValidator
};
