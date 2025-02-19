import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Trailer() {
  const { pathname } = useLocation();
  const isMovie = pathname.includes("movie");
  const info = useSelector((state) =>
    isMovie ? state.movie?.info : state.tv?.info
  );

  const navigate = useNavigate();

  const vdo = info?.videos;
  // console.log("Video Info:", vdo);
  if (!vdo || !vdo.key) {
    return (
      <div
        className="bg-[rgba(0,0,0,.7)] absolute top-0 left-0 z-[100] w-screen
       h-screen flex items-center justify-center"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-2xl ri-close-fill font-semibold text-white absolute right-[10%] top-[9%]"
        ></button>
        <p className="text-white text-4xl">No Trailer Available.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-[rgba(0,0,0,.7)] absolute top-0 left-0 z-[100] w-screen
     h-screen flex items-center justify-center"
    >
      <button
        onClick={() => navigate(-1)}
        className="text-2xl ri-close-fill font-semibold text-white absolute right-[10%] top-[9%]"
      ></button>

      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${vdo.key}`}
        controls
        width="80%"
        height="80%"
        playing
      />
    </div>
  );
}
