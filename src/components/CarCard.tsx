"use client";
import React, { useState } from "react";
import { Car } from "@/types/car";

interface Props {
  car: Car;
}

const CarCard: React.FC<Props> = ({ car }) => {
  const images = car.images?.image?.slice(0, 5) || [];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-400 transition-all duration-200 overflow-hidden flex flex-col group">
      <div className="relative">
        <img
          src={images[activeIdx] || "/no-image.png"}
          alt={car.mark_id + " " + car.folder_id}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {images.length > 1 && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2 bg-white/80 px-2 py-1 rounded-lg shadow">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                type="button"
                className={`w-8 h-8 rounded-md overflow-hidden border-2 shadow-sm transition-all duration-200
                  ${
                    activeIdx === idx
                      ? "border-blue-500 scale-110 ring-2 ring-blue-200"
                      : "border-gray-200 opacity-80 hover:opacity-100 hover:scale-105"
                  }
                `}
                aria-label={`Показать фото ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Превью ${idx + 1}`}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-bold mb-1 text-gray-900 line-clamp-2 min-h-[48px]">
          {car.mark_id} {car.folder_id}
        </h2>
        <div className="text-sm text-gray-500 mb-2">{car.modification_id}</div>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-extrabold text-blue-600">
            {car.price.toLocaleString("ru-RU")}{" "}
            <span className="text-lg font-semibold">₽</span>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-100">
            {car.year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
