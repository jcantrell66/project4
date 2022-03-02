# PlayerCount Tracker

Welcome to PlayerCount Tracker, an app that allows you to view and track the player count from all of your favorite steam games! Using the steam API, you can input multiple steam games or app names, and compare them with other games on the platform. Clicking the reload button updates the current player count from the API; if the number is green, the count increased, if red, it decreased, and if it is grey, the API has not yet updated. Play around and see how many people are playing you favorite (or most hated) games!<br>

## Screenshots
<img src="https://imgur.com/JRZcYYo.png">
☐ Screenshot after a game has been added to the display through the search function.<br><br>
<img src="https://imgur.com/DHrMKFR.png">
☐ Screenshot after the reload function was used, indicating that the player count has decreased.<br><br>

## Technologies Used

- Javascript, html, CSS
- MongoDB/Mongoose
- Express
- React
- Node
- Semantic UI<br>


## Getting Started

Launch the app by clicking [here!](https://steamapiuser.herokuapp.com/) Sign up or login to access the functionality of the website. To view the planning stages for the project, this [trello board](https://trello.com/b/D2ICTOF1/project-4) contains the original plans behind the app.<br>


## Next Steps

- Creating a 'watching' list, allowing users to save games to a profile to view later
- Display additional statistics on each game card created, such as total downloads, average time played, etc.
- Show information specific to the game when the user clicks on the game card, such as in-game achievements (which are not comparable between two games, unfortunately)
- Contruct a graph or table tracking total players over time