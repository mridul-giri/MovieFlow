import React, { useEffect, useState } from "react";
import { TopNav } from "./TopNav";
import axios from "../Utils/axios";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Loader } from "./Loader";
import HorizontalCards from "./HorizontalCards";

export function Home() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);

  const getWallpaer = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randData);
    } catch (e) {
      console.log(e);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setTrending(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    !wallpaper && getWallpaer();
    !trending && getTrending();
  }, []);

  return wallpaper && trending ? (
    <>
      <Sidebar />
      <div className="w-full h-full overflow-auto scrollbar-hide ">
        <TopNav />
        <Header data={wallpaper} />
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <h1>
      <Loader />
    </h1>
  );
}
