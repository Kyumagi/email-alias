"use client";
import { FaCircleXmark, FaRegCircleCheck } from "react-icons/fa6";
import { useEffect } from "react";

export default function Toast({
  message,
  status,
}: {
  message: string;
  status: 0 | 1;
}) {
  useEffect(() => {
    const toast = document.getElementById("toast");
    if (toast) {
      const height = toast.getBoundingClientRect().height;
      toast.animate(
        [
          { transform: `translateY(calc(1.25rem + ${height}px))`, offset: 0 },
          { transform: "translateY(0)", offset: 0.05 },
          { transform: "translateY(0)", offset: 0.95 },
          { transform: `translateY(calc(1.25rem + ${height}px))`, offset: 1 },
        ],
        {
          duration: 5000,
          fill: "forwards",
        },
      );
    }
  }, [message]);

  return (
    <p
      className={`${message ? "block" : "hidden"} fixed bottom-5 z-10 mx-5 flex items-center gap-2 rounded-lg md:end-5 md:mx-0 ${status === 0 ? "bg-red-400" : "bg-green-400"} px-4 py-3 font-medium text-gray-950`}
      id="toast"
    >
      {message ? (
        status === 0 ? (
          <FaCircleXmark className="size-6 md:size-auto" />
        ) : (
          <FaRegCircleCheck className="size-6 md:size-auto" />
        )
      ) : null}
      {message}
    </p>
  );
}
