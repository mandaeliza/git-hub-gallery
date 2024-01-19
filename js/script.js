// Global variables
const profileInfo = document.querySelector(".overview");
const username = "mandaeliza";
const reposList = document.querySelector(".repo-list");

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
        ` https://api.github.com/users/${username}/repos`
    );
    const repos = await reposRequest.json();
    // console.log(repos);
    displayRepos(repos);
};

const displayRepos = function (repos) {
    for (let repo of repos) {
        // console.log(repo.name);
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `
    <h3>${repo.name}</h3>`;
    reposList.append(li);
    }
}
