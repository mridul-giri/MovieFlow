import React from "react";
import { Link } from "react-router-dom";

export function Header({ data }) {
  // console.log(data);
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-full flex flex-col justify-end items-start p-10"
      >
        <h1 className="text-2xl font-semibold text-white">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="mt-3 text-white">
          {data.overview.slice(0, 300)}...
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            more
          </Link>
        </p>
        <p className="text-white mt-2 ">{data.release_date}</p>
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="bg-gray-400 py-2 cursor-pointer px-4 mt-3 text-black rounded font-semibold"
        >
          Watch Trailer
        </Link>
      </div>
    </>
  );
}
