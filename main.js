/* 
  API endpoint to get all characters:

    https://rickandmortyapi.com/api/character
  It returns an object containing 2 properties:
  info: various info about the results, among which, the total number of elements
  results: array of objects containing the characters

  API endpoint to get single character:
    https://rickandmortyapi.com/api/character/{id}
  
    {id} is a numeric id (or index) of a character.
    For example: https://rickandmortyapi.com/api/character/2
*/

/*

This is the card element we are trying to recreate in JavaScript:

<div class="card">
  <div class="picture-wrap">
      <img
      src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
      title="Rick Sanchez"
      alt=""
    />
  </div>

  <div class="card-footer">
    <h3 class="character-name">Rick Sanchez</h3>
    <div>Human</div>
  </div>
</div>
*/

/* 
  Let's define some global variables for the container elements that are needed in different functions.
  Remember: global variables are accessible everywhere in our code.
  Local variables are only accessible inside the "block" they are defined
 */
let contentElement = document.getElementById("content");
let charactersGridElement = document.createElement("div");
charactersGridElement.classList.add("characters-grid");
contentElement.appendChild(charactersGridElement);

/* Function to get all characters */
async function getCharacters() {
  let response = await fetch("https://rickandmortyapi.com/api/character");
  let result = await response.json();

  // Simple loop to go through the results
  for (let i = 0; i < result.results.length; i++) {
    /* 
      inside this loop we are using the DOM API to recreate the HTML structure of
      the "card" element shown above

      Pay attention to how the code is organised:
    */
    // 1. I define variables for all the elements I need
    let cardElement = document.createElement("div");
    let pictureWrapElement = document.createElement("div");
    let imgElement = document.createElement("img");
    let cardFooterElement = document.createElement("div");
    let characterNameElement = document.createElement("h3");
    let speciesElement = document.createElement("div");

    // 2. I add a few classes to them, useful for the CSS to work
    cardElement.classList.add("card"); // .card
    pictureWrapElement.classList.add("picture-wrap"); // .picture-card
    cardFooterElement.classList.add("card-footer");
    characterNameElement.classList.add("character-name");

    // 3. let's add some content to our elements
    imgElement.src = result.results[i].image;
    characterNameElement.textContent = result.results[i].name;
    speciesElement.textContent = result.results[i].species;

    // 4. finally, append each element in the right place
    pictureWrapElement.appendChild(imgElement);
    cardFooterElement.appendChild(characterNameElement);
    cardFooterElement.appendChild(speciesElement);
    cardElement.appendChild(pictureWrapElement);
    cardElement.appendChild(cardFooterElement);

    // at this point, the card element is ready and we can append it to the main container
    charactersGridElement.appendChild(cardElement);
  }
}

/* Gets a single random character from the API and shows it on the page */
async function getRandomCharacter() {
  // get a random index between 0 and the maximum number of characters available

  /* 
    Let's delete the content of the container grid.
  */
  charactersGridElement.textContent = "";

  /* 
    We need to get the total amount of results from the API, so let's make another call.

    Look closely at this code: it's exactly the same as the one from the other function.
    This might be something to optimise or improve.

    In general, every time you see pieces of code repeated more than once, stop and think
    if you can do something about it, like moving it to its own function.
  */
  let response = await fetch("https://rickandmortyapi.com/api/character/");
  let result = await response.json();

  /*
   We use min and max in the random() function down below
   min is 0, and max is equal to the total of characters we get from the API
   Read more about the random() function here:
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   */
  let min = 0;
  let max = result.info.count; // 671

  let randomIndex = Math.floor(Math.random() * (max - min) + min);

  /* 
    Let's make another call, this time for a single character
    with the random index we just calculated.

    Note: the first part of the url is the same in every call. It might be a
    good idea to put it in a global variable
  */
  let randomIndexResponse = await fetch(
    "https://rickandmortyapi.com/api/character/" + randomIndex
  );
  let randomIndexResult = await randomIndexResponse.json();
  console.log(randomIndexResult);


  /*
    Now that we have our random character, we want to display using the same HTML
    structure from above. I copied the code from the other function.

    The only difference is that in this case we don't have an array of objects, but 
    a single object with one character.
    Repeating such a long block of code is a very bad practice. Can you do something about it?
    HINT: move the code in its own function, giving it a parameter
  */
  let cardElement = document.createElement("div");
  let pictureWrapElement = document.createElement("div");
  let imgElement = document.createElement("img");
  let cardFooterElement = document.createElement("div");
  let characterNameElement = document.createElement("h3");
  let speciesElement = document.createElement("div");

  cardElement.classList.add("card"); // .card
  pictureWrapElement.classList.add("picture-wrap"); // .picture-card
  cardFooterElement.classList.add("card-footer");
  characterNameElement.classList.add("character-name");

  // those 3 lines are the only part that is different
  imgElement.src = randomIndexResult.image;
  characterNameElement.textContent = randomIndexResult.name;
  speciesElement.textContent = randomIndexResult.species;

  pictureWrapElement.appendChild(imgElement);
  cardFooterElement.appendChild(characterNameElement);
  cardFooterElement.appendChild(speciesElement);
  cardElement.appendChild(pictureWrapElement);
  cardElement.appendChild(cardFooterElement);

  charactersGridElement.appendChild(cardElement);
}

getCharacters();
