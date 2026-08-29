type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends the portfolio contact notification email.
 *
 * Delivery runs through Lovable's managed email infrastructure, which requires a
 * verified sender domain. Until that domain is verified, submissions are still
 * stored durably in `contact_messages` and this notification is a no-op so the
 * visitor never sees a failure.
 */
export async function notifyContactMessage(payload: ContactPayload): Promise<void> {
  try {
    const { sendTemplateEmail } = (await import(
      /* @vite-ignore */ "@/lib/email-templates/send-email"
    ).catch(() => ({ sendTemplateEmail: undefined }))) as {
      sendTemplateEmail?: (
        template: string,
        to: string,
        options: { templateData: Record<string, unknown> },
      ) => Promise<unknown>;
    };

    if (!sendTemplateEmail) return;

    await sendTemplateEmail("contact-notification", "vikrammadyasta@gmail.com", {
      templateData: payload,
    });
  } catch (error) {
    console.error("contact notification email failed", error);
  }
}
