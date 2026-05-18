import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[400px]">
        <h1 className="text-3xl font-bold mb-8">
          Sarda Cloth Store Billing System
        </h1>

        <div className="flex flex-col gap-4">
           {/* <Link href="/generate">
            <button className="w-full bg-black text-white py-3 rounded-lg">
              Generate Barcodes
            </button>
          </Link> */}

          {/* <Link href="/upload">
            <button className="w-full bg-green-600 text-white py-3 rounded-lg">
              Upload Barcode & Save Product
            </button>
          </Link>  */}

           {/* <Link href="/products">
  <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
    View Saved Products
  </button>
</Link>  */}

<Link href="/invoice">
  <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
    Generate Invoice
  </button>
</Link>
<Link href="/all-invoice">
  <button className="w-full bg-red-600 text-white py-3 rounded-lg">
    View All Invoices
  </button>
</Link>
<Link href="/dashboard">
  <button className="w-full bg-red-600 text-white py-3 rounded-lg">
    Dashboard
  </button>
</Link>

        </div>
      </div>
    </main>
  );
}