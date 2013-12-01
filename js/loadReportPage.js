
$(function() {
    var routeID;
    var status1check;
    var status2check;
    var status3check;
    var status4check;
    
    window.status1check = false;
    window.status2check = false;
    window.status3check = false;
    window.status4check = false;
});

function loadRoadPage(LocationString){
	window.location.href = "commentspage.html?route=" + routeID;
}

function loadRouteInfo(LocationString, callback){
    routeID = LocationString;
    var data = {};
    var area = $.post('php/getRoutes.php?action=get&route=' + LocationString, data, callback); 
}

function loadFromDB(LocationString, callback){
	var data = {};
	var area = $.post('php/getComments.php?action=get&route=' + LocationString, data, callback);
}

function updateInfo(data){
     document.getElementById("routeTitle").innerHTML=data[0]["routeName"];
}

function addToPage(data){
        
if (data.length > 0){
        var timeSince = calculateTime(data, data.length-1);
        document.getElementById("routeTimeSince").innerHTML=timeSince;
    
        //update the color of the bar
        var color = determineTraffic(data[data.length-1]["traffic"]);
        document.getElementById("header").setAttribute("style", "background-color:" + color);
    } else {
        document.getElementById("header").setAttribute("style", "background-color:#eee; border-bottom-style:solid 1px");
    }
}

function determineTraffic(trafficNum){
	if (trafficNum == null){
		return 'grey';
	} else if (trafficNum == 1){
		return '#2ed600'; //green
	} else if (trafficNum == 2){
		return '#ffd200'; //yellow
	} else if (trafficNum == 3){
		return '#ff8400'; //orange
	} else if (trafficNum == 4){
		return '#ff3333'; //red
	}
}

function getUrlParameters(parameter, staticURL, decode){
   /*
    Function: getUrlParameters
    Description: Get the value of URL parameters either from 
                 current URL or static URL
    Author: Tirumal
    URL: www.code-tricks.com
   */
   var currLocation = (staticURL.length)? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
   }
   
   if(!returnBool) return false;  
}

function calculateTime(data, num){
    var timestamp = data[num]["timestamp"];
    timestamp = Date.parse(timestamp)/1000;
    var now = Math.round(+new Date()/1000);
    var timesince = (now - timestamp)/60;
    timesince = timesince.toFixed(0);
    console.log(timestamp);
    console.log(now);
    console.log(timesince);
    if (timesince > 1 && timesince < 60)
        return "Updated " + timesince + " minutes ago";
    else if (timesince > 60){
        timesince = timesince/60;
        if (timesince > 24){
            timesince = timesince/24;
            timesince = timesince.toFixed(0);  
            return "Updated " + timesince + " days ago";
        } else {
            timesince = timesince.toFixed(0);
            return "Updated " + timesince + " hours ago";
             
        }
    } else
        return "Updated less than one minute ago..";
}

function setSelected(traffic){
    if (traffic == 1){
        if (window.status2check == true)
            document.getElementById("status2").removeAttribute("style");
        if (window.status3check == true)
            document.getElementById("status3").removeAttribute("style");
<<<<<<< HEAD
        if (window.status4check == true)
=======
        if (swindow.tatus4check == true)
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
            document.getElementById("status4").removeAttribute("style");
       document.getElementById("status1").setAttribute("style", "border:solid 1px green");
        window.status1check = true;
    } else if (traffic == 2){
        if (window.status1check == true)
            document.getElementById("status1").removeAttribute("style");
        if (window.status3check == true)
            document.getElementById("status3").removeAttribute("style");
        if (window.status4check == true)
            document.getElementById("status4").removeAttribute("style");
       document.getElementById("status2").setAttribute("style", "border:solid 1px green");
        window.status2check = true;
    } else if (traffic == 3){
        if (window.status2check == true)
            document.getElementById("status2").removeAttribute("style");
        if (window.status1check == true)
            document.getElementById("status1").removeAttribute("style");
        if (window.status4check == true)
            document.getElementById("status4").removeAttribute("style");
       document.getElementById("status3").setAttribute("style", "border:solid 1px green");
        window.status3check = true;
    } else if (traffic == 4){
        if (window.status2check == true)
            document.getElementById("status2").removeAttribute("style");
        if (window.status3check == true)
            document.getElementById("status3").removeAttribute("style");
        if (window.status1check == true)
            document.getElementById("status1").removeAttribute("style");
       document.getElementById("status4").setAttribute("style", "border:solid 1px green");
        window.status4check = true;
    }
    
            
}

function submitToDB(callback){
    var traffic;
    if (window.status1check == true)
        traffic = 1;
    else if (window.status2check == true)
        traffic = 2;
    else if (window.status3check == true)
        traffic = 3;
    else if (window.status4check == true)
        traffic = 4;
    
    
    
    var comment = document.getElementById("comment").value;
    $.post('php/setComments.php?action=set&route=' + routeID + '&traffic=' + traffic + '&comment=' + comment, callback);
}
    
    