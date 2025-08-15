export default function BrandItemSkeleton() {
  return (
    <>
      <div className="bg-white flex flex-col items-center justify-center rounded-md shadow-sm pt-6 pb-4 animate-pulse">
        <div className="w-5/6 h-44 mx-auto border border-gray-200 rounded-md overflow-hidden bg-gray-200" />
        <div className="h-5 w-1/3 bg-gray-200 rounded mt-5" />
      </div>
    </>
  );
}