// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[400px]">
//         <h1 className="text-3xl font-bold mb-8">
//           Sarda Cloth Store Billing System
//         </h1>

//         <div className="flex flex-col gap-4">
//            {/* <Link href="/generate">
//             <button className="w-full bg-black text-white py-3 rounded-lg">
//               Generate Barcodes
//             </button>
//           </Link> */}

//           {/* <Link href="/upload">
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg">
//               Upload Barcode & Save Product
//             </button>
//           </Link>  */}

//            {/* <Link href="/products">
//   <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
//     View Saved Products
//   </button>
// </Link>  */}

// <Link href="/invoice">
//   <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
//     Generate Invoice
//   </button>
// </Link>
// <Link href="/all-invoice">
//   <button className="w-full bg-red-600 text-white py-3 rounded-lg">
//     View All Invoices
//   </button>
// </Link>
// <Link href="/dashboard">
//   <button className="w-full bg-red-600 text-white py-3 rounded-lg">
//     Dashboard
//   </button>
// </Link>

//         </div>
//       </div>
//     </main>
//   );
// }



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

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer h-full">

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

              <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition">

                Open Billing

              </button>

            </div>

          </Link>

          {/* All Invoices */}
          <Link href="/all-invoice">

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer h-full">

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

              <button className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition">

                View Invoices

              </button>

            </div>

          </Link>

          {/* Dashboard */}
          <Link href="/dashboard">

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer h-full">

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

              <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition">

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