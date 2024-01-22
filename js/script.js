// Global variables
const profileInfo = document.querySelector(".overview");
const username = "mandaeliza";
const reposList = document.querySelector(".repo-list");
const repoDisplay = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const getProfile = async function () {
  const profileRequest = await fetch(
    `https://api.github.com/users/${username}`
  );
  const data = await profileRequest.json();
  //   console.log(data);
  displayProfile(data);
};

getProfile();

const displayProfile = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
        <img alt = "user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p> 
        <p><strong>Location:</strong> ${data.location}</p> 
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  profileInfo.append(div);
  getRepos();
};

const getRepos = async function () {
  const reposRequest = await fetch(
    ` https://api.github.com/users/${username}/repos?sort=updated`
  );
  const repos = await reposRequest.json();
  // console.log(repos);
  displayRepos(repos);
};

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    // console.log(repo.name);
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `
    <h3>${repo.name}</h3>`;
    reposList.append(li);
  }
};

reposList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    specificRepoInfo(repoName);
  }
});

const specificRepoInfo = async function (repoName) {
  const specificRepoRequest = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await specificRepoRequest.json();
  // console.log(repoInfo);
  const fetchLanguages = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  const languageData = await fetchLanguages.json();
  // console.log(languageData);
  const languages = [];
  for (let key in languageData) {
    // console.log(key);
    languages.push(key);
  }
  // console.log(languages);
  displaySpecifics(repoInfo, languages);
};

const displaySpecifics = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoDisplay.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
  backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
  repoDisplay.classList.remove("hide");
  repoData.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
  const search = e.target.value;
  // console.log(search);
  const repos = document.querySelectorAll(".repo");
  const lowerCaseSearch = search.toLowerCase();
  
  for (const repo of repos) {
   const repoLowerText = repo.innerText.toLowerCase(); 
    if (repoLowerText.includes(lowerCaseSearch)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});