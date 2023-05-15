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
import com.ute.movie_ticket_booking.databinding.FragmentUpComingMovieBinding;
import com.ute.movie_ticket_booking.mvp.models.UpComingMovieModel;
import com.ute.movie_ticket_booking.mvp.presenter.UpComingMoviePresenter;
import com.ute.movie_ticket_booking.mvp.views.UpComingMovieView;
import com.ute.movie_ticket_booking.ui.activity.MovieListActivity;
import com.ute.movie_ticket_booking.ui.adapter.NowShowingMovieViewPagerAdapter;
import com.ute.movie_ticket_booking.ui.adapter.UpComingMovieViewPagerAdapter;
import com.ute.movie_ticket_booking.ui.base.BaseFragment;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link UpComingMovieFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class UpComingMovieFragment extends BaseFragment<UpComingMovieModel, UpComingMovieView, UpComingMoviePresenter>
    implements UpComingMovieView {

  private ViewPager upComingViewPager;
  private UpComingMovieViewPagerAdapter upComingMovieViewPagerAdapter;

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
    FragmentUpComingMovieBinding view = FragmentUpComingMovieBinding.inflate(getLayoutInflater());
    upComingViewPager = view.viewPager;
    upComingMovieViewPagerAdapter = new UpComingMovieViewPagerAdapter();
    upComingViewPager.setAdapter(upComingMovieViewPagerAdapter);

    view.linkViewAllUpComingMovie.setOnClickListener(new View.OnClickListener() {
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
  public UpComingMovieView createView() {
    return this;
  }

  @Override
  public UpComingMoviePresenter createPresenter() {
    return new UpComingMoviePresenter();
  }

  @Override
  public void notifyFinishAttachingView() {
    getPresenter().getUpComingMovieAndDisplay();
  }

  @Override
  public ViewPager getUpComingMovieViewPager() {
    return upComingViewPager;
  }

  @Override
  public UpComingMovieViewPagerAdapter getUpComingMovieViewPagerAdapter() {
    return upComingMovieViewPagerAdapter;
  }
}