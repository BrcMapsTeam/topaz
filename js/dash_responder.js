function hxlProxyToJSON(input,headers){
  var output = [];
  var keys=[];
  input.forEach(function(e,i){
      if(headers==true && i==0){
          keys = e;
      } else if(headers==true && i>1) {
          var row = {};
          e.forEach(function(e2,i2){
              row[keys[i2]] = e2;
          });
          output.push(row);
      } else if(headers!=true){
          var row = {};
          e.forEach(function(e2,i2){
              row[keys[i2]] = e2;
          });
          output.push(row);
      }
  });
  return output;
}

function generateStats(idA,idB,data){
    // Define variables for demographic stats
    var tEmbark    = 0;
        tDisembark = 0;

        tTransIn   = 0;
        tTransOut  = 0;

        tRescue    = 0;
        tMen       = 0;
        tWomen     = 0;
        tChild     = 0;
        tDead      = 0;
        tOps = data.length;

    // Define variables for operations counts
    var tRescueOps    = 0;
        tDisembarkOps = 0;
        tTransInOps   = 0;
        tTransOutOps  = 0;

    var pplRescued   = 0;
        pplTransIn   = 0;
        pplTransOut  = 0;
        pplDisembark = 0;

    for(i = 0; i < tOps; i++) {
      if (data[i]['boat'] == "Responder") {
        numEmbark    = parseInt(data[i]['sTotal']);
        numDisembark = parseInt(data[i]['disTotal']);
        numDead   = parseInt(data[i]['dTotal']);

        if (!isNaN(numEmbark)) {tEmbark += numEmbark;};
        if (!isNaN(numDisembark)) {tDisembark += numDisembark;};
        if (!isNaN(numDead))  {tDead  += numDead;};

        if (data[i]['opType'] == "Rescue") {
          tRescue += 1;
          numRMen    = parseInt(data[i]['sMen']) + parseInt(data[i]['dMen']);
          numRWomen  = parseInt(data[i]['sWomen']) + parseInt(data[i]['dWomen']);
          numRChild  = parseInt(data[i]['sChildren']) + parseInt(data[i]['dChildren']);

          if (!isNaN(numRMen))   {tMen   += numRMen;};
          if (!isNaN(numRWomen)) {tWomen += numRWomen;};
          if (!isNaN(numRChild)) {tChild += numRChild;};

          pplRescued += parseInt(data[i]['sTotal']);
        } else if (data[i]['opType'] == "Disembarkment") {
          tDisembark += 1;
          pplDisembark += parseInt(data[i]['disTotal']);
        } else if (data[i]['opType'] == "Transfer In") {
          tTransIn += 1;

          numTiMen    = parseInt(data[i]['sMen']) + parseInt(data[i]['dMen']);
          numTiWomen  = parseInt(data[i]['sWomen']) + parseInt(data[i]['dWomen']);
          numTiChild  = parseInt(data[i]['sChildren'])  + parseInt(data[i]['dChildren']);

          if (!isNaN(numTiMen))   {tMen   += numTiMen;};
          if (!isNaN(numTiWomen)) {tWomen += numTiWomen;};
          if (!isNaN(numTiChild)) {tChild += numTiChild;};

          pplTransIn += parseInt(data[i]['sTotal']);
        } else if (data[i]['opType'] == "Transfer Out") {
          tTransOut += 1;
          pplTransOut += parseInt(data[i]['disTotal']);
        }

    }
  }

    var diff = tEmbark - pplTransIn;


        console.log("Total Embarked: " + tEmbark);
        console.log("Total Disembarked: " + tDisembark);
        console.log("Total Men: " + tMen);
        console.log("Total Women: " + tWomen);
        console.log("Total Children: " + tChild);
        console.log("Total Dead: " + tDead);

        console.log("Total Rescued: " + pplRescued);
        console.log("Total Transferred In: " + pplTransIn);
        console.log("Total Transferred Out: " + pplTransOut);
        console.log("Total Disembarked: " + pplDisembark);



    // Push list items to arrays by category
    for (i = 0; i < tOps; i++) {
      if (data[i]['opType'] == "Rescue") {
        tRescueOps += 1;
      } else if (data[i]['opType'] == "Disembarkment") {
        tDisembarkOps += 1;
      } else if (data[i]['opType'] == "Transfer In") {
        tTransInOps += 1;
      } else if (data[i]['opType'] == "Transfer Out") {
        tTransOutOps += 1;
      }
    }

    var pplCaredFor = pplRescued + pplTransIn + tDead;

    $('#rescueTotalStat').html(pplRescued);
    $('#disembarkTotalStat').html(pplDisembark);
    $('#transInTotalStat').html(pplTransIn);
    $('#transOutTotalStat').html(pplTransOut);
    $('#operationsTotalStat').html(tRescueOps);
    $('#deceasedTotalStat').html(tDead);

    console.log(tOps,tMen,tWomen,tChild);
    console.log(tRescueOps,tDisembarkOps,tTransInOps,tTransOutOps);


      var htmlA = '<h3>KEY STATISTICS</h3>';
          htmlA = htmlA + "<h4>People Cared For: " + pplCaredFor + "</h4>";

      //htmlA = htmlA + "<p>Rescues: <span class='figure'>" + tRescueOps + '</span><br/>';
      //htmlA = htmlA + "Bodies Recovered: <span class='figure'>" + tDead + "</span></br>";
      //htmlA = htmlA + "People Rescued: <span class='figure'>" + pplRescued + '</span><p/>';

      var htmlB = "<img alt='Rescue Symbol' title='People Rescued from the Sea' class='icon' src='img/rescue_black.svg'>";
      htmlB = htmlB + "<span class='figure-padding'>" + pplRescued + "</span><br/>";
      htmlB = htmlB + "<img alt='Transferred In Symbol' title='People Taken Onboard from Other Rescue Vessels' class='icon' src='img/transfer_in_black.svg'>";
      htmlB = htmlB + "<span class='figure-padding'>" + pplTransIn + "</span>";


      var htmlC = "<img alt='Disembark Symbol' title='People Disembarked on Land' class='icon' src='img/disembark_black.svg'>";
      htmlC = htmlC + "<span class='figure-padding'>" + pplDisembark + "</span><br/>";
      htmlC = htmlC + "<img  alt='Transferred Out Symbol' title='People Transferred to Other Rescue Vessels' class='icon' src='img/transfer_out_black.svg'>";
      htmlC = htmlC + "<span class='figure-padding'>" + pplTransOut + "</span>";

      /*

       + tRescues;
       + tDisembark;
      htmlB = htmlB + "</div></div><div class='col-md-3 col-sm-6'>";
       </br>" + tTransIn;
       </br>" + tTransOut;*/


      $(idA).html(htmlA);
      generatePieCharts(tMen,tWomen,tChild,tDead,pplRescued,pplDisembark,pplTransOut,pplTransIn);
}

function generateCharts(data) {
    

}

function outputMedia(media) {
  var o1 = "";
      o2 = "";
      o3 = "";

  var videoArray = [];
  var storyArray = [];
  var photoArray = [];

  // Push list items to arrays by category
  for (i = 0; i < media.length; i++) {
    if (media[i]['Category'] == "Video") {
      videoArray.push("<li class=list-group-item><a href=" + media[i]['URL'] + ">" + media[i]['Title'] + "</a></li> ");
    } else if (media[i]['Category'] == "Story") {
      storyArray.push("<li class=list-group-item><a href=" + media[i]['URL'] + ">" + media[i]['Title'] + "</a></li> ");
    } else if (media[i]['Category'] == "Photos") {
      photoArray.push("<li class=list-group-item><a href=" + media[i]['URL'] + ">" + media[i]['Title'] + "</a></li> ");
    }
  }

  // Output first five items per category if more than 5
  for ( k = 0; k < 5; k++ ) {
    if (k > videoArray.length - 1) { break; }
    o1 += videoArray[k];
  }
  for ( k = 0; k < 5; k++ ) {
    if (k > storyArray.length - 1) { break; }
    o2 += storyArray[k];
  }
  for ( k = 0; k < 5; k++ ) {
    if (k > photoArray.length - 1) { break; }
    o3 += photoArray[k];
  }

  var html1 = "";
      html1 = html1 + o1;

  var html2 = "";
      html2 = html2 + o2;

  var html3 = "";
      html3 = html3 + o3;

  $(videoOutput).html(html1);
  $(newsOutput).html(html2);
  $(photoOutput).html(html3);
}

function generatePieCharts(tm,tw,tc,td,pr,pd,po,pi) {
  var mwc = document.getElementById("mwcChart");
  //console.log(mwc);
  var mwcData = {
    labels: ["Men","Women","Children"],
    datasets: [
      {
        data: [tm,tw,tc],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ]
        }]
  };

  mwcChart = new Chart(mwc,{
    type: 'pie',
    data: mwcData,
    options: {
      legend: {
        display: false
      }
    }
  });

  var eng = document.getElementById("engChart");
  var engData = {
    labels: ["Rescues","Transfers In","Deceased"],
    datasets: [
      {
        data: [pr,pi,td],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ]
        }]
  };

  engChart = new Chart(eng,{
    type: 'pie',
    data: engData,
    options: {
      legend: {
        display: false
      }
    }
  });





  var ops = document.getElementById("opsChart");
  //console.log(mwc);
  var opsData = {
    labels: ["Rescued from the Sea","Disembarked on Land","Transferred to Other Rescue Vessel","Transferred onto the Responder Vessel"],
    datasets: [
      {
        data: [pr,pd,po,pi],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080",
              "#F07432"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080",
              "#F07432"
          ]
        }]
  };

  mwcChart = new Chart(ops,{
    type: 'pie',
    data: opsData,
    options: {
      legend: {
        display: false
      }
    }
  });

  var sad = document.getElementById("sadChart");
  //console.log(mwc);
  var sadData = {
    labels: ["Total Rescued","Bodies Recovered"],
    datasets: [
      {
        data: [sum,td],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B"
          ]
        }]
  };

  sadChart = new Chart(sad,{
    type: 'pie',
    data: sadData,
    options: {
      legend: {
        display: false
      }
    }
  });
}

var dataCall = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=off&force=on&url=https%3A//docs.google.com/spreadsheets/d/1RnEigM1KUihlDe9hlM8ndLZro6CIv90fol8HVpnQnYg/pub%3Fgid%3D613947999%26single%3Dtrue%26output%3Dcsv',
    dataType: 'json',
});

var mediaCall = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=off&force=on&url=https%3A//docs.google.com/spreadsheets/d/1pH0ztwQ8_EUOIKHhi1U15A6W4eLgCnn8IoWBEYTVnUM/pub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv',
    dataType: 'json',
});

$.when(dataCall,mediaCall).then(function(dataArgs,mediaArgs){
    var data  = hxlProxyToJSON(dataArgs[0],true);
        media = hxlProxyToJSON(mediaArgs[0],true);

    var dateFormat = d3.time.format("%m/%d/%Y");

    data.forEach(function(d){
        d['Date'] = dateFormat.parse(d['date']);
    });

    media.forEach(function(d){
        d['Date'] = dateFormat.parse(d['DATE']);
    });

    function sortByDateAscending(a,b) {
        //return a["#date"] - b["#date"];
        return a["Date"]>b["Date"] ? -1 : a["Date"]<b["Date"] ? 1 : 0;
    }

    data = data.sort(sortByDateAscending);

    media = media.sort(sortByDateAscending);

    console.log("Data: ", data);
    console.log("Media: ", media);
    outputMedia(media);
    generateStats("#tot_stats","#ops_stats",data);
});
