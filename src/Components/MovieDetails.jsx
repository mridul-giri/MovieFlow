import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { loadmovie, removemovie } from "../store/actions/MovieActions";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

export function MovieDetails() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  // console.log("Movie Info:", info);

  if (!info) {
    return <Loader />;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      className="w-full h-fit relative"
    >
      <nav className="w-full flex items-center justify-between p-4 ">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl font-semibold text-white flex items-center"
        >
          <i className="ri-arrow-left-line pt-1"></i>
          <span className="ml-1">Back</span>
        </button>
        <a
          href={`https://www.themoviedb.org/movie/${info.detail.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-xl flex items-center"
        >
          <i className="ri-external-link-fill mr-2"></i>
          Official Website
        </a>
      </nav>

      <div className="w-full flex flex-col items-center lg:flex-row p-4">
        <img
          className="object-cover relative block w-[350px] h-[420px] rounded-lg overflow-hidden mt-10 mx-10"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.backdrop_path || info.detail.poster_path
          }`}
          alt="Movie Poster"
        />

        <div className="content text-white flex flex-col justify-start">
          <h1 className="mt-[5%] text-5xl font-bold text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
          </h1>

          <div className="mt-3 mb-3 flex flex-wrap items-center gap-3 text-gray-200">
            <h1 className="font-medium">{info.detail.release_date} |</h1>
            <h1 className="font-medium">
              {info.detail.genres.map((g) => g.name).join(", ")} |
            </h1>
            <h1 className="font-medium">{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl italic text-gray-300">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl font-medium text-white mt-5">Overview</h1>

          <p
            className="pt-2 text-gray-300 rounded-md"
            style={{
              maxWidth: "600px",
              maxHeight: "250px",
              overflowY: "hidden",
              wordWrap: "break-word",
            }}
          >
            {info.detail.overview || "No overview available for this movie."}
          </p>

          <Link
            to={`${pathname}/trailer`}
            className="bg-gray-400 p-3 mt-3 text-black rounded font-semibold flex items-center justify-center text-center"
          >
            Play Trailer
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
