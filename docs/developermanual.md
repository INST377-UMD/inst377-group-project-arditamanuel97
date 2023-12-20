
# Developer Manual
## Installation and Setup

## Install Dependencies

1. npm init
2. npm install express
3. npm install nodemon
4. npm install @supabase/supabase-js

The application makes use of the Supabase platform as an external database with the function of storing and retrieving METAR data in real-time. Leaflet.js, a JavaScript library used to produce dynamic maps, is also utilized in the project to display a map on the METAR Info page. This library is combined with free source data from OpenStreetMap to provide an interactive visualization of the reporting stations and their geographical locations, offering users a better understanding of weather conditions in different regions.

## Running the Application on a Server
1. npm start
2. Log on to your browser and type in the URL http://localhost:3000.

## Testing
There are no explicitly written out tests to accompany the software but errors are thrown in the code to ensure that the application functions as intended. These errors are thrown when the HTTP response status, as a result of fetching data, does not equal 200 or 304, indicating an unsuccessful response. Any debugging of issues should begin by examining the console's logs where the error messages can be read. In addition to this, in the event of an error, the screen will change and post a message informing the user about the error.

## API Endpoints
In the application, GET and POST calls are used to retrieve and publish data to the site. Additionally, the site uses the Aviation Weather Center's API as a source for weather information submitted within the previous 15 days. When the “Load Data” button on the METAR Info page of the form is submitted, a function is called that uses the text content in the three form fields (station ID, coordinates, and date/time) to create a URL that allows METAR data from the API to be fetched. A GET request is used to retrieve this data and pull out the requested features from the JSON response. The endpoint updateMetar provides the location where a POST request updates an external database located in Supabase with the extracted data. The application also uses a GET request to retrieve METAR data from the external database using the showMetar endpoint. This request is used to populate a table hosted on the page with the retrieved data.

## Known Bugs and Future Development
A known bug in the project is that the external database does not always update in real time and sometimes requires that the user refreshes the page in order for the database to reflect those changes. In the future, the development team will be exploring ways to enhance the strength of the application both in terms of the number of features as well as the quality of the service with the bug being one of the main priorities. One target goal is to increase the amount of available visualization methods for the data. This includes the option to set periods of time to be analyzed and displayed as a visual. More variety in these visualizations is also a goal, with the inclusion of different types of charts and graphs to visualize the data and display trends. Another feature that will be added in the future is the ability for users to create their own accounts in which they can store and retrieve their queries.