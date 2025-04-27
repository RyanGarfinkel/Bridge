
const Loading = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen font-sans text-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <h1 className="text-2xl text-gray-700">Customizing your courses...</h1>
          <p className="text-sm text-gray-500">Please refresh the page when it is done.</p>
        </div>
      </div>
    );
  };
  
  export default Loading;