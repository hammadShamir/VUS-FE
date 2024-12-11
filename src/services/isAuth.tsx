"use client";

import { isAuthenticated } from "./helper";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ComponentType } from "react";

export default function isAuth<T extends object>(Component: ComponentType<T>) {
    return function IsAuth(props: T) {
        const auth = isAuthenticated();

        useEffect(() => {
            if (!auth) {
                const currentPath = window.location.pathname; // Current page path
                const searchParams = window.location.search; // Preserve query params
                const redirectUrl = `${currentPath}${searchParams ? searchParams : ""}`;
                redirect(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
            }
        }, []);

        if (!auth) {
            return null; // Render nothing while redirecting
        }

        return <Component {...props} />;
    };
}
