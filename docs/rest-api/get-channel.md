---
aside: false
outline: false
title: Get Channel
---

# Get Channel

This endpoint allows you to retrieve detailed information about any channel on the Kick platform.

<script setup>
import spec from '../public/openapi.json'

const baseUrl = 'https://api.kichat.dev'
const endpoint = '/api/v2/channels/{channelName}'

// Update the Endpoint URL
spec.servers = [{ url: baseUrl }]

// Add an example value for channelName
spec.paths['/api/v2/channels/{channelName}'].get.parameters[0].example = 'xqc'
</script>

<ClientOnly>
  <OASpec 
    :spec="spec" 
    operation="getChannel" 
    :tryText="'Try It'" 
    :serverUrl="baseUrl"
    :hideInfo="true"
    :hideServers="true"
  />
</ClientOnly>