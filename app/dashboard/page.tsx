
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import { useEffect, useMemo, useState } from "react";

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

const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbwkvmnoVjLwF4XUvMWNuHSKtBYXNWejW0UfrA22AbdvaUYtgM46SKbTE2Gkp6fnaBEo/exec";

export default function DashboardPage() {

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [filterType, setFilterType] =
    useState("monthly");

  const [selectedMonth, setSelectedMonth] =
    useState("");

  useEffect(() => {

    const fetchInvoices = async () => {

      try {

        const res = await fetch(
          GOOGLE_SHEET_API
        );

        const text = await res.text();

        const data = JSON.parse(text);

        setInvoices(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchInvoices();

  }, []);

  // Total Sales
  const totalSales =
    invoices.reduce(
      (total, invoice) =>
        total + Number(invoice.finalTotal),
      0
    );

  // Total Bills
  const totalBills =
    invoices.length;

  // Total Customers
  const totalCustomers =
    new Set(
      invoices.map(
        (invoice) =>
          invoice.customerName
      )
    ).size;

  // Monthly Sales
  const monthlySales = useMemo(() => {

    const salesMap: any = {};

    invoices.forEach((invoice) => {

      const date =
        new Date(invoice.date);

      const month =
        `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

      if (!salesMap[month]) {

        salesMap[month] = 0;

      }

      salesMap[month] +=
        Number(invoice.finalTotal);

    });

    return Object.keys(salesMap).map(
      (month) => ({
        month,
        sales: salesMap[month],
      })
    );

  }, [invoices]);

  // Daily Sales
  const dailySales = useMemo(() => {

    const salesMap: any = {};

    invoices.forEach((invoice) => {

      const date =
        new Date(invoice.date)
          .toLocaleDateString(
            "en-GB"
          )
          .replace(/\//g, "-");

      if (!salesMap[date]) {

        salesMap[date] = 0;

      }

      salesMap[date] +=
        Number(invoice.finalTotal);

    });

    return Object.keys(salesMap).map(
      (date) => ({
        date,
        sales: salesMap[date],
      })
    );

  }, [invoices]);

  // Weekly Sales
  const weeklySales = useMemo(() => {

    const salesMap: any = {};

    invoices.forEach((invoice) => {

      const d = new Date(invoice.date);

      const week =
        `Week-${Math.ceil(
          d.getDate() / 7
        )}-${d.getMonth() + 1}-${d.getFullYear()}`;

      if (!salesMap[week]) {

        salesMap[week] = 0;

      }

      salesMap[week] +=
        Number(invoice.finalTotal);

    });

    return Object.keys(salesMap).map(
      (week) => ({
        week,
        sales: salesMap[week],
      })
    );

  }, [invoices]);

  // Quarterly Sales
  const quarterlySales = useMemo(() => {

    const salesMap: any = {};

    invoices.forEach((invoice) => {

      const d = new Date(invoice.date);

      const quarter =
        `Q${Math.floor(
          d.getMonth() / 3
        ) + 1}-${d.getFullYear()}`;

      if (!salesMap[quarter]) {

        salesMap[quarter] = 0;

      }

      salesMap[quarter] +=
        Number(invoice.finalTotal);

    });

    return Object.keys(salesMap).map(
      (quarter) => ({
        quarter,
        sales: salesMap[quarter],
      })
    );

  }, [invoices]);

  // Item Sales
  const itemSales = useMemo(() => {

    const itemMap: any = {};

    invoices.forEach((invoice) => {

      invoice.items.forEach((item) => {

        if (!itemMap[item.itemName]) {

          itemMap[item.itemName] = 0;

        }

        itemMap[item.itemName] +=
          item.qty;

      });

    });

    return Object.keys(itemMap).map(
      (item) => ({
        item,
        qty: itemMap[item],
      })
    );

  }, [invoices]);

  // Top Selling Items
  const topItems =
    [...itemSales]
      .sort(
        (a, b) => b.qty - a.qty
      )
      .slice(0, 5);

  const chartData:any =
    filterType === "daily"
      ? dailySales
      : filterType === "weekly"
      ? weeklySales
      : filterType === "quarterly"
      ? quarterlySales
      : monthlySales;

  return (

    <main className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Sales Dashboard
        </h1>

        <Link href="/all-invoice">
          <button className="bg-black text-white px-5 py-3 rounded-xl">
            All Bills
          </button>
        </Link>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow-lg">

          <h2 className="text-lg font-semibold text-gray-500">
            Total Sales
          </h2>

          <p className="text-3xl font-bold mt-3">
            ₹ {totalSales.toFixed(2)}
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">

          <h2 className="text-lg font-semibold text-gray-500">
            Total Bills
          </h2>

          <p className="text-3xl font-bold mt-3">
            {totalBills}
          </p>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">

          <h2 className="text-lg font-semibold text-gray-500">
            Total Customers
          </h2>

          <p className="text-3xl font-bold mt-3">
            {totalCustomers}
          </p>

        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Sales Filter
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <button
            onClick={() =>
              setFilterType(
                "daily"
              )
            }
            className="bg-blue-500 text-white py-3 rounded-xl"
          >
            Daily Sales
          </button>

          <button
            onClick={() =>
              setFilterType(
                "weekly"
              )
            }
            className="bg-green-500 text-white py-3 rounded-xl"
          >
            Weekly Sales
          </button>

          <button
            onClick={() =>
              setFilterType(
                "monthly"
              )
            }
            className="bg-purple-500 text-white py-3 rounded-xl"
          >
            Monthly Sales
          </button>

          <button
            onClick={() =>
              setFilterType(
                "quarterly"
              )
            }
            className="bg-orange-500 text-white py-3 rounded-xl"
          >
            Quarterly Sales
          </button>

        </div>

      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6 capitalize">
          {filterType} Sales Chart
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey={
                filterType ===
                "daily"
                  ? "date"
                  : filterType ===
                    "weekly"
                  ? "week"
                  : filterType ===
                    "quarterly"
                  ? "quarter"
                  : "month"
              }
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="sales" />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Top Selling Items */}
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Top Selling Items
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={topItems}
                dataKey="qty"
                nameKey="item"
                outerRadius={120}
                label
              >

                {topItems.map(
                  (_, index) => (
                    <Cell key={index} />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Item Wise Quantity
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <LineChart data={itemSales}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="item" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="qty"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-auto">

        <h2 className="text-2xl font-bold mb-6">
          Top Products Table
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-3 text-left">
                Item Name
              </th>

              <th className="border p-3 text-left">
                Total Qty Sold
              </th>

            </tr>

          </thead>

          <tbody>

            {topItems.map(
              (item, index) => (

                <tr key={index}>

                  <td className="border p-3">
                    {item.item}
                  </td>

                  <td className="border p-3">
                    {item.qty}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </main>

  );

}
<Link href="/dashboard">
  <button className="bg-black text-white px-5 py-3 rounded-xl">
    Dashboard
  </button>
</Link>
