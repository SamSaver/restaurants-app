import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import HomeEmbedList from "./HomeEmbedList";
// import SearchBar from "./SearchBar";

function MainScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string | null>(null);
  const [embedList, setEmbedList] = useState<any[]>([]);

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

  const handleAdd = () => {
    // add at the first index
    setEmbedList((prev) => [search, ...prev]);

    setSearch(null);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return loading ? (
    <div className="flex font-extrabold h-full w-full items-center justify-center">
      Loading...
    </div>
  ) : (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl font-bold text-black p-11">Restaurants</h1>
        {/* Search Bar Component */}
        <SearchBar
          restaurants={restaurants}
          search={search}
          searchHandler={handleSearch}
          addHandler={handleAdd}
        />

        {/* List of Restaurants */}
        <HomeEmbedList embedList={embedList} />
      </div>
    </div>
  );
}

export default MainScreen;
