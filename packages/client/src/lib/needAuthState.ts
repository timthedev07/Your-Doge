export const needAuthState = (path: string): boolean => {
  const authStateRequiredRoutes: Record<string, boolean> = {
    "/dashboard": true,
    "/u/[username]": true,
    "/auth/login": true,
    "/auth/register": true,
    "/auth/oauth/discord": true,
    "/auth/oauth/facebook": true,
    "/auth/oauth/google": true,
    "/auth/confirm/": true,
    "/auth/confirm/[token]": true,
    "/auth/confirm/resend": true,
    "/auth/forgot-password/": true,
    "/auth/forgot-password/[token]": true,
  };

  return path in authStateRequiredRoutes;
};
