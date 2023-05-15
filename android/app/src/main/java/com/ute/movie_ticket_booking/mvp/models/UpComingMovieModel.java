package com.ute.movie_ticket_booking.mvp.models;

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

public class UpComingMovieModel extends BaseModel {
  private ApiService apiService;

  public UpComingMovieModel() {
    this.apiService = ApiClient.getApiClient().create(ApiService.class);
  }

  public void getUpComingMovieAndSave(final GetUpComingMovieListener getUpComingMovieListener) {
    Call<MovieEntity[]> getMoviesCall = apiService.getMovies();
    getMoviesCall.enqueue(new Callback<MovieEntity[]>() {
      @Override
      public void onResponse(Call<MovieEntity[]> call, Response<MovieEntity[]> response) {
        if (response.isSuccessful() && response.body() != null) {
          List<MovieEntity> entities = Arrays.asList(response.body());

          for (MovieEntity entity : entities) {
            String posterPath = entity.getPosterPath();
            String fullPosterPath = ApiClient.BASE_URL + posterPath;
            entity.setPosterPath(fullPosterPath);
            String thumbPath = entity.getThumbPath();
            String fullThumbPath = ApiClient.BASE_URL + thumbPath;
            entity.setThumbPath(fullThumbPath);
          }

          getUpComingMovieListener.onSuccess(entities);
          Log.d("getUpComingMovieAndSave", "onResponseSuccess: Success");
        } else {
          getUpComingMovieListener.onNullResult();
          Log.d("getUpComingMovieAndSave", "onResponseError: " + response.message());
        }
      }

      @Override
      public void onFailure(Call<MovieEntity[]> call, Throwable t) {
        getUpComingMovieListener.onFailure(t.getLocalizedMessage());
        Log.d("getUpComingMovieAndSave", "onFailure: " + t.getLocalizedMessage());
      }
    });
  }

  public interface GetUpComingMovieListener {
    void onSuccess(List<MovieEntity> movies);
    void onNullResult();
    void onFailure(String msg);
  }
}
