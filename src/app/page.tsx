import { fetchCars } from "@/utils/fetchCars";
import CarCard from "@/components/CarCard";
import SortSelect from "@/components/SortSelect";
import Pagination from "@/components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    sort?: string;
    order?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort === "price" ? "price" : undefined;
  const order =
    searchParams?.order === "asc" || searchParams?.order === "desc"
      ? (searchParams?.order as "asc" | "desc")
      : undefined;

  let carsData;
  try {
    carsData = await fetchCars({ page, sort, order });
  } catch {
    return <div className="p-8 text-red-600">Ошибка загрузки автомобилей</div>;
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <SortSelect />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {carsData.data.map((car, idx) => (
          <CarCard car={car} key={idx} />
        ))}
      </div>
      <Pagination
        currentPage={carsData.meta.current_page}
        totalPages={carsData.meta.last_page}
      />
    </main>
  );
}
