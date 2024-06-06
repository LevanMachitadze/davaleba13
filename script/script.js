let btn = document.getElementById('search');
let acc = document.getElementById('acc');

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
  let noResults = document.getElementById('noResults');
  let icon = document.querySelector('.desctop-avatar');
  let responsiveAvatar = document.querySelector('.responsive-avatar');

  if (username === '') {
    alert('ველი ცარიელია!');
  }
  username = username.split(' ').join('');

  fetch(`${url}${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message !== 'Not Found') {
        acc.style.display = 'flex';
        noResults.style.display = 'none';
      } else {
        noResults.style.display = 'block';
      }
      let avatar = document.createElement('img');
      let respAvatar = document.createElement('img');
      avatar.src = data.avatar_url;
      respAvatar.src = data.avatar_url;
      responsiveAvatar.appendChild(avatar);
      icon.appendChild(respAvatar);
      avatar.classList.add('avatar');
      respAvatar.classList.add('avatar');
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

btn.addEventListener('click', function () {
  mainFunction();
});
inp.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    mainFunction();
  }
});

let dark = document.getElementById('darkMode');
let icn = document.getElementById('modes');
let darkLight = document.querySelector('.dark');

let i = 1;

dark.addEventListener('click', function (event) {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.header').classList.toggle('dark-mode');
  document.querySelector('.dark').classList.toggle('dark-mode');
  document.querySelector('.input').classList.toggle('dark-mode');
  document.querySelector('#acc').classList.toggle('dark-mode');
  document.querySelector('#joinedDate').classList.toggle('dark-mode');
  document.querySelector('.result-numbers').classList.toggle('dark-mode');
  document.querySelector('.social').classList.toggle('dark-mode');
  i = i++;
  if (i++ % 2 !== 0) {
    icn.src = './assets/002-sun.svg';
    darkLight.textContent = 'Light';
  } else {
    icn.src = './assets/moon.svg';
    darkLight.textContent = 'Dark';
  }
});
