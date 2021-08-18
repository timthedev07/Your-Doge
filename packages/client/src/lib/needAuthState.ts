/**
 * A helper function that decides if a route needs to access the current user data.
 *
 * This is useful when on pages like contact, or faq, we don't care about whether you are authenticated, so this can avoid the initial loading time and directly show user the content.
 * @param path
 * @returns
 */
export const needAuthState = (path: string): boolean => {
  const authStateRequiredRoutes: Record<string, boolean> = {
    // "/dashboard": false,
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
    "/account": true,
  };

  return path in authStateRequiredRoutes;
};
