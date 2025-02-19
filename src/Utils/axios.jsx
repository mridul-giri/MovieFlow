import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWNjMDAzY2MyZWQ5MmRmZjY1YzZlZDdkMTk0OTU3NSIsIm5iZiI6MTcyNTU1MDczMi4xMTU5MjgsInN1YiI6IjY2ZDljY2Q2MWUwMzA1MTZjYTJhMDcxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eRV9HBSXJcjQhEWPSIJe6JULnIyOf3Q85bJ7GgdVW9c",
  },
});

export default instance;
