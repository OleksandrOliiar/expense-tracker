import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/\d/, "Password must contain a digit")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain a special character (not a letter or digit)"
  );
