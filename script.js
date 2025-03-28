// script.js for index.html (Homepage)

document.addEventListener("DOMContentLoaded", function() {
    // Load all posts from localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Get the post list container
    const postList = document.getElementById('post-list');

    // If no posts exist, show a message
    if (posts.length === 0) {
        postList.innerHTML = "<p> No blog posts available </p>";
        return;
    }

    // Loop through each post and create a clickable link
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        const postLink = document.createElement('a');
        postLink.href = `post.html?id=${post.id}`;  // Link to the individual post page
        postLink.textContent = post.title;

        postElement.appendChild(postLink);
        postList.appendChild(postElement);
    });
});


// script.js for post.html (Individual Post Page)

document.addEventListener("DOMContentLoaded", function () {
    // Get the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    // Get elements from the page
    const postTitle = document.getElementById("post-title");
    const postContent = document.getElementById("post-content");
    const editBtn = document.getElementById("edit-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const editForm = document.getElementById("edit-form");
    const editTitle = document.getElementById("edit-title");
    const editContent = document.getElementById("edit-content");
    const saveBtn = document.getElementById("save-btn");

    // Load posts from local storage
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Find the specific post
    let post = posts.find(p => p.id === postId);

    if (post) {
        // Display post details
        postTitle.textContent = post.title;
        postContent.textContent = post.content;
        editTitle.value = post.title;
        editContent.value = post.content;

        // Show edit form when Edit button is clicked
        editBtn.addEventListener("click", function () {
            editForm.style.display = "block";  // Show the edit form
        });

        // Save edited post
        saveBtn.addEventListener("click", function () {
            if (!editTitle.value.trim() || !editContent.value.trim()) {
                alert("Title and content cannot be empty!");
                return;
            }

            // Update post details
            post.title = editTitle.value;
            post.content = editContent.value;

            // Save back to local storage
            localStorage.setItem("posts", JSON.stringify(posts));

            // Update display
            postTitle.textContent = post.title;
            postContent.textContent = post.content;

            alert("Post updated successfully!");
            editForm.style.display = "none";  // Hide edit form
        });

        // Delete post functionality
        deleteBtn.addEventListener("click", function () {
            // Remove the post from the posts array
            posts = posts.filter(p => p.id !== postId);
            
            // Save updated posts array to local storage
            localStorage.setItem("posts", JSON.stringify(posts));
            
            // Redirect to homepage after deletion
            window.location.href = "index.html";  // Redirect to homepage
        });
    } else {
        postTitle.textContent = "Post not found.";
        postContent.textContent = "";
        editBtn.style.display = "none";  // Hide edit button if post not found
        deleteBtn.style.display = "none";  // Hide delete button if post not found
    }
});
