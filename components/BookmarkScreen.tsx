import { AppContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import BookmarkEmbedList from "./BookmarkEmbedList";

function BookmarkScreen() {
  const { bookmarks } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmarksArray, setBookmarksArray] = useState<string[]>([]);

  useEffect(() => {
    // get array of string from the booksmarks set
    console.log("Got these bookmarks in the BookmarkScreen component:");
    console.log(bookmarks);
    setBookmarksArray(Array.from(bookmarks));
    setLoading(false);
  }, []);

  return loading ? (
    <div className="flex font-extrabold h-full w-full items-center justify-center">
      Loading...
    </div>
  ) : (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl font-bold text-black p-11">Bookmarks</h1>
        {/* List of Favourite Restaurants */}
        <BookmarkEmbedList />
      </div>
    </div>
  );
}

export default BookmarkScreen;
