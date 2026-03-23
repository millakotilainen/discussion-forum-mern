"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuthUser, isAuthenticated, clearAuthSession } from "@/lib/auth";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        setLoggedIn(isAuthenticated());
        setUser(getAuthUser());
        setReady(true);
    }, [pathname]);

    function handleLogout() {
        clearAuthSession();
        setLoggedIn(false);
        setUser(null);
        router.push("/auth/login");
        router.refresh();
    }

    return (
    <header
      style={{
        borderBottom: "1px solid #ddd",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        href="/"
        style={{ fontWeight: "bold", fontSize: "1.1rem", textDecoration: "none" }}
      >
        Forum
      </Link>

      {!ready ? (
        <p style={{ margin: 0 }}>Loading...</p>
      ) : loggedIn && user ? (
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Signed in as {user.username}</span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      ) : (
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </nav>
      )}
    </header>
  );
}