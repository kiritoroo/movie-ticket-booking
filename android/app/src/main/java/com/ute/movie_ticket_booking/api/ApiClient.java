package com.ute.movie_ticket_booking.api;

import java.util.concurrent.TimeUnit;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {
  public static final String BASE_URL = "http://192.168.1.9:3000";

  public static Retrofit getApiClient() {
    return new Retrofit.Builder().baseUrl(BASE_URL)
        .client(provideOkHttp())
        .addConverterFactory(GsonConverterFactory.create())
        .build();
  }

  private static Interceptor provideLoggingInterceptor() {
    return new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY);
  }

  private static OkHttpClient provideOkHttp() {
    return new OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .addNetworkInterceptor(provideLoggingInterceptor())
        .build();
  }
}
