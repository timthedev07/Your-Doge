/* development urls */
export const BACKEND =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:9000"
    : "https://homework-manager-primary.herokuapp.com";
