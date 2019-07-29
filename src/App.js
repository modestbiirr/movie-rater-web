import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MovieForm from "./components/MovieForm";
import { withCookies } from "react-cookie";
var FontAwesome = require("react-fontawesome");

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get("mr-token")
  };
  componentDidMount() {
    //fetch data
    if (this.state.token) {
      fetch("http://127.0.0.1:8080/api/movies/", {
        method: "GET",
        headers: {
          Authorization: `Token ${this.state.token}`
        }
      })
        .then(resp => resp.json())
        .then(res => this.setState({ movies: res }))
        .catch(error => console.log(error));
    } else {
      window.location.href = "/";
    }
  }

  loadMovie = movie => {
    console.log(movie);
    this.setState({ selectedMovie: movie, editedMovie: null });
  };

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({ movies: movies, selectedMovie: null });
  };

  editClicked = selMovie => {
    this.setState({ editedMovie: selMovie });
  };

  newMovie = () => {
    this.setState({ editedMovie: { title: "", description: "" } });
  };

  addMovie = movie => {
    this.setState({ movies: [...this.state.movies, movie] });
  };
  cancelForm = () => {
    this.setState({ editedMovie: null });
  };
  render() {
    return (
      <div className="App">
        <h1>
          <FontAwesome name="film" />
          <span>Movie Rater</span>
        </h1>
        <div className="layout">
          <MovieList
            movies={this.state.movies}
            movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted}
            editClicked={this.editClicked}
            newMovie={this.newMovie}
            token={this.state.token}
          />
          <div>
            {!this.state.editedMovie ? (
              <MovieDetails
                movie={this.state.selectedMovie}
                updateMovie={this.loadMovie}
                token={this.state.token}
              />
            ) : (
              <MovieForm
                movie={this.state.editedMovie}
                cancelForm={this.cancelForm}
                newMovie={this.addMovie}
                editedMovie={this.loadMovie}
                token={this.state.token}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
