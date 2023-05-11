package com.ute.movie_ticket_booking.ui.adapter;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityOptionsCompat;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.PagerAdapter;

import com.squareup.picasso.Picasso;
import com.ute.movie_ticket_booking.beans.MovieEntity;
import com.ute.movie_ticket_booking.databinding.ItemTopMovieBinding;
import com.ute.movie_ticket_booking.mvp.views.MovieDetailView;
import com.ute.movie_ticket_booking.ui.activity.MovieDetailActivity;

import java.util.ArrayList;
import java.util.List;

public class TopMovieRecyclerViewAdapter extends RecyclerView.Adapter<TopMovieRecyclerViewAdapter.MyViewHolder> {
  private Context context;
  private List<MovieEntity> topMovies = new ArrayList<>();

  @NonNull
  @Override
  public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
    if (context == null) {
      context = parent.getContext();
    }
    ItemTopMovieBinding view = ItemTopMovieBinding.inflate(LayoutInflater.from(context), parent, false);
    return new MyViewHolder(view);
  }

  @Override
  public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
    MovieEntity movie = topMovies.get(position);
    holder.title.setText(movie.getTitle());
    Picasso.get().load(movie.getPosterPath()).into(holder.poster);

    holder.cardView.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent intent = new Intent(context, MovieDetailActivity.class);
        intent.putExtra("movieId", movie.getId());

        ActivityOptionsCompat options = ActivityOptionsCompat
            .makeSceneTransitionAnimation((Activity) context, holder.cardView, String.valueOf(1));

        context.startActivity(intent, options.toBundle());
      }
    });
  }

  @Override
  public int getItemCount() {
    return topMovies.size();
  }

  class MyViewHolder extends RecyclerView.ViewHolder implements View.OnTouchListener {
    CardView cardView;
    ImageView poster;
    TextView title;

    public MyViewHolder(ItemTopMovieBinding view) {
      super(view.getRoot());
      cardView = view.topMovieCardView;
      poster = view.topMovieImageView;
      title = view.topMovieTitle;

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

  public List<MovieEntity> getTopMovies() {
    return topMovies;
  }

  public void setTopMovies(List<MovieEntity> topMovies) {
    this.topMovies = topMovies;
  }
}
