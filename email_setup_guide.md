# Pure Gmail Hook Setup (Unlimited)

Instead of using a third-party service like EmailJS, we are now using a **Google Apps Script Webhook**. This allows you to send emails directly from your Gmail account (`enysolmate@gmail.com`) with no monthly limits on the number of RSVPs.

## 1. Create the Gmail Hook
Follow these steps to create your custom "email sender":

1.  Go to [script.google.com](https://script.google.com/) and click **"New Project"**.
2.  Delete everything in the editor and paste the following code:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var email = data.email;
  var name = data.full_name;
  var attending = data.attending;
  
  var subject = attending ? "We can’t wait to celebrate with you 🤍" : "We’ll miss you 🤍";
  
  var body = "";
  if (attending) {
    body = "Hi " + name + ",\n\n" +
           "Thank you so much for your RSVP — we’re so excited that you’ll be celebrating with us!\n" +
           "We’re truly looking forward to sharing this special day with you. More details about the ceremony and reception will be shared in July.\n\n" +
           "If you have any questions, please feel free to reach out.\n\n" +
           "Thanks.\n\n" +
           "With love,\n" +
           "Solomon and Enyonam.";
  } else {
    body = "Hi " + name + ",\n\n" +
           "Thank you so much for letting us know.\n" +
           "We’ll truly miss having you with us on our special day, but we completely understand.\n\n" +
           "With love,\n" +
           "Solomon & Enyonam";
  }
  
  // Sends the email as enysolmate@gmail.com
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body,
    name: "Solomon & Enyonam",
    replyTo: "enysolmate@gmail.com"
  });
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
```

3.  Click the **"Deploy"** button at the top right -> **"New Deployment"**.
4.  Select type: **"Web App"**.
5.  **Description**: `RSVP Email Hook`.
6.  **Execute as**: `Me` (this ensures it uses your Gmail account).
7.  **Who has access**: `Anyone`.
8.  Click **"Deploy"**. You may need to "Authorize Access" (Click through the "Advanced" warnings to allow it).
9.  **Copy the Web App URL** (it should look like `https://script.google.com/macros/s/.../exec`).

## 2. Update Environment Variables
Open your `.env` file and add the URL you just copied:

```text
VITE_GMAIL_HOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

## 3. Clean up (Optional)
You can now uninstall the old library if you wish:
```bash
npm uninstall @emailjs/browser
```

## Why this is better:
- **Unlimited**: No monthly quotas like third-party services.
- **Pure**: The code runs directly on Google's servers and uses your own account.
- **Simple**: No need for API keys or complicated SDKs; it just uses a simple `fetch`.
