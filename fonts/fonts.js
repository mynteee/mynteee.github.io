// Select the target div where you want to append the links
let targetDiv = document.getElementById("grid");

// Function to create and append an anchor element
function appendAnchor(href, className, dataDate, dataTags, imgSrc, imgAlt, text) {
    let anchor = document.createElement("a");
    anchor.href = href;
    anchor.className = className;
    anchor.setAttribute("data-date", dataDate);
    anchor.setAttribute("data-tags", dataTags);

    let img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;

    let paragraph = document.createElement("p");
    paragraph.textContent = text;

    anchor.appendChild(img);
    anchor.appendChild(paragraph);
    targetDiv.appendChild(anchor);
}

// Append the first link
appendAnchor("blog/yesno.html", "grid-item", "2024-11-11", "team,blindfold,rubik", 
    "blog/images/win.jpg", "Yes/No TeamBLD", "Yes/No TeamBLD");

// Append the second link
appendAnchor("blog/xcdesign.html", "grid-item", "2024-11-10", "design,cross-country", 
    "blog/images/xc-01.png", "Cross Country Team Design", "Cross Country Team Design");