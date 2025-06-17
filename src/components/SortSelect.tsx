"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "", label: "Сортировка: не выбрана" },
  { value: "asc", label: "Цена по возрастанию" },
  { value: "desc", label: "Цена по убыванию" },
];

export default function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") || "1";
  const sort = params.get("sort") || "";
  const order = params.get("order") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    let url = `/`;
    let query = [];
    if (val === "asc") query.push("sort=price", "order=asc");
    if (val === "desc") query.push("sort=price", "order=desc");
    if (page && page !== "1") query.push(`page=${page}`);
    if (query.length) url += "?" + query.join("&");
    router.push(url);
  };

  return (
    <div className="relative w-full max-w-xs mb-6">
      <select
        value={order ? order : ""}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 transition"
      >
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
