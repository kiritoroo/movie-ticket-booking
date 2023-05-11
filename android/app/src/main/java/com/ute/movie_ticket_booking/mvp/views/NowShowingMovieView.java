package com.ute.movie_ticket_booking.mvp.views;

import androidx.viewpager.widget.ViewPager;

import com.ute.movie_ticket_booking.mvp.base.BaseView;
import com.ute.movie_ticket_booking.ui.adapter.NowShowingMovieViewPagerAdapter;

public interface NowShowingMovieView extends BaseView {
  ViewPager getNowShowingMovieViewPager();
  NowShowingMovieViewPagerAdapter getNowShowingMovieViewPagerAdapter();
}
