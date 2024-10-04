// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const userDetails = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
    };

    axios
        .post('https://crudcrud.com/api/53c3cc18ebc048edbe9918a8a0b9e30b/user', userDetails)
        .then(response => {
            displayUserOnScreen(response.data); // Display user details on screen
        })
        .catch(error => {
            console.error('There was an error saving the user data:', error);
        });
}

// Function to display user details on screen
function displayUserOnScreen(user) {
    const userList = document.getElementById('userList'); // Select the user list
    const listItem = document.createElement('li'); // Create a new list item

    // Format the text content as specified
    listItem.textContent = `${user.username} - ${user.email} - ${user.phone}`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteUser(user._id, listItem); // Function to delete the user
    });

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        populateForm(user); // Populate the form for editing
        deleteUser(user._id, listItem); // Optionally delete from the list after editing
    });

    // Append buttons to the list item
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    // Append the list item to the user list
    userList.appendChild(listItem);
}

// Function to delete a user
function deleteUser(userId, listItem) {
    axios.delete(`https://crudcrud.com/api/53c3cc18ebc048edbe9918a8a0b9e30b/user/${userId}`)
        .then(() => {
            // Remove the list item from the DOM
            listItem.remove();
        })
        .catch(error => {
            console.error('There was an error deleting the user data:', error);
        });
}

// Function to populate the form for editing
function populateForm(user) {
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
}

// Function to load existing users on page load
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/53c3cc18ebc048edbe9918a8a0b9e30b/user")
        .then(res => {
            res.data.forEach(user => {
                displayUserOnScreen(user); // Display each user on the screen
            });
        })
        .catch(err => {
            console.error('There was an error fetching the user data:', err);
        });
});
    