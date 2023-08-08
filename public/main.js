
console.log(`You won't see this, because that crap doesn't work:D:D:D`);
const baseUrl = `http://localhost:4445`;

const displaySection = document.querySelector("#display-section");
const newName = document.querySelector("#newName");
const newType = document.querySelector("#newType");
const newImage = document.querySelector("#newImage");
const addForm = document.querySelector("#add-destination");
const updateForm = document.querySelector("#update-form");
const destinationId = document.querySelector("#destination-id");
const updateName = document.querySelector("#updateName");
const updateType = document.querySelector("#updateType");
const updateImage = document.querySelector("#updateImage");
const filterDropdown = document.querySelector("#filterDropdown");

const deleteDestination = (id) => {
    const selectedType = filterDropdown.value; // Get the currently selected type
    axios
      .delete(`${baseUrl}/api/destinations/${id}`)
      .then(() => {
        if (selectedType === "all") {
          getDestinations();
        } else {
          getDestinationsByType(selectedType);
        }
      })
      .catch((err) => console.error(err));
  };
  
  const createDestinationCard = (destinationArr) => {
    displaySection.innerHTML = ``;
    destinationArr.map((destination) => {
      const holdingDiv = document.createElement("div");
      holdingDiv.classList.add("destination");
      holdingDiv.classList.add(destination.type);
      holdingDiv.dataset.id = destination.id;
  
      const contentDiv = document.createElement("div");
      contentDiv.innerHTML = `
        <h2>${destination.name}</h2>
        <img src="${destination.image}" alt="${destination.name}">
        <p class="destination-type" type="${destination.type}">${destination.type}</p>
        <p>Ranking: ${destination.ranking}</p>
      `;
  
      const actionDiv = document.createElement("div");
      actionDiv.innerHTML = `
        <button onclick="deleteDestination(${destination.id})">Delete</button>
        <button onclick="editDestination(${destination.id},'${destination.name}','${destination.type}','${destination.image}', ${destination.ranking})">Update</button>
      `;
  
      holdingDiv.appendChild(contentDiv);
      holdingDiv.appendChild(actionDiv);
      displaySection.appendChild(holdingDiv);
    });
  };
    
  const editDestination = (id, name, type, image, ranking) => {
    const editForm = document.createElement("form");
    editForm.id = "edit-form";
    editForm.innerHTML = `
      <label for="updateName">Name:</label>
      <input type="text" id="updateName" value="${name}" />
      <br />
      <label for="updateType">Type:</label>
      <select id="updateType">
        <option value="Beach">Beach</option>
        <option value="Culture">Culture</option>
        <option value="Nature">Nature</option>
        <option value="Urban">Urban</option>
      </select>
      <br />
      <label for="updateImage">Image URL:</label>
      <input type="text" id="updateImage" value="${image}" />
      <br />
      <label for="updateRanking">Ranking:</label>
      <input type="number" id="updateRanking" value="${ranking}" />
      <br />
      <button type="button" onclick="updateDestination(${id})">Save</button>
      <button type="button" onclick="cancelEdit()">Cancel</button>
    `;
  
    const destinationDiv = document.querySelector(`.destination[data-id="${id}"]`);
    destinationDiv.appendChild(editForm);
  
    // Set the selected option in the type dropdown to match the current type
    const updateType = document.querySelector("#updateType");
    updateType.value = type;

  };
  const cancelEdit = () => {
    const editForm = document.querySelector("#edit-form");
    if (editForm) {
      editForm.remove();
    }
  };
    
  const updateDestination = (id) => {
    const updateName = document.querySelector("#updateName").value;
    const updateType = document.querySelector("#updateType").value;
    const updateImage = document.querySelector("#updateImage").value;
    const updateRanking = document.querySelector("#updateRanking").value;
  
    const body = {
      name: updateName,
      type: updateType,
      image: updateImage,
      ranking: updateRanking
    };
  
    axios
      .put(`${baseUrl}/api/destinations/${id}`, body)
      .then(() => {
        cancelEdit();
        getDestinations();
      })
      .catch((err) => console.error(err));
  };
  
  

const getDestinations = () => {
  axios
    .get(`${baseUrl}/api/destinations`)
    .then((res) => createDestinationCard(res.data))
    .catch((err) => console.error(err));
};

const getDestinationsByType = (type) => {
  axios
    .get(`${baseUrl}/api/destinations?type=${type}`)
    .then((res) => createDestinationCard(res.data))
    .catch((err) => console.error(err));
};

filterDropdown.addEventListener("change", function () {
  const selectedOption = filterDropdown.value;

  // Show all destinations if "All" is selected
  if (selectedOption === "all") {
    getDestinations();
  } else {
    getDestinationsByType(selectedOption);
  }
});

document.addEventListener("DOMContentLoaded", getDestinations);

const addFormHandler = (e) => {
  e.preventDefault();
  const body = {
    name: newName.value,
    type: newType.value,
    ranking: 5, // Default ranking for newly added destinations
    image: newImage.value,
  };
  axios
    .post(`${baseUrl}/api/destinations`, body)
    .then((res) => createDestinationCard(res.data))
    .catch((err) => console.error(err));
  newName.value = ``;
  newType.value = "Beach";
  newImage.value = ``;
};


addForm.addEventListener("submit", addFormHandler);

