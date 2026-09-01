import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/subjects')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
