"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BillItem = {
  itemName: string;
  qty: any;
  price: any;
};

const initialItemState:BillItem = {
itemName: "",
qty: "",
price: "",
};

const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbwkvmnoVjLwF4XUvMWNuHSKtBYXNWejW0UfrA22AbdvaUYtgM46SKbTE2Gkp6fnaBEo/exec";
export default function InvoicePage() {

  // Customer Details
  const [customerName, setCustomerName] =
    useState("");

  const [mobileNo, setMobileNo] =
    useState("");

  const [gstNo, setGstNo] =
    useState("");

  // Current Item
  const [currentItem, setCurrentItem] =
    useState({
      itemName: "",
      qty: 0,
      price: 0,
    });

  // Discount
  const [discount, setDiscount] =
    useState(0);

  // Items
  const [items, setItems] = useState<
    BillItem[]
  >([]);

  // Edit Index
  const [editIndex, setEditIndex] =
    useState<number | null>(null);

  // Invoice Number
  const [invoiceNo, setInvoiceNo] =
    useState("");

  // Date & Time
  const today = new Date();

  const date = today.toLocaleDateString();

  const time = today.toLocaleTimeString();
const handleNewBill = () => {
  setCurrentItem(initialItemState);
  setItems([]);
  setCustomerName("");
  setMobileNo("");
  setEditIndex(null); // if you have edit feature
};
  // Generate Invoice Number
  useEffect(() => {
    const invoices = JSON.parse(
      localStorage.getItem("invoices") ||
        "[]"
    );

    const nextNumber = invoices.length + 1;

    const formattedNumber = String(
      nextNumber
    ).padStart(6, "0");

    setInvoiceNo(formattedNumber);
  }, []);

  // Add Item
  const addItem = () => {
    if (
      !currentItem.itemName ||
      !currentItem.qty ||
      !currentItem.price
    ) {
      alert("Please Fill Item Details");
      return;
    }

    // Edit Existing Item
    if (editIndex !== null) {
      const updatedItems = [...items];

      updatedItems[editIndex] =
        currentItem;

      setItems(updatedItems);

      setEditIndex(null);
    } else {
      // Add New Item
      setItems([
        ...items,
        currentItem,
      ]);
    }

    // Reset Fields
    setCurrentItem({
      itemName: "",
      qty: 1,
      price: 0,
    });
  };

  // Remove Item
  const removeItem = (
    index: number
  ) => {
    const updatedItems = [...items];

    updatedItems.splice(index, 1);

    setItems(updatedItems);
  };

  // Edit Item
  const editItem = (
    index: number
  ) => {
    const item = items[index];

    setCurrentItem({
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
    });

    setEditIndex(index);
  };

  // Subtotal
  const subtotal = items.reduce(
    (total, item) =>
      total + item.qty * item.price,
    0
  );

  // GST
  const gstAmount = subtotal * 0.05;

  // Final Total
  const finalTotal =
    subtotal + gstAmount - discount;

  // Number To Words
  const numberToWords:any = (
    amount: number
  ) => {
    const words = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (amount < 20)
      return words[amount];

    if (amount < 100)
      return (
        tens[Math.floor(amount / 10)] +
        " " +
        words[amount % 10]
      );

    if (amount < 1000)
      return (
        words[Math.floor(amount / 100)] +
        " Hundred " +
        numberToWords(amount % 100)
      );

    if (amount < 100000)
      return (
        numberToWords(
          Math.floor(amount / 1000)
        ) +
        " Thousand " +
        numberToWords(amount % 1000)
      );

    return amount.toString();
  };
const printInvoice = async () => {

  const invoiceData = {
    invoiceNo,
    customerName,
    mobileNo,
    gstNo,
    items,
    subtotal,
    gstAmount,
    discount,
    finalTotal,
    date,
    time,
  };

  // Save Invoice
  const existingInvoices = JSON.parse(
    localStorage.getItem("invoices") || "[]"
  );
// const saveToSheet = async () => {
//   try {
//     const res = await fetch(GOOGLE_SHEET_API, {
//       method: "POST",
//       mode:"no-cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(invoiceData),
//     });

//     const result = await res.text();
//     console.log("Google Sheet Response:", result);
//   } catch (error: unknown) {
//     console.log("Google Sheet Save Error:", error);
//   }
// };

const saveToSheet = async () => {

  try {

    const res = await fetch(
      GOOGLE_SHEET_API,
      {
        method: "POST",
        mode:'no-cors',

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          invoiceData
        ),
      }
    );

    const result =
      await res.json();

    console.log(result);

  } catch (error) {

    console.log(error);

  }

};

  await saveToSheet(); // ✅ THIS TRIGGERS IT

  existingInvoices.push(invoiceData);

  localStorage.setItem(
    "invoices",
    JSON.stringify(existingInvoices)
  );

  // Get Bill HTML
  const printContents =
    document.getElementById(
      "thermal-bill"
    )?.innerHTML;

  if (!printContents) return;

  // Open Print Window
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
font-family:'Courier New', monospace;            -webkit-print-color-adjust: exact !important;
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
border-bottom:0.8px solid #444;            padding:5px 0;
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

          .p-3{
            padding:12px;
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

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Thermal Invoice
        </h1>

        <Link href="/all-invoice">
          <button className="bg-black text-white px-5 py-3 rounded-xl">
            All Bills
          </button>
        </Link>
        <button
  onClick={handleNewBill}
  className="bg-black text-white px-5 py-3 rounded-xl"
>
  New Bill
</button>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left Side */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          {/* Customer */}
          <h2 className="text-2xl font-bold mb-6">
            Customer Details
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) =>
                setMobileNo(
                  e.target.value
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="GST Number"
              value={gstNo}
              onChange={(e) =>
                setGstNo(
                  e.target.value
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

          </div>

          {/* Items */}
          <h2 className="text-2xl font-bold mt-10 mb-6">
            Add Items
          </h2>

          <div className="grid grid-cols-4 gap-3 mb-3 font-semibold">

            <div>Item</div>

            <div>Qty</div>

            <div>Price</div>

            <div></div>

          </div>

          <div className="grid grid-cols-4 gap-3">

            <input
              type="text"
              placeholder="Item"
              value={
                currentItem.itemName
              }
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  itemName:
                    e.target.value,
                })
              }
              className="border px-4 py-3 rounded-xl"
            />

          <input
  type="number"
  placeholder="Qty"
  value={currentItem.qty}
  // onFocus={(e) => {
  //   if (currentItem.qty === 0) {
  //     setCurrentItem({
  //       ...currentItem,
  //       qty: "",
  //     });
  //   }
  // }}
  onChange={(e) =>
    setCurrentItem({
      ...currentItem,
      qty: Number(e.target.value),
    })
  }
  className="border px-4 py-3 rounded-xl"
/>

<input
  type="number"
  placeholder="Price"
  value={currentItem.price}
  // onFocus={(e) => {
  //   if (currentItem.price === 0) {
  //     setCurrentItem({
  //       ...currentItem,
  //       price: "",
  //     });
  //   }
  // }}
  onChange={(e) =>
    setCurrentItem({
      ...currentItem,
      price: Number(e.target.value),
    })
  }
  className="border px-4 py-3 rounded-xl"
/>

            <button
              onClick={addItem}
              className="bg-green-600 text-white rounded-xl"
            >
              {editIndex !== null
                ? "Update"
                : "Add"}
            </button>

          </div>

          {/* Added Items */}
          {items.length > 0 && (

            <div className="mt-6 space-y-3">

              {items.map(
                (item, index) => (

                  <div
                    key={index}
                    className="grid grid-cols-6 gap-3 bg-gray-100 p-3 rounded-xl items-center"
                  >

                    <div className="col-span-2 font-medium text-sm">
                      {item.itemName}
                    </div>

                    <div className="text-sm">
                      Qty: {item.qty}
                    </div>

                    <div className="text-sm">
                      ₹ {item.price}
                    </div>

                    <button
                      onClick={() =>
                        editItem(index)
                      }
                      className="bg-blue-500 text-white py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        removeItem(index)
                      }
                      className="bg-red-500 text-white py-2 rounded-lg text-sm"
                    >
                      Remove
                    </button>

                  </div>

                )
              )}

            </div>

          )}

          {/* Discount */}
          <div className="mt-8">

            <input
              type="number"
              placeholder="Discount"
              value={discount}
              onChange={(e) =>
                setDiscount(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

          </div>

          {/* Print */}
          <button
            onClick={printInvoice}
            className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-lg font-bold"
          >
            Print Bill
          </button>

       

        </div>

       
       {/* Right Side Bill */}
<div className="bg-white p-6 rounded-2xl shadow-lg flex justify-center">

  <div
    id="thermal-bill"
    className="w-[80mm] bg-white text-black p-3 border border-gray-400 text-[12px]"
  >

    {/* Header */}
    <div className="text-center">

      <h1 className="text-[22px] font-bold tracking-wide uppercase">
        SARI CENTRE
      </h1>

      <p className="text-[11px]">
        Pandri Wholesale Market
      </p>

      <p className="text-[11px]">
        Raipur (C.G.)
      </p>

      <p className="text-[11px]">
        GST No: 22AAAAA0000A1Z5
      </p>

    </div>

    {/* Line */}
    <div className="border-t  my-3"></div>

    {/* Bill Info */}
    <div className="grid grid-cols-3 gap-2">

      <div className="border border-black rounded-md p-2 text-center">

        <p className="text-[10px] font-bold uppercase">
          Bill No
        </p>

        <p className="font-bold mt-1">
          {invoiceNo}
        </p>

      </div>

      <div className="border border-black rounded-md p-2 text-center">

        <p className="text-[10px] font-bold uppercase">
          Date
        </p>

        <p className="font-bold mt-1">
          {date}
        </p>

      </div>

      <div className="border border-black rounded-md p-2 text-center">

        <p className="text-[10px] font-bold uppercase">
          Time
        </p>

        <p className="font-bold mt-1">
          {time}
        </p>

      </div>

    </div>

    {/* Customer Details */}
    <div className="mt-4 space-y-2">

      <div className="flex justify-between border-b pb-1">

        <span className="font-semibold">
          Customer
        </span>

        <span>
          {customerName || "-"}
        </span>

      </div>

      <div className="flex justify-between border-b pb-1">

        <span className="font-semibold">
          Mobile
        </span>

        <span>
          {mobileNo || "-"}
        </span>

      </div>

      <div className="flex justify-between border-b pb-1">

        <span className="font-semibold">
          GST No
        </span>

        <span>
          {gstNo || "-"}
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

        {items.map((item, index) => (

          <tr
            key={index}
            className="border-b "
          >

            <td className="py-1">
              {index + 1}
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

              ₹
              {" "}
              {(
                item.qty *
                item.price
              ).toFixed(2)}

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
          ₹
          {" "}
          {subtotal.toFixed(2)}
        </p>

      </div>

      <div className="flex justify-between">

        <p>
          GST (5%)
        </p>

        <p>
          ₹
          {" "}
          {gstAmount.toFixed(2)}
        </p>

      </div>

      <div className="flex justify-between">

        <p>
          Discount
        </p>

        <p>
          ₹
          {" "}
          {discount.toFixed(2)}
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
        ₹
        {" "}
        {finalTotal.toFixed(2)}
      </p>

    </div>

    {/* Amount Words */}
    <div className="mt-3 text-[11px] leading-5">

      <p className="font-semibold">
        Amount In Words:
      </p>

      <p>

        Rupees
        {" "}
        {numberToWords(
          Math.floor(finalTotal)
        )}
        {" "}
        Only

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

</div>

      </div>

    </main>
  );
}