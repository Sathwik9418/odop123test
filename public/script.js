// Load posts from the server
const loadPosts = async () => {
    const response = await fetch('/api/posts');
    if (response.ok) {
        const posts = await response.json();
        displayPosts(posts);
    } else {
        console.error('Error loading posts');
    }
};

// Add a new post
document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        const newPost = await response.json();
        loadPosts(); // Refresh the posts after adding a new one
        document.getElementById('postForm').reset();
    } else {
        console.error('Error adding post');
    }
});

// Call loadPosts when the page loads
document.addEventListener('DOMContentLoaded', loadPosts);

// Function to display posts
const displayPosts = (posts) => {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = ''; // Clear existing posts
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsDiv.appendChild(postElement);
    });
};

// Function to create a post element
const createPostElement = (post) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${new Date(post.createdAt).toLocaleString()}</small>
    `;
    return postDiv;
};
