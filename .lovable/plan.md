
User wants me to rotate `ARTICLES_API_KEY` to a new value they'll set. The cleanest path: I generate a strong random key in default mode, write it to the `ARTICLES_API_KEY` secret using the secret-management tool, and display it once in chat so they can paste it into n8n. No code changes needed — `manage-articles` already reads this secret.

## Plan: Rotate `ARTICLES_API_KEY` to a fresh value

### What I'll do (default mode)
1. Generate a cryptographically strong 64-character random key.
2. Overwrite the `ARTICLES_API_KEY` secret with the new value using the secret tool.
3. Display the new key once in chat so you can copy it into n8n.
4. No code changes — `supabase/functions/manage-articles/index.ts` already reads `ARTICLES_API_KEY` and validates the `x-api-key` header against it.

### What you'll do
1. Copy the key I display.
2. In your n8n HTTP Request node, set the header:
   - `x-api-key` = (the new value)
   - `Content-Type` = `application/json`
3. URL stays: `https://sfzdecpsvgcqmlwkjibd.supabase.co/functions/v1/manage-articles`
4. Send a test POST with the minimal body — expect `200`.
5. Store the key in your password manager (I won't show it again).

### Security note
After you confirm n8n is working, I recommend we rotate the key one more time so the value isn't permanently sitting in this chat history. Optional but cleaner.
