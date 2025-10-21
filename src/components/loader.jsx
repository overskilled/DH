import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center items-center w-full h-full"
      style={{
        background: "rgba(255, 255, 255, 1)",
        zIndex: 100000,
      }}
    >
      <LoaderCircle className="h-14 w-14 text-blue-600 animate-spin" />
      <p className="mt-3 text-gray-700 font-medium">Loading...</p>
    </div>
  );
};

export default Loader;