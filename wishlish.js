// 1. Your Movie Data
let myMovies = [
    {
        id: 1,
        title: "Bluey: The Movie",
        genre: "Funny, Family, Comedy",
        desc: "Join Bluey, the energetic blue heeler pup, as she embarks on new escapades...",
        status: "dropped", // Options: watched, completed, ongoing, dropped, plan
        img: "bluey.jpeg"
    },
    {
        id: 2,
        title: "Gumball",
        genre: "Drama, Comedy, Funny",
        desc: "In Elmore, reality bends and family life gets weird...",
        status: "watched",
        img: "Gumball.jpeg"
    },
    {
        id: 3,
        title: "Demon Slayer",
        genre: "Anime, Action, Adventure",
        desc: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko",
        status: "watched",
        img: "demonsl.jpeg"
    },
    {
        id: 4,
        title: "The Boys",
        genre: "Superhero, Action, Adventure",
        desc: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
        status: "ongoing",
        img: "theboys.jpeg"
    },
    {
        id: 5,
        title: "Senario Lagi",
        genre: "Comedy, Family, Adventure",
        desc: "Mengisahkan Azlee yang baru membeli kereta terpakai telah membawa isterinya Zati bercuti ke Cherating.",
        status: "completed",
        img: "senariolagi.jpeg"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initial render (shows 'watched' movies by default)
    renderMovies('watched');

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Re-render movies based on the tab's data-status attribute
            renderMovies(tab.dataset.status);
        });
    });
});

// 2. The Rendering Engine
function renderMovies(filterStatus) {
    const container = document.getElementById('movie-container');
    container.innerHTML = ''; // Clear current movies

    const filtered = myMovies.filter(m => m.status === filterStatus);

    if (filtered.length === 0) {
        container.innerHTML = `<p class="no-movies">No movies found in this section.</p>`;
        return;
    }

    filtered.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.img}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <div class="movie-header">
                    <h2 class="movie-title">${movie.title}</h2>
                </div>
                <p class="movie-genre">${movie.genre}</p>
                <p class="movie-description">${movie.desc}</p>
            </div>
            <div class="action-buttons">
                <select onchange="updateMovieStatus(${movie.id}, this.value)">
                    <option value="watched" ${movie.status === 'watched' ? 'selected' : ''}>Watched</option>
                    <option value="completed" ${movie.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="ongoing" ${movie.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                    <option value="dropped" ${movie.status === 'dropped' ? 'selected' : ''}>Dropped</option>
                    <option value="plan" ${movie.status === 'plan' ? 'selected' : ''}>Plan to Watch</option>
                </select>
                <button class="delete-btn" onclick="removeMovie(${movie.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Logic to move/drop movies
function updateMovieStatus(id, newStatus) {
    const movie = myMovies.find(m => m.id === id);
    if (movie) {
        movie.status = newStatus;
        // Refresh the view so the movie "moves" to its new home
        const currentActiveTab = document.querySelector('.tab-btn.active').dataset.status;
        renderMovies(currentActiveTab);
    }
}

// 4. Logic to delete/remove entirely
function removeMovie(id) {
    if(confirm("Are you sure you want to remove this from your list?")) {
        myMovies = myMovies.filter(m => m.id !== id);
        const currentActiveTab = document.querySelector('.tab-btn.active').dataset.status;
        renderMovies(currentActiveTab);
    }
}