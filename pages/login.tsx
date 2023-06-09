import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BackImage from "../images/back.jpg";
import Image from "next/image";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bg_color, setBgColor] = useState("bg-[#1D1B1D]");

  useEffect(() => {
    // Get the session token from the local storage
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setLoading(false);
      setBgColor("bg-red-500");
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    const { data } = await axios.get(
      "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer keyfXgn8PL6pB3x32",
        },
      }
    );

    const records = data["records"];

    console.log(records);

    // check if the email and password are correct
    const user = records.find(
      (record: any) =>
        record.fields.username === email && record.fields.password === password
    );

    if (!user) {
      setLoading(false);
      setBgColor("bg-red-500");
      alert("Invalid email or password");

      return;
    }

    localStorage.setItem("token", user.id);
    router.push("/home");
  };

  return (
    <main className="flex min-h-screen bg-slate-50 flex-col items-center justify-center p-24">
      <Image
        src={BackImage}
        className="absolute z-0 h-full w-full"
        alt="back"
      />
      <div
        className={`flex flex-col ${bg_color} z-10 rounded-md shadow-lg w-1/3 px-4 py-10 items-center`}
      >
        <h1 className="text-3xl text-white p-11">Welcome Back!</h1>
        <form
          className="flex flex-col items-center justify-between space-y-5"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-[#343234] text-white px-4 py-2 rounded-md w-full outline-1 outline-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username"
          />
          <input
            className="bg-[#343234] text-white px-4 py-2 rounded-md w-full outline-1 outline-white"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="hover:bg-[#343234] hover:text-white bg-white text-[#343234] px-4 py-2 rounded-md w-1/2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
