(function (j) {
    j.fn.weatherfeed = function (s, h, v) {
    	/*Extend to options*/
        h = j.extend({
            unit: "c",
            showerror: !0,
            linktarget: "_self",
            woeid: !1
        }, h);
        var p = "odd";
        return this.each(function (q, t) {
            var l = j(t);
            //Add class to new element
            l.hasClass("weatherFeed") || l.addClass("weatherFeed");
            if (!j.isArray(s)) return !1;
            
            //maximum 10 cities to be catered
            var m = s.length;
            10 < m && (m = 10);
            var k = "";
            for (q = 0; q < m; q++) "" != k && (k += ","), k += "'" + s[q] + "'";
            now = new Date;
            
            //Retrieve weather using Yahoo API
            m = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from weather.forecast where " + (h.woeid ? "woeid" : "location") + " in (" + k + ") and u='" + h.unit + "'") + "&rnd=" + now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() + "&format=json&callback=?";
            j.ajax({
                type: "GET",
                url: m,
                dataType: "json",
                success: function (f) {
                    if (f.query) {
                    	//For each result set, generate interface to display weather
                        if (0 < f.query.results.channel.length)
                            for (var c = f.query.results.channel.length, e = 0; e < c; e++)
                                w(t, f.query.results.channel[e], h);
                        else w(t, f.query.results.channel, h);
                        j.isFunction(v) && v.call(this, l)
                    } else h.showerror && l.html("<p>Weather information unavailable</p>")
                },
                error: function () {
                    h.showerror && l.html("<p>Weather request failed</p>")
                }
            });
            /*Function that creates weather display*/
            var w = function (f, c, e) {
                f = j(f);
                if ("Yahoo! Weather Error" != c.description) {
                	//Generate description of wind direction
                    var a = c.wind.direction;
                    348.75 <= a && 360 >= a && (a = "N");
                    0 <= a && 11.25 > a && (a = "N");
                    11.25 <= a && 33.75 > a && (a = "NNE");
                    33.75 <= a && 56.25 > a && (a = "NE");
                    56.25 <= a && 78.75 > a && (a = "ENE");
                    78.75 <= a && 101.25 > a && (a = "E");
                    101.25 <= a && 123.75 > a && (a = "ESE");
                    123.75 <= a && 146.25 > a && (a = "SE");
                    146.25 <= a && 168.75 > a && (a = "SSE");
                    168.75 <= a && 191.25 > a && (a = "S");
                    191.25 <= a && 213.75 > a && (a = "SSW");
                    213.75 <= a && 236.25 > a && (a = "SW");
                    236.25 <= a && 258.75 >
                        a && (a = "WSW");
                    258.75 <= a && 281.25 > a && (a = "W");
                    281.25 <= a && 303.75 > a && (a = "WNW");
                    303.75 <= a && 326.25 > a && (a = "NW");
                    326.25 <= a && 348.75 > a && (a = "NNW");
                    var g = c.item.forecast[0];
                    wpd = c.item.pubDate;
                    n = wpd.indexOf(":");
                    tpb = u(wpd.substr(n - 2, 8));
                    tsr = u(c.astronomy.sunrise);
                    tss = u(c.astronomy.sunset);
                    
                    //Generate description element
                    daynight = tpb > tsr && tpb < tss ? "day" : "night";
                    var b = '<div class="weatherItem ' + p + " " + daynight + '"';
                    b += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/' + c.item.condition.code + daynight.substring(0, 1) + '.png); background-repeat: no-repeat;"';
                    // display city and background picture
                     b = b + ">" + ('<div class="weatherCity">' + c.location.city + "</div>");
                    // display temperature
                     b += '<div class="weatherTemp">' + c.item.condition.temp + "&deg;</div>";
                   //   display	Description
                     b += '<div class="weatherDesc">' + c.item.condition.text + "</div>";
                    //display Low & high
                     b += '<div class="weatherRange">High: ' + g.high + "&deg; Low: " + g.low + "&deg;</div>";
                    // display Wind
                     b += '<div class="weatherWind">Wind: ' + a + " " + c.wind.speed + c.units.speed + "</div>";
                } else b = '<div class="weatherItem ' + p + '">',
                b += '<div class="weatherError">City not found</div>';
                b += "</div>";
                p = "odd" == p ? "even" : "odd";
                
                //Add description element to the given root element
                f.append(b)
            }, u = function (f) {
                    d = new Date;
                    return r = new Date(d.toDateString() + " " + f)
                }
        })
    }
})
(jQuery);