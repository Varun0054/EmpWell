# EmpWell - Employee Wellbeing Platform

EmpWell is a comprehensive wellbeing platform designed to support employees through AI-driven assistance, job alignment tools, community support, and corporate insights.

## Features

-   **AI Assistant**: Private, judgment-free wellbeing companion.
-   **Job Framework**: Live job market explorer with skill alignment.
-   **Community**: Anonymous, safe space for sharing workplace experiences.
-   **Insights**: Curated corporate news and trends.
-   **Profile**: Personalized user dashboard.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
-   **Backend**: Node.js, Express, MongoDB, Mongoose, JWT Authentication.

## Getting Started

### Prerequisites

-   Node.js (v18+)
-   MongoDB Atlas Account
-   NewsAPI Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/empwell.git
    cd empwell
    ```

2.  **Frontend Setup**
    ```bash
    npm install
    cp .env.example .env.local
    # Edit .env.local and add your VITE_NEWS_API_KEY
    npm run dev
    ```

3.  **Backend Setup**
    ```bash
    cd server
    npm install
    # Create a .env file in the server directory with:
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    # PORT=5000
    npm run dev
    ```

## Environment Variables

### Frontend (`.env.local`)
-   `VITE_NEWS_API_KEY`: API key from [NewsAPI.org](https://newsapi.org).

### Backend (`server/.env`)
-   `MONGO_URI`: MongoDB connection string.
-   `JWT_SECRET`: Secret key for signing JWT tokens.
-   `PORT`: Server port (default: 5000).

## Project Structure

-   `/src`: Frontend source code (Pages, Components, Context).
-   `/server`: Backend API source code (Models, Controllers, Routes).

## License

MIT
