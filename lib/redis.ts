import { createClient } from 'redis'

const redis = createClient({
  url: 'redis://localhost:6379'
})

redis.on('error', (err) => console.error('Redis Client Error', err))

// Connect only if not already connected
if (!redis.isOpen) {
  redis.connect()
}

export default redis
