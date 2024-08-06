const FixedLoader = () => {
  return (
    <div className="fixed left-0 top-0 grid h-screen w-full place-items-center overflow-hidden bg-black/50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200"></div>
        <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-primary"></div>
      </div>
    </div>
  );
};

export default FixedLoader;
