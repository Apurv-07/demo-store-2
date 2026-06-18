"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, User as UserIcon, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginStart, loginSuccess, loginFailure, clearAuthError } from "../../store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDemoUsers, setShowDemoUsers] = useState(true);
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  // Demo credentials from DummyJSON API
  const demoUsers = [
    { name: "Emily Smith", username: "emilys", pass: "emilyspass", role: "Primary Buyer" },
    { name: "Michael Williams", username: "michaelw", pass: "michaelwpass", role: "Elite Member" },
  ];

  const handleFillCredentials = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    dispatch(clearAuthError());
    dispatch(loginStart());

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 120,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Invalid username or password");
      }

      const userData = await res.json();
      dispatch(loginSuccess(userData));
      setTimeout(() => {
        router.push(redirectTo.startsWith("/") ? redirectTo : "/dashboard");
      }, 1000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      dispatch(loginFailure(msg));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">Unlock Your Account</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sign in to access your dashboard, cart, orders, wishlists, and personalized recommendations.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Member Benefits</h3>
              <div className="space-y-3">
                {[
                  { icon: "✓", text: "Order history and tracking" },
                  { icon: "✓", text: "Saved payment methods" },
                  { icon: "✓", text: "Personalized recommendations" },
                  { icon: "✓", text: "Exclusive member discounts" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className="text-emerald-600 font-bold">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="p-3 bg-gray-900 text-white rounded-xl w-fit">
                  <Lock size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                <p className="text-sm text-gray-500">Access your account and checkout privileges</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3">
                  <AlertCircle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-rose-900">Authentication Error</p>
                    <p className="text-xs text-rose-700 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {isAuthenticated && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">Login Successful!</p>
                    <p className="text-xs text-emerald-700 mt-1">Redirecting to home page...</p>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Username</label>
                  <div className="relative">
                    <UserIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !username || !password || isAuthenticated}
                  className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                  {!isLoading && <ArrowRight size={16} />}
                </button>
              </form>

              {/* Demo Users */}
              {showDemoUsers && (
                <div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Demo Credentials</p>
                    <button
                      type="button"
                      onClick={() => setShowDemoUsers(false)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      Hide
                    </button>
                  </div>
                  <div className="space-y-2">
                    {demoUsers.map((user, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleFillCredentials(user.username, user.pass)}
                        className="w-full text-left p-2 bg-white border border-blue-100 hover:border-blue-300 rounded-lg cursor-pointer transition-colors text-xs"
                      >
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-gray-500">{user.username}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="text-center space-y-2 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-600">
                  Don't have an account?{" "}
                  <Link href="#" className="text-gray-900 font-semibold hover:underline">
                    Sign up here
                  </Link>
                </p>
                <p className="text-xs text-gray-500">All authentication uses DummyJSON API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
