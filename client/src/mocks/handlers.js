// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://localhost:4000/api', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json('Server request successful!')
  }),


 http.post('https://cautious-orbit-xjq7wvv9q55hvvrj-4000.app.github.dev/api/register', async ({request})=>{
    const data = await request.json();
    const { firstName, lastName, userName, password} = data;
    if(!firstName || !lastName || !userName || !password){
            return HttpResponse.error();
    }
   return HttpResponse.json(data)
 })
]