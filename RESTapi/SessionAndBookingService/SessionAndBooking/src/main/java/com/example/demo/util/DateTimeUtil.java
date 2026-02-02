package com.example.demo.util;

import java.time.Duration;
import java.time.LocalTime;

public class DateTimeUtil {

    public static long getMinutes(LocalTime start, LocalTime end) {
        return Duration.between(start, end).toMinutes();
    }
}
