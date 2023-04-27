import React, { useState, useContext } from "react";
import { AppContext } from "@/context/context";

function AddButton({ name }: { name: string }) {
  const { bookmarks, dispatchBookmarkEvent } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(bookmarks.has(name));
  const [buttonText, setButtonText] = useState<string>(
    bookmarks.has(name) ? "Added!" : "Add"
  );

  return (
    <button
      onClick={() => {
        setIsDisabled(true);
        setButtonText("Added!");
        dispatchBookmarkEvent("ADD_BOOKMARK", name);
        localStorage.setItem(
          "bookmarks",
          JSON.stringify(Array.from(bookmarks))
        );
      }}
      className={`bg-blue-500 ${
        isDisabled
          ? "cursor-not-allowed hover:bg-blue-500"
          : "cursor-pointer hover:bg-blue-700"
      } text-white font-bold py-2 px-4 rounded-full`}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
}

export default AddButton;
