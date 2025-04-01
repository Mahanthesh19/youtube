# Youtube Clone with React

###This is a clone website developed using React JS to mimic the appearance and functionality of the Youtube application.

##Features : 
### Similar appearance to Youtube
### Can display a list of video feed from the youtube
### The Videos can be played locally in the site.
### Title , channel , description , likes , views and comments are available .
### Can save to watchlater and subscribe to the channel if the user logs in.
### Has a dual theme option.
### Search functionality is provided to search your favourite video.
### Display real time feed and related videos.

##Project file structure: Functional components and their uses.

##youtube/
│── node_modules/ 
│── public/ 
│ ├── vite.svg
│ ├── youtube.svg
│── src/
│ ├── assets/
│ ├── components/ 
│ │ ├── ErrorBoundary.jsx - provides boundary for the error handling and fallback UI.
│ │ ├── LeftSidebar.jsx - Reusable component consisting of the video categories and subscribed channels
│ │ ├── Navbar.jsx      - Reusable component consisting of profile icon to login , search bar , theme toggle and settings icons
│ │ ├── RightSidebar.jsx - Reusable component with saved videos to watch later
│ ├── context/ 
│ │ ├── AuthContext.jsx - Provides login/authorization context accross all pages
│ │ ├── ThemeContext.jsx - Provides Theme Context across all pages.
│ ├── icons/ 
│ │ ├── category.svg
│ │ ├── history.svg
│ │ ├── menu.svg
│ │ ├── profile.svg
│ │ ├── search.svg
│ │ ├── settings.svg
│ │ ├── theme-toggle.svg
│ │ ├── watchlater.svg
│ ├── pages/ 
│ │ ├── ChannelDetails.jsx - Displays Channel information and its uploaded videos
│ │ ├── Home.jsx - Display video feed
│ │ ├── Login.jsx - Allows user to login / create account
│ │ ├── VideoDetails.jsx - Consist of video player, gives details about images and display suggested videos
│ ├── tests/ 
│ ├── App.jsx - Provides routing for all the components
│ ├── index.css 
│ ├── index.js 
│ ├── main.jsx 
│ ├── styles.css - provide CSS for all components.

## API:
### The videos and content is fetched by the Youtube v3 data api , using a API key with user quota of 10000 units per day for unpaid usage.
### It fetches the snippet consisting of video id and url , thumbnail url , statistics like views and likes, title, description , comments each with a unique id.

## Authentication and Authorization:
### API is obtained by the authenticated google account via google cloud console.
### The youtube clone is fecilitated with the user authentication and authorization by creating account or login . The logeed in user gets the feature to save and subscribe.

## Responsiveness and UI :
### The site is made responsive for both mobile and PC devices using bootstrap and CSS
### Provided with the dual theme i.e dark theme and light theme for users convenience.

Error handling: All the components are wrapped under the ErrorBoundary to handle the smoothly , with a fallback UI displaying the error.
Debugging : Each component was debugged and logged to diagnise the error and data passage.

Testing : The components were tested for rendering and fetching using the react testing libray Jest.

Deployment : The site was pushed to github through git CMD and the latest commit was deployed using the netlify in integration with github.
             This provides continous integration and rollback for the previous version whenever required.
             GitHub link : https://github.com/Mahanthesh19/youtube-react
             Website link : https://youtube-clone-using-react-js.netlify.app/



