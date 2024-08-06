const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="bg-lightGray">
          <div className="animate-pulse">
            <div className="h-72 w-full bg-gray-200"></div>
            <div className="px-4 pb-7 pt-4">
              <div className="h-7 w-24 bg-gray-200"></div>
              <div className="my-2 h-5 w-10/12 bg-gray-200"></div>
              <div className="h-7 w-28 bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
