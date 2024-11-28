import { lazy } from 'react'

// project imports
import Loadable from '@/ui-component/loading/Loadable'
import MinimalLayout from '@/layout/MinimalLayout'

// expert view routing
const ExpertViewFull = Loadable(lazy(() => import('@/views/expertview')))

// ==============================|| EXPERT VIEW ROUTING ||============================== //

const ExpertViewRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/expertview/:chatflowid',
            element: <ExpertViewFull />
        }
    ]
}

export default ExpertViewRoutes
