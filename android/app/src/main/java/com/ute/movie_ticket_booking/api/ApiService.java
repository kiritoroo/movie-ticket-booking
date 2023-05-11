package com.ute.movie_ticket_booking.api;

import com.ute.movie_ticket_booking.beans.MovieEntity;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ApiService {
  @GET("api/movies")
  Call<MovieEntity[]> getMovies();

  @GET("api/movies/{id}")
  Call<MovieEntity> getMovieById(@Path("id") String id);
}
