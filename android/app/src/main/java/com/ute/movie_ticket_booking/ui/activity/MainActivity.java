package com.ute.movie_ticket_booking.ui.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;

import android.net.Uri;
import android.os.Bundle;
import com.ute.movie_ticket_booking.R;
import com.ute.movie_ticket_booking.databinding.ActivityMainBinding;
import com.ute.movie_ticket_booking.mvp.models.MainModel;
import com.ute.movie_ticket_booking.mvp.presenter.MainPresenter;
import com.ute.movie_ticket_booking.mvp.views.MainView;
import com.ute.movie_ticket_booking.ui.base.BaseActivity;
import com.ute.movie_ticket_booking.ui.fragment.TopMovieFragment;

public class MainActivity extends BaseActivity<MainModel, MainView, MainPresenter>
    implements
    MainView,
    TopMovieFragment.TopMovieFragmentListener {

  private ActivityMainBinding view;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    view = ActivityMainBinding.inflate(getLayoutInflater());
    setContentView(view.getRoot());
    initTopMovieFragment();
  }

  private void initTopMovieFragment() {
    FragmentManager fragmentManager = getSupportFragmentManager();
    TopMovieFragment topMovieFragment = new TopMovieFragment();
    fragmentManager.beginTransaction().add(view.topMovieContainer.getId(), topMovieFragment).commit();
  }

  @Override
  public MainView createView() {
    return this;
  }

  @Override
  public MainPresenter createPresenter() {
    return new MainPresenter();
  }

  @Override
  public void onFragmentInteraction(Uri uri) {

  }
}