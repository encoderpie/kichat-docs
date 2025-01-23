# API Endpoints

All Kichat API requests should be made to the base URL.

::: tip BASE URL
https://api.kichat.dev
:::
## Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| <Badge type="tip" text="GET" /> | `/api/v2/channels/{channelName}` | Get channel information |
| <Badge type="info" text="POST" /> | `/api/v2/channels/followed` | Get followed channels |
| <Badge type="warning" text="PUT" /> | `/api/v2/user/livestreams` | Get user livestreams |

## Authentication

All requests typically require these headers for user-related endpoints:
```http
X-Kick-Cookie: YOUR_KICK_COOKIE
Authorization: Bearer YOUR_SESSION_TOKEN
```

## Rate Limits

::: info
- 100 requests per minute per IP
- WebSocket connections are limited to 10 per IP
:::