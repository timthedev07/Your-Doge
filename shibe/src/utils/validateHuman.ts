import fetch from "node-fetch";
import { RecaptchaResponse } from "../types/recaptcha";

export const validateHuman = async (token: string) => {
  const secret = process.env.RECAPTCHA_SECRET || "";

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );

  const result = (await response.json()) as unknown as RecaptchaResponse;

  return result.success;
};
