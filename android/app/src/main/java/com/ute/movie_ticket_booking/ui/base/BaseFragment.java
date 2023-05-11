package com.ute.movie_ticket_booking.ui.base;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.ute.movie_ticket_booking.mvp.base.BaseModel;
import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.base.BaseView;

public abstract class BaseFragment<M extends BaseModel, V extends BaseView, P extends BasePresenter<M, V>> extends
    Fragment {
  private P presenter;
  private V view;

  @Override
  public void onActivityCreated(@Nullable Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);
    if (view == null) {
      view = createView();
    }
    if (presenter == null) {
      presenter = createPresenter();
    }
    if (presenter != null && view != null) {
      presenter.attachView(view);
    }
    notifyFinishAttachingView();
  }

  @Override
  public void onDestroyView() {
    super.onDestroyView();
    if (presenter != null && view != null) {
      presenter.detachView();
    }
  }

  public abstract V createView();

  public abstract P createPresenter();

  public abstract void notifyFinishAttachingView();

  public P getPresenter() {
    return presenter;
  }

  public V getViewOfMVP() {
    return view;
  }
}
