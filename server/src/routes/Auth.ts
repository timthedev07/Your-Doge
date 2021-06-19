import express from "express";

export const router = express.Router();

router.get("/register", (req, res, next) => {
  res.send("HELLO HUMAN");
});
