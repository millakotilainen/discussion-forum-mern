"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useRouter } from "next/navigation";

type RegisterResponse = {
    id: string;
    username: string;
    email: string;
};

export default function RegisterPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        setFieldErrors({});

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try { 
            await apiPost<RegisterResponse>("/auth/register", { username, email, password });
            router.push("/auth/login");
        } catch (err) {
            if (err instanceof Error) {
                try {
                    const parsed = JSON.parse(err.message);

                    if (parsed.error === "ValidationError") {
                        setFieldErrors(parsed.fields);
                    } else if (parsed.error === "EmailAlreadyInUse") {
                        setError("This email is already in use. Please use a different email.");
                    } else {
                        setError("Something went wrong. Please try again.");
                    }
                } catch {
                     if (err.message.includes("409")) {
                        setError("This email is already in use. Please use a different email.");
                    } else {
                        setError(err.message || "An error occurred during registration.");
                    }
                }
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
    <main style={{ maxWidth: "420px", margin: "4rem auto", padding: "1rem" }}>
      <h1>Register</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            style={{ width: "100%" }}
          />
          {fieldErrors.username && (
            <p style={{ color: "red" }}>{fieldErrors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{ width: "100%" }}
          />
          {fieldErrors.email && (
            <p style={{ color: "red" }}>{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{ width: "100%" }}
          />
          {fieldErrors.password && (
            <p style={{ color: "red" }}>{fieldErrors.password}</p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
}