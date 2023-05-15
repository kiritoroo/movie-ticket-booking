package com.ute.movie_ticket_booking.mvp.presenter;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.models.UpComingMovieModel;
import com.ute.movie_ticket_booking.mvp.views.UpComingMovieView;

import java.util.List;

public class UpComingMoviePresenter extends BasePresenter<UpComingMovieModel, UpComingMovieView> {
  private final UpComingMovieModel upComingMovieModel;
  private UpComingMovieView upComingMovieView;

  public  UpComingMoviePresenter() {
    super(new UpComingMovieModel());
    this.upComingMovieModel = getModel();
  }

  public void getUpComingMovieAndDisplay() {
    upComingMovieView = getView();

    upComingMovieModel.getUpComingMovieAndSave(new UpComingMovieModel.GetUpComingMovieListener() {
      @Override
      public void onSuccess(List<MovieEntity> movies) {
        upComingMovieView.getUpComingMovieViewPagerAdapter().setMovies(movies);
        upComingMovieView.getUpComingMovieViewPagerAdapter().notifyDataSetChanged();
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
