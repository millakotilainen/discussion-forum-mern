"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavWrapper() {
    const pathname = usePathname();

    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
        return null;
    }

    return <Navbar />;
}