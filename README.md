# Who's on Twitch 

Build a single purpose website in which it is possible to establish if someone is streaming on Twitch.

Feel free to check this [pen](https://codepen.io/borntofrappe/full/YeNzqQ/) to see the current progress.

// CURRENTLY ADDING TECHNICAL IMPLEMENTATION

---

# Building the Single Purpose Application

## The Task

Build a single purpose application similar to [this one](https://codepen.io/freeCodeCamp/full/Myvqmo).

Particularly fulfill the following user stories:

- it is possible to see whether FreeCodeCamp is streaming on Twitch;
- it is possible to forward users toward the Twitch stream by way of clicking on the listed stream;
- it is possible to see additional information if the stream is currently ongoing;
- it is possible to search through the listed streams.

Useful links:
  - FreeCodeCamp [workaround](https://wind-bow.glitch.me/) for the API call;

  - Change in Twitch's [own API](https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843).


## First thoughts

For the technical implementation the `.getJSON` function, used through jQuery for the previous front end web development projects, seems to be the most effective approach used to retrieve the relevant information from an objective URL.

The operation doesn't differ wildly from the "Wikipedia Viewer" project.

For the design of the page, a decision is made to leverage CSS Grid for the layout of the page itself and flexbox for the smaller subsections such as the division containing the information on available streams.

Moreover, media queries are planned to display additional graphics for larger screen sizes, while maintaining the strictly useful portion of the page on smaller devices.


## The design

The general idea behind of the application's own design is plotted in a simple layout, available for visual reference in the resources folder, under the aptly named file of "Twitch API Mockup.png". <!--  editing software is substituted for a pencil and paper -->

**Columns and column**

As mentioned, the page is set to use CSS Grid and to display a two column structure on large screen, while offering a single column layout for smaller screen sizes.

The additional column for large screen is planned to be purely aesthetical and add marginal value to the page itself. The column maintained in all screen sizes is set to contain the streaming information which makes the page ultimately useful.

This effect is achieved through CSS grid and media queries. <!-- a good excuse to practice them both -->

For the two columns layout the following HTML structure is created:

```HTML
<!-- wrapping division -->
<div class="container">
  <!-- container for the left column, to be displayed on large screens only -->
  <div class="larger-screen-container">
  </div>

  <!-- container for the right column, for the streaming information -->
  <div class="information-container">
  </div>
</div>
```

The layout is then manufactured in CSS:

```CSS
/*
for the container of all content
  - width and height encompassing the space made available by the HTML body
  - display grid to leverage CSS grid
  - grid template columns to create a layout which specifies two columns;
    two columns, each covering a fraction of the page (half)
*/
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: "1fr 1fr";
}
/*
for the purely aesthetical container, shown on large screens
  - grid to span the container for one column, the first of the defined two
  - background-color just to test the layout visually
*/
.larger-screen-container {
  grid-column: 1/2;
  background-color: rgba(0,255,255,0.2)
}
/*
for the container of the information to be retrieved through API request
  - grid to span the container for one column, the second of the defined two
*/
.information-container {
  grid-column: 2/3;
  background-color: rgba(255,0,0,0.2)
}
```

*Small note*: background color used to test visually the structure of the grid container and children elements.

For the single column layout, occurring on screen sizes smaller than 800px, it is possible to use a media query in order to hide the left column and display the right one on the entire viewport.

```CSS
/*
for screen smaller than 800px
*/
@media only screen and (max-width: 800px) {
  /*
  for the purely aesthetical container
    - display none to hide it
  */
  .larger-screen-container {
    display: none;
  }
  /*
  for the useful container
    - grid to span the container for two columns,
    covering the entirety of the viewport
  */
  .information-container {
    grid-column: 1/3;
  }
}
```

*Important note*: 800px is chosen arbitrarily.

**Flexbox display**

In the column containing the information regarding Twitch's streams, a display is concocted through flex containers and a simple design.

The following, relatively straightforward, HTML structure is programmed inside of the information-container. Dummy data is used for a rough estimation of what eventually will be displayed once the API call is deployed.

```HTML
<div class="information-display">
  <h1 class="header-display">streamers</h1>
  <ul class="horizontal-submenu">
    <li>online</li>
    <li>all</li>
  </ul>
  <ul class="vertical-list-of-streams">
    <li>
      <p>name</p>
      <p>information</p>
      <p>status</p>
    </li>

    <li>
      <p>name</p>
      <p>information</p>
      <p>status</p>
    </li>
  </ul>
</div>
```

The parent element to this content is the `.information-container` representing the main column of the CSS grid layout. It is possible to set this division as a flex container itself as to center the HTML structure just introduced.


```CSS
.information-container {
  /* ... previous properties ...*/
  display: flex;
}
```

`justify-content` is used to center in the row, while `align-items` is used to position the items in the center of the row.

(`justify-content` centers elements in the main axis, which is row, since flex-direction is set to row by default; likewise, `align-items` centers in the cross axis, which is the column, again because of the default direction).

```CSS
/*
  - display flex to make the column a flex container
  - justify-content and align-items to align the content in the row and in the column
*/
.information-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: azure;
}
```

*Small note*: background colors are used again to test visually the structure; this time the structure of the flex containers and items.

Starting from the now centered structure, it is possible to display the HTML elements as intended through flexbox itself, by manufacturing boxes out of nested flex containers and items.

First off, the encompassing division is set to be a flex container. Its direction is moreover changed to column as to display the content nested inside vertically.

```CSS
.information-display {
  display: flex;
  flex-direction: column;
}
```

The horizontal submenu, containing the labels from which it will be possible to analyze all streaming actors and currently streaming one, is also set to be a flex container, as to position the labels horizontally.

```CSS
.information-display .horizontal-submenu {
  display: flex;
  flex-direction: column;
}
```

Moreover, the labels themselves are set to have the same flex-grow as to each occupy half of the available space.

```CSS
.information-display .horizontal-submenu li {
  flex-grow: 1;
}
```

For the main section of the display, the one portraying streaming data in the form of who is on twitch, if they are streaming and a short description of this potential stream, each list item is set to be a flex container.

This to display the list items on top of each other, as per flex-direction of the parent element, while displaying the contents of the list items themselves horizontally.

`align-items` is also used to center the contents of the list items in the cross axis, which is the column (as per flex-direction being row, by default).

```CSS
.information-display .vertical-list-of-streams li {
  display: flex;
  align-items: center;
}
```

A last adjustment is made to the HTML element in the list item containing information about the ongoing stream. As this conveys the longest type of content (unlike logos and status labels), it is set to grow and occupy available space.

```CSS
.information-display .vertical-list-of-streams li p:nth-child(2){
  flex-grow: 1;
}
```

And this concludes the structure of the information display, with flex containers nested in flex containers. Additional styling is included to 1) increase legibility and 2) style according to a chosen color palette, typography and other stylistic decisions.

**SVG Icons**

In the purely aesthetical section of the page, the one shown only on screens larger than 800px, few simple SVG icons are introduced inline. These are manufactured easily through [inkscape](https://inkscape.org/en/). <!-- perhaps in an excessively rudimentary fashion -->

In CSS then, these icons are styled accordingly to the surrounding styling choices, particularly using the property of `fill`.

Moreover, and through a media query, these icons are set to be visible only if the screen is taller than an arbitrarily decided value of 480px. This as to avoid overlaps between the header and the icons themselves (which are set to be positioned at the bottom of the page).

```CSS
@media only screen and (max-height: 480px) {
  .svg-icons {
    opacity: 0;
  }
}
```

## Technical Implemenation

**First Thoughts**

The links provided by FreeCodeCamp prove to be vital for the project.

As [hereby noted](https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843), the Twitch API was updated to require a key; in response to this change FreeCodeCamp generously offers the opportunity to circumvent such a requirement through an alternative [objective URL](https://wind-bow.glitch.me/).

Following this "pass-through" it is advised to use an alternative base URL, in the form of `https://wind-bow.gomix.me/twitch-api`, and use this as endpoint for the getJSON function.

The URL, as per documentation, allows to retrieve information from the following routes: 

- /users/:user
- /channels/:channel
- /stream/:stream

FreeCodeCamp also provides an array of Twitch's accounts which are to be included in the single purpose application.

```js
var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
```

By copy pasting the provided URl with the route of users/oneOfTheNames it is possible to analyze the response by the "pass-through" API.

For this URL following address for instance: 

```
https://wind-bow.glitch.me/twitch-api/users/freecodecamp, 
```

It is possible to consider the following response: 

```
{"display_name":"FreeCodeCamp","_id":79776140,"name":"freecodecamp","type":"user","bio":"We help you learn to code, then practice by building projects for nonprofits. Learn Full-stack JavaScript, build a portfolio, and get a coding job by joining our open source community at https://freecodecamp.com","created_at":"2015-01-14T03:36:47Z","updated_at":"2018-02-08T09:31:46Z","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png","_links":{"self":"https://api.twitch.tv/kraken/users/freecodecamp"}}
```

In which an object contains the relevant information required by the single purpose application.

What is then necessary is to 1) retrieve the information from the list of provided accounts and 2) and inject the results in the HTML document, much alike in the Wikipedia Viewer project materialized prior to this one.

**JSON Objects**

Navigating all available routes and considering the returning object it is possible to assess the following:

- `users/:user` provides information on the Twitch account for `:user`. 

  Relevant information comes under the following properties:
  - display_name;
  - logo;
  - \_links.self; (forwarding to the user account on Twitch, supposedly).
  
- `channels/channel` provides descriptive information regarding the channel.

  It includes the following potentially useful values
  - status;
  - display_name;
  - logo;
  - url (forwarding to the Twitch account of twitch.tv/oneOfTheNames).
   
- `streams/:stream` provides descriptive information pertinent to an ongoing stream. 

  If a stream is not under way, the following properties are relevant
  - stream (which is set to null);
  - \_links (forwarding to the account much alike the route `users/:user` allows).

  If a stream is indeed happening, the information changes with additional details regarding the stream itself.
  - stream.viewers;
  - stream.type;
  - stream.preview.small
  - channel.status;
  - channel.display_name;
  - channel.logo;
  - \_links.self.
    
Information is often redundant among the possible routes. Moreover, forwarding links found under the properties of `_link.self` returns the following message.

```
{"error":"Bad Request","status":400,"message":"No client id specified"}
```

This leads to a simplistic choice to first use the single route of `channels/:channel`, as to retrieve the display status, name, logo and a functioning reference. 

When implemented, the solution would ultimately provide references to Twitch channels, without actually signaling whether a channel is streaming or not. This information is retrieve-able in the route of `streams/:stream`, potentially to be added later.

**jQuery to HTML**

In its simplest form, it is possible to use jQuery to visualize the json object returned with the following statement:

```js
var url = "https://wind-bow.glitch.me/twitch-api/channels/freecodecamp";

$.getJSON(url, function(json) {
  console.log(json);
});
```

This statement outputs in the developer console the object with several of the required properties, for the channel of FreeCodeCamp.

In order to ponder a JSON object for every result a for loop is implemented to loop through the array of accounts, concatenate each account's name to the URL and output the object connected to this newly minted objective URL.

```JS
var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var basisURL = "https://wind-bow.glitch.me/twitch-api/channels/";

for(var i=0; i<accounts.length;i++) {
  var objectiveURL = basisURL + accounts[i];
  $.getJSON(objectiveURL, function(json) {
    console.log(json);
  });
}
```

Which returns an object for each account. Instead of simply displaying the object, the next step is to store useful values and to inject them in the unordered list provided in the HTML.

Unordered list which is planned to be structured as follows:

```HTML
<ul class="vertical-list-of-streams">
  <li>
    <!--  
    section containing a link-able image
    -->
    <p>
      <a href="{link forwarding to the account}">
        <img src="{account logo}" title="{account name}">
      </a>
    </p>

    <!--  
    section containing the information included by the account in its status
    -->
    <p>
      {account status}
    </p>

    <!--  
    section containing the status of the streamer
    set to a default value of live
    -->
    <p>
      LIVE
    </p>
  </li>
</ul>
```

jQuery is therefore used to append a list item, one for each account, detailing the described structure. Moreover, jQuery is used to include the values mentioned in between {curly braces} with the actual values found in the JSON objects.

The function in the for loop looks as follows:

```
$(".vertical-list-of-streams")
      .append(
        "<li><p><a href="
        +
        json.url
        +
        "><img src="
        +
        json.logo
        +"></a></p><p>"
        +
        json.status.substr(0,40)
        +
        "</p><p>LIVE</p></li>"
      );
```

**Live Feed**

Additional information is required to complete the usefulness of the page. Information such as the status of an ongoing stream displayed in place of the status of the account, and information detailing if a streamer is actually live. 

These tidbits of information can be discerned by considering the `stream` property found in the `streams/:stream` route.

- if stream is set to `null`, there is no ongoing stream;
- otherwise, there exist additional properties which surmise the presence of a live feed. In this case, the status found under the property of channel refers directly to the ongoing stream.

The only property to be analyzed is therefore the property of `stream`.

To also consider the route of `streams/:stream` it is possible to include, always inside the foor loop, another getJSON request for the particular path.

```JS
var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var basisURLStream = "https://wind-bow.glitch.me/twitch-api/streams/";


for(var i=0; i<accounts.length;i++) {
  var objectiveURLStream = basisURLStream + accounts[i];
  $.getJSON(objectiveURLStream, function(json) {
  
  
  });
```

Inside this request branches are introduced through if/else statements to consider the presence of a null property and adjust accordingly.

The approach used in the script is to:

1. declare a variable outside of the scope of the for loop, directly following prior variables declarations

```
var isStreamLive;
```

2. Inside of the for loop, nested inside the getJSON request, store in this variable the hardcoded string of Live if the JSON object returns a stream property different than `null`

```JS
if(json.stream !== null) {
      isStreamLive = "Live";
    }
else {
  isStreamLive = "Off";
}
```

3. Always inside the for loop, but instead nested inside the other getJSON request, use this variable instead of the hard-coded default value.

Instead of:

```
<p>
  LIVE
</p>
```

The following is used:

```
<p>"
  +
  isStreamLive
  +
"</p>
```

**Wrap-up**

Considering together all prior efforts, and improving readabillity by introducing variables for all necessary properties, the JS code looks as follows:


```JS
var accounts = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var basisURL = "https://wind-bow.glitch.me/twitch-api/channels/";
var basisURLStream = "https://wind-bow.glitch.me/twitch-api/streams/";
var isStreamLive;

for(var i=0; i<accounts.length;i++) {
  var objectiveURLStream = basisURLStream + accounts[i];
  $.getJSON(objectiveURLStream, function(json) {
    if(json.stream !== null) {
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
        "<li><p><a href="
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

  });
}
```

Which admittedly looks cumbersome, but it's not difficult to understand. 

**Online checkup**

The final functionality missing from the page is the ability to show streamers depending on their status. The possibility to toggle between online and all users.

This functionality is combined with the horizontal submenu containing the "Online" and "All" labels respectively. By responding on a click event on each label, the vertical list of streamers needs to show respectively only live accounts or all accounts.

