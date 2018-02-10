// remember to err on the side of over-commenting your code

$(document).ready(function() {
  var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var basisURL = "https://wind-bow.glitch.me/twitch-api/channels/";
  var basisURLStream = "https://wind-bow.glitch.me/twitch-api/streams/";
  var isStreamLive;

  for(var i=0; i<accounts.length;i++) {
    var objectiveURLStream = basisURLStream + accounts[i];
    $.getJSON(objectiveURLStream, function(json) {
      var streamValue = json.stream;
      if(streamValue != null) {
        isStreamLive = "Live";
      }
      else {
        isStreamLive = "Off";
      }
    });

    var objectiveURL = basisURL + accounts[i];
    $.getJSON(objectiveURL, function(json) {
      console.log(json);

      var accountURL = json.url;
      var logoURL = json.logo;
      var accountStatus;
      if(json.status === null) {
        accountStatus = "Status Unknown";
      }
      else if (json.status.length > 35){
        accountStatus = json.status.substr(0,32) + "...";
      }
      else {
        accountStatus = json.status;
      }


      $(".vertical-list-of-streams")
        .append(
          "<li><p><a target='_blank' href="
          +
          accountURL
          +
          "><img src="
          +
          logoURL
          +"></a></p><p>"
          +
          accountStatus
          +
          "</p><p>"
          +
          isStreamLive
          +
          "</p></li>"
        );
        $(".vertical-list-of-streams li p:nth-child(3):contains('Live')").addClass("streaming-live");
    });

  }


  $(".horizontal-submenu .online").on("click", function() {
      // show only live accounts
      // slideDown only those which do not contain the text live in the list item
      $(".vertical-list-of-streams li:contains('Off')").slideUp();
  });

  $(".horizontal-submenu .all").on("click", function() {
      // show all accounts
      $(".vertical-list-of-streams li").slideDown();
  });
});
