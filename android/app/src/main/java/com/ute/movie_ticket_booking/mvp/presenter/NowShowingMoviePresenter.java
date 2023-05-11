package com.ute.movie_ticket_booking.mvp.presenter;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.models.NowShowingMovieModel;
import com.ute.movie_ticket_booking.mvp.views.NowShowingMovieView;

import java.util.List;

public class NowShowingMoviePresenter extends BasePresenter<NowShowingMovieModel, NowShowingMovieView> {
  private final NowShowingMovieModel nowShowingMovieModel;
  private NowShowingMovieView nowShowingMovieView;

  public NowShowingMoviePresenter() {
    super(new NowShowingMovieModel());
    this.nowShowingMovieModel = getModel();
  }

  public void getNowShowingMovieAndDisplay() {
    nowShowingMovieView = getView();

    nowShowingMovieModel.getNowShowingMovieAndSave(new NowShowingMovieModel.GetNowShowingMovieListener() {
      @Override
      public void onSuccess(List<MovieEntity> movies) {
        nowShowingMovieView.getNowShowingMovieViewPagerAdapter().setMovies(movies);
        nowShowingMovieView.getNowShowingMovieViewPagerAdapter().notifyDataSetChanged();
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
