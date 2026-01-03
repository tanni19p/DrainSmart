import { useState } from "react";
import API_BASE_URL from "../config/api";

const AuthForm = ({ role, onAuthSuccess }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inputClass = `
    w-full px-4 py-3 rounded-lg border
    border-gray-300 dark:border-gray-700
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      mode === "signup"
        ? "/api/auth/signup"
        : "/api/auth/login";

    const payload =
      mode === "signup"
        ? { email, password, role: role.toLowerCase() }
        : { email, password };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      onAuthSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-1">
        {mode === "signin" ? "Sign In" : "Sign Up"} as {role}
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
        {mode === "signin"
          ? "Access your dashboard"
          : "Create a new account"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        {mode === "signin" ? (
          <>
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("signin")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
