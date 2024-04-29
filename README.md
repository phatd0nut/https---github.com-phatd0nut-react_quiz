# Project Description

This project is a simple quiz application built with React.js for the frontend and Express.js for the backend. Users can either start a new game session and invite friends or join an existing game session using an invitation link.

After each completed game, the score will be uploaded to a high score table. This table consists of a database that supplements the quiz and holds usernames, scores etc.

## Installation

To run the application locally, you first need to install all the necessary dependencies for both the frontend and backend.

### Frontend (React.js)

Navigate to the frontend directory and run the following command to install dependencies:

```bash
cd frontend
npm install
```

### Backend (Express.js)

Navigate to the backend directory and run the following command to install dependencies:

```bash
cd backend
npm install
```

## Setting Up the Database

To set up the database, you will need to import the `react_quiz.sql` file into your MySQL server. You can do this by using a MySQL client like phpMyAdmin, or by using the command line:

```bash
mysql -u username -p database_name < /path/to/react_quiz.sql
```

Replace username with your MySQL username, database_name with the name of your database, and /path/to/react_quiz.sql with the actual path to the react_quiz.sql file in your project.

### Starting the Application

To start the application, run the following command in the server directory:

```bash
npm start
```

This will initiate the application via the server. Open your browser and go to http://localhost:3001 to see the application in action.

# Author

This project was created by [Enor Zilkiqi](https://github.com/phatd0nut).

Feel free to reach out to me at enorzilkiqi@gmail.com if you have any questions or feedback!

## Project Status

This project was created as a course assignment for the Web Technology 6 course, part of the Interactive Media and Web Technologies program at Linnaeus University in Växjö.