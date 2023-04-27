import { createContext, useEffect, useState } from "react";

type AppContextType = {
  bookmarks: Set<string>;
  dispatchBookmarkEvent: (actionType: string, payload: string) => void;
};

export const AppContext = createContext<AppContextType>({
  bookmarks: new Set(),
  dispatchBookmarkEvent: () => {},
});

export default function Context({ children }: React.PropsWithChildren<{}>) {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const bookmarksObject = localStorage.getItem("bookmarks");
    if (bookmarksObject) {
      setBookmarks(new Set(JSON.parse(bookmarksObject)));
    }
  }, []);

  const dispatchBookmarkEvent = (actionType: string, payload: string) => {
    switch (actionType) {
      case "ADD_BOOKMARK": {
        setBookmarks((prev) => {
          prev.add(payload);
          return new Set(prev);
        });
        break;
      }
      case "REMOVE_BOOKMARK":
        {
          setBookmarks((prev) => {
            prev.delete(payload);
            return prev;
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        bookmarks,
        dispatchBookmarkEvent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
