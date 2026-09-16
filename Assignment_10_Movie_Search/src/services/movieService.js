const mockMovies = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
    Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    Director: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    Genre: "Action, Adventure, Sci-Fi",
    imdbRating: "8.8",
    Runtime: "148 min"
  },
  {
    imdbID: "tt0816692",
    Title: "Interstellar",
    Year: "2014",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    Plot: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    Director: "Christopher Nolan",
    Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    Genre: "Adventure, Drama, Sci-Fi",
    imdbRating: "8.7",
    Runtime: "169 min"
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Director: "Christopher Nolan",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    Genre: "Action, Crime, Drama",
    imdbRating: "9.0",
    Runtime: "152 min"
  },
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600",
    Plot: "Over the course of several years, two convicts form a friendship, seeking solace and eventual redemption through basic compassion.",
    Director: "Frank Darabont",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    Genre: "Drama",
    imdbRating: "9.3",
    Runtime: "142 min"
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    Plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    Director: "Lana Wachowski, Lilly Wachowski",
    Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    Genre: "Action, Sci-Fi",
    imdbRating: "8.7",
    Runtime: "136 min"
  },
  {
    imdbID: "tt0109830",
    Title: "Forrest Gump",
    Year: "1994",
    Type: "movie",
    Poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&q=80&w=600",
    Plot: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
    Director: "Robert Zemeckis",
    Actors: "Tom Hanks, Robin Wright, Gary Sinise",
    Genre: "Drama, Romance",
    imdbRating: "8.8",
    Runtime: "142 min"
  }
];

export async function searchMoviesAPI(query, page = 1) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  if (apiKey && apiKey !== "your_omdb_api_key_here") {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        return {
          movies: data.Search,
          totalResults: parseInt(data.totalResults, 10)
        };
      } else {
        throw new Error(data.Error || "No movies found.");
      }
    } catch (err) {
      if (err.message.includes("No movies found")) throw err;
    }
  }

  // Fallback to mock search
  const filtered = mockMovies.filter((m) =>
    m.Title.toLowerCase().includes(query.toLowerCase()) ||
    m.Genre.toLowerCase().includes(query.toLowerCase())
  );

  return {
    movies: filtered.length > 0 ? filtered : mockMovies,
    totalResults: filtered.length > 0 ? filtered.length : mockMovies.length
  };
}

export async function getMovieDetailsAPI(imdbID) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  if (apiKey && apiKey !== "your_omdb_api_key_here") {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        return data;
      }
    } catch (err) {
      console.warn("Failed fetching live OMDb movie details. Using fallback.");
    }
  }

  const found = mockMovies.find((m) => m.imdbID === imdbID);
  return found || mockMovies[0];
}
