# BF-MANAGER
## Overview
This project is a simple BabyFoot (Foosball) manager that allows users to track matches and engage in real-time chat using web sockets.

## Getting Started
To get started with the BabyFoot Manager, follow these steps:

## Prerequisites
- Node.js installed on your machine
- PostgreSQL database server installed or accessible

## Installation
1. Clone the repository
2. Set up PostgreSQL database:

- Create a PostgreSQL database. Note down the database name, user, password, and host details.
- Update the database connection details in ./data/db.ts.

3. Install dependencies:
npm install

## Running the Project
1. Start the server:

-npm run nodemon
The server will start at http://localhost:3000 (or another port if specified).

2. Access the application:

Open a web browser and navigate to http://localhost:3000 (replace with your specified port if different).

## Usage

* Managing Matches:

1. Add a new match using the form at the top of the page.
2. Update the status of a match by clicking the checkbox.
3. Delete a match using the delete button next to each match.

* Real-time Chat:

1. Enter your name in the "Who are you" input field.
2. Enter your message in the "Enter your message..." input field.
3. Click "Send" to send your message. Messages will be displayed in real-time for all connected users.

