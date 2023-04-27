import React, { useState, useContext } from "react";
import { AppContext } from "@/context/context";

function RemoveButton({
  name,
  handleRemove,
}: {
  name: string;
  handleRemove?: (name: string) => void;
}) {
  const { bookmarks, dispatchBookmarkEvent } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Remove");

  return (
    <button
      className={`bg-red-500 ${
        isDisabled
          ? "cursor-not-allowed hover:bg-red-500"
          : "cursor-pointer hover:bg-red-700"
      } text-white font-bold py-2 px-4 rounded-full`}
      onClick={() => {
        if (handleRemove) {
          handleRemove(name);
          return;
        }

        setIsDisabled(true);
        setButtonText("Removed!");

        dispatchBookmarkEvent("REMOVE_BOOKMARK", name);
        localStorage.setItem(
          "bookmarks",
          JSON.stringify(Array.from(bookmarks))
        );
      }}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
}

export default RemoveButton;
