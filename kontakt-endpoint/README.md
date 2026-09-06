# Kontakt-Endpoint

One serverless function behind the contact form on choumar.is-a.dev.
It relays the message to e-mail and stores nothing.

## Deploy

    cd kontakt-endpoint
    npx vercel
    npx vercel --prod

## Environment variables (Vercel -> Settings -> Environment Variables)

| Key | Value |
|---|---|
| RESEND_API_KEY | API key from resend.com |
| MAIL_TO | choumarmohamadali@gmail.com |
| MAIL_FROM | a verified sender, e.g. kontakt@your-verified-domain |

Then put the deployed URL into assets/app.js:

    var ENDPOINT = "https://<project>.vercel.app/api/kontakt";

Until that line is filled in, the form falls back to a pre-filled mail draft,
so a visitor can always reach him either way.
