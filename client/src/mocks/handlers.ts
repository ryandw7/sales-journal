// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('/api', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json('Server request successful!')
  }),
 
]