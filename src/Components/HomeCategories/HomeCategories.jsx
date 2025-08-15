import { useCategories } from "../../hooks/useCategories";
import HomeCategoriesSkeleton from "../skeleton/HomeCategoriesSkeleton";

export default function HomeCategories() {
  const { categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <HomeCategoriesSkeleton />;
  }

  return (
    <>
      <section className="bg-gray-50 py-8">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-600 mb-6">
            Shop By Categories
          </h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">
            {categories?.map((category) => {
              return (
                <div
                  key={category._id}
                  className="card bg-white p-3 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={category.image}
                    alt="products category"
                    className="size-20 object-cover rounded-xl"
                  />
                  <h3 className="text-center">{category.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
