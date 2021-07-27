export interface RecaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
}
