import {createRootRoute, Outlet} from '@tanstack/react-router'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '@/lib/queryClient'
import Auth from "@/providers/auth-provider.tsx";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <QueryClientProvider client={queryClient}>
            <Auth>
                <Outlet/>
            </Auth>
        </QueryClientProvider>
    )
}