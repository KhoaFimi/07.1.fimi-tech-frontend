import { Hono } from 'hono'

import { register } from '@/modules/auth/api/register'

const app = new Hono()

export const authRoutes = app.post('/register', ...register)
