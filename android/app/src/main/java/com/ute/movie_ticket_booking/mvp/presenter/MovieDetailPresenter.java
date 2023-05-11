package com.ute.movie_ticket_booking.mvp.presenter;

import android.content.Intent;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.models.MovieDetailModel;
import com.ute.movie_ticket_booking.mvp.views.MovieDetailView;

public class MovieDetailPresenter extends BasePresenter<MovieDetailModel, MovieDetailView> {
  private final MovieDetailModel movieDetailModel;
  private MovieDetailView movieDetailView;

  public MovieDetailPresenter() {
    super(new MovieDetailModel());
    this.movieDetailModel = getModel();
  }

  public void getMovieDetailAndDisplay() {
    movieDetailView = getView();

    Intent intent = movieDetailView.onGetIntent();
    String movieId = intent.getStringExtra("movieId");

    movieDetailModel.getMovieDetailAndSave(movieId, new MovieDetailModel.GetMovieDetailListener() {
      @Override
      public void onSuccess(MovieEntity movie) {
        movieDetailView.onUpdateView(movie);
      }

      @Override
      public void onNullResult() {
        movieDetailView.onMakeToast("Null Result");
      }

      @Override
      public void onFailure(String msg) {

      }
    });
  }
}
