import { Resend } from "resend";
import { RESEND_API_KEY, RESEND_EMAIL } from "./env.ts";
import { logger } from "./logger.ts";

const resend = new Resend(RESEND_API_KEY);

export const sendVerificationEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const { error } = await resend.emails.send({
    from: `PachinGO! <${RESEND_EMAIL}>`,
    to: to,
    subject: subject,
    html: `<strong>Please verify your email by clicking the link: </strong>
    <a href=${text}>${text}</a>
    `,
  });

  if (error) {
    logger.log({
      level: "error",
      message: `AUTH: Verification email error (To: ${to})`,
    });
  } else {
    logger.log({
      level: "info",
      message: `AUTH: Verification email sent (To: ${to})`,
    });
  }
};

export const sendPasswordResetEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const { error } = await resend.emails.send({
    from: `PachinGO! <${RESEND_EMAIL}>`,
    to: to,
    subject: subject,
    html: `<strong>Reset your password by clicking the link: </strong>
    <a href=${text}>${text}</a>
    `,
  });

  if (error) {
    logger.log({
      level: "error",
      message: `AUTH: Password reset email error (To: ${to})`,
    });
  } else {
    logger.log({
      level: "info",
      message: `AUTH: Password reset email sent (To: ${to})`,
    });
  }
};
