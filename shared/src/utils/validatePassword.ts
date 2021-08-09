export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 64) {
    throw "A valid password has to be longer than 8 characters and shorter than 64.";
  }
  return true;
};
