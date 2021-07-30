import { FRONTEND_URL } from "./general";

export const discordOAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || ""
}&redirect_uri=${encodeURIComponent(
  `${FRONTEND_URL}/auth/oauth/discord`
)}&response_type=code&scope=identify%20email`;
