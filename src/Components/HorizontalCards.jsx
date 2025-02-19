import React from "react";
import { Link } from "react-router-dom";

function HorizontalCards({ data }) {
  return (
    <>
      <div className="w-full p-5">
        <div className="mb-5">
          <h1 className="text-3xl border-b pb-1 text-white">Trending</h1>
        </div>
        <div className="w-full flex overflow-x-auto space-x-4 pl-3 pt-3 pb-5">
          {data.map((d, i) => (
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="min-w-[250px] h-auto bg-black rounded-lg
               transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-[200px] rounded-t-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${
                    d.backdrop_path || d.poster_path
                  }`}
                  alt=""
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
              </div>
              <div className="p-3 text-white">
                <h1 className="text-lg font-semibold truncate">
                  {d.name || d.title || d.original_name || d.original_title}
                </h1>
                <p className="text-sm opacity-80 mt-2">
                  {d.overview.slice(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default HorizontalCards;
