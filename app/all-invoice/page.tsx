
//new one
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

type InvoiceItem = {
  itemName: string;
  qty: number;
  price: number;
};

type Invoice = {
  invoiceNo: string;
  customerName: string;
  mobileNo: string;
  gstNo: string;
  items: InvoiceItem[];
  subtotal: number;
  gstAmount: number;
  discount: number;
  finalTotal: number;
  date: string;
  time: string;
};

export default function AllInvoicesPage() {
  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

    const [searchBillNo, setSearchBillNo] =
  useState("");

const [searchCustomer, setSearchCustomer] =
  useState("");

const [searchDate, setSearchDate] =
  useState("");

const [searchMonth, setSearchMonth] =
  useState("");
const [editingInvoice, setEditingInvoice] =
  useState<any>(null);

  const [loading, setLoading] =
  useState(true);
  // Load Invoices
  // useEffect(() => {
  //   const savedInvoices = JSON.parse(
  //     localStorage.getItem("invoices") ||
  //       "[]"
  //   );

  //   setInvoices(savedInvoices.reverse());
  // }, []);


const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbwkvmnoVjLwF4XUvMWNuHSKtBYXNWejW0UfrA22AbdvaUYtgM46SKbTE2Gkp6fnaBEo/exec";

useEffect(() => {

  const fetchInvoices = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        GOOGLE_SHEET_API
      );

      const text = await res.text();

      console.log(
        "RAW RESPONSE:",
        text
      );

      if (
        !text ||
        text.trim() === ""
      ) {

        setInvoices([]);
        return;

      }

      const data =
        JSON.parse(text);

      console.log(
        "PARSED DATA:",
        data
      );

      setInvoices(
        data.reverse()
      );

    } catch (error) {

      console.log(
        "Fetch Error:",
        error
      );

      setInvoices([]);

    } finally {

      setLoading(false);

    }

  };

  fetchInvoices();

}, []);

//   useEffect(() => {
//   const fetchInvoices = async () => {
//     try {
//       const res = await fetch(GOOGLE_SHEET_API);

//       const text = await res.text();

//       console.log("RAW RESPONSE:", text);

//       if (!text || text.trim() === "") {
//         throw new Error("Empty response from server");
//       }

//       const data = JSON.parse(text);

//       console.log("PARSED DATA:", data);

//       setInvoices(data.reverse());
//     } catch (error) {
//       console.log("Fetch Error:", error);
//     }
//   };

//   fetchInvoices();
// }, []);
  // Thermal Print
  // Print Invoice
const printInvoice = (
  invoiceNo: string
) => {

  const printContents =
    document.getElementById(
      `invoice-${invoiceNo}`
    )?.innerHTML;

  if (!printContents) return;

  const printWindow = window.open(
    "",
    "",
    "width=400,height=800"
  );

  if (!printWindow) return;

  printWindow.document.write(`

    <html>

      <head>

        <title>Thermal Bill</title>

        <style>

          @page{
            size:80mm auto;
            margin:0;
          }

          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            padding:8px;
            width:80mm;
            background:white;
            color:black;
            font-family:'Courier New', monospace;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #thermal-bill{
            width:100%;
            border:1px solid #000;
            padding:10px;
            font-size:12px;
          }

          h1,h2,h3,h4,h5,h6,p{
            margin:0;
            padding:0;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:6px;
          }

          th{
            border-bottom:0.8px solid #444;
            padding:5px 0;
            text-align:left;
            font-size:12px;
          }

          td{
            border-bottom:1px dashed black;
            padding:5px 0;
            font-size:12px;
          }

          .border{
            border:0.8px solid #444 !important;
          }

          .border-black{
            border-color:black !important;
          }

          .border-dashed{
            border-style:dashed !important;
          }

          .border-t{
            border-top:0.5px dashed #777 !important;
          }

          .border-b{
            border-bottom:0.5px dashed #777 !important;
          }

          .rounded-md{
            border-radius:6px;
          }

          .grid{
            display:grid;
          }

          .grid-cols-3{
            grid-template-columns:1fr 1fr 1fr;
          }

          .gap-2{
            gap:8px;
          }

          .p-2{
            padding:8px;
          }

          .pb-1{
            padding-bottom:4px;
          }

          .my-3{
            margin-top:12px;
            margin-bottom:12px;
          }

          .mt-1{
            margin-top:4px;
          }

          .mt-3{
            margin-top:12px;
          }

          .mt-4{
            margin-top:16px;
          }

          .space-y-2 > * + *{
            margin-top:8px;
          }

          .text-center{
            text-align:center;
          }

          .text-right{
            text-align:right;
          }

          .flex{
            display:flex;
          }

          .justify-between{
            justify-content:space-between;
          }

          .font-bold{
            font-weight:bold;
          }

          .font-semibold{
            font-weight:600;
          }

          .uppercase{
            text-transform:uppercase;
          }

          .tracking-wide{
            letter-spacing:1px;
          }

          .leading-5{
            line-height:20px;
          }

          .text-\\[22px\\]{
            font-size:22px;
          }

          .text-\\[18px\\]{
            font-size:18px;
          }

          .text-\\[12px\\]{
            font-size:12px;
          }

          .text-\\[11px\\]{
            font-size:11px;
          }

          .text-\\[10px\\]{
            font-size:10px;
          }

          @media print{

            body{
              width:80mm;
            }

            #thermal-bill{
              border:1px solid black !important;
            }

            .border{
              border:1px solid black !important;
            }

            .border-dashed{
              border-style:dashed !important;
            }

            .border-t{
              border-top:1px dashed black !important;
            }

            .border-b{
              border-bottom:1px dashed black !important;
            }

          }

        </style>

      </head>

      <body>

        <div id="thermal-bill">

          ${printContents}

        </div>

      </body>

    </html>

  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(() => {

    printWindow.print();

    printWindow.close();

  }, 500);
};
// const deleteInvoice = async (
//   invoiceNo: string
// ) => {

//   const confirmDelete =
//     confirm(
//       "Delete this invoice?"
//     );

//   if (!confirmDelete) return;

//   try {

//     await fetch(
//       GOOGLE_SHEET_API,
//       {
//         method: "POST",
//         mode: "no-cors",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },

//         body: JSON.stringify({
//           action: "delete",
//           invoiceNo,
//         }),
//       }
//     );

//     // Remove from UI
//     const updatedInvoices =
//       invoices.filter(
//         (invoice) =>
//           invoice.invoiceNo !==
//           invoiceNo
//       );

//     setInvoices(
//       updatedInvoices
//     );

//     alert(
//       "Invoice Deleted Successfully"
//     );

//   } catch (error) {

//     console.log(error);

//   }

// };
const saveEditedInvoice =
  async () => {

  try {

    const subtotal =
      editingInvoice.items.reduce(
        (
          total:any,
          item:any
        ) =>
          total +
          item.qty *
            item.price,
        0
      );

    // const gstAmount =
    //   subtotal * 0.05;
    const gstAmount = subtotal - subtotal / 1.05;


    // const finalTotal =
    //   subtotal +
    //   gstAmount -
    //   editingInvoice.discount;


      const finalTotal =
      subtotal +
      editingInvoice.discount;
    const updatedInvoice = {

      ...editingInvoice,

      subtotal,
      gstAmount,
      finalTotal,

    };

    await fetch(
      GOOGLE_SHEET_API,
      {
        method: "POST",
        mode:'no-cors',

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedInvoice
        ),
      }
    );

    const updatedInvoices =
      invoices.map((inv) =>
        inv.invoiceNo ===
        updatedInvoice.invoiceNo
          ? updatedInvoice
          : inv
      );

    setInvoices(
      updatedInvoices
    );

    setEditingInvoice(null);

  } catch (error) {

    console.log(error);

  }

};



const filteredInvoices =
  invoices.filter((invoice) => {

    // Bill No Filter
    const billMatch =
      invoice.invoiceNo
        .toString()
        .toLowerCase()
        .includes(
          searchBillNo.toLowerCase()
        );

    // Customer Filter
    const customerMatch =
      invoice.customerName
        ?.toLowerCase()
        .includes(
          searchCustomer.toLowerCase()
        );

    // Date Filter
    let formattedDate = "";

    if (invoice.date) {

      const d =
        new Date(invoice.date);

      formattedDate =
        `${String(
          d.getDate()
        ).padStart(2, "0")}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}-${d.getFullYear()}`;

    }

    const dateMatch =
      searchDate === ""
        ? true
        : formattedDate ===
          searchDate;

    // Month Filter
    let invoiceMonth = "";

    if (invoice.date) {

      const d =
        new Date(invoice.date);

      invoiceMonth =
        `${d.getFullYear()}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}`;

    }

    const monthMatch =
      searchMonth === ""
        ? true
        : invoiceMonth ===
          searchMonth;

    return (
      billMatch &&
      customerMatch &&
      dateMatch &&
      monthMatch
    );

  });
// Download Invoice
const downloadInvoice = (
  invoiceNo: string
) => {

  const invoiceElement =
    document.getElementById(
      `invoice-${invoiceNo}`
    );

  if (!invoiceElement) return;

  const fullHTML = `

    <html>

      <head>

        <title>Invoice ${invoiceNo}</title>

        <style>

          @page{
            size:80mm auto;
            margin:0;
          }

          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            padding:8px;
            width:80mm;
            background:white;
            color:black;
            font-family:'Courier New', monospace;
          }

          #thermal-bill{
            width:100%;
            border:1px solid #000;
            padding:10px;
            font-size:12px;
          }

          h1,h2,h3,h4,h5,h6,p{
            margin:0;
            padding:0;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:6px;
          }

          th{
            border-bottom:0.8px solid #444;
            padding:5px 0;
            text-align:left;
            font-size:12px;
          }

          td{
            border-bottom:1px dashed black;
            padding:5px 0;
            font-size:12px;
          }

          .border{
            border:0.8px solid #444 !important;
          }

          .border-black{
            border-color:black !important;
          }

          .border-dashed{
            border-style:dashed !important;
          }

          .border-t{
            border-top:0.5px dashed #777 !important;
          }

          .border-b{
            border-bottom:0.5px dashed #777 !important;
          }

          .rounded-md{
            border-radius:6px;
          }

          .grid{
            display:grid;
          }

          .grid-cols-3{
            grid-template-columns:1fr 1fr 1fr;
          }

          .gap-2{
            gap:8px;
          }

          .p-2{
            padding:8px;
          }

          .pb-1{
            padding-bottom:4px;
          }

          .my-3{
            margin-top:12px;
            margin-bottom:12px;
          }

          .mt-1{
            margin-top:4px;
          }

          .mt-3{
            margin-top:12px;
          }

          .mt-4{
            margin-top:16px;
          }

          .space-y-2 > * + *{
            margin-top:8px;
          }

          .text-center{
            text-align:center;
          }

          .text-right{
            text-align:right;
          }

          .flex{
            display:flex;
          }

          .justify-between{
            justify-content:space-between;
          }

          .font-bold{
            font-weight:bold;
          }

          .font-semibold{
            font-weight:600;
          }

          .uppercase{
            text-transform:uppercase;
          }

          .tracking-wide{
            letter-spacing:1px;
          }

          .leading-5{
            line-height:20px;
          }

        </style>

      </head>

      <body>

        <div id="thermal-bill">

          ${invoiceElement.innerHTML}

        </div>

      </body>

    </html>

  `;

  const blob = new Blob(
    [fullHTML],
    {
      type: "text/html",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = `invoice-${invoiceNo}.html`;

  a.click();

  window.URL.revokeObjectURL(url);
};
const startEdit = (
  invoice:any
) => {

  setEditingInvoice(
    JSON.parse(
      JSON.stringify(invoice)
    )
  );

};

  return (
    <main className="min-h-screen bg-gray-100 p-6">


{editingInvoice && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

  <div className="bg-white p-6 rounded-2xl w-[700px] max-h-[90vh] overflow-auto">

    <h2 className="text-2xl font-bold mb-6">
      Edit Invoice
    </h2>

    <div className="space-y-4">

      <input
        type="text"
        value={editingInvoice.invoiceNo}
        onChange={(e) =>
          setEditingInvoice({
            ...editingInvoice,
            invoiceNo:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
        placeholder="Invoice No"
      />

      <input
        type="text"
        value={editingInvoice.customerName}
        onChange={(e) =>
          setEditingInvoice({
            ...editingInvoice,
            customerName:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
        placeholder="Customer Name"
      />

      <input
        type="text"
        value={editingInvoice.mobileNo}
        onChange={(e) =>
          setEditingInvoice({
            ...editingInvoice,
            mobileNo:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <input
        type="text"
        value={editingInvoice.gstNo}
        onChange={(e) =>
          setEditingInvoice({
            ...editingInvoice,
            gstNo:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      {editingInvoice.items.map(
        (
          item:any,
          index:number
        ) => (

        <div
          key={index}
          className="grid grid-cols-3 gap-3"
        >

          <input
            type="text"
            value={item.itemName}
            onChange={(e) => {

              const updatedItems =
                [
                  ...editingInvoice.items,
                ];

              updatedItems[index]
                .itemName =
                e.target.value;

              setEditingInvoice({
                ...editingInvoice,
                items:
                  updatedItems,
              });

            }}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            value={item.qty}
            onChange={(e) => {

              const updatedItems =
                [
                  ...editingInvoice.items,
                ];

              updatedItems[index]
                .qty =
                Number(
                  e.target.value
                );

              setEditingInvoice({
                ...editingInvoice,
                items:
                  updatedItems,
              });

            }}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            value={item.price}
            onChange={(e) => {

              const updatedItems =
                [
                  ...editingInvoice.items,
                ];

              updatedItems[index]
                .price =
                Number(
                  e.target.value
                );

              setEditingInvoice({
                ...editingInvoice,
                items:
                  updatedItems,
              });

            }}
            className="border p-3 rounded-xl"
          />

        </div>

      ))}

      <input
        type="number"
        value={editingInvoice.discount}
        onChange={(e) =>
          setEditingInvoice({
            ...editingInvoice,
            discount:
              Number(
                e.target.value
              ),
          })
        }
        className="w-full border p-3 rounded-xl"
        placeholder="Discount"
      />

    </div>

    <div className="grid grid-cols-2 gap-4 mt-6">

      <button
        onClick={() =>
          setEditingInvoice(
            null
          )
        }
        className="bg-gray-400 text-white py-3 rounded-xl"
      >
        Cancel
      </button>

      <button
        onClick={
          saveEditedInvoice
        }
        className="bg-green-600 text-white py-3 rounded-xl"
      >
        Save Changes
      </button>

    </div>

  </div>

</div>

)}
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          All Thermal Bills
        </h1>

        <Link href="/invoice">
          <button className="bg-black text-white px-5 py-3 rounded-lg">
            Create Invoice
          </button>
        </Link>

      </div>

      <div className="bg-white p-5 rounded-2xl shadow-lg mb-8">

  <h2 className="text-xl font-bold mb-4">
    Filter Bills
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

    
    <input
      type="text"
      placeholder="Search Bill No"
      value={searchBillNo}
      onChange={(e) =>
        setSearchBillNo(
          e.target.value
        )
      }
      className="border px-4 py-3 rounded-xl"
    />

    
    <input
      type="text"
      placeholder="Customer Name"
      value={searchCustomer}
      onChange={(e) =>
        setSearchCustomer(
          e.target.value
        )
      }
      className="border px-4 py-3 rounded-xl"
    />

    
    <input
      type="text"
      placeholder="dd-mm-yyyy"
      value={searchDate}
      onChange={(e) =>
        setSearchDate(
          e.target.value
        )
      }
      className="border px-4 py-3 rounded-xl"
    />

        <input
      type="month"
      value={searchMonth}
      onChange={(e) =>
        setSearchMonth(
          e.target.value
        )
      }
      className="border px-4 py-3 rounded-xl"
    />

  </div>

</div> */}



{/* Header */}
<div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 mb-8">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

    {/* Left */}
    <div>

      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
        All Thermal Bills
      </h1>

      <p className="text-gray-500 mt-2 text-sm">
        Manage, filter, print and download invoices easily
      </p>

    </div>

    {/* Right Buttons */}
    <div className="flex flex-wrap gap-3">

      <Link href="/invoice">
        <button className="bg-gradient-to-r from-black to-gray-800 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
          + Create Invoice
        </button>
      </Link>

      <Link href="/dashboard">
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
          Dashboard
        </button>
      </Link>

    </div>

  </div>

</div>

{/* Filter Section */}
<div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 mb-10">

  {/* Top */}
  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-2xl font-bold text-gray-800">
        Filter Bills
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        Search invoices quickly using filters
      </p>

    </div>

    {/* Reset Filters */}
    <button
      onClick={() => {
        setSearchBillNo("");
        setSearchCustomer("");
        setSearchDate("");
        setSearchMonth("");
      }}
      className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-5 py-2 rounded-xl transition-all duration-300"
    >
      Reset
    </button>

  </div>

  {/* Filters */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

    {/* Bill No */}
    <div className="space-y-2">

      <label className="text-sm font-semibold text-gray-700">
        Bill Number
      </label>

      <div className="relative">

        <input
          type="text"
          placeholder="Search bill no..."
          value={searchBillNo}
          onChange={(e) =>
            setSearchBillNo(e.target.value)
          }
          className="w-full border border-gray-300 focus:border-black focus:ring-4 focus:ring-gray-200 outline-none px-4 py-3 rounded-2xl bg-gray-50 transition-all"
        />

      </div>

    </div>

    {/* Customer */}
    <div className="space-y-2">

      <label className="text-sm font-semibold text-gray-700">
        Customer Name
      </label>

      <input
        type="text"
        placeholder="Search customer..."
        value={searchCustomer}
        onChange={(e) =>
          setSearchCustomer(e.target.value)
        }
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none px-4 py-3 rounded-2xl bg-gray-50 transition-all"
      />

    </div>

    {/* Date */}
    <div className="space-y-2">

      <label className="text-sm font-semibold text-gray-700">
        Invoice Date
      </label>

      <input
        type="text"
        placeholder="dd-mm-yyyy"
        value={searchDate}
        onChange={(e) =>
          setSearchDate(e.target.value)
        }
        className="w-full border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none px-4 py-3 rounded-2xl bg-gray-50 transition-all"
      />

    </div>

    {/* Month */}
    <div className="space-y-2">

      <label className="text-sm font-semibold text-gray-700">
        Month Wise
      </label>

      <input
        type="month"
        value={searchMonth}
        onChange={(e) =>
          setSearchMonth(e.target.value)
        }
        className="w-full border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none px-4 py-3 rounded-2xl bg-gray-50 transition-all"
      />

    </div>

  </div>

  {/* Bottom Stats */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">

      <p className="text-sm text-blue-700 font-semibold">
        Total Bills
      </p>

      <h3 className="text-3xl font-bold text-blue-900 mt-2">
        {filteredInvoices.length}
      </h3>

    </div>

    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">

      <p className="text-sm text-green-700 font-semibold">
        Total Sales
      </p>

      <h3 className="text-3xl font-bold text-green-900 mt-2">

        ₹{" "}
        {filteredInvoices
          .reduce(
            (acc, curr) =>
              acc + curr.finalTotal,
            0
          )
          .toFixed(2)}

      </h3>

    </div>

    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200">

      <p className="text-sm text-purple-700 font-semibold">
        Customers
      </p>

      <h3 className="text-3xl font-bold text-purple-900 mt-2">

        {
          new Set(
            filteredInvoices.map(
              (i) => i.customerName
            )
          ).size
        }

      </h3>

    </div>

  </div>

</div>
      
      {/* Loader */}
{loading && (

  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

    <div className="flex justify-center">

      <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

    </div>

    <p className="mt-5 text-gray-500 text-lg font-medium">

      Loading Bills...

    </p>

  </div>

)}

{/* Empty State */}
{!loading &&
  invoices.length === 0 && (

  <div className="bg-white rounded-2xl shadow-lg p-14 text-center">

    <div className="text-6xl mb-5">
      📄
    </div>

    <h2 className="text-2xl font-bold text-gray-800">

      No Bills Found

    </h2>

    <p className="text-gray-500 mt-3">

      Your invoices will appear here.

    </p>

  </div>

)}

      {/* Bills */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">



        {filteredInvoices.map(
          (invoice, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-5"
            >

              {/* Bill */}
             <div
  id={`invoice-${invoice.invoiceNo}`}
  className="w-[80mm] bg-white text-black p-3 border border-gray-400 text-[12px] mx-auto"
>

  {/* Header */}
  <div className="text-center">

    <h1 className="text-[22px] font-bold tracking-wide uppercase">
      SARDA CLOTH STORE
    </h1>

    <p className="text-[11px]">
Annapurna Apartment, Lithuria Rd
    </p>

    <p className="text-[11px]">
Asansol, Neamatpur - 713359
    </p>

    <p className="text-[11px]">
      GST No: 22AAAAA0000A1Z5
    </p>


<div className="flex justify-between text-[11px] gap-4">
  
  <div>
    <p>Mob No: 7908767210</p>
    <p className="ml-[45px]">8409877498</p>
  </div>

  <p>sardaclothstore@gmail.com</p>

</div>
  </div>

  {/* Line */}
  <div className="border-t my-3"></div>

  {/* Bill Info */}
  <div className="grid grid-cols-3 gap-2">

    <div className="border border-black rounded-md p-2 text-center">

      <p className="text-[10px] font-bold uppercase">
        Bill No
      </p>

      <p className="font-bold mt-1">
        {invoice.invoiceNo}
      </p>

    </div>

    <div className="border border-black rounded-md p-2 text-center">

      <p className="text-[10px] font-bold uppercase">
        Date
      </p>

      <p className="font-bold mt-1">
{new Date(invoice.date)
  .toLocaleDateString("en-GB")
  .replace(/\//g, "-")}      </p>

    </div>

    <div className="border border-black rounded-md p-2 text-center">

      <p className="text-[10px] font-bold uppercase">
        Time
      </p>

      <p className="font-bold mt-1">
{new Date(invoice.time)
  .toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })}      </p>

    </div>

  </div>

  {/* Customer */}
  <div className="mt-4 space-y-2">

    <div className="flex justify-between border-b pb-1">

      <span className="font-semibold">
        Customer
      </span>

      <span>
        {invoice.customerName || "-"}
      </span>

    </div>

    <div className="flex justify-between border-b pb-1">

      <span className="font-semibold">
        Mobile
      </span>

      <span>
        {invoice.mobileNo || "-"}
      </span>

    </div>

    <div className="flex justify-between border-b pb-1">

      <span className="font-semibold">
        GST No
      </span>

      <span>
        {invoice.gstNo || "-"}
      </span>

    </div>

  </div>

  {/* Line */}
  <div className="border-t my-3"></div>

  {/* Items Table */}
  <table className="w-full text-[12px] border-collapse">

    <thead>

      <tr className="border-b border-black">

        <th className="text-left py-1">
          S
        </th>

        <th className="text-left py-1">
          Item
        </th>

        <th className="text-center py-1">
          Qty
        </th>
         <th className="text-center py-1">
          Rate
        </th>

        <th className="text-right py-1">
          Amt
        </th>

      </tr>

    </thead>

    <tbody>

      {invoice.items.map((item, itemIndex) => (

        <tr
          key={itemIndex}
          className="border-b"
        >

          <td className="py-1">
            {itemIndex + 1}
          </td>

          <td className="py-1">
            {item.itemName}
          </td>

          <td className="py-1 text-center">
            {item.qty}
          </td>
          <td className="py-1 text-center">
            {item.price}
          </td>

          <td className="py-1 text-right">

            ₹{" "}
            {(item.qty * item.price).toFixed(2)}

          </td>

        </tr>

      ))}

    </tbody>

  </table>

  {/* Line */}
  <div className="border-t my-3"></div>

  {/* Totals */}
  <div className="space-y-2">

    <div className="flex justify-between">

      <p>
        Subtotal
      </p>

      <p>
        ₹ {invoice.subtotal.toFixed(2)}
      </p>

    </div>

    <div className="flex justify-between">

      <p>
        GST (5%)
      </p>

      <p>
        ₹ {invoice.gstAmount.toFixed(2)}
      </p>

    </div>

    <div className="flex justify-between">

      <p>
        Discount
      </p>

      <p>
        ₹ {invoice.discount.toFixed(2)}
      </p>

    </div>

  </div>

  {/* Line */}
  <div className="border-t my-3"></div>

  {/* Final Total */}
  <div className="flex justify-between text-[18px] font-bold">

    <p>
      PLEASE PAY
    </p>

    <p>
      ₹ {invoice.finalTotal.toFixed(2)}
    </p>

  </div>

  {/* Line */}
  <div className="border-t my-3"></div>

  {/* Terms */}
  <div className="text-[10px] leading-5">

    <p className="font-bold mb-1">
      Terms & Conditions
    </p>

    <p>
      1. Goods once sold will not be taken back.
    </p>

    <p>
      2. No cash refund.
    </p>

    <p>
      3. Exchange within 2 days only.
    </p>

    <p>
      4. Subject to local jurisdiction.
    </p>

    <div className="text-center font-bold mt-4">

      *** THANK YOU VISIT AGAIN ***

    </div>

  </div>

</div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">

                {/* Print */}
                <button
                  onClick={() =>
                    printInvoice(
                      invoice.invoiceNo
                    )
                  }
                  className="bg-green-600 text-white py-3 rounded-xl font-semibold"
                >
                  Print
                </button>

                {/* Download */}
                <button
                  onClick={() =>
                    downloadInvoice(
                      invoice.invoiceNo
                    )
                  }
                  className="bg-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                  Download
                </button>
                <button
  onClick={() =>
    startEdit(invoice)
  }
  className="bg-yellow-500 text-white py-3 rounded-xl font-semibold"
>
  Edit
</button>

                {/* <button
  onClick={() =>
    deleteInvoice(
      invoice.invoiceNo
    )
  }
  className="bg-red-600 text-white py-3 rounded-xl font-semibold"
>
  Delete
</button> */}

              </div>

            </div>

          )
        )}

      </div>

    </main>
  );
}