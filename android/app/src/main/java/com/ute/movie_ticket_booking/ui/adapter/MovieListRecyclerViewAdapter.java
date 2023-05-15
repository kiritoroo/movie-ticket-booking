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
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityOptionsCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;
import com.ute.movie_ticket_booking.beans.GenreEntity;
import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.databinding.ItemMovieBinding;
import com.ute.movie_ticket_booking.ui.activity.MovieDetailActivity;
import com.ute.movie_ticket_booking.utils.ConverterUtils;

import java.util.ArrayList;
import java.util.List;

public class MovieListRecyclerViewAdapter extends RecyclerView.Adapter<MovieListRecyclerViewAdapter.MyViewHolder> {
  private Context context;
  private List<MovieEntity> movieList = new ArrayList<>();

  @NonNull
  @Override
  public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
    if (context == null) {
      context = parent.getContext();
    }
    ItemMovieBinding view = ItemMovieBinding.inflate(LayoutInflater.from(context), parent, false);
    return new MyViewHolder(view);
  }

  @Override
  public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
    MovieEntity movie = movieList.get(position);
    Picasso.get().load(movie.getPosterPath()).into(holder.poster);
    holder.runtime.setText(ConverterUtils.convertMinutes(movie.getRuntime()));
    holder.title.setText(movie.getTitle());
    StringBuilder strGenres = new StringBuilder();
    for (GenreEntity genre: movie.getGenres()) {
      strGenres.append(genre.getName()).append(", ");
    }
    holder.genre.setText(strGenres);
    holder.rating.setRating((float) movie.getRating());
    holder.imdb.setText((int) movie.getImdbScore() + " IMDB");

    holder.cardView.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent intent = new Intent(context, MovieDetailActivity.class);
        intent.putExtra("movieId", movie.getId());

        ActivityOptionsCompat options = ActivityOptionsCompat
            .makeSceneTransitionAnimation((Activity) context, holder.posterCardView, String.valueOf(1));
        context.startActivity(intent, options.toBundle());
      }
    });
  }

  @Override
  public int getItemCount() {
    return movieList.size();
  }

  class MyViewHolder extends RecyclerView.ViewHolder implements View.OnTouchListener {
    CardView cardView;
    CardView posterCardView;
    ImageView poster;
    TextView runtime;
    TextView title;
    TextView genre;
    RatingBar rating;
    TextView imdb;

    public MyViewHolder(ItemMovieBinding view) {
      super(view.getRoot());
      cardView = view.cardView;
      posterCardView = view.moviePosterCardView;
      poster = view.moviePoster;
      runtime = view.movieRuntime;
      title = view.movieTitle;
      genre = view.movieGenre;
      rating = view.movieRating;
      imdb = view.movieImdb;

      cardView.setOnTouchListener(this);
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

  public List<MovieEntity> getMovieList() {
    return movieList;
  }

  public void setMovieList(List<MovieEntity> movieList) {
    this.movieList = movieList;
  }
}
