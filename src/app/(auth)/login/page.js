"use client";

import Link from "next/link";
import { Coffee, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl bg-white m-4 min-h-[600px]">
      {/* Left side - Branding/Image */}
      <div className="hidden md:flex md:w-1/2 bg-[#1E3023] p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E3023]">
            <Coffee size={20} />
          </div>
          <span className="text-white font-bold text-2xl tracking-wide">
            Kokin
          </span>
        </div>

        <div className="relative z-10 mt-auto">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Manage your coffee shop with elegance.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            Streamline your orders, track inventory, and grow your business with
            our intuitive dashboard.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-white relative">
        <div className="max-w-sm w-full mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@kokin.com"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20 bg-gray-50/50 focus:bg-white transition-colors"
                defaultValue="admin@kokin.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E3023]/20 bg-gray-50/50 focus:bg-white transition-colors"
                defaultValue="password"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[#1E3023] focus:ring-[#1E3023]"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me for 30 days
              </label>
            </div>

            <Link href="/dashboard" className="block mt-8">
              <button className="w-full bg-[#1E3023] hover:bg-[#2a4231] text-white py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center gap-2 group">
                Sign In
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-[#1E3023] font-semibold hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
