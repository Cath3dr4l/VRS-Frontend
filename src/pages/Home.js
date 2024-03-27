import SearchBar from "../components/searchBar";
import RowComponent from "../components/RowComponent";

const Home = () => {
  return (
    <div className="py-20">
      <SearchBar videosPath="api/videos" />

      <RowComponent title="All Movies" videosPath="api/videos" />
      <RowComponent title="Action" videosPath="api/videos/genre/action" />
      <RowComponent title="Crime" videosPath="api/videos/genre/crime" />
      <RowComponent title="Sci-Fi" videosPath="api/videos/genre/sci-fi" />
      <RowComponent title="Fantasy" videosPath="api/videos/genre/fantasy" />
      <RowComponent title="Animation" videosPath="api/videos/genre/animation" />
      <RowComponent title="Drama" videosPath="api/videos/genre/drama" />
    </div>
  );
};

export default Home;
