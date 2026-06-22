"use client";

import { useState } from "react";
import API from "@/utils/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");
      router.push("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center text-black h-screen">
      <div className="border p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={registerUser}
          className="bg-green-600 text-white p-2 w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}