import React, { useEffect, useState, useRef } from "react";
import axios from "../Utils/axios";
import { Cards } from "./Cards";
import { Loader } from "../Components/Loader";
import { TopNav } from "../Components/TopNav";
import { useNavigate } from "react-router-dom";
export function Movie() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const fetchTrending = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`/movie/now_playing`);
      setTrending((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length > 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (
          scrollTop + clientHeight >= scrollHeight - 5 &&
          hasMore &&
          !loading
        ) {
          fetchTrending();
        }
      }
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="p-3 w-screen h-screen flex flex-col overflow-hidden">
      {/* Header section with navigation */}
      <div className="w-full flex border-b mb-4 z-10 relative">
        <h1
          onClick={() => navigate(-1)}
          className="text-2xl font-semibold text-white cursor-pointer flex items-center"
        >
          <i className="ri-arrow-left-line mr-2 mt-1"></i>
          Movies
        </h1>
        {/* <div className="flex items-center w-[88%]"> */}
        <TopNav />
        {/* </div> */}
      </div>

      {/* Content section with Cards or Loader */}
      <div ref={containerRef} className="flex-1 overflow-auto">
        {trending.length > 0 ? (
          <Cards data={trending} title="movie" />
        ) : (
          <Loader />
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
}
