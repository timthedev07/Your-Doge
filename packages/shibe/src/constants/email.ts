export const prefixMap: Record<string, string> = {
  confirm: "Y29uZmlybQ:",
  "forgot-password": "Zm9yZ290:",
};

export const CONFIRM_EMAIL_LETTER_CONTENT = `
Dear User,

At your request, Your Doge has sent you the following link so that you may verify your email and continue to use the service, and please note that the url would expire in 8 hours.
If you received this email without registering on Your Doge, ignore it, and nothing will happen.

Sincerely,
Your Doge Team

This message was produced and distributed by Your Doge.
This is an automatic email, please do not respond on this email. If you require any support assistance, please send an email directly to yourdoge.team@gmail.com.
`;

export const RESET_PASSWORD_LETTER_CONTENT = `
Dear User,

At your request, Your Doge has sent you the following link so that you may reset your password. If it was not at your request, then you should be aware that someone has entered your email address as theirs in the forgotten password section on the login page.
Please note that the url would expire in 30 minutes.
If you did not forget your password, ignore this email and no changes will be made to your account.

Sincerely,
Your Doge Team

This message was produced and distributed by Your Doge.
This is an automatic email, please do not respond on this email. If you require any support assistance, please send an email directly to yourdoge.team@gmail.com.
`;
