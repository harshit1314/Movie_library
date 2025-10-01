const sampleMovies = [
    {
        id: 1,
        title: "Dune: Part Two",
        release_date: "2024-03-01",
        poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        vote_average: 8.5,
        overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
    },
    {
        id: 2,
        title: "Oppenheimer",
        release_date: "2023-07-21",
        poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        vote_average: 8.3,
        overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II."
    },
    {
        id: 3,
        title: "Spider-Man: Across the Spider-Verse",
        release_date: "2023-06-02",
        poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        vote_average: 8.7,
        overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
    },
    {
        id: 4,
        title: "John Wick: Chapter 4",
        release_date: "2023-03-24",
        poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        vote_average: 7.8,
        overview: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy."
    },
    {
        id: 5,
        title: "Barbie",
        release_date: "2023-07-21",
        poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        vote_average: 7.2,
        overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land."
    },
    {
        id: 6,
        title: "The Batman",
        release_date: "2022-03-04",
        poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        vote_average: 7.8,
        overview: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption."
    },
    {
        id: 7,
        title: "Top Gun: Maverick",
        release_date: "2022-05-27",
        poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        vote_average: 8.2,
        overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past."
    },
    {
        id: 8,
        title: "Avatar: The Way of Water",
        release_date: "2022-12-16",
        poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        vote_average: 7.6,
        overview: "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started."
    }
];

// API Configuration (Replace with your actual API key)
const API_KEY = '299c044f0566ae167fc478ee98453f43'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// State management
let currentMovies = [];
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// DOM Elements
const browseView = document.getElementById('browse-view');
const watchlistView = document.getElementById('watchlist-view');
const moviesGrid = document.getElementById('movies-grid');
const watchlistGrid = document.getElementById('watchlist-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const navLinks = document.querySelectorAll('.nav-link');
const resultsCount = document.getElementById('results-count');
const watchlistCount = document.getElementById('watchlist-count');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Try to fetch from API, fall back to sample data if no API key
    if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
        fetchPopularMovies();
    } else {
        useSampleData();
    }
    setupEventListeners();
    renderWatchlist();
    updateWatchlistCount();
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.target.getAttribute('data-view');
            switchView(view);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Search
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

// View Switching
function switchView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
    
    if (view === 'watchlist') {
        renderWatchlist();
    }
}

// API Functions
async function fetchPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        currentMovies = data.results;
        renderMovies(currentMovies);
        updateResultsCount();
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        useSampleData();
    }
}

async function searchMovies(query) {
    if (!query.trim()) {
        if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
            fetchPopularMovies();
        } else {
            useSampleData();
        }
        return;
    }
    
    try {
        moviesGrid.innerHTML = '<div class="loading"><div class="spinner"></div><p>Searching movies...</p></div>';
        
        if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
            const data = await response.json();
            currentMovies = data.results;
        } else {
            // Use sample data for search in demo mode
            currentMovies = sampleMovies.filter(movie => 
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        renderMovies(currentMovies);
        updateResultsCount();
    } catch (error) {
        console.error('Error searching movies:', error);
        moviesGrid.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><h3>Search failed</h3><p>Please try again later</p></div>';
    }
}

// Use sample data when API is not available
function useSampleData() {
    currentMovies = sampleMovies;
    renderMovies(currentMovies);
    updateResultsCount();
}

// Rendering Functions
function renderMovies(movies) {
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><h3>No movies found</h3><p>Try a different search term</p></div>';
        return;
    }
    
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            ${isInWatchlist(movie.id) ? '<div class="watchlist-badge"><i class="fas fa-bookmark"></i></div>' : ''}
            <div class="movie-poster-container">
                <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/300x450/1e293b/cbd5e1?text=No+Image'}" 
                     alt="${movie.title}" class="movie-poster">
                <div class="movie-overlay">
                    <div class="movie-rating">
                        <i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </div>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.release_date ? movie.release_date.substring(0, 4) : 'TBA'}</span>
                    <span>Movie</span>
                </div>
                <button class="add-to-watchlist ${isInWatchlist(movie.id) ? 'in-watchlist' : ''}" 
                        data-movie-id="${movie.id}">
                    <i class="fas ${isInWatchlist(movie.id) ? 'fa-minus' : 'fa-plus'}"></i>
                    ${isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to watchlist buttons
    document.querySelectorAll('.add-to-watchlist').forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = parseInt(e.target.closest('button').getAttribute('data-movie-id'));
            toggleWatchlist(movieId);
        });
    });
}

function renderWatchlist() {
    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = '<div class="empty-state"><i class="fas fa-film"></i><h3>Your watchlist is empty</h3><p>Start exploring movies and add them to your watchlist</p></div>';
        return;
    }
    
    watchlistGrid.innerHTML = watchlist.map(movie => `
        <div class="movie-card">
            <div class="watchlist-badge"><i class="fas fa-bookmark"></i></div>
            <div class="movie-poster-container">
                <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/300x450/1e293b/cbd5e1?text=No+Image'}" 
                     alt="${movie.title}" class="movie-poster">
                <div class="movie-overlay">
                    <div class="movie-rating">
                        <i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </div>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.release_date ? movie.release_date.substring(0, 4) : 'TBA'}</span>
                    <span>Movie</span>
                </div>
                <button class="add-to-watchlist in-watchlist" data-movie-id="${movie.id}">
                    <i class="fas fa-minus"></i> Remove from Watchlist
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to remove buttons
    document.querySelectorAll('#watchlist-grid .add-to-watchlist').forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = parseInt(e.target.closest('button').getAttribute('data-movie-id'));
            toggleWatchlist(movieId);
        });
    });
    
    updateWatchlistCount();
}

// Watchlist Management
function toggleWatchlist(movieId) {
    const movie = currentMovies.find(m => m.id === movieId) || watchlist.find(m => m.id === movieId);
    
    if (isInWatchlist(movieId)) {
        // Remove from watchlist
        watchlist = watchlist.filter(m => m.id !== movieId);
    } else {
        // Add to watchlist
        watchlist.push(movie);
    }
    
    // Update localStorage
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    // Re-render affected views
    if (browseView.classList.contains('active')) {
        renderMovies(currentMovies);
    } else {
        renderWatchlist();
    }
    
    updateWatchlistCount();
}

function isInWatchlist(movieId) {
    return watchlist.some(movie => movie.id === movieId);
}

// Update counters
function updateResultsCount() {
    if (resultsCount) {
        resultsCount.textContent = `${currentMovies.length} ${currentMovies.length === 1 ? 'movie' : 'movies'}`;
    }
}

function updateWatchlistCount() {
    if (watchlistCount) {
        watchlistCount.textContent = `${watchlist.length} ${watchlist.length === 1 ? 'movie' : 'movies'}`;
    }
}

// Search Handler
function handleSearch() {
    const query = searchInput.value.trim();
    searchMovies(query);
}