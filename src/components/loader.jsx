import { LoaderCircle } from 'lucide-react';

export const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen fixed bottom-0 right-0' 
        style={{background: "rgba(255, 255, 255, 1)", zIndex: 100000}}
    >
        <LoaderCircle
          className='h-14 w-14 text-blue-600 animate-spin'
        />
        <p>Loading...</p>
    </div>
  );
};

export default Loader;