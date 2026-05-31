// wrangler.toml:
// name = "maintenance-page"
// main = "worker.js"

// ── CONFIG ────────────────────────────────────────────────
const MAINTENANCE_ACTIVE = false; // flip to true when upgrading

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Scheduled Maintenance</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .card {
      max-width: 480px;
      text-align: center;
    }
    .icon { font-size: 3rem; margin-bottom: 1.5rem; }
    h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; }
    p { color: #94a3b8; line-height: 1.7; margin-bottom: 0.75rem; }
    .eta {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.5rem 1.25rem;
      border: 1px solid #334155;
      border-radius: 9999px;
      font-size: 0.875rem;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🔧</div>
    <h1>Scheduled Maintenance</h1>
    <p>We're upgrading our servers to serve you better.</p>
    <p>We'll be back shortly. Thanks for your patience.</p>
    <span class="eta">Expected time: check back in ~30 minutes</span>
  </div>
</body>
</html>`;
// ─────────────────────────────────────────────────────────

export default {
    async fetch(request) {
        if (!MAINTENANCE_ACTIVE) {
            return fetch(request); // pass through normally
        }

        return new Response(MAINTENANCE_HTML, {
            status: 503,
            headers: {
                "Content-Type": "text/html;charset=UTF-8",
                "Retry-After": "1800",
                "Cache-Control": "no-store",
            },
        });
    },
};
