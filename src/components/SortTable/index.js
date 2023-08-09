import { Component } from "react";
import "./index.css";

class SortTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingClicked: false,
      dateClicked: false,
      filterClicked: false
    };
  }

  onReleseDateClicked = () => {
    const { sortByReleaseDate } = this.props;
    this.setState(
      (prevState) => ({ dateClicked: !prevState.dateClicked }),
      () => {
        sortByReleaseDate(this.state.dateClicked);
      }
    );
  };

  onRatingClick = () => {
    const { sortByRating } = this.props;
    this.setState(
      (prevState) => ({ ratingClicked: !prevState.ratingClicked }),
      () => {
        sortByRating(this.state.ratingClicked);
      }
    );
  };

  onFilterClick = () => {
    this.setState((prevState) => ({ filterClicked: !prevState.filterClicked }));
  };

  render() {
    const { dateClicked, ratingClicked, filterClicked } = this.state;
    const { applyFilter } = this.props;
    console.log(this.state);
    return (
      <div className="sort-container">
        <div class="sort-box">
          <p className="sort-by-heading">Sort By</p>
          <button
            type="button"
            className={`sort-btn ${dateClicked ? "btn-selected" : ""}`}
            onClick={this.onReleseDateClicked}
          >
            Release Date
          </button>
          <button
            type="button"
            className={`sort-btn ${ratingClicked ? "btn-selected" : ""}`}
            onClick={this.onRatingClick}
          >
            Rating
          </button>
          <button
            type="button"
            className={`sort-btn ${filterClicked ? "btn-selected" : ""}`}
            onClick={this.onFilterClick}
          >
            Filter
          </button>
        </div>
        {filterClicked && (
          <div className="filter-container">
            <h1 className="rating-filter-heading">Rating</h1>
            <div className="label-div">
              <input
                type="radio"
                name="rating"
                value="1"
                onChange={(e) => applyFilter(e.target.value)}
              />
              <label className="filter-label"> 1 and above</label>
            </div>
            <div className="label-div">
              <input
                type="radio"
                name="rating"
                value="2"
                onChange={(e) => applyFilter(e.target.value)}
              />
              <label className="filter-label"> 2 and above</label>
            </div>
            <div className="label-div">
              <input
                type="radio"
                name="rating"
                value="3"
                onChange={(e) => applyFilter(e.target.value)}
              />
              <label className="filter-label"> 3 and above</label>
            </div>
            <div className="label-div">
              <input
                type="radio"
                name="rating"
                value="4"
                onChange={(e) => applyFilter(e.target.value)}
              />
              <label className="filter-label"> 4 and above</label>
            </div>
            <div className="label-div">
              <input
                type="radio"
                name="rating"
                value="5"
                onChange={(e) => applyFilter(e.target.value)}
              />
              <label className="filter-label"> 5 and above</label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SortTable;
