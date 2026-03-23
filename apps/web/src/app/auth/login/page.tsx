"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useRouter } from "next/navigation";
import { setAuthSession } from "@/lib/auth";

type LoginResponse = {
  token: string;
  user: { id: string; email: string; username: string };
};

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
      const response = await apiPost<LoginResponse>("/auth/login", { email, password });

      console.log("Login successful:", response);
      setAuthSession(response.token, response.user);
      router.push("/");
    } catch (err) {
      try {
        const parsed = JSON.parse((err as Error).message);
        
        if (parsed.error === "InvalidCredentials") {
          setError("Invalid email or password.");
        } else if (parsed.error === "ValidationError") {
          setError("Invalid input. Please check your email and password.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch {
        setError((err as Error).message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <main style = {{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1>Login</h1>
      <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required style={{ width: "100%" }} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required style={{ width: "100%" }} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}