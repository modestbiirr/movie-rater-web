import React, { Component } from "react";
var FontAwesome = require("react-fontawesome");

export class MovieDetails extends Component {
  state = {
    highlighted: -1
  };

  highlightRate = high => evt => {
    this.setState({ highlighted: high });
  };
  rateClicked = stars => evt => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${
        this.props.movie.id
      }/rate_movie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 221a207f99065d11bf5a02c53253638be69de5ae"
        },
        body: JSON.stringify({ stars: stars + 1 })
      }
    )
      .then(resp => resp.json())
      .then(res => this.getDetails())
      .catch(error => console.log(error));
  };

  getDetails = () => {
    fetch(`http://127.0.0.1:8080/api/movies/${this.props.movie.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 221a207f99065d11bf5a02c53253638be69de5ae"
      }
    })
      .then(resp => resp.json())
      .then(res => this.props.updateMovie(res))
      .catch(error => console.log(error));
  };

  render() {
    const mov = this.props.movie;

    return (
      <div>
        {mov ? (
          <div>
            <h3>{mov.title}</h3>
            <FontAwesome
              name="star"
              className={mov.avg_rating > 0 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_rating > 1 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_rating > 2 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_rating > 3 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avg_rating > 4 ? "orange" : ""}
            />
            ({mov.no_of_ratings})<p>{mov.description}</p>
            <div className="rate-container">
              <h2>Rate this movie!</h2>
              {[...Array(5)].map((e, i) => {
                return (
                  <FontAwesome
                    key={i}
                    name="star"
                    className={this.state.highlighted > i - 1 ? "yellow" : ""}
                    onMouseEnter={this.highlightRate(i)}
                    onMouseLeave={this.highlightRate(-1)}
                    onClick={this.rateClicked(i)}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MovieDetails;
