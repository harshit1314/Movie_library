# Movie Library App - CineArchive

A modern, responsive movie library application built with Vanilla JavaScript that allows users to browse popular movies, search for films, and manage a personal watchlist.

![CineArchive](https://img.shields.io/badge/CineArchive-Movie%2520Library-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

-   **Browse Popular Movies:** Discover currently trending movies on page load.
-   **Search Functionality:** Find movies by title with real-time results.
-   **Detailed Ratings:** View TMDB ratings for all movies.
-   **Watchlist Management:** Add or remove movies from your personal watchlist.
-   **Persistent Storage:** Your watchlist is saved in the browser's `localStorage` and persists between sessions.
-   **Responsive Design:** A seamless experience on desktop, tablet, and mobile devices.
-   **Modern UI:** A beautiful, cinematic dark theme with amber accents and smooth hover effects.
-   **Dynamic Feedback:** Shows loading and empty state messages to the user.

---

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
-   **API:** The Movie Database (TMDB) API
-   **Icons:** Font Awesome
-   **Fonts:** Google Fonts (Poppins, Montserrat)
-   **Storage:** Browser `localStorage`

---

## 📁 Project Structure

```text
movie-library/
│
├── index.html              # Main HTML file for the application structure
├── style.css               # All CSS styles, variables, and responsive design
├── script.js               # Core application logic, API fetching, and DOM manipulation
└── README.md               # This project documentation file
---

## 🔧 Setup and Installation

**This project requires a TMDB API key to function correctly.**

1.  **Download the Files**:
    * Download `index.html`, `style.css`, and `script.js` and place them all in the same folder.

2.  **Get a TMDB API Key**:
    * Visit **[The Movie Database (TMDB)](https://www.themoviedb.org/)** and create a free account.
    * Go to your account **Settings**, then click on the **API** tab.
    * Request an API key (v3 auth) for a "Developer" project.
    * Once approved, copy your API Key.

3.  **Configure the Application**:
    * Open the `script.js` file in a text editor.
    * Find the following line:
        ```javascript
        const API_KEY = 'YOUR_API_KEY_HERE';
        ```
    * Replace `YOUR_API_KEY_HERE` with your actual TMDB API key.

4.  **Run the Application**:
    * Open the `index.html` file in your web browser. The application should now fetch and display popular movies.

---

## 🎯 How to Use

#### 🎬 Browsing Movies
The home page automatically loads with a grid of popular movies. Each movie card displays its poster, title, release year, and TMDB rating.

#### 🔍 Searching for Movies
Use the search bar in the header. Type the title of a movie and press Enter or click the search icon. The grid will update with the search results.

#### 📋 Managing Your Watchlist
-   **Add a Movie:** Click the **"Add to Watchlist"** button on any movie card.
-   **View Watchlist:** Click the **"My Watchlist"** link in the navigation. The grid will display only the movies you've saved.
-   **Remove a Movie:** When a movie is on your list, its button will change to **"Remove from Watchlist"**. Click it to remove the movie.

---

## 🐛 Troubleshooting

-   **Movies are not loading**:
    * The most common issue is an incorrect or missing API key. Double-check that you have correctly pasted your TMDB API key into `script.js`.
    * Verify that you have a stable internet connection.
    * Open the browser's developer console (F12 or Ctrl+Shift+I) to check for any error messages.

-   **Watchlist is not saving**:
    * Ensure that your browser has `localStorage` enabled. This can sometimes be disabled in strict privacy settings or incognito mode.

---

## 📄 License

This project is open-source and available under the **[MIT License](https://opensource.org/licenses/MIT)**.
