import axios from "../Utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

export function TopNav() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const debouncedSearch = debounce(async (query) => {
    if (query.trim() === "") {
      setSearch([]);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
    } catch (e) {
      console.error(e);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  return (
      <div className="w-full text-white h-[10vh] relative flex justify-center items-center py-8">
        <div className="border w-1/2 px-3 py-1 rounded">
          <i className="text-white text-xl ri-search-line"></i>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="w-[50%] text-white pl-2 outline-none bg-transparent"
            type="text"
            placeholder="Search"
          />
        </div>

        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-white text-2xl cursor-pointer ml-3 ri-close-fill"
          ></i>
        )}

        {query.length > 0 && (
          <div
            className="absolute w-full max-h-[50vh] bg-gray-800 text-white
         top-[100%] overflow-auto"
          >
            {search.length > 0 ? (
              search.map((s) => (
                <Link
                  to={`/${s.media_type}/details/${s.id}`}
                  key={s.id}
                  className="w-[100%] hover:text-black hover:bg-white duration-300 font-semibold
                 text-white p-4 flex justify-start items-center border-b border-white"
                >
                  <span>
                    {s.name || s.title || s.original_name || s.original_title}
                  </span>
                </Link>
              ))
            ) : (
              <p className="p-4 text-center text-white">No Results Found</p>
            )}
          </div>
        )}
      </div>
  );
}
