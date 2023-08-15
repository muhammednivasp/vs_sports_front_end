import React from 'react';
import { LineWave } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-300 bg-opacity-40">
      <LineWave
        height={100}
        width={100}
        color="#194389"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
}

export default Loader;
