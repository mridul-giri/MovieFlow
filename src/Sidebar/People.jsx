import React, { useEffect, useState, useRef } from "react";
import axios from "../Utils/axios";
import { Cards } from "./Cards";
import { Loader } from "../Components/Loader";
import { TopNav } from "../Components/TopNav";
import { useNavigate } from "react-router-dom";
import { PeopleCard } from "./PeopleCard";

export function People() {
  const navigate = useNavigate(); // Get navigate function
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Assuming there's more data to load
  const containerRef = useRef(null);

  const fetchTrending = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`/person/popular`); // Adjust this if needed
      console.log(data.results); // Log the results to check the structure
      setTrending((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length > 0); // Check if there's more data
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
        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
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
    <div className="pl-2 w-screen h-screen flex flex-col overflow-hidden">
      {/* Header section with navigation */}
      <div className="w-full flex items-center justify-between mb-4 z-10 relative">
        <h1 className="text-2xl font-semibold text-white flex items-center">
          <i
            onClick={() => navigate(-1)} 
            className="ri-arrow-left-line mr-3 cursor-pointer"
          ></i>
          People
        </h1>
        <div className="flex items-center w-[88%]">
          <TopNav />
        </div>
      </div>

      {/* Content section with Cards or Loader */}
      <div
        ref={containerRef}
        className="mt-4 flex-1 overflow-auto p-4"
      >
        {trending.length > 0 ? (
          < PeopleCard data={trending} title="people"  />
        ) : (
          <Loader />
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
}
