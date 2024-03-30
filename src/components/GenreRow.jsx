import RowComponent from "./RowComponent";

const GenreRow = ({ genre, videosArray }) => {
  return (
    <RowComponent
      title={genre}
      videosArray={videosArray.filter((movie) => {
        return movie.genre.includes(genre);
      })}
    />
  );
};

export default GenreRow;
