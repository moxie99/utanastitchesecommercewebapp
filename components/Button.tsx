import React from "react";

interface Props {
  title: string;
  onClick?: () => void;
  width?: string;
  loading?: boolean;
  padding?: string;
  noIcon?: boolean;
  // margin: string;
}

function Button({
  title,
  width,
  // margin,
  loading,
  padding,
  noIcon,
  onClick,
}: Props) {
  return (
    <button
      className={`ease group relative z-30 box-border inline-flex ${
        width ? width : "w-auto"
      }  ${padding} cursor-pointer items-center justify-center overflow-hidden rounded bg-red-800 bg-gradient-to-r from-red-800 to-pink-400 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none`}
      onClick={onClick}
    >
      <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full ease blur-md"></span>
      <span className="absolute inset-0 w-full h-full transition duration-700 ease group-hover:rotate-180">
        <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
        <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
      </span>

      <span className="relative z-20 flex items-center font-semibold">
        {noIcon && (
          <svg
            className="relative flex-shrink-0 w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        )}
        {loading ? "Loading" : title}
      </span>
    </button>
  );
}

export default Button;
