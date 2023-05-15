package com.ute.movie_ticket_booking.mvp.models;

import android.graphics.Movie;
import android.util.Log;

import com.ute.movie_ticket_booking.api.ApiClient;
import com.ute.movie_ticket_booking.api.ApiService;
import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BaseModel;

import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MovieListModel extends BaseModel {
  private ApiService apiService;

  public  MovieListModel() {
    this.apiService = ApiClient.getApiClient().create(ApiService.class);
  }

  public  void getMovieListAndSave(final GetMovieListListener getMovieListListener) {
    Call<MovieEntity[]> getMoviesCall = apiService.getMovies();
    getMoviesCall.enqueue(new Callback<MovieEntity[]>() {
      @Override
      public void onResponse(Call<MovieEntity[]> call, Response<MovieEntity[]> response) {
        if (response.isSuccessful() && response.body() != null) {
          List<MovieEntity> movies = Arrays.asList(response.body());

          for (MovieEntity entity : movies) {
            String posterPath = entity.getPosterPath();
            String fullPosterPath = ApiClient.BASE_URL + posterPath;
            entity.setPosterPath(fullPosterPath);
            String thumbPath = entity.getThumbPath();
            String fullThumbPath = ApiClient.BASE_URL + thumbPath;
            entity.setThumbPath(fullThumbPath);
          }

          getMovieListListener.onSuccess(movies);
        } else {
          Log.d("getMovieListAndSave", "onResponseError: " + response.message());
          getMovieListListener.onNullResult();
        }
      }

      @Override
      public void onFailure(Call<MovieEntity[]> call, Throwable t) {
        Log.d("getMovieListAndSave", "onFailure: " + t.getLocalizedMessage());
        getMovieListListener.onFailure(t.getLocalizedMessage());
      }
    });
  }

  public interface GetMovieListListener {
    void onSuccess(List<MovieEntity> movies);
    void onNullResult();
    void onFailure(String msg);
  }
}
