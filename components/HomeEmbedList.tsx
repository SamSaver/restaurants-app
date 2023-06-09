import { v4 as uuid } from "uuid";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/context";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";

function HomeEmbedList({
  homeList,
  handleRemoveFromHome,
}: {
  homeList?: any[];
  handleRemoveFromHome: (name: string) => void;
}) {
  const { bookmarks, dispatchBookmarkEvent } = useContext(AppContext);

  const handleAddToBookmark = (name: string) => {
    console.log("clicked add to bookmark");
    console.log(name);

    // add to bookmarks
    dispatchBookmarkEvent("ADD_BOOKMARK", name);
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...Array.from(bookmarks), name])
    );

    // remove from homeList
    handleRemoveFromHome(name);
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-between space-y-20 mt-10">
      {homeList?.length === 0 && (
        <div className="text-lg font-bold text-gray-300">
          No restaurants in your list
        </div>
      )}
      {homeList?.map((restaurant_name, index) => {
        var name: string;

        if (typeof restaurant_name === "string") {
          name = restaurant_name;
        } else {
          name = restaurant_name.fields.Name;
        }

        return (
          <div
            key={uuid()}
            className="flex flex-col space-y-8 items-center justify-center bg-[#1D1B1D] p-8 rounded-lg shadow-md hover:shadow-xl"
          >
            {/* Mark as Favourite Button if not favourite else Remove from Favourite Button */}
            <h1 className="text-3xl font-bold text-white">{name}</h1>

            <div className="flex flex-row space-x-4">
              <AddButton name={name} handleAdd={handleAddToBookmark} />
              <RemoveButton name={name} handleRemove={handleRemoveFromHome} />
            </div>

            <iframe
              width="600"
              height="450"
              src={`https://lookerstudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${name}"}`}
            ></iframe>
          </div>
        );
      })}
    </div>
  );
}

export default HomeEmbedList;
