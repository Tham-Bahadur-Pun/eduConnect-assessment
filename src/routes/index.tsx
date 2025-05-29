import React from "react";

import routePaths from "./routePaths";
const DashboardPage = React.lazy(() => import('../pages/dashboard/Dashboard'))
const UserListPage = React.lazy(() => import('../pages/users/ListUsers'))
const UserDetailPage = React.lazy(() => import('../pages/users/UserDetailPage'))

const routes = [
  { 
     path: routePaths.dashboard,
    element: <DashboardPage />,
    },
{
    path: routePaths.listUsers,
    element: <UserListPage />,
},
{
    path: routePaths.getUsersById,
    element: <UserDetailPage />,
}
]
export default routes;