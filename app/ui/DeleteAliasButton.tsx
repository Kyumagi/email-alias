"use client";

import { FaTrash } from "react-icons/fa6";
import { deleteAlias } from "../api/cloudflare";
import { useState } from "react";
import Toast from "./Toast";

export default function DeleteAliasButton({ alias }: { alias: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<0 | 1>(0);

  return (
    <>
      <button
        onClick={() => handleClick(alias, setMessage, setStatus)}
        className="flex items-center rounded-full bg-red-200 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-300"
      >
        <FaTrash className="me-1 inline" />
        Delete
      </button>
      <Toast message={message} status={status as 0 | 1} />
    </>
  );
}

function handleClick(
  alias: string,
  setMessage: (message: string) => void,
  setStatus: (status: 0 | 1) => void,
) {
  deleteAlias(alias).then((res) => {
    if (res) {
      setMessage(
        res.message
          ? res.message
          : res.status === 1
            ? "Alias deleted successfully."
            : "Sorry, something went wrong.",
      );
      setStatus(res.status);

      // clear the message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  });
}
