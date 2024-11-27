import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const ExpertView = lazy(() => import('./ExpertView'))

const expertViewRoutes: RouteObject[] = [
    {
        path: '/expertview/:chatflowid',
        element: <ExpertView />
    }
]

export default expertViewRoutes 