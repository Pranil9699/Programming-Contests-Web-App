// from here this code is by OPENAI ChatGPT3
// Your existing code to fetch contests
const data = fetch("https://kontests.net/api/v1/all");
let contests = [];

data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    contests = data;
    renderContests(contests); // Render contests initially
    createSiteSelectOptions(contests);
  });

  
  function createSiteSelectOptions(contests) {
    const uniqueSites = [...new Set(contests.map((contest) => contest.site))];
    const siteSelect = document.getElementById("siteSelect");
  
    let selectOptions = '<option value="all">All Sites</option>';
  
    for (const site of uniqueSites) {
      selectOptions += `<option value="${site}">${site}</option>`;
    }
  
    siteSelect.innerHTML = selectOptions;
  }

// Define a function to render contests
function renderContests(contestsToRender) {
  const cardContainer = document.getElementById("cardContainer");
  let innerhtml = "";
  
  for (const contest of contestsToRender) {

    innerhtml += `
      <div id="hover" class="card container mx-1 my-1 m-1" style="width: 23rem;">
        <div class="text-center mt-3">
          <img class="img-fluid" style="height:80%;width:80%;justify-content: center;" src="https://www.robofun.com.au/wp-content/uploads/2020/07/Coding-Intermediate.png" alt="Card image cap">
        </div>
        <div class="card-body ">
          <h5 class="card-title">${contest.name}</h5>
          <p class="card-text">Status is ${contest.status} and site is ${contest.site}</p>
          <p class="card-text">In 24 hours? ${contest.in_24_hours}</p>
          <p>Starts At: ${contest.start_time}</p>
          <p>Ends At: ${contest.end_time}</p>
          <div class="text-center"><a href="${contest.url}" class="btn btn-primary ">Visit Contest</a></div>
        </div>
      </div>
    `;
  }
  cardContainer.innerHTML = innerhtml;
}

// // Define a function to update the contest cards based on the search criteria
function updateContestCards() {
  const selectedSite = document.getElementById("siteSelect").value;

  const filteredContests = contests.filter((contest) => {
    return selectedSite === "all" || contest.site === selectedSite;
  });

  renderContests(filteredContests); // Render filtered contests
}

const siteSelect = document.getElementById("siteSelect");

// Add an event listener for the "change" event on the select element
siteSelect.addEventListener("change", updateContestCards);
