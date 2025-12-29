document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload');
    const profileImagePreview = document.getElementById('profile-image-preview');
    const profilePlaceholder = document.getElementById('profile-placeholder');

    // Listen for when a user selects a file
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        // Check if a file was selected and if it's an image
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            // Once the file is read, set it as the image source
            reader.onload = function(e) {
                profileImagePreview.src = e.target.result;
                profileImagePreview.style.display = 'block'; // Show the image tag
                profilePlaceholder.style.display = 'none'; // Hide the font awesome icon
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the data
    const savedData = localStorage.getItem('userWishlist');
    
    if (savedData) {
        const wishlist = JSON.parse(savedData);
        console.log("Here are your movies:", wishlist);
        
        // Example: Show the count of movies on the profile
        document.getElementById('wishlist-count').innerText = wishlist.length;
    }
});