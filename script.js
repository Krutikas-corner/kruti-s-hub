
const API_URL = "http://localhost:5000/api/arrays";

let editId = null;

// Display all arrays
async function getArrays() {
    try {
        const response = await fetch(API_URL);
        const arrays = await response.json();

        const list = document.getElementById("arrayList");
        list.innerHTML = "";

        if (arrays.length === 0) {
            list.innerHTML = "<p>No arrays found.</p>";
            return;
        }

        arrays.forEach(function(array) {
            const item = document.createElement("div");
            item.className = "array-item";

            const title = document.createElement("h3");
            title.textContent = array.name;

            const elements = document.createElement("p");
            elements.textContent = "Elements: [" + array.elements.join(", ") + "]";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-button";

            editButton.addEventListener("click", function() {
                editArray(
                    array._id,
                    array.name,
                    array.elements.join(", ")
                );
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";

            deleteButton.addEventListener("click", function() {
                deleteArray(array._id);
            });

            item.appendChild(title);
            item.appendChild(elements);
            item.appendChild(editButton);
            item.appendChild(deleteButton);

            list.appendChild(item);
        });

    } catch (error) {
        document.getElementById("arrayList").textContent =
            "Unable to load arrays. Please check whether the backend is running.";
    }
}

// Add or update an array
document.getElementById("arrayForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("arrayName").value.trim();
    const input = document.getElementById("arrayElements").value.trim();

    if (name === "" || input === "") {
        alert("Please enter the array name and elements!");
        return;
    }

    const parts = input.split(",");

    if (parts.some(function(part) {
        return part.trim() === "";
    })) {
        alert("Enter numbers separated by commas!");
        return;
    }

    const elements = parts.map(function(part) {
        return Number(part.trim());
    });

    if (elements.some(function(number) {
        return !Number.isFinite(number);
    })) {
        alert("Please enter valid numbers!");
        return;
    }

    const url = editId ? API_URL + "/" + editId : API_URL;
    const method = editId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                elements: elements
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Something went wrong!");
            return;
        }

        alert(editId ? "Array updated successfully!" : "Array added successfully!");

        document.getElementById("arrayForm").reset();
        editId = null;

        document.getElementById("formTitle").textContent = "Add New Array";
        document.getElementById("saveButton").textContent = "Add Array";
        document.getElementById("cancelButton").classList.add("hidden");

        getArrays();

    } catch (error) {
        alert("Could not connect to the server. Please check the backend!");
    }
});

// Edit an array
function editArray(id, name, elements) {
    editId = id;

    document.getElementById("arrayName").value = name;
    document.getElementById("arrayElements").value = elements;

    document.getElementById("formTitle").textContent = "Update Array";
    document.getElementById("saveButton").textContent = "Update Array";
    document.getElementById("cancelButton").classList.remove("hidden");
}

// Delete an array
async function deleteArray(id) {
    const confirmDelete = confirm("Do you want to delete this array?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Delete failed!");
            return;
        }

        alert("Array deleted successfully!");
        getArrays();

    } catch (error) {
        alert("Could not connect to the server. Please check the backend!");
    }
}

// Cancel editing
document.getElementById("cancelButton").addEventListener("click", function() {
    editId = null;

    document.getElementById("arrayForm").reset();
    document.getElementById("formTitle").textContent = "Add New Array";
    document.getElementById("saveButton").textContent = "Add Array";
    document.getElementById("cancelButton").classList.add("hidden");
});

// Refresh the array list
document.getElementById("refreshButton").addEventListener("click", function() {
    getArrays();
});

// Load arrays when the page opens
getArrays();

