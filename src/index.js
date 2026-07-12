import { connect } from 'cloudflare:sockets';
import { handleRequest } from './handlers/main.js';

export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx, connect);
    } catch (e) {
      return new Response(
        JSON.stringify({
          message: e?.message,
          stack: e?.stack
        }, null, 2),
        {
          status: 500,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }
  }
}
