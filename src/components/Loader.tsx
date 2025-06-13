import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-90 w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid justify-center" />
    </div>
  );
};

export default Loader;