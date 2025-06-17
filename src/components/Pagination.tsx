"use client";
import React, { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get("sort");
  const order = params.get("order");
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToPage = (page: number) => {
    const query = [];
    if (sort) query.push(`sort=${sort}`);
    if (order) query.push(`order=${order}`);
    if (page > 1) query.push(`page=${page}`);
    let url = "/";
    if (query.length) url += "?" + query.join("&");
    router.push(url);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 120;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center gap-2 mt-8 justify-center">
      <button
        onClick={() => scroll("left")}
        className="px-3 py-2 rounded-full border border-gray-300 bg-white shadow hover:bg-blue-100 hover:border-blue-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Прокрутить влево"
        type="button"
      >
        <span className="text-xl text-blue-500">&#8592;</span>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-hidden max-w-full px-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`min-w-[40px] px-3 py-1 rounded border text-sm transition-colors ${
              currentPage === i + 1
                ? "bg-blue-500 text-white border-blue-500 shadow"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
            }`}
            type="button"
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="px-3 py-2 rounded-full border border-gray-300 bg-white shadow hover:bg-blue-100 hover:border-blue-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Прокрутить вправо"
        type="button"
      >
        <span className="text-xl text-blue-500">&#8594;</span>
      </button>
    </div>
  );
}
