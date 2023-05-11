package com.ute.movie_ticket_booking.mvp.views;

import android.content.Intent;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.mvp.base.BaseView;

public interface MovieDetailView extends BaseView {
  Intent onGetIntent();
  void onUpdateView(MovieEntity entity);
  void onMakeToast(String msg);
}
