package com.ute.movie_ticket_booking.ui.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.ute.movie_ticket_booking.databinding.ActivityMovieListBinding;
import com.ute.movie_ticket_booking.mvp.models.MovieListModel;
import com.ute.movie_ticket_booking.mvp.presenter.MovieListPresenter;
import com.ute.movie_ticket_booking.mvp.views.MovieListView;
import com.ute.movie_ticket_booking.ui.adapter.MovieListRecyclerViewAdapter;
import com.ute.movie_ticket_booking.ui.base.BaseActivity;

public class MovieListActivity extends BaseActivity<MovieListModel, MovieListView, MovieListPresenter>
    implements MovieListView {

  private ActivityMovieListBinding view;
  private RecyclerView movieListRecyclerView;
  private MovieListRecyclerViewAdapter movieListRecyclerViewAdapter;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    view = ActivityMovieListBinding.inflate(getLayoutInflater());
    setContentView(view.getRoot());

    movieListRecyclerView = view.movieListRecyclerView;
    movieListRecyclerViewAdapter = new MovieListRecyclerViewAdapter();
    movieListRecyclerView.setAdapter(movieListRecyclerViewAdapter);
    getPresenter().getMovieListAndDisplay();
  }

  @Override
  public MovieListView createView() {
    return this;
  }

  @Override
  public MovieListPresenter createPresenter() {
    return new MovieListPresenter();
  }

  @Override
  public MovieListRecyclerViewAdapter getMovieListRecyclerViewAdapter() {
    return this.movieListRecyclerViewAdapter;
  }
}