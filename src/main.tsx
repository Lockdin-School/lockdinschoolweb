import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'
import './index.css'
import {Authenticator} from "@aws-amplify/ui-react"

export const router = createRouter({
    routeTree,
    defaultPreload: 'intent', // Optional: preloads routes on hover
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Authenticator.Provider>
            <RouterProvider router={router}/>
        </Authenticator.Provider>
    </StrictMode>
)