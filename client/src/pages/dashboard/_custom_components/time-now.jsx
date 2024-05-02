import React, { useState, useEffect } from "react";

export function TimeNow() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  return ( 
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col">
          
          <div className="flex flex-1 items-center justify-center rounded-lg ">
            <div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-8">
               {formatDate(currentTime)}
              </h3>
              <p className="scroll-m-20 text-5xl font-extrabold tracking-tight">
              {formatTime(currentTime)}
    </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
