type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends the portfolio contact notification email.
 *
 * Email delivery runs through Lovable's managed email infrastructure, which needs a
 * verified sender domain. Until that domain is verified, submissions are still stored
 * durably in `contact_messages` and this notification stays a no-op so the visitor
 * never sees a failure.
 */
export async function notifyContactMessage(payload: ContactPayload): Promise<void> {
  console.info("[contact] new portfolio submission", {
    name: payload.name,
    email: payload.email,
  });
}
