package com.ute.movie_ticket_booking.beans;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Date;

public class GenreEntity implements Serializable {
  @SerializedName("_id")
  @Expose
  private String id;
  private String name;
  private String description;

  @SerializedName("movies")
  @Expose
  private String[] moviesIds;

  private Date createdAt;
  private Date updatedAt;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String[] getMoviesIds() {
    return moviesIds;
  }

  public void setMoviesIds(String[] moviesIds) {
    this.moviesIds = moviesIds;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  public Date getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Date updatedAt) {
    this.updatedAt = updatedAt;
  }
}
