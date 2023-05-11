package com.ute.movie_ticket_booking.mvp.presenter;

import com.ute.movie_ticket_booking.mvp.base.BasePresenter;
import com.ute.movie_ticket_booking.mvp.models.MainModel;
import com.ute.movie_ticket_booking.mvp.views.MainView;

public class MainPresenter extends BasePresenter<MainModel, MainView>  {
  private MainModel mainModel;
  private MainView mainView;

  public MainPresenter() {
    super(new MainModel());
    this.mainModel = getModel();
  }
}
