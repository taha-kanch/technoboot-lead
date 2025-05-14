import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const LoginWrapper = React.lazy(
    async () => await import("../../src/pages/auth/Login")
);

const RegisterWrapper = React.lazy(
    async () => await import("../../src/pages/auth/Register")
);

const DashboardWrapper = React.lazy(
    async () => await import("../../src/pages/dashboard")
);

const HomeWrapper = React.lazy(
    async () => await import("../../src/pages/dashboard/Home")
);

const LeadWrapper = React.lazy(
    async () => await import("../../src/pages/dashboard/Lead")
);

let routes = [
    {
        path: `/`,
        element: <LoginWrapper />,
    },
    {
        path: `/login`,
        element: <LoginWrapper />,
    },
    {
        path: `/register`,
        element: <RegisterWrapper />,
    },
    {
        path: `/dashboard`,
        element: (
            <PrivateRoute>
                <DashboardWrapper />
            </PrivateRoute>
        ),
        children: [
            {
                path: `/dashboard`,
                element: (
                    <PrivateRoute>
                        <HomeWrapper />
                    </PrivateRoute>
                )
            },
            {
                path: `/dashboard/home`,
                element: (
                    <PrivateRoute>
                        <HomeWrapper />
                    </PrivateRoute>
                )
            },
            {
                path: `/dashboard/leads`,
                element: (
                    <PrivateRoute>
                        <LeadWrapper />
                    </PrivateRoute>
                )
            },
        ],
    }
];

const router = createBrowserRouter(routes);

export default router;