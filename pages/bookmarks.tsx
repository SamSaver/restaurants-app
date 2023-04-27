import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Context from "../context/context";
import SideBar from "@/components/SideBar";
import BookmarkScreen from "@/components/BookmarkScreen";
import Image from "next/image";
import BackImage from "../images/back.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Bookmarks() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(1);

  const tabChangeHandler = (tab: number) => {
    setCurrentTab(tab);
    router.push(tab === 0 ? "/home" : "/bookmarks");
  };

  useEffect(() => {
    // Get the session token from the local storage
    const token = localStorage.getItem("token");

    // If the token is not there, redirect to the login page
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <Context>
      <main
        className={`bg-slate-50 flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <Image
            src={BackImage}
            alt="back"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* This div below will divide the page intwo 2 parts: Sidebar and MainScreen */}
        <div className="flex z-10 w-full h-full flex-row">
          {/* This is the sidebar */}
          <SideBar
            currentTab={currentTab}
            tabChangeHandler={tabChangeHandler}
          />
          {/* This is the main screen */}
          <BookmarkScreen />
        </div>
      </main>
    </Context>
  );
}
