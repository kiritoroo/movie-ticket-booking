package com.ute.movie_ticket_booking.ui.adapter;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityOptionsCompat;
import androidx.viewpager.widget.PagerAdapter;

import com.squareup.picasso.Picasso;
import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.databinding.ItemNowShowingMovieBinding;
import com.ute.movie_ticket_booking.ui.activity.MovieDetailActivity;
import com.ute.movie_ticket_booking.utils.ConverterUtils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class NowShowingMovieViewPagerAdapter extends PagerAdapter implements View.OnTouchListener {
  private Context context;
  private List<MovieEntity> movies = new ArrayList<>();

  @NonNull
  @Override
  public Object instantiateItem(@NonNull ViewGroup container, int position) {
    if (context == null) {
      context = container.getContext();
    }
    final ItemNowShowingMovieBinding view = ItemNowShowingMovieBinding.inflate(LayoutInflater.from(context), container, false);
    MovieEntity movie = movies.get(position);
    view.movieTitle.setText(movie.getTitle());
    view.movieReleaseTime.setText(ConverterUtils.convertDate(movie.getReleaseDate()));
    view.movieRuntime.setText(ConverterUtils.convertMinutes(movie.getRuntime()));
    Picasso.get().load(movie.getThumbPath()).into(view.moviePoster);

    view.cardView.setOnTouchListener(this);
    view.cardView.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View anotherView) {
        Intent intent = new Intent(context, MovieDetailActivity.class);
        intent.putExtra("movieId", movie.getId());

        ActivityOptionsCompat options = ActivityOptionsCompat
            .makeSceneTransitionAnimation((Activity) context, view.imageCardView, String.valueOf(2));

        context.startActivity(intent, options.toBundle());
      }
    });

    container.addView(view.getRoot());
    return view.getRoot();
  }

  @Override
  public void destroyItem(ViewGroup container, int position, Object object) {
    container.removeView((View) object);
  }

  @Override
  public int getCount() {
    return movies.size();
  }

  @Override
  public boolean isViewFromObject(View view, Object object) {
    return view == object;
  }

  @Override
  public int getItemPosition(Object object) {
    return POSITION_NONE;
  }

  public List<MovieEntity> getMovies() {
    return movies;
  }

  public void setMovies(List<MovieEntity> movies) {
    this.movies = movies;
  }

  @Override
  public boolean onTouch(View view, MotionEvent event) {
    ObjectAnimator scaleUpX = ObjectAnimator.ofFloat(view, "scaleX", 1f, 1.05f);
    ObjectAnimator scaleUpY = ObjectAnimator.ofFloat(view, "scaleY", 1f, 1.05f);
    scaleUpX.setDuration(300);
    scaleUpY.setDuration(300);
    ObjectAnimator scaleDownX = ObjectAnimator.ofFloat(view, "scaleX", 1.05f, 1f);
    ObjectAnimator scaleDownY = ObjectAnimator.ofFloat(view, "scaleY", 1.05f, 1f);
    scaleDownX.setDuration(300);
    scaleDownY.setDuration(300);
    AnimatorSet scaleAnimation = new AnimatorSet();
    scaleAnimation.play(scaleUpX).with(scaleUpY).before(scaleDownX).before(scaleDownY);

    switch (event.getAction()) {
      case MotionEvent.ACTION_DOWN:
        scaleAnimation.start();
        break;
      case MotionEvent.ACTION_UP:
      case MotionEvent.ACTION_CANCEL:
        scaleAnimation.reverse();
        break;
    }
    return false;
  }
}
