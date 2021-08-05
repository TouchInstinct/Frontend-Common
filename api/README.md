## api

This module helps define callable API methods.

### Usage example

```typescript
import { ApiMethodFactory, HttpMethod } from 'lib/api'

const { make } = new ApiMethodFactory({ apiPrefix: '/api' })

interface User {
  id: string
  name: string
  email: string
}

interface UserRequest {
  id: string
}

interface UserListRequest {
  limit: number
  offset: number
}

type UserResponse = User

type UserListResponse = User[]

type _ = unknown

const API = {
  user: {
    get: make<UserResponse, UserRequest>('/users/%(id)s', HttpMethod.GET, {
      path: ['id'],
    }),
    list: make<UserListResponse, UserListRequest>('/users', HttpMethod.GET, {
      query: ['limit', 'offset'],
    }),
    delete: make<_, UserRequest>('/users/%(id)s', HttpMethod.DELETE, {
      path: ['id'],
    }),
  },
}

const run = async () => {
  const users = await API.user.list({ limit: 10, offset: 0 })

  users.forEach(async (user) => {
    await API.user.delete({
      id: user.id,
    })
  })
}
```
