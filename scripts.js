// scripts.js for new-post.html

// Function to generate a unique ID for each post
function generatePostId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to save a new blog post to localStorage
document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get values from form
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    // Simple validation to ensure title and content are provided
    if (!title || !content) {
        alert("Please fill in both the title and content!");
        return;
    }

    // Create a post object
    const post = {
        id: generatePostId(),
        title: title,
        content: content,
        image: image || null // Optional image
    };

    // Get the existing posts from localStorage (or initialize an empty array)
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Add the new post to the array
    posts.push(post);

    // Save the updated posts array back to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Redirect to the homepage after saving the post
    window.location.href = 'index.html'; // Redirect to homepage
});


