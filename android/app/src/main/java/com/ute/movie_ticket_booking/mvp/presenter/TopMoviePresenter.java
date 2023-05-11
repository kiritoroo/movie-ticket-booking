package com.ute.movie_ticket_booking.mvp.presenter;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.models.TopMovieModel;
import com.ute.movie_ticket_booking.mvp.views.TopMovieView;

import java.util.List;

public class TopMoviePresenter extends BasePresenter<TopMovieModel, TopMovieView> {
  private final TopMovieModel topMovieModel;
  private TopMovieView topMovieView;

  public TopMoviePresenter() {
    super(new TopMovieModel());
    this.topMovieModel = getModel();
  }

  public void getTopMovieAndDisplay() {
    topMovieView = getView();
    topMovieModel.getTopMovieAndSave(new TopMovieModel.TopMovieModelCallback() {
      @Override
      public void onFinishLoading(List<MovieEntity> entities) {
        topMovieView.getRecyclerViewAdapter().setTopMovies(entities);
        topMovieView.getRecyclerViewAdapter().notifyDataSetChanged();
      }
    });
  }
}
