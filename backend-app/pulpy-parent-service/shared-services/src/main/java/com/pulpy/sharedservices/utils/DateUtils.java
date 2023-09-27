package com.pulpy.sharedservices.utils;

import org.joda.time.DateTimeUtils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class DateUtils {
    public static final long HOUR = 3600*1000;
    public static final Timestamp getUTCTimeFromGivenTime(String currentTime, TimeZone timeZone) throws ParseException {

        DateFormat formatterIST = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        formatterIST.setTimeZone(timeZone);
        Date date = formatterIST.parse(currentTime);
        DateFormat formatterUTC = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
        formatterUTC.setTimeZone(TimeZone.getTimeZone("UTC"));
        return Timestamp.valueOf(formatterUTC.format(date));
    }
    public static final Date getCurrentDate() throws ParseException{
        Date date = new Date();
        return date;
    }
    public static final Date getCurrentUtcTime() throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        SimpleDateFormat ldf = new SimpleDateFormat("yyyy-MMM-dd HH:mm:ss");
        Date d1 = null;
        d1 = ldf.parse( sdf.format(new Date()) );
        return d1;
    }
    public static final Date convertStringToDate(String dateTime) throws ParseException {
        SimpleDateFormat formatterUTC = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        formatterUTC.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date date = formatterUTC.parse(dateTime);
        return date;
    }

    public static final Timestamp getTimeAfterOneHour(){
        DateFormat formatterUTC = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
        formatterUTC.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date date = new Date();
        Date newDate = new Date(date.getTime() + 2 * HOUR);
        return Timestamp.valueOf(formatterUTC.format(newDate));
    }

}
