// Filter posts by search
function filterBySearch() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const posts = document.querySelectorAll('.grid-item');

    posts.forEach(post => {
        const title = post.querySelector('p').textContent.toLowerCase();
        const tags = post.dataset.tags.toLowerCase();
        if (title.includes(searchValue) || tags.includes(searchValue)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// Clear filters and reset view
function clearFilters() {
    document.getElementById('searchBar').value = '';
    const posts = document.querySelectorAll('.grid-item');
    posts.forEach(post => post.style.display = 'block');
    sortByDate(); // Reset to default sorting
}

// Open a random post
function openRandomPost() {
    const posts = Array.from(document.querySelectorAll('.grid-item'));
    const randomIndex = Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomIndex];

    if (randomPost) {
        window.location.href = randomPost.href;
    }
}

// Animate sorting function
function animateSort(sortedPosts, grid) {
    // Apply fade-out effect to all posts
    sortedPosts.forEach((post) => {
        post.classList.add('fade-out');
    });

    setTimeout(() => {
        // Clear grid and reorder posts
        grid.innerHTML = '';
        sortedPosts.forEach((post, index) => {
            post.style.order = index; // Use CSS `order` property for transition
            grid.appendChild(post);

            // Apply fade-in effect after reordering
            setTimeout(() => {
                post.classList.remove('fade-out');
                post.classList.add('fade-in');

                // Remove fade-in class after animation ends
                setTimeout(() => post.classList.remove('fade-in'), 500); // Matches CSS transition duration
            }, 100);
        });
    }, 300); // Delay to allow fade-out animation to complete
}

// Sort posts by newest date with animation
function sortByDate() {
    const posts = Array.from(document.querySelectorAll('.grid-item'));
    const grid = document.querySelector('.grid');

    // Sort posts by newest date
    const sortedPosts = posts.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    animateSort(sortedPosts, grid);
}

// Sort posts by oldest date with animation
function sortByDateInverse() {
    const posts = Array.from(document.querySelectorAll('.grid-item'));
    const grid = document.querySelector('.grid');

    // Sort posts by oldest date
    const sortedPosts = posts.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
    animateSort(sortedPosts, grid);
}
