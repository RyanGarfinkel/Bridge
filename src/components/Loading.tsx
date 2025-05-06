
interface LoadingProps {
  msg: string;
};

const Loading: React.FC<LoadingProps> = ({ msg }) => {

  return (
    <div className='flex justify-center items-center h-screen w-screen font-sans text-center bg-gray-50'>
      <div className='flex flex-col items-center gap-4'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-t-blue-500 border-solid'></div>
        <h1 className='text-4xl text-gray-700'>
          { msg }
        </h1>
      </div>
    </div>
  );
};

export default Loading;
