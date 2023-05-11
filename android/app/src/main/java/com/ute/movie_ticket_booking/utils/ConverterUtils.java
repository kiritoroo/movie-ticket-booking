package com.ute.movie_ticket_booking.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Converter {
  public static String convertSeconds(int totalSeconds) {
    int hours = totalSeconds / 3600;
    int minutes = (totalSeconds % 3600) / 60;

    return new StringBuilder().append(hours).append("h").append(minutes).append("m").toString();
  }

  public static String convertDate(Date date){
    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
    return formatter.format(date);
  }
}
