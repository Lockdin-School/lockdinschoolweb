import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

export type BackendUser = {
    id: string
    email?: string
    username?: string
}

export type AuthUser = {
    cognitoInfo: Awaited<ReturnType<typeof getCurrentUser>>
    userInfo: BackendUser | null
    email?: string
    idToken: string
    accessToken: string
}

async function createBackendUser(params: {
    userId: string
    username?: string
    email?: string
    accessToken: string
}): Promise<BackendUser> {
    const response = await fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${params.accessToken}`,
        },
        body: JSON.stringify({
            id: params.userId,
            username: params.username,
            email: params.email,
        }),
    })

    if (!response.ok) {
        throw new Error('Could not create user')
    }

    return await response.json() as Promise<BackendUser>
}

export async function getAuthUser(): Promise<AuthUser | null> {
    try {
        const session = await fetchAuthSession()
        const { idToken, accessToken } = session.tokens ?? {}

        if (!idToken || !accessToken) {
            return null
        }

        const user = await getCurrentUser()

        const email = typeof idToken.payload.email === 'string'
            ? idToken.payload.email
            : undefined

        const endpoint = `/students/${user.userId}`

        let userInfo: BackendUser | null = null

        const userDetailsResponse = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken.toString()}`,
            },
        })

        if (userDetailsResponse.status === 404) {
            userInfo = await createBackendUser({
                userId: user.userId,
                username: user.username,
                email,
                accessToken: accessToken.toString(),
            })
        } else {
            if (!userDetailsResponse.ok) {
                throw new Error('Could not fetch user data');
            }

            userInfo = await userDetailsResponse.json() as BackendUser
        }

        return {
            cognitoInfo: user,
            userInfo,
            email,
            idToken: idToken.toString(),
            accessToken: accessToken.toString(),
        }
    } catch {
        return null
    }
}