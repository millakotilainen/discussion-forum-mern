"use client";

import { useEffect, useState } from "react";
import { getAuthUser, clearAuthSession, AuthUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthStatus() {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const authenticated = isAuthenticated();
        const currentUser = getAuthUser();

        setLoggedIn(authenticated);
        setUser(currentUser);
        setReady(true);
    }, []);

    function handleLogout() {
        clearAuthSession();
        setLoggedIn(false);
        setUser(null);
        router.push("/auth/login");
    }

    if (!ready) {
        return <p>Loading auth state...</p>;
    }

    if (!loggedIn || !user) {
        return <p>You are not logged in. <a href="/auth/login" style={{ color: "blue", textDecoration: "underline" }}>Login here</a>.</p>;
    }

    return (
        <div style={{ marginTop: "2rem"}}>
            <p>Logged in as <strong>{user.username}</strong></p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}