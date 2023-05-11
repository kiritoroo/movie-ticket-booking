package com.ute.movie_ticket_booking.beans;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class MovieEntity implements Serializable {
  @SerializedName("_id")
  @Expose
  private String id;
  private String title;
  private String overview;
  private int runtime;
  private String director;
  private String[] actors;
  private String mpaaRating;
  private double imdbScore;
  private double rating;
  private String country;
  private String[] language;
  private Date releaseDate;
  private String posterPath;
  private String trailerPath;
  private List<GenreEntity> genres;
  private Date createdAt;
  private Date updatedAt;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getOverview() {
    return overview;
  }

  public void setOverview(String overview) {
    this.overview = overview;
  }

  public int getRuntime() {
    return runtime;
  }

  public void setRuntime(int runtime) {
    this.runtime = runtime;
  }

  public String getDirector() {
    return director;
  }

  public void setDirector(String director) {
    this.director = director;
  }

  public String[] getActors() {
    return actors;
  }

  public void setActors(String[] actors) {
    this.actors = actors;
  }

  public String getMpaaRating() {
    return mpaaRating;
  }

  public void setMpaaRating(String mpaaRating) {
    this.mpaaRating = mpaaRating;
  }

  public double getImdbScore() {
    return imdbScore;
  }

  public void setImdbScore(double imdbScore) {
    this.imdbScore = imdbScore;
  }

  public double getRating() {
    return rating;
  }

  public void setRating(double rating) {
    this.rating = rating;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String[] getLanguage() {
    return language;
  }

  public void setLanguage(String[] language) {
    this.language = language;
  }

  public Date getReleaseDate() {
    return releaseDate;
  }

  public void setReleaseDate(Date releaseDate) {
    this.releaseDate = releaseDate;
  }

  public String getPosterPath() {
    return posterPath;
  }

  public void setPosterPath(String posterPath) {
    this.posterPath = posterPath;
  }

  public String getTrailerPath() {
    return trailerPath;
  }

  public void setTrailerPath(String trailerPath) {
    this.trailerPath = trailerPath;
  }

  public List<GenreEntity> getGenres() {
    return genres;
  }

  public void setGenres(List<GenreEntity> genres) {
    this.genres = genres;
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
