export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://yourdoge.vercel.app"
    : "http://localhost:3000";
