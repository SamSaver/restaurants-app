import { Autocomplete } from "@mui/material";

function SearchBar({
  restaurants,
  search,
  searchHandler,
  addHandler,
}: {
  restaurants: any[];
  search: string | null;
  searchHandler: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => void;
  addHandler: () => void;
}) {
  return (
    <div className="flex flex-row space-x-4 items-center justify-between">
      <Autocomplete
        id="combo-box-demo"
        options={restaurants}
        getOptionLabel={(option) => option.fields.Name}
        value={search}
        onChange={searchHandler}
        // style={{ width: 300 }}
        renderInput={(params) => (
          <div
            ref={params.InputProps.ref}
            className="flex bg-white items-center focus:rounded-b-none justify-between px-10 py-5 rounded-xl hover:shadow-2xl shadow-lg"
          >
            <input
              type="text"
              placeholder="Search"
              {...params.inputProps}
              className="focus:outline-none"
            />
          </div>
        )}
        freeSolo
      />
      {/* Button to Add */}
      <button
        onClick={addHandler}
        className="bg-[#1D1B1D] hover:bg-gray-300 hover:text-black font-semibold hover:cursor-pointer text-white px-10 py-5 rounded-xl hover:shadow-2xl shadow-lg"
      >
        Add
      </button>
    </div>
  );
}

export default SearchBar;
