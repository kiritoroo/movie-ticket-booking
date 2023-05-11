package com.ute.movie_ticket_booking.ui.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.viewpager.widget.PagerAdapter;

import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.databinding.ItemTopMovieBinding;

import java.util.ArrayList;
import java.util.List;

public class TopMovieViewPagerAdapter extends PagerAdapter implements View.OnTouchListener {
  private Context context;
  private CardView topMovieCardView;
  private ImageView topMovieImageView;
  private TextView topMovieTextView;
  private List<MovieEntity> topMovies = new ArrayList<>();

  @NonNull
  @Override
  public Object instantiateItem(@NonNull ViewGroup container, int position) {
    if (context == null) {
      context = container.getContext();
    }
    final ItemTopMovieBinding view = ItemTopMovieBinding.inflate(LayoutInflater.from(context), container, false);
    topMovieCardView = view.topMovieCardView;
    topMovieImageView = view.topMovieImageView;
    topMovieTextView = view.topMovieTitle;

    topMovieTextView.setText(topMovies.get(position).getTitle());

    container.addView(view.getRoot());
    return view;
  }

  @Override
  public void destroyItem(ViewGroup container, int position, Object object) {
    container.removeView((View) object);
  }

  @Override
  public int getCount() {
    Log.d("DEBUG", String.valueOf(topMovies.size()));
    return topMovies.size();
  }

  public List<MovieEntity> getTopMovies() {
    return topMovies;
  }

  public void setTopMovies(List<MovieEntity> topMovies) {
    this.topMovies = topMovies;
  }

  @Override
  public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
    return view == object;
  }

  @Override
  public boolean onTouch(View view, MotionEvent motionEvent) {
    return false;
  }
}
