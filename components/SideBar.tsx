import { useRouter } from "next/router";
import { AppContext } from "../context/context";
import { useContext } from "react";

function SideBar({
  currentTab,
  tabChangeHandler,
}: {
  currentTab: number;
  tabChangeHandler: (tab: number) => void;
}) {
  const router = useRouter();
  const { bookmarks } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    //update bookmarks in local storage
    const bookmarksArray = Array.from(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen sticky z-10 top-0 w-1/4 items-center justify-center bg-slate-950">
      <div
        onClick={() => tabChangeHandler(0)}
        className={`flex w-full p-10 ${
          currentTab === 0 ? "bg-slate-800" : ""
        } cursor-pointer hover:bg-slate-800 items-center justify-center text-xl font-semibold text-white`}
      >
        Home
      </div>
      <div
        onClick={() => tabChangeHandler(1)}
        className={`flex w-full p-10 ${
          currentTab === 1 ? "bg-slate-800" : ""
        } cursor-pointer hover:bg-slate-800 items-center justify-center text-xl font-semibold text-white`}
      >
        Bookmarks
      </div>
      <div
        onClick={handleLogout}
        className="flex w-full p-10 cursor-pointer hover:bg-slate-800 items-center justify-center text-xl font-semibold text-white"
      >
        Logout
      </div>
    </div>
  );
}

export default SideBar;
