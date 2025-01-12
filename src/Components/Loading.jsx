import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1; // Increment progress
      });
    }, 10); // Adjust speed by changing this value

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div
        className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Loading;
