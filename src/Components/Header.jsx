import React from "react";
import { Link } from "react-router-dom";
export function Header({ data }) {
  console.log(data);
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat:"no-repeat",
        }}
        className="w-full h-[90vh] flex flex-col justify-end items-start p-10"
      >
        <h1 className="text-xl font-black text-white" >
            {data.name || data.title|| data.original_name||data.original_title}
        </h1>
        <p className="w-[70%] mt-3 text-white">
            {data.overview.slice(0,300)}...
            <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
        </p>
        <p className="text-white mt-2 w-[70%]">
            {data.release_date}
        </p>
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-gray-400 p-3 mt-3 text-black rounded font-semibold">Watch Trailer</Link>
      </div>
    </>
  );
}
