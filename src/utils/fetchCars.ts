import { Car } from "@/types/car";

export interface CarsResponse {
  data: Car[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export async function fetchCars({
  page = 1,
  sort,
  order,
}: {
  page?: number;
  sort?: "price";
  order?: "asc" | "desc";
}): Promise<CarsResponse> {
  const params = new URLSearchParams();
  params.set("_limit", "12");
  params.set("_page", String(page));
  if (sort) {
    params.set("_sort", sort);
    params.set("_order", order ?? "asc");
  }
  const url = `https://testing-api.ru-rating.ru/cars?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await res.json();
  return data as CarsResponse;
}
