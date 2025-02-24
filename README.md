# startup

startup project for cs260, and also real pivot for my startup lol

# Specification Deliverable

## The Pitch

Testing endpoints is becoming too complex. We dont need Postman or any of these
crazy tools. You just need CURL. So this is what it is. This is a GUI for base
functionality of CURL so you can make and analyze requests to your endpoint.

## Key Features

-   make, store, and analyze your api endpoint requests for testing purposes

## Technology Breakdown

-   HTML: Will have three to four HTML pages. One auth, one to input a yaml
    file, another that lets you review the generated types and docs (and logic),
    one to package it to your package repo of choice.
-   CSS: Used to style the webpages using folowing a style guide for sizes,
    spacing, padding, margin, and things like that. Might use M3 or GitHubs
    Primer system. IDK, we'll see.
-   Javascript (can i use typescript here?): login, displaying dynamic data,
    display stored requests.
-   React: Build components such as CURL request builder, request analyzer,
    response analyzer. Used for general routing.
-   Backend:
    -   Login service, probably just hash them.
    -   CURL request handling
    -   request and store requests and responses
    -   Run a websocket for a db collection to dynamically update the requests
        table
-   MongoDB: Stores user auth data, CURL requests and responses
-   Websocket: Listening to the DB for changes (new request && response entry)
    and updates the requests table

## Design

![mock-design](design/startup_dashboard.png)

## Deliverable changes

### HTML:

-   I added the html to the site, with a bit of flex box styling because i hate
    how it looks so much.
-   Added Github links, and links to the main dashboard page.

### CSS:

-   I made a bunch of styling
-   I defined some global variables and dynamic scaling for responsiveness.
-   Responsiveness is weird here because this seriously is NOT meant to be used
    on a mobile device since it is a developer tool.
-   Styled the dashboard, auth page, account page, models page, and version
    control page.

### React pt. 1

-   Initialized vite project, eslint, and typescript config file
-   Converted html to react
-   Completely changed my startup idea and the styling
-   I dont like the way react handles states, but I made the login reactive
-   Added component routing for the only two pages, plus my 404 page (please
    look at it btw, I really like it https://startup.demodel.click/404)
-   Added in an npm command to deploy the application automagically

### React pt. 2

-   Added storage of form info into local storage
-   made the list dynamic in both color and listing data in the bottom request
    explorer
-   added checks for data and displaying "no data" defaults
