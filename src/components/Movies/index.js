import "./index.css";

const Movies = (props) => {
  const { movieObj } = props;
  const {
    original_title,
    poster_path,
    release_date,
    vote_average,
    overview
  } = movieObj;
  return (
    <li className="movie-li">
      <div className="movie-poster-div">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
          className="movie-poster"
        />
      </div>
      <div className="movie-list">
        <h1 className="movie-title">{original_title}</h1>
        <p className="movie-release-date">RELEASE DATE: {release_date}</p>
        <p className="movie-rating">RATING: {vote_average}</p>
        <p className="movie-overview">{overview}</p>
      </div>
    </li>
  );
};

export default Movies;
