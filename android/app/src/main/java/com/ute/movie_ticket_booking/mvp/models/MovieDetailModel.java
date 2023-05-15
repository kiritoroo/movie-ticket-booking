package com.ute.movie_ticket_booking.mvp.models;

import android.util.Log;

import com.ute.movie_ticket_booking.api.ApiClient;
import com.ute.movie_ticket_booking.api.ApiService;
import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BaseModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MovieDetailModel extends BaseModel {
  private ApiService apiService;

  public MovieDetailModel() {
    this.apiService = ApiClient.getApiClient().create(ApiService.class);
  }

  public void getMovieDetailAndSave(String movieId, final GetMovieDetailListener getMovieDetailListener) {
    Call<MovieEntity> getMovieByIdCall = apiService.getMovieById(movieId);
    getMovieByIdCall.enqueue(new Callback<MovieEntity>() {
      @Override
      public void onResponse(Call<MovieEntity> call, Response<MovieEntity> response) {
        if (response.isSuccessful() && response.body() != null) {
          MovieEntity entity = response.body();
          String posterPath = entity.getPosterPath();
          String fullPosterPath = ApiClient.BASE_URL + posterPath;
          entity.setPosterPath(fullPosterPath);
          String thumbPath = entity.getThumbPath();
          String fullThumbPath = ApiClient.BASE_URL + thumbPath;
          entity.setThumbPath(fullThumbPath);
          getMovieDetailListener.onSuccess(entity);
        } else {
          Log.d("getMovieDetailAndSave", "onResponseError: " + response.message());
          getMovieDetailListener.onNullResult();
        }
      }

      @Override
      public void onFailure(Call<MovieEntity> call, Throwable t) {
        Log.d("getMovieDetailAndSave", "onFailure: " + t.getLocalizedMessage());
        getMovieDetailListener.onFailure(t.getLocalizedMessage());
      }
    });
  }

  public interface GetMovieDetailListener {
    void onSuccess(MovieEntity  movie);
    void onNullResult();
    void onFailure(String msg);
  }
}
