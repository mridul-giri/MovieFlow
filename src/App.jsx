import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Trending } from "./Sidebar/Trending";
import { Popular } from "./Sidebar/Popular";
import { Movie } from "./Sidebar/Movie";
import { Shows } from "./Sidebar/Shows";
import { People } from "./Sidebar/People";
import { MovieDetails } from "./Components/MovieDetails";
import { TvDetails } from "./Components/TvDetails";
import { PersonDetails } from "./Components/PersonDetails";
import { Trailer } from "./Components/Trailer";

function App() {
  return (
    <>
      <div className="w-full h-screen flex bg-gray-900 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />

          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/details/:id" element={<MovieDetails />}>
            <Route
              path="/movie/details/:id/trailer"
              element={<Trailer />}
            ></Route>
          </Route>

          <Route path="/tv" element={<Shows />} />
          <Route path="/tv/details/:id" element={<TvDetails />}>
            <Route path="/tv/details/:id/trailer" element={<Trailer />}></Route>
          </Route>

          <Route path="/people" element={<People />} />
          <Route path="/people/details/:id" element={<PersonDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
