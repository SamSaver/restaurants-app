import React, { useState, useContext } from "react";
import { AppContext } from "@/context/context";

function AddButton({
  name,
  handleAdd,
}: {
  name: string;
  handleAdd?: (name: string) => void;
}) {
  const { bookmarks, dispatchBookmarkEvent } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Add To Bookmark");

  return (
    <button
      onClick={() => {
        if (handleAdd) {
          handleAdd(name);
          return;
        }
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
