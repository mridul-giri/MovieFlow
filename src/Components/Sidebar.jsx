import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <>
      <div className="w-[20%] border-r border-zinc-400 bg-gray-900 text-white p-3">
        <h1>
          <span className="text-2xl font-bold">MovieFlow</span>
        </h1>
        <nav className="flex flex-col text-white text-xl gap-8">
          <h1 className="text-white font-medium text-xl mt-12">New feed</h1>
          <Link
            to="/trending"
            className="hover:bg-white hover:text-black duration-300 rounded-lg p-3"
          >
            <i className="ri-fire-fill mr-2 text-2xl"></i>Trending
          </Link>
          <Link
            to="/popular"
            className="hover:bg-white hover:text-black duration-300 rounded-lg p-3"
          >
            <i className="ri-magic-fill mr-2 text-2xl"></i>Popular
          </Link>
          <Link
            to="/movie"
            className="hover:bg-white hover:text-black duration-300 rounded-lg p-3"
          >
            <i className="ri-movie-fill mr-2 text-2xl"></i>Movies
          </Link>
          <Link
            to="/tv"
            className="hover:bg-white hover:text-black duration-300 rounded-lg p-3"
          >
            <i className="ri-slideshow-2-fill mr-2 text-2xl"></i>Tv Shows
          </Link>
          <Link
            to="/people"
            className="hover:bg-white hover:text-black duration-300 rounded-lg p-3"
          >
            <i className="ri-user-fill mr-2 text-2xl"></i>People
          </Link>
        </nav>
      </div>
    </>
  );
}
