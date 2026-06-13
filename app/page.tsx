"use client";

import Link from "next/link";
import {
  Receipt,
  FileText,
  BarChart3,
  Store,
} from "lucide-react";
import Footer from "./component/footer/page";

export default function Home() {
  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl">


        {/* Top Section */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-black text-white shadow-2xl mb-6">

            <Store size={38} />

          </div>

          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">

            Sarda Cloth Store

          </h1>

          <p className="text-gray-500 text-lg mt-4">

            Smart Billing & Invoice Management System

          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Invoice */}
          <Link href="/invoice">
  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer h-full flex flex-col">

    <div>
      <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">
        <Receipt
          size={32}
          className="text-purple-700"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Generate Invoice
      </h2>

      <p className="text-gray-500 leading-7">
        Create thermal invoices with GST,
        item management, customer details,
        and instant printing support.
      </p>
    </div>

    <button className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition">
      Open Billing
    </button>

  </div>
</Link>

          {/* All Invoices */}
       <Link href="/all-invoice">
  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer h-full flex flex-col">

    <div>
      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">
        <FileText
          size={32}
          className="text-red-600"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        All Invoices
      </h2>

      <p className="text-gray-500 leading-7">
        Search, filter, print, edit and
        manage all invoices from any
        device using cloud sync.
      </p>
    </div>

    <button className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition">
      View Invoices
    </button>

  </div>
</Link>
          {/* Dashboard */}
   <Link href="/dashboard">
  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer h-full flex flex-col">

    <div>
      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">
        <BarChart3
          size={32}
          className="text-blue-700"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Sales Dashboard
      </h2>

      <p className="text-gray-500 leading-7">
        Analyze daily, weekly, monthly,
        quarterly sales and identify
        top-selling products instantly.
      </p>
    </div>

    <button className="mt-auto  w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition">
      Open Dashboard
    </button>

  </div>
</Link>
        </div>

        {/* Bottom */}
     

      </div>

    </main>
    <Footer/>
 </>
  );
}