
## Prerequisites

*   Node.js (v18.x or higher recommended)
*   npm or yarn
*   MongoDB (local instance or a cloud-hosted service like MongoDB Atlas)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd chat-app-learning
    ```

2.  **Setup Backend (Server):**
    *   Navigate to the server directory:
        ```bash
        cd server
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `server` directory by copying `.env.example` (if you create one):
        ```bash
        cp .env.example .env
        ```
    *   Update the `.env` file with your environment variables:
        ```
        PORT=3001 # Or your preferred port for the backend
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_strong_jwt_secret
        # Add any other environment variables your server needs
        ```
    *   Start the backend server:
        ```bash
        npm run dev  # For development with Nodemon
        # or
        npm start    # For production
        ```
        The server should be running on `http://localhost:PORT` (e.g., `http://localhost:3001`).

3.  **Setup Frontend (Client):**
    *   Open a new terminal window/tab.
    *   Navigate to the client directory:
        ```bash
        cd ../client  # If you are in the server directory
        # or
        # cd client  # If you are in the root project directory
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `client` directory (Vite uses `.env` files directly for `VITE_` prefixed variables):
        ```
        VITE_SOCKET_URL=http://localhost:3001 # Points to your local backend server
        VITE_API_BASE_URL=http://localhost:3001/api # If you have a separate API prefix
        ```
        *(Note: In your React code, access these as `import.meta.env.VITE_SOCKET_URL`)*
    *   Start the client development server:
        ```bash
        npm run dev
        ```
        The client should be running on `http://localhost:5173` (or another port if 5173 is busy).

## Scripts

**Client:**

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the React app for production.
*   `npm run lint`: Lints the codebase.
*   `npm run preview`: Serves the production build locally for preview.

**Server:**

*   `npm run dev`: Starts the Express server with Nodemon for auto-reloading during development.
*   `npm run start`: Starts the Express server using Node (typically for production).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. (If you add tests later)
