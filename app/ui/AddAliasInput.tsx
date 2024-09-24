"use client";
import { useState, useRef, RefObject } from "react";
import { FaPlus } from "react-icons/fa6";
import submitAlias from "../lib/submitAlias";
import Toast from "./Toast";

let bodyRef: RefObject<HTMLBodyElement>;
let addAliasButtonRef: RefObject<HTMLButtonElement>;

export default function AddAliasInput({ userEmail }: { userEmail: string }) {
  const [alias, setAlias] = useState("");
  const [domain, setDomain] = useState("@mail.smtms.eu.org");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);

  bodyRef = useRef<HTMLBodyElement>(null);
  addAliasButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex w-full flex-col rounded-md shadow-sm md:flex-row">
        {/* Alias input */}
        <input
          type="text"
          value={alias}
          placeholder="add an alias"
          className="z-10 rounded-t-md border-none bg-gray-100 focus:border-b-2 focus:border-b-black md:rounded-s-md md:rounded-tr-none"
          onChange={(e) => {
            setAlias(e.target.value);
            setMessage("");
          }}
        />

        {/* Domain input */}
        <select
          className="no-ring rounded-b-md bg-gray-950 font-semibold text-gray-50 md:rounded-e-md md:rounded-bl-none"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="@mail.smtms.eu.org">@mail.smtms.eu.org</option>
        </select>
      </div>

      {/* Add button */}
      <div className="bottom-0 right-0 ms-2 aspect-square h-6 md:h-full">
        <button
          onClick={() =>
            handleAddAlias(
              alias.trim() + domain,
              userEmail,
              setMessage,
              setStatus,
            )
          }
          ref={addAliasButtonRef}
          className="flex h-full w-full items-center justify-center rounded-md bg-green-300 hover:bg-green-400"
        >
          <FaPlus className="text-green-950" />
        </button>
      </div>

      {/* Message */}
      <Toast message={message} status={status as 0 | 1} />
    </>
  );
}

function handleAddAlias(
  alias: string,
  userEmail: string,
  setMessage: (message: string) => void,
  setStatus: (status: 0 | 1) => void,
) {
  // set cursor of body and button to progress
  bodyRef.current?.classList.add("cursor-progress");
  if (addAliasButtonRef.current) {
    addAliasButtonRef.current.classList.add("cursor-progress");

    // disable the button
    addAliasButtonRef.current.disabled = true;
  }

  // validate the alias and send the request to the server
  submitAlias(alias.trim(), userEmail).then((res) => {
    // set cursor back to default
    bodyRef.current?.classList.remove("cursor-progress");
    if (addAliasButtonRef.current) {
      addAliasButtonRef.current.classList.remove("cursor-progress");

      // enable the button
      addAliasButtonRef.current.disabled = false;
    }

    // handle the response
    if (res) {
      setMessage(
        res.message
          ? res.message
          : res.status === 1
            ? "Alias added successfully."
            : "Sorry, something went wrong.",
      );
      setStatus(res.status);

      // clear the message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  });
}
