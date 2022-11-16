import * as yup from "yup";

export enum VALIDATOR_ERROR_MESSAGE {
  REQUIRED = "Do not leave blank field",
  EMAIL = "Please enter a valid e-mail!",
  PASSWORD = "Password's length must be 6 to 20 (contains 1 lower case, upper case, special character)",
  CONFIRM_PASSWORD = "Password does not match",
  USERNAME = "Length of Username must be 2 to 30",
  INTRODUCTION = "Introduction must contains maximum 500 characters",
  GROUPNAME = "Length of group name must be 2 to 50",
  SUMMARY = "Summary must contain maximum 500 characters",
  PROJECTNAME = "Length",
}

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[\d])(?=.*[a-z]).{6,20}$/;

export const VALIDATOR_SCHEMA = {
  EMAIL: yup
    .string()
    .required(VALIDATOR_ERROR_MESSAGE.REQUIRED)
    .email(VALIDATOR_ERROR_MESSAGE.EMAIL),
  PASSWORD: yup
    .string()
    .required(VALIDATOR_ERROR_MESSAGE.REQUIRED)
    .matches(passwordRegex, VALIDATOR_ERROR_MESSAGE.PASSWORD),
  CONFIRM_PASSWORD: yup
    .string()
    .required(VALIDATOR_ERROR_MESSAGE.REQUIRED)
    .oneOf([yup.ref("password")], VALIDATOR_ERROR_MESSAGE.CONFIRM_PASSWORD),
  USERNAME: yup
    .string()
    .required()
    .min(2, VALIDATOR_ERROR_MESSAGE.USERNAME)
    .max(30, VALIDATOR_ERROR_MESSAGE.USERNAME),
  INTRODUCTION: yup.string().max(500, VALIDATOR_ERROR_MESSAGE.INTRODUCTION),
  GROUPNAME: yup
    .string()
    .required()
    .min(2, VALIDATOR_ERROR_MESSAGE.GROUPNAME)
    .max(50, VALIDATOR_ERROR_MESSAGE.GROUPNAME),
  SUMMARY: yup.string().max(500, VALIDATOR_ERROR_MESSAGE.SUMMARY),
  PROJECTNAME: yup
    .string()
    .required()
    .min(2, VALIDATOR_ERROR_MESSAGE.GROUPNAME)
    .max(30, VALIDATOR_ERROR_MESSAGE.GROUPNAME),
};
