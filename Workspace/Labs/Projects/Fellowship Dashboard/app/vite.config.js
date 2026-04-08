import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Anthropic from '@anthropic-ai/sdk';

export default defineConfig(({ mode }) => {
  // Load all env vars (no prefix filter) — stays server-side only
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      fellowshipApiPlugin(env.ANTHROPIC_API_KEY),
    ],
  };
});

/**
 * Fellowship API Plugin
 * Exposes /api/chat as a streaming SSE endpoint.
 * The API key never leaves the server — the browser only gets SSE chunks.
 */
function fellowshipApiPlugin(apiKey) {
  return {
    name: 'fellowship-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        if (!apiKey) {
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error:
                'ANTHROPIC_API_KEY not set. Add it to your .env file and restart the dev server.',
            })
          );
          return;
        }

        // Collect body
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', async () => {
          try {
            const { systemPrompt, messages } = JSON.parse(body);

            const client = new Anthropic({ apiKey });

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('Access-Control-Allow-Origin', '*');

            const stream = await client.messages.stream({
              model: 'claude-sonnet-4-6',
              max_tokens: 1500,
              system: systemPrompt,
              messages,
            });

            for await (const event of stream) {
              if (
                event.type === 'content_block_delta' &&
                event.delta.type === 'text_delta'
              ) {
                res.write(
                  `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
                );
              }
            }

            res.write('data: [DONE]\n\n');
            res.end();
          } catch (err) {
            const msg = err?.message || 'Unknown error';
            res.write(
              `data: ${JSON.stringify({ error: msg })}\n\n`
            );
            res.end();
          }
        });
      });
    },
  };
}
