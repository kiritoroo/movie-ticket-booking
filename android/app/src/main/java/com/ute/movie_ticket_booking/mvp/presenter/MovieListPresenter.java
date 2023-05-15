package com.ute.movie_ticket_booking.mvp.presenter;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.models.MovieListModel;
import com.ute.movie_ticket_booking.mvp.views.MovieListView;

import java.util.List;

public class MovieListPresenter extends BasePresenter<MovieListModel, MovieListView> {
  private final MovieListModel movieListModel;
  private MovieListView movieListView;

  public MovieListPresenter() {
    super(new MovieListModel());
    this.movieListModel = getModel();
  }

  public void getMovieListAndDisplay() {
    movieListView = getView();
    movieListModel.getMovieListAndSave(new MovieListModel.GetMovieListListener() {
      @Override
      public void onSuccess(List<MovieEntity> movies) {
        movieListView.getMovieListRecyclerViewAdapter().setMovieList(movies);
        movieListView.getMovieListRecyclerViewAdapter().notifyDataSetChanged();
      }

      @Override
      public void onNullResult() {

      }

      @Override
      public void onFailure(String msg) {

      }
    });
  }
}
