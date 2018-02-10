// the the browser has finished loading the HTML document 

$(document).ready(function() {
  
  /* create four variables for  
  1. the list of Twitch's accounts to consider 
  2. the basis URL to retrieve information on the Twitch's accounts
  3. the basis URL for the stream to retrieve information on whether the Twitch's accounts are streaming or not 
  4. a placeholder value to be included in the HTML according to whther an account is live or not
  */
  var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var basisURL = "https://wind-bow.glitch.me/twitch-api/channels/";
  var basisURLStream = "https://wind-bow.glitch.me/twitch-api/streams/";
  var isStreamLive;

   // loop through the array of accounts
  for(var i=0; i<accounts.length;i++) {
    // store in a variable the objective URL to be used in the getJSON method to retrieve streaming information for each account listed
    var objectiveURLStream = basisURLStream + accounts[i];
    
    // get a JSON object for the objective URL
    $.getJSON(objectiveURLStream, function(json) {
      // store in a variable the value for the property of stream
      var streamValue = json.stream;
      // if this is different then null update the placeholder variable to "Live", otherwise to "Off"
      // value which will be injected in the HTML
      if(streamValue != null) {
        isStreamLive = "Live";
      }
      else {
        isStreamLive = "Off";
      }
    });

    // store in a variable the objective URL to be used in the getJSON method to retrieve account information for each account listed
    var objectiveURL = basisURL + accounts[i];
    // get a JSON object for the objective URL
    $.getJSON(objectiveURL, function(json) {
      // console.log(json);

      /*
      store in variables the information needed by the page, under the properties of
      - json.url; forwarding to the Twitch's account
      - json.logo; providing a URL for the logo of the account 
      - account.status; providing information included by the account in its status section
        (if null, this is set to unknown, otherwise it is stored and if too long, shortened)
      */
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

      // append to the unorded list a list item with the following HTML structure
      
      /*
      
      <li>
        <p>
          <a href="{link forwarding to the account}">
            <img src="{account logo}" title="{account name}">
          </a>
        </p>

        <p>
          {account status}
        </p>
        
        <p>
          {is account streaming}
        </p>
      </li>
      
      */
      
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
      
        // if the third paragraph (either containing the string "Live" or "Off", contains the former of the two, add the class which animates the string 
        $(".vertical-list-of-streams li p:nth-child(3):contains('Live')").addClass("streaming-live");
    });

  }


  // listen for a click event on the label "online" in the horizontal submenu
  $(".horizontal-submenu .online").on("click", function() {
      // show only live accounts
      // slideUp only those list items which contain the text "Off", leaving the remaining unscathed
      $(".vertical-list-of-streams li:contains('Off')").slideUp();
  });

  // listen for a click event on the label "all" in the horizontal submenu
  $(".horizontal-submenu .all").on("click", function() {
      // show all accounts
      // slideDown all list items, making them visible again 
      $(".vertical-list-of-streams li").slideDown();
  });

}); /* close document ready function */
