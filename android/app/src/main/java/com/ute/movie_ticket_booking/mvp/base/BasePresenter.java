package com.ute.movie_ticket_booking.mvp.base;

public abstract class BasePresenter<M extends BaseModel, V extends BaseView> {
  private final M model;
  private V view;

  public BasePresenter(M model) {
    this.model = model;
  }

  public V getView() {
    return view;
  }

  public M getModel() {
    return model;
  }

  public void attachView(V view) {
    this.view = view;
  }

  public void detachView() {
    this.view = null;
  }
}
