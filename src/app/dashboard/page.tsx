"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CreditCard,
  PackageCheck,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useAppSelector } from "../../store/hooks";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const items = useAppSelector((state) => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.product.price *
        (1 - item.product.discountPercentage / 100) *
        item.quantity,
    0
  );
  const uniqueCategories = new Set(items.map((item) => item.product.category)).size;

  const stats = [
    {
      label: "Cart items",
      value: totalItems.toString(),
      icon: <ShoppingBag size={18} />,
    },
    {
      label: "Cart value",
      value: `$${subtotal.toFixed(2)}`,
      icon: <CreditCard size={18} />,
    },
    {
      label: "Categories",
      value: uniqueCategories.toString(),
      icon: <Boxes size={18} />,
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      <section className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <ShieldCheck size={28} className="text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Member dashboard
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Welcome back, {user?.firstName || "member"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Your account, cart, and checkout tools are secured behind sign-in.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            <span>Browse products</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-700">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Active
              </span>
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-gray-900 mt-1 font-mono">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Current Cart</h2>
              <p className="text-xs text-gray-400 mt-1">
                Items ready for secured checkout.
              </p>
            </div>
            <Link
              href="/cart"
              className="text-xs font-semibold text-gray-900 hover:underline"
            >
              View cart
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {items.length > 0 ? (
              items.slice(0, 4).map((item) => (
                <div key={item.product.id} className="py-4 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Qty {item.quantity} - {item.product.category}
                    </p>
                  </div>
                  <p className="text-sm font-bold font-mono text-gray-900">
                    $
                    {(
                      item.product.price *
                      (1 - item.product.discountPercentage / 100) *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <ShoppingBag size={34} className="mx-auto text-gray-300" />
                <h3 className="text-sm font-semibold text-gray-900 mt-4">
                  No cart items yet
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Add products after signing in and they will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900">Account Status</h2>
          {[
            { label: "Authenticated session", icon: <ShieldCheck size={16} /> },
            { label: "Checkout access enabled", icon: <PackageCheck size={16} /> },
            { label: "Priority shipping tracked", icon: <Truck size={16} /> },
            { label: "Activity dashboard live", icon: <BarChart3 size={16} /> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-sm">
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                {item.icon}
              </span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
