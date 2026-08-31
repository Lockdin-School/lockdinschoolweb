import {fetchAuthSession, getCurrentUser} from 'aws-amplify/auth'
import {identity_api, IDENTITY_API_URL} from "@/api/client.ts";


export type Account = {
    id: string
    cognitoSub: string
    email: string
    emailVerified: boolean
    status: string
    createdAt: string
    updatedAt: string
}

export type AuthUser = {
    cognitoInfo: Awaited<ReturnType<typeof getCurrentUser>>
    userInfo: Account | null
    email?: string
    idToken: string
    accessToken: string
}

async function createAccount(params: {
    sub: string
    email: string
    emailVerified: boolean
    status: string
    accessToken: string
}): Promise<Account> {

    const response = await identity_api.post('/accounts', {
        cognitoSub: params.sub,
        email: params.email,
        emailVerified: true,
        status: params.status,

    })

    if (!response) {
        throw new Error('Could not create student account:')
    }

    return await response.data as Promise<Account>
}

export async function getAuthUser(): Promise<AuthUser | null> {
    console.log('Getting auth user')

    console.log('Getting user session')
    const session = await fetchAuthSession()
    const {idToken, accessToken} = session.tokens ?? {}

    if (!idToken || !accessToken) {
        return null
    }


    console.log('Getting current user')
    const user = await getCurrentUser()

    const email = idToken?.payload["email"] as string

    const endpoint = `/accounts/cognito/${user.userId}`

    console.log('Fetching user details from:', endpoint)


    let userInfo: Account | null = null


    const userDetailsResponse = await fetch(`${IDENTITY_API_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken.toString()}`,
        },
    })

    console.log('User details response status:', userDetailsResponse.status)

    if (userDetailsResponse.status === 404) {
        console.log('User not found, creating account');
        userInfo = await createAccount({
            sub: user.userId,
            email,
            emailVerified: true,
            status: 'active',
            accessToken: accessToken.toString(),
        })
    } else {
        if (!userDetailsResponse) {
            throw new Error('Could not fetch user data');
        }

        userInfo = await userDetailsResponse.json() as Account
    }

    return {
        cognitoInfo: user,
        userInfo,
        email,
        idToken: idToken.toString(),
        accessToken: accessToken.toString(),
    }
}