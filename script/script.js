let btn = document.getElementById('search');
let acc = document.getElementById('acc');
let icon = document.querySelector('.avatar');

function mainFunction() {
  let url = `https://api.github.com/users/`;
  let inp = document.getElementById('inp');
  let username = inp.value.trim();
  let name = document.getElementById('userName');
  let joinDate = document.getElementById('joinedDate');
  let bio = document.getElementById('profileBio');
  let repos = document.getElementById('repNum');
  let followers = document.getElementById('folNum');
  let followings = document.getElementById('followingNum');
  let location = document.getElementById('adress');
  let twitter = document.getElementById('twitter');
  let link = document.getElementById('githubLink');
  let company = document.getElementById('company');

  if (username === '') {
    alert('ველი ცარიელია!');
  }
  username = username.split(' ').join('');

  fetch(`${url}${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message !== 'Not Found') {
        acc.style.display = 'flex';
      }
      let avatar = document.createElement('img');
      avatar.src = data.avatar_url;
      icon.appendChild(avatar);
      avatar.classList.add('avatar');
      name.textContent = data.login;
      joinDate.textContent = `joined ${data.created_at}`;
      bio.textContent = data.bio;
      repos.textContent = data.public_repos;
      followers.textContent = data.followers;
      followings.textContent = data.following;

      if (data.location !== null) {
        location.textContent = data.location;
      } else {
        location.textContent = 'მისამართი არ მოიძებნა';
      }
      if (data.twitter_username !== null) {
        twitter.textContent = data.twitter_username;
      } else {
        twitter.textContent = 'ტვიტერი არ მოიძებნა';
      }
      link.textContent = data.url;
      if (data.company !== null) {
        company.textContent = data.company;
      } else {
        company.textContent = 'კომპანია არ მოიძებნა';
      }
    });
}

btn.addEventListener('click', function (event) {
  mainFunction();
});
inp.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    mainFunction();
  }
});
