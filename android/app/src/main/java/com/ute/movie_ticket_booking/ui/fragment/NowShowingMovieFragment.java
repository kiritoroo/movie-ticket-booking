package com.ute.movie_ticket_booking.ui.fragment;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;

import com.ute.movie_ticket_booking.R;
import com.ute.movie_ticket_booking.databinding.FragmentNowShowingMovieBinding;
import com.ute.movie_ticket_booking.mvp.models.NowShowingMovieModel;
import com.ute.movie_ticket_booking.mvp.presenter.NowShowingMoviePresenter;
import com.ute.movie_ticket_booking.mvp.views.NowShowingMovieView;
import com.ute.movie_ticket_booking.ui.activity.MovieDetailActivity;
import com.ute.movie_ticket_booking.ui.activity.MovieListActivity;
import com.ute.movie_ticket_booking.ui.adapter.NowShowingMovieViewPagerAdapter;
import com.ute.movie_ticket_booking.ui.base.BaseFragment;

public class NowShowingMovieFragment extends BaseFragment<NowShowingMovieModel, NowShowingMovieView, NowShowingMoviePresenter> implements NowShowingMovieView {

  private ViewPager nowShowingViewPager;
  private NowShowingMovieViewPagerAdapter nowShowingMovieViewPagerAdapter;

  @Override
  public Animation onCreateAnimation(int transit, boolean enter, int nextAnim) {
    if (enter) {
      return AnimationUtils.loadAnimation(getActivity(), R.anim.fade_in);
    } else {
      return AnimationUtils.loadAnimation(getActivity(), R.anim.fade_out);
    }
  }

  @Nullable
  @Override
  public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
    FragmentNowShowingMovieBinding view = FragmentNowShowingMovieBinding.inflate(getLayoutInflater());
    nowShowingViewPager = view.viewPager;
    nowShowingMovieViewPagerAdapter = new NowShowingMovieViewPagerAdapter();
    nowShowingViewPager.setAdapter(nowShowingMovieViewPagerAdapter);

    view.linkViewAllNowShowingMovie.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent intent = new Intent(getContext(), MovieListActivity.class);
        getContext().startActivity(intent);
      }
    });

    return view.getRoot();
  }

  @Override
  public void onAttach(@NonNull Context context) {
    super.onAttach(context);
  }

  @Override
  public void onDetach() {
    super.onDetach();
  }

  @Override
  public NowShowingMovieView createView() {
    return this;
  }

  @Override
  public NowShowingMoviePresenter createPresenter() {
    return new NowShowingMoviePresenter();
  }

  @Override
  public void notifyFinishAttachingView() {
    getPresenter().getNowShowingMovieAndDisplay();
  }

  @Override
  public ViewPager getNowShowingMovieViewPager() {
    return nowShowingViewPager;
  }

  @Override
  public NowShowingMovieViewPagerAdapter getNowShowingMovieViewPagerAdapter() {
    return nowShowingMovieViewPagerAdapter;
  }
}