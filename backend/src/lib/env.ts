import "dotenv/config";

export const {
  PORT,
  MONGO_URI,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
  PYTHON_PATH,
  SCRIPT_PATH,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  RESEND_API_KEY,
  RESEND_EMAIL,
} = process.env as Record<string, string>;
