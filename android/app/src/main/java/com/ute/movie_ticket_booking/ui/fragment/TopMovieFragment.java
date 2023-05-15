package com.ute.movie_ticket_booking.ui.fragment;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;

import com.ute.movie_ticket_booking.R;
import com.ute.movie_ticket_booking.databinding.FragmentTopMovieBinding;
import com.ute.movie_ticket_booking.mvp.models.TopMovieModel;
import com.ute.movie_ticket_booking.mvp.presenter.TopMoviePresenter;
import com.ute.movie_ticket_booking.mvp.views.TopMovieView;
import com.ute.movie_ticket_booking.ui.adapter.TopMovieRecyclerViewAdapter;
import com.ute.movie_ticket_booking.ui.base.BaseFragment;

public class TopMovieFragment extends BaseFragment<TopMovieModel, TopMovieView, TopMoviePresenter> implements TopMovieView {
  private RecyclerView topMovieRecyclerView;
  private TopMovieRecyclerViewAdapter topMovieRecyclerViewAdapter;

  @Override
  public Animation onCreateAnimation(int transit, boolean enter, int nextAnim) {
    return AnimationUtils.loadAnimation(getActivity(), R.anim.fade_in);
  }

  @Nullable
  @Override
  public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
    FragmentTopMovieBinding view  = FragmentTopMovieBinding.inflate(getLayoutInflater());
    topMovieRecyclerView = view.topMovieRecyclerView;
    topMovieRecyclerViewAdapter = new TopMovieRecyclerViewAdapter();
    topMovieRecyclerView.setAdapter(topMovieRecyclerViewAdapter);
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
  public TopMovieView createView() {
    return this;
  }

  @Override
  public TopMoviePresenter createPresenter() {
    return new TopMoviePresenter();
  }

  @Override
  public void notifyFinishAttachingView() {
    getPresenter().getTopMovieAndDisplay();
  }


  @Override
  public void onDisplay() {

  }

  @Override
  public TopMovieRecyclerViewAdapter getRecyclerViewAdapter() {
    return topMovieRecyclerViewAdapter;
  }

}