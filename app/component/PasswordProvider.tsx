"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

const PasswordContext = createContext<any>(null);

export function PasswordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === "0000") {
      localStorage.setItem("auth", "true");

      setIsAuthenticated(true);

      toast.success("Login Successful");
    } else {
      toast.error("Wrong Password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Sarda Cloth Store
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Enter Password to Continue
          </p>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>

        </div>

      </div>
    );
  }
  

  return (
    <PasswordContext.Provider
      value={{ isAuthenticated }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export const usePassword = () =>
  useContext(PasswordContext);