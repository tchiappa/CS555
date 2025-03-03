# Project Setup Guide

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Setup Local Development (BackEnd)

### 1. Clone the Repository

```sh
git clone git@github.com:tchiappa/CS555.git
cd CS555/backend/
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start the MongoDB Server

Ensure you are in the `backend` directory and run:

```sh
mkdir -p data/db
mongod --dbpath data/db/
```

### 4. Start the Express Server

Open a new terminal, navigate to the `backend` directory, and run:

```sh
npm run dev
```

Your backend application should now be running successfully!
