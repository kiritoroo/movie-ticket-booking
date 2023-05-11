package com.ute.movie_ticket_booking.ui.base;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.ute.movie_ticket_booking.mvp.base.BaseModel;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.base.BaseView;

public abstract class BaseActivity<M extends BaseModel, V extends BaseView, P extends BasePresenter<M, V>> extends
    AppCompatActivity {
  private P presenter;
  private V view;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (view == null) {
      view = createView();
    }
    if (presenter == null) {
      presenter = createPresenter();
    }
    if (presenter != null && view != null) {
      presenter.attachView(view);
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (presenter != null && view != null) {
      presenter.detachView();
    }
  }

  public abstract V createView();

  public abstract P createPresenter();

  public P getPresenter() {
    return presenter;
  }

  public V getView() {
    return view;
  }
}
