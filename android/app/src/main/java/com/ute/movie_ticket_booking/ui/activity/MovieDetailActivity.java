package com.ute.movie_ticket_booking.ui.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;
import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.databinding.ActivityMovieDetailBinding;
import com.ute.movie_ticket_booking.mvp.models.MovieDetailModel;
import com.ute.movie_ticket_booking.mvp.presenter.MovieDetailPresenter;
import com.ute.movie_ticket_booking.mvp.views.MovieDetailView;
import com.ute.movie_ticket_booking.ui.base.BaseActivity;

public class MovieDetailActivity extends BaseActivity<MovieDetailModel, MovieDetailView, MovieDetailPresenter>
    implements
    MovieDetailView {

  ActivityMovieDetailBinding view;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    view = ActivityMovieDetailBinding.inflate(getLayoutInflater());
    setContentView(view.getRoot());

    getPresenter().getMovieDetailAndDisplay();
  }

  @Override
  public MovieDetailView createView() {
    return this;
  }

  @Override
  public MovieDetailPresenter createPresenter() {
    return new MovieDetailPresenter();
  }

  @Override
  public Intent onGetIntent() {
    return getIntent();
  }

  @Override
  public void onUpdateView(MovieEntity entity) {
    TextView movieTitle = view.movieTitle;
    ImageView moviePoster = view.moviePoster;
    TextView movieDirector = view.movieDirector;
    TextView movieActors = view.movieActors;

    movieTitle.setText(entity.getTitle());
    movieDirector.setText(entity.getDirector());
    StringBuilder strActors = new StringBuilder();
    for (String actor: entity.getActors()) {
      strActors.append(actor).append(", ");
    }
    movieActors.setText(strActors);
    Picasso.get().load(entity.getPosterPath()).into(moviePoster);
  }

  @Override
  public void onMakeToast(String msg) {
    Toast.makeText(this, msg, Toast.LENGTH_LONG).show();
  }
}