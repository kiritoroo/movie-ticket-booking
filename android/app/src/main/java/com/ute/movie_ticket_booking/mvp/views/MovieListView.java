package com.ute.movie_ticket_booking.mvp.views;

import com.ute.movie_ticket_booking.mvp.base.BaseView;
import com.ute.movie_ticket_booking.ui.adapter.MovieListRecyclerViewAdapter;

public interface MovieListView extends BaseView {
  MovieListRecyclerViewAdapter getMovieListRecyclerViewAdapter();
}
