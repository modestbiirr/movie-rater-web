import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MovieForm from "./components/MovieForm";

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null
  };
  componentDidMount() {
    //fetch data
    fetch("http://127.0.0.1:8080/api/movies/", {
      method: "GET",
      headers: {
        Authorization: "Token 221a207f99065d11bf5a02c53253638be69de5ae"
      }
    })
      .then(resp => resp.json())
      .then(res => this.setState({ movies: res }))
      .catch(error => console.log(error));
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
  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList
            movies={this.state.movies}
            movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted}
            editClicked={this.editClicked}
            newMovie={this.newMovie}
          />
          <div>
            {!this.state.editedMovie ? (
              <MovieDetails
                movie={this.state.selectedMovie}
                updateMovie={this.loadMovie}
              />
            ) : (
              <MovieForm movie={this.state.editedMovie} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
