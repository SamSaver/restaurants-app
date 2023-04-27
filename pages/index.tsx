import { useRouter } from "next/router";
import { useEffect } from "react";

function Index() {
  const router = useRouter();
  useEffect(() => {
    // Get the session token from the local storage
    const token = localStorage.getItem("token");

    // If the token is not there, redirect to the login page
    if (!token) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, []);
  return <></>;
}

export default Index;
