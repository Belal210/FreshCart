export default function BrandItem({brandInfo}) {
  const {name,image} = brandInfo

  return (
    <>
      <div className="bg-white flex flex-col items-center justify-center rounded-md shadow-sm p-6 pb-3">
        <div className="w-full h-40 overflow-hidden">
          <img
            src={image}
            alt="Brand Image"
            loading="lazy"
            className="w-full h-full object-contain mx-auto border border-gray-200 rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold text-primary-600 text-center mt-3">
          {name}
        </h3>
      </div>
    </>
  );
}
