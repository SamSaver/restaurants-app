import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import HomeEmbedList from "./HomeEmbedList";
// import SearchBar from "./SearchBar";

function MainScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string | null>(null);
  const [homeList, setHomeList] = useState<any[]>([]);

  const fetchRestaurants = async () => {
    const { data } = await axios.get(
      "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer keyfXgn8PL6pB3x32",
        },
      }
    );
    setRestaurants(data.records);
    setLoading(false);
  };

  const handleSearch = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    setSearch(newValue);
  };

  const handleRemoveHome = (name: string) => {
    setHomeList((prev) => prev.filter((item) => item.fields.Name !== name));
    localStorage.setItem(
      "homeList",
      JSON.stringify(homeList.filter((item) => item.fields.Name !== name))
    );
  };

  const handleAdd = () => {
    if (search === null) return;

    if (homeList.includes(search)) return;
    // add at the first index
    setHomeList((prev) => [search, ...prev]);

    localStorage.setItem("homeList", JSON.stringify([search, ...homeList]));

    setSearch(null);
  };

  useEffect(() => {
    fetchRestaurants();

    var homeListObj = localStorage.getItem("homeList");
    if (homeListObj) {
      setHomeList(JSON.parse(homeListObj));
    }
  }, []);

  return loading ? (
    <div className="flex font-extrabold text-white h-full w-full items-center justify-center">
      Loading...
    </div>
  ) : (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl font-bold text-white p-11">Restaurants</h1>
        {/* Search Bar Component */}
        <SearchBar
          restaurants={restaurants}
          search={search}
          searchHandler={handleSearch}
          addHandler={handleAdd}
        />

        {/* List of Searched Restaurants */}
        <HomeEmbedList
          homeList={homeList}
          handleRemoveFromHome={handleRemoveHome}
        />
      </div>
    </div>
  );
}

export default MainScreen;
