---
aside: false
outline: true
---

# Chatroom Stream (WebSocket)

Kichat API transforms kick.com's Pusher-based chat service into a standard WebSocket protocol, making chat integration easier for developers.

## Connection Setup

Use Socket.IO client to establish a WebSocket connection:

```typescript
import { io } from 'socket.io-client'

const socket = io('https://api.kichat.dev', {
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 20,
  timeout: 45000,
  autoConnect: true
})
```

## Connection Options

| Option | Type | Default | Description |
|---------|-----|------------|-----------|
| `path` | `string` | `/socket.io/` | Socket.IO server path |
| `transports` | `string[]` | `['websocket', 'polling']` | Transport methods to use |
| `reconnection` | `boolean` | `true` | Enable auto-reconnection |
| `reconnectionDelay` | `number` | `1000` | Reconnection delay in ms |
| `reconnectionDelayMax` | `number` | `5000` | Maximum reconnection delay in ms |
| `reconnectionAttempts` | `number` | `5` | Maximum reconnection attempts |
| `timeout` | `number` | `45000` | Connection timeout in ms |
| `autoConnect` | `boolean` | `true` | Auto-connect on initialization |

## Channel Subscription

To subscribe to a chat room:

```typescript
socket.emit('subscribe', { 
  channelName: 'channel_name', 
  chatroomId: 'chatroom_id' 
})
```

To unsubscribe from a chat room:

```typescript
socket.emit('unsubscribe', { 
  channelName: 'channel_name', 
  chatroomId: 'chatroom_id' 
})
```

## Events

### Connection Events

```typescript
// Connection successful
socket.on('connect', () => {
  console.log('Connection established')
})

// Connection lost
socket.on('disconnect', (reason) => {
  console.log('Connection lost:', reason)
})

// Reconnection attempt
socket.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Reconnection attempt: ${attemptNumber}`)
})

// Reconnection failed
socket.on('reconnect_failed', () => {
  console.log('Reconnection failed')
})
```

### Chat Events

| Event | Description |
|-------|-------------|
| `App\\Events\\ChatMessageEvent` | New message received |
| `App\\Events\\MessageDeletedEvent` | Message deleted |
| `App\\Events\\UserBannedEvent` | User banned |
| `App\\Events\\UserUnbannedEvent` | User unbanned |
| `App\\Events\\ChatroomClearEvent` | Chat cleared |
| `App\\Events\\ChatroomUpdatedEvent` | Chatroom updated |
| `App\\Events\\PollUpdateEvent` | Poll updated |
| `App\\Events\\PollDeleteEvent` | Poll deleted |
| `App\\Events\\PinnedMessageCreatedEvent` | Message pinned |
| `App\\Events\\PinnedMessageDeletedEvent` | Pinned message removed |
| `App\\Events\\SubscriptionEvent` | New subscription | 
| `App\\Events\\LivestreamUpdated` | Livestream updated |

## Event Listening Examples

```typescript
// New message
socket.on('App\\Events\\ChatMessageEvent', (message: ISocketMessage) => {
  console.log('New message:', message)
})

// User banned
socket.on('App\\Events\\UserBannedEvent', (data: IUserBanned) => {
  console.log('User banned:', data)
})

// Poll updated
socket.on('App\\Events\\PollUpdateEvent', (data: IPollUpdate) => {
  console.log('Poll updated:', data)
})
```

## Complete Example

Here's a complete example implementation:

```typescript
import { io, Socket } from 'socket.io-client'

export class ChatService {
  private socket: Socket | null = null
  
  connect() {
    this.socket = io('https://api.kichat.dev', {
      path: '/socket.io/',
      transports: ['websocket', 'polling']
    })

    this.socket.on('connect', () => {
      console.log('Connection established')
    })

    this.setupEventListeners()
  }

  private setupEventListeners() {
    this.socket?.on('App\\Events\\ChatMessageEvent', (data: ISocketMessage) => {
      console.log('New message:', data)
      console.log(`${data.channel_name} | ${data.sender.username}: ${data.content}`)
    })

    this.socket?.on('App\\Events\\UserBannedEvent', (data) => {
      console.log('User banned:', data)
    })
  }

  subscribeToChannel(channelName: string, chatroomId: string) {
    this.socket?.emit('subscribe', { channelName, chatroomId })
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}
```

## Usage Example

Here's how to use the ChatService:

```typescript
import { ChatService } from './chatservice'

// Initialize the chat service
const chatService = new ChatService()

// Connect to the WebSocket server
chatService.connect()

// Subscribe to a channel (e.g., xQc's channel)
chatService.subscribeToChannel("xqc", "668")
```


::: tip
The WebSocket connection includes automatic reconnection functionality. The system will automatically attempt to reconnect when the connection is lost.
:::

::: warning
The chatroomId is channel-specific and can be obtained through the REST API's channel information endpoint.
:::