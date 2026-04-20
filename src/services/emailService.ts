export const emailService = {
  sendRSVPConfirmation: async (data: {
    full_name: string;
    email: string;
    attending: boolean;
  }) => {
    const HOOK_URL = import.meta.env.VITE_GMAIL_HOOK_URL;

    if (!HOOK_URL) {
      console.warn("Gmail Webhook URL not configured. Email not sent.");
      return;
    }

    try {
      const response = await fetch(HOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script often requires no-cors for simple triggers
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: data.full_name,
          email: data.email,
          attending: data.attending,
        }),
      });

      // Note: With 'no-cors', we won't see the response body, but the script will execute.
      console.log('Confirmation signal sent to Gmail hook');
      return response;
    } catch (error) {
      console.error('Failed to send confirmation email signal:', error);
      throw error;
    }
  }
};
