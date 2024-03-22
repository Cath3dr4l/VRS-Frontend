import { useState } from "react";
import { useManagerContext } from "../hooks/useManagerContext";

const AddMovie = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [stock, setStock] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const genreList = [
    "action",
    "comedy",
    "drama",
    "sci-fi",
    "horror",
    "thriller",
    "romance",
    "animation",
    "fantasy",
    "mystery",
    "crime",
    "adventure",
  ];
  const { manager } = useManagerContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/managers/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${manager.token}`,
      },
      body: JSON.stringify({
        name,
        poster_url: poster,
        rating: parseFloat(rating),
        summary_text: description,
        genre: genres,
        stock: parseInt(stock),
        buy_price: parseFloat(buyPrice),
        rent_price: parseFloat(rentPrice),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
      setName("");
      setPoster("");
      setRating("");
      setDescription("");
      setGenres([]);
      setStock("");
      setBuyPrice("");
      setRentPrice("");
    }
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    if (e.target.checked) {
      setGenres([...genres, genre]);
    } else {
      setGenres(genres.filter((g) => g !== genre));
    }
  };

  return (
    <div className="fixed w-full px-4 py-24 z-[50]">
      <div className="max-w-[450px] h-[600px] mx-auto bg-black/25 text-white rounded-md">
        <div className="max-w-[320px] mx-auto py-4">
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center my-4">
              New Movie
            </h1>
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={name}
                placeholder="Title"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="url"
                value={poster}
                placeholder="Paste Poster URL"
                required
                onChange={(e) => setPoster(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="number"
                value={stock}
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="number"
                value={buyPrice}
                placeholder="Buy Price"
                required
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </p>
            <br />
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="number"
                value={rentPrice}
                required
                placeholder="Rent Price"
                onChange={(e) => setRentPrice(e.target.value)}
              />
            </p>
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="number"
                value={rating}
                placeholder="IMDB Rating"
                required
                onChange={(e) => setRating(e.target.value)}
              />
            </p>
            <p>
              <input
                className="p-2 rounded w-full bg-gray-700"
                type="text"
                value={description}
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>
            <div>
              {genreList.map((genre) => (
                <p key={genre}>
                  <label>
                    <input
                      type="checkbox"
                      value={genre}
                      onChange={handleGenreChange}
                      checked={genres.includes(genre)}
                    />
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </label>
                </p>
              ))}
            </div>
            <br />
            <button
              className="bg-primary w-full py-3 my-3 font-semibold"
              id="sub_btn"
              type="submit"
              disabled={isLoading}
            >
              Add
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
