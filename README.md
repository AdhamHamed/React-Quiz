# React-Quiz
 A dynamic quiz application built with React that fetches questions from an API and allows users to answer in a timed environment.

## Description
This is a fully functional quiz app that loads questions from a JSON server and tracks user progress, scores, and time. The app uses useReducer for state management, handling various stages of the quiz, including loading, answering questions, and displaying the results.

## Features
- Fetches Questions: Questions are fetched from an external API (http://localhost:9000/questions).
- Timed Quiz: Each question has a set time limit for the user to answer.
- Score Tracking: Points are awarded for correct answers, and the total score is displayed at the end of the quiz.
- Progress Tracking: Displays current progress, including the question number, current points, and high score.
- High Score: The app retains and compares the user's high score with their current score.
- Error Handling: Displays an error message if the questions fail to load.

## Technologies Used
- React: Core framework for building the app.
- useReducer: State management hook to handle multiple states like loading, active quiz, and finished quiz.
- Fetch API: To retrieve quiz questions from an external server.
- CSS: For basic styling of the components.

## Setup and Installation
- Clone the repository.
- Run npm install to install dependencies.
- Ensure that the JSON server with questions is running on http://localhost:9000/questions.
- Start the app with npm start.

## Usage
- Start the quiz from the start screen.
- Answer each question before the timer runs out.
- View your score and high score at the end of the quiz.
- Reset the quiz to play again.

### License
This project is licensed under the MIT License.
