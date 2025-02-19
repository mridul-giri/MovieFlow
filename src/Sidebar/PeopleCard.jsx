import React from "react";
import { Link } from "react-router-dom";

export function PeopleCard({ data, title }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500">No trending items available.</p>
    );
  }

  return (
    <div
      className="w-full grid sm:grid-cols-2 md:grid-cols-3
     lg:grid-cols-4 gap-6 justify-center p-5"
    >
      {data.map((d, i) => (
        <div
          key={i}
          className="min-w-[250px] w-full bg-black rounded-lg shadow-lg
          hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
        >
          {/* Image Section */}
          <Link
            to={`/${data.media_type || title}/details/${d.id}`}
            className="relative block w-full h-[350px] rounded-t-lg overflow-hidden"
          >
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${
                d.backdrop_path || d.poster_path || d.profile_path
              }`}
              alt={
                d.name ||
                d.title ||
                d.original_name ||
                d.original_title ||
                "Profile"
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
          </Link>

          {/* Content Section */}
          <div className="p-4 text-white">
            <h1 className="text-lg font-semibold truncate">
              {d.name ||
                d.title ||
                d.original_name ||
                d.original_title ||
                "Name Not Available"}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
