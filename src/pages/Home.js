import SearchBar from "../components/searchBar";
import RowComponent from "../components/RowComponent";

const Home = () => {
  return (
    <div className="py-20">
      <SearchBar videosPath="api/movies" />

      <RowComponent title="All Movies" videosPath="api/movies" />
      <RowComponent title="Action" videosPath="api/movies/genre/action" />
      <RowComponent title="Crime" videosPath="api/movies/genre/crime" />
      <RowComponent title="Sci-Fi" videosPath="api/movies/genre/sci-fi" />
      <RowComponent title="Fantasy" videosPath="api/movies/genre/fantasy" />
      <RowComponent title="Animation" videosPath="api/movies/genre/animation" />
      <RowComponent title="Drama" videosPath="api/movies/genre/drama" />
    </div>
  );
};

export default Home;
