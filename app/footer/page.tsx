"use client";

import Link from "next/link";

export default function Footer() {

  return (

    <footer className="mt-16 border-t border-gray-200 bg-white">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left */}
          <div>

            <h2 className="text-lg font-bold text-gray-800 tracking-wide">
              Sarda Cloth Store
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Smart Billing & Invoice Management System
            </p>

          </div>

          {/* Center */}
          <div className="text-center">

            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} All Rights Reserved
            </p>

          </div>

          {/* Right */}
          <div className="flex items-center gap-2 text-sm">

            <span className="text-gray-500">
              Developed by
            </span>

            <Link
              href="https://a2zitsolution.netlify.app"
              target="_blank"
              className="font-semibold text-black hover:text-indigo-600 transition-colors duration-200"
            >
              A2Z IT SOLUTION
            </Link>

          </div>

        </div>

      </div>

    </footer>

  );

}