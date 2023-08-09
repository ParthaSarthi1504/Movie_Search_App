import { Component } from "react";
import SortTable from "../SortTable";
import Movies from "../Movies";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS"
};

class MovieContainer extends Component {
  state = {
    searchInput: "",
    totalPage: "",
    curPage: 1,
    movieList: [],
    prevMovieList: [],
    apiStatus: apiStatusConstants.initial
  };

  onSubmit = () => {
    this.setState({ curPage: 1 }, () => {
      this.getMovieList();
    });
  };

  incrementPage = () => {
    const { totalPage } = this.state;
    this.setState(
      (prevstate) => ({
        curPage: prevstate.curPage + 1 > totalPage ? 1 : prevstate.curPage + 1
      }),
      () => {
        this.getMovieList();
      }
    );
  };

  decrementPage = () => {
    const { curPage } = this.state;
    if (curPage > 1) {
      this.setState(
        (prevstate) => ({
          curPage: prevstate.curPage - 1
        }),
        () => {
          this.getMovieList();
        }
      );
    }
  };

  sortByReleaseDate = (value) => {
    if (value === true) {
      const { movieList } = this.state;
      const sortedMovieList = movieList.sort((firstObj, secondObj) => {
        const date1 = new Date(firstObj.release_date);
        const date2 = new Date(secondObj.release_date);
        if (date1 > date2) {
          return -1;
        } else if (date1 < date2) {
          return 1;
        } else {
          return 0;
        }
      });
      this.setState({ movieList: sortedMovieList });
    }
  };

  sortByRating = (value) => {
    if (value === true) {
      const { movieList } = this.state;
      const sortedMovieList = movieList.sort((firstObj, secondObj) => {
        if (firstObj.vote_average > secondObj.vote_average) {
          return -1;
        } else if (firstObj.vote_average < secondObj.vote_average) {
          return 1;
        } else {
          return 0;
        }
      });
      this.setState({ movieList: sortedMovieList });
    }
  };

  applyFilter = (rating) => {
    const { movieList } = this.state;
    const filteredListByRating = movieList.filter(
      (each) => each.vote_average >= parseInt(rating)
    );
    this.setState({ movieList: filteredListByRating });
  };

  getMovieList = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const { searchInput, curPage } = this.state;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=e8ccc676e299173067a80520c1fee405&&query=${searchInput}&page=${curPage}`;
    const response = await fetch(url);
    const formattedMovieList = await response.json();
    this.setState({
      movieList: formattedMovieList.results,
      totalPage: formattedMovieList.total_pages,
      apiStatus: apiStatusConstants.success
    });
  };

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  );

  renderLoadingView = () => <div className="loader-container">Loading...</div>;

  renderMovieDetailsView = () => {
    const { movieList, totalPage, curPage } = this.state;

    return (
      <>
        <SortTable
          sortByReleaseDate={this.sortByReleaseDate}
          sortByRating={this.sortByRating}
          applyFilter={this.applyFilter}
        />
        <ul className="movie-ul-div">
          {movieList &&
            movieList.map((eachMovie) => (
              <Movies key={eachMovie.id} movieObj={eachMovie} />
            ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-btn"
            onClick={this.decrementPage}
          >
            PREV
          </button>
          <p className="page">
            {curPage} of {totalPage}
          </p>
          <button
            type="button"
            className="pagination-btn"
            onClick={this.incrementPage}
          >
            NEXT
          </button>
        </div>
      </>
    );
  };

  NotFountView = () => <div className="loader-container">Movies Not Fount</div>;

  getMovieDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return this.NotFountView();
    }
  };

  render() {
    const { searchInput } = this.state;
    return (
      <>
        <div className="search-div">
          <h1 className="search-heading">MOVIE NAME</h1>
          <input
            type="search"
            className="search-box"
            value={searchInput}
            onChange={(e) => this.setState({ searchInput: e.target.value })}
          />
          <button type="button" className="search-btn" onClick={this.onSubmit}>
            Search!
          </button>
        </div>
        {this.getMovieDetails()}
      </>
    );
  }
}

export default MovieContainer;
