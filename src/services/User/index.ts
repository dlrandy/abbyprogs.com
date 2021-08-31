import {client} from '@app/utils/api-client'
import * as auth from '@app/auth/provider'
async function getUser(): Promise<User | null> {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client<unknown, {user: User}>('me', {token})
    user = data.user
  }

  return user
}

export {getUser}
