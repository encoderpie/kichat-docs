# Kichat API Structure

Kichat API consists of two main components that provide comprehensive access to kick.com services:

## 1. REST API Endpoints

::: info
These endpoints mirror kick.com's known API endpoints, providing access to platform features and data. Detailed documentation for each endpoint will be available in separate documentation files.
:::

## 2. Chatroom Stream (Pusher converted to WebSocket)

::: tip
Kichat API transforms kick.com's Pusher-based chat service into a WebSocket connection, making it easier to integrate into your applications. This simplifies the integration process.
:::

### Key Points
- Original kick.com chat uses Pusher service
- Kichat API converts this to standard WebSocket protocol
- Simplified integration for developers
- Real-time chat message streaming

::: warning Coming Soon
Detailed documentation for both REST API endpoints and WebSocket implementation will be provided in separate documentation files.
::: 