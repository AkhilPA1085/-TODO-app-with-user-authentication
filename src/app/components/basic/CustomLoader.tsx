'use client'
import React from "react";

const CustomLoader = () => {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="ball w-5 h-5 rounded-full bg-[#1b5299] mx-1 animate-oscillate"></div>
      <div className="ball w-5 h-5 rounded-full bg-[#1b5299] mx-1 animate-oscillate delay-[500ms]"></div>
      <div className="ball w-5 h-5 rounded-full bg-[#1b5299] mx-1 animate-oscillate delay-[1000ms]"></div>
      <div className="ball w-5 h-5 rounded-full bg-[#1b5299] mx-1 animate-oscillate delay-[2000ms]"></div>

      <style jsx global>{`
        @keyframes oscillate {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-oscillate {
          animation: oscillate 0.7s ease-in infinite forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomLoader;
