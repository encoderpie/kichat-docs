---
layout: doc
aside: false
---

# API Endpoints

All Kichat API requests should be made to the base URL.

<div class="base-url-container">
  <div class="base-url-content">
    <div class="base-url-label">
      <span class="globe-icon">🌐</span>
      Base URL
    </div>
    <div class="base-url-value">
      <code>{{ baseUrl }}</code>
      <button class="copy-url-button" @click="copyBaseUrl" title="Copy base URL">
        <span class="copy-icon">📋</span>
        Copy
      </button>
    </div>
  </div>
</div>

## Available Endpoints

<script setup>
import { onMounted, ref, computed } from 'vue'

const endpoints = ref([])
const searchQuery = ref('')
const selectedCategory = ref('ALL ENDPOINTS')
const baseUrl = ref('https://api.kichat.dev')

const categories = computed(() => {
  const uniqueCategories = new Set(endpoints.value.map(e => e.category || 'Other'))
  return ['ALL ENDPOINTS', ...Array.from(uniqueCategories).sort()]
})

const filteredEndpoints = computed(() => {
  const query = searchQuery.value.toLowerCase()
  let filtered = endpoints.value.filter(endpoint => {
    const matchesSearch = endpoint.path.toLowerCase().includes(query) ||
      endpoint.method.toLowerCase().includes(query) ||
      endpoint.description.toLowerCase().includes(query)
    
    const matchesCategory = selectedCategory.value === 'ALL ENDPOINTS' || 
      (endpoint.category || 'Other') === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })

  // /api/v2 ile başlayanları en üste al
  filtered.sort((a, b) => {
    const aStartsWithApiV2 = a.path.startsWith('/api/v2')
    const bStartsWithApiV2 = b.path.startsWith('/api/v2')
    
    if (aStartsWithApiV2 && !bStartsWithApiV2) return -1
    if (!aStartsWithApiV2 && bStartsWithApiV2) return 1
    return 0
  })

  return filtered
})

const getBadgeType = (method) => {
  const types = {
    GET: 'tip',
    POST: 'info',
    PUT: 'warning',
    DELETE: 'danger',
    PATCH: 'warning'
  }
  return types[method] || 'default'
}

const copyToClipboard = async (path) => {
  try {
    const fullUrl = `${baseUrl.value}${path}`
    await navigator.clipboard.writeText(fullUrl)
    // İsteğe bağlı: Kopyalama başarılı olduğunda bir bildirim gösterebilirsiniz
  } catch (err) {
    console.error('Kopyalama başarısız:', err)
  }
}

const copyBaseUrl = async () => {
  try {
    await navigator.clipboard.writeText(baseUrl.value)
    // İsteğe bağlı: Kopyalama başarılı olduğunda bir bildirim gösterebilirsiniz
  } catch (err) {
    console.error('Kopyalama başarısız:', err)
  }
}

onMounted(async () => {
  try {
    const response = await fetch('https://api.kichat.dev/routes')
    endpoints.value = await response.json()
  } catch (error) {
    console.error('Error loading endpoint data:', error)
  }
})
</script>

<div class="endpoint-container">
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input 
      v-model="searchQuery"
      type="text"
      placeholder="Search endpoints..."
      class="search-input"
    />
  </div>

  <div class="category-tabs">
    <button 
      v-for="category in categories" 
      :key="category"
      :class="['tab-button', { active: selectedCategory === category }]"
      @click="selectedCategory = category"
    >
      {{ category }}
    </button>
  </div>

  <div class="endpoint-list">
    <div v-for="endpoint in filteredEndpoints" 
         :key="`${endpoint.method}-${endpoint.path}`"
         class="endpoint-item"
    >
      <Badge :type="getBadgeType(endpoint.method)" :text="endpoint.method" class="method-badge" />
      <div class="endpoint-content">
        <div class="endpoint-path-wrapper">
          <code class="endpoint-path">{{ endpoint.path }}</code>
          <button class="copy-button" @click.stop="copyToClipboard(endpoint.path)" title="Copy path">
            <span class="copy-icon">📋</span>
          </button>
        </div>
        <div class="endpoint-desc">{{ endpoint.description }}</div>
      </div>
      <div class="endpoint-arrow">-></div>
    </div>
  </div>
</div>

<style>
.endpoint-container {
  margin: 2rem 0;
  color: var(--vp-c-text-1);
  max-width: 1200px;
}

.search-box {
  position: relative;
  margin-bottom: 2rem;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 8px 12px 8px 35px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  font-size: 14px;
  color: #fff;
  outline: none;
}

.search-input::placeholder {
  color: #666;
}

.category-tabs {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
}

.tab-button {
  background: none;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 2px;
  font-weight: 500;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.tab-button:hover {
  color: #fff;
}

.tab-button.active {
  color: #fff;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4f46e5;
}

.endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 72px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: #1a1a1a;
  border: 1px solid #333;
}

.endpoint-item:hover {
  background: #222;
  border-color: #444;
}

.method-badge {
  width: 68px;
  text-align: center;
  font-weight: 600;
}

.endpoint-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  height: 100%;
  padding: 12px 0;
}

.endpoint-path-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.endpoint-path {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.4;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
}

.endpoint-item:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  background: #333;
  color: #fff;
}

.endpoint-desc {
  font-size: 13px;
  line-height: 1.4;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.endpoint-arrow {
  color: #666;
  font-size: 18px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .endpoint-item {
    height: 64px;
    padding: 0 12px;
    gap: 12px;
  }

  .method-badge {
    width: 56px;
    font-size: 12px;
  }

  .category-tabs {
    gap: 1rem;
  }

  .tab-button {
    font-size: 12px;
  }
}

.base-url-container {
  margin: 2rem 0;
  padding: 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
}

.base-url-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.base-url-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  width: 100px;
  flex-shrink: 0;
}

.globe-icon {
  font-size: 16px;
}

.base-url-value {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.base-url-value code {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: #fff;
  padding: 0;
  background: transparent;
}

.copy-url-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #444;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: auto;
  flex-shrink: 0;
}

.copy-url-button:hover {
  background: #333;
  border-color: #666;
}

.copy-url-button .copy-icon {
  font-size: 14px;
}

@media (max-width: 640px) {
  .base-url-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .base-url-value {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

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