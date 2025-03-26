// Select the target div where you want to append the links
let targetDiv = document.getElementById("grid");

// Function to create and append an anchor element
function appendAnchor(href, id, projects, family, serif, imgSrc1, imgSrc2, name) {
    let anchor = document.createElement("a");
    anchor.href = href;
    anchor.className = "grid-item";
    anchor.setAttribute("data-id", id);
    anchor.setAttribute("data-projects", projects);
    anchor.setAttribute("data-family", family);
    anchor.setAttribute("data-serif", serif);

    let img1 = document.createElement("img");
    img1.src = imgSrc1;
    img1.alt = name;
    img1.classList.add("image1");

    let img2 = document.createElement("img");
    img2.src = imgSrc2;
    img2.alt = name;
    img2.classList.add("image2");

    let paragraph = document.createElement("p");
    paragraph.textContent = name;

    anchor.appendChild(img1);
    anchor.appendChild(img2);
    anchor.appendChild(paragraph);
    targetDiv.appendChild(anchor);
}

let itemId, itemName, itemFamily, itemProjects, itemSerif;

// Function to fetch data for a specific item by ID
function fetchItemById(id) {
  fetch(`https://mynte.pythonanywhere.com/items/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON data from the response
    })
    .then(data => {
      // Access the data for the item
      itemId = data.id;
      itemName = data.name;
      itemFamily = data.family;
      itemProjects = data.projects;
      itemSerif = data.serif;

      // Log the data
      console.log(`ID: ${itemId}`);
      console.log(`Name: ${itemName}`);
      console.log(`Family: ${itemFamily}`);
      console.log(`Projects: ${itemProjects}`);
      console.log(`Serif: ${itemSerif}`);

      // Now that data is available, call appendAnchor
      appendAnchor("fonts/" + itemName + ".html", itemId, itemProjects, itemFamily, itemSerif, "fonts/images/" + itemName + "1.png", "fonts/images/" + itemName + "2.png", itemName);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Function to fetch the count of items and return it
async function fetchItemCount() {
  try {
    const response = await fetch('https://mynte.pythonanywhere.com/items/count');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Parse the JSON data
    return data.count; // Return the count value (assuming it is inside the "count" property)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Using async/await to handle the item count and fetch items in a loop
async function loadAllItems() {
  const itemCount = await fetchItemCount(); // Wait for the item count to be fetched
  console.log(`Item count: ${itemCount}`);

  // Now fetch items from 1 to the total item count
  for (let i = 1; i <= itemCount; i++) {
    await fetchItemById(i); // Wait for each fetch to complete before moving to the next
  }
}

loadAllItems(); // Call the function to load all items


