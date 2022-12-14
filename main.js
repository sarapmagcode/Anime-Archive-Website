// Variable declarations
const animeForm = document.querySelector('#anime-form');

// New anime input
const titleInput = document.querySelector('#title');
const episodesInput = document.querySelector('#episodes');
const scoreInput = document.querySelector('#score');

const animeContainer = document.querySelector('#anime-container');
const msg = document.querySelector('#msg');
const tableBody = document.querySelector('tbody');

// Modals
const updateModal = document.querySelector('#updateModal');
const removeModal = document.querySelector('#removeModal');

// Update modal components
const updateTitleInput = document.querySelector('#updateTitleInput');
const updateEpisodesInput = document.querySelector('#update-episodes-input');
const updateScoreInput = document.querySelector('#update-score-input');
const saveUpdateBtn = document.querySelector('#save-update-btn');
const cancelUpdateBtn = document.querySelector('#cancel-update-btn');

// Remove modal components
const yesRemoveBtn = document.querySelector('#yes-remove-btn');
const cancelRemoveBtn = document.querySelector('#cancel-remove-btn');

let currentRow;

const animeList = [
  {
    id: 0,
    title: 'Darwin\'s Game',
    episodes: 12,
    score: 8
  },
  {
    id: 0,
    title: 'Redo of the Healer',
    episodes: 12,
    score: 7
  },
  {
    id: 0,
    title: 'One Punch Man',
    episodes: 12,
    score: 8
  },
  {
    id: 0,
    title: 'Akame Ga Kill',
    episodes: 12,
    score: 8
  },
  {
    id: 0,
    title: 'Akatsuki no Yona',
    episodes: 24,
    score: 7
  }, 
  {
    id: 0,
    title: 'Akiba\'s Trip The Animation',
    episodes: 12,
    score: 7
  },
  {
    id: 0,
    title: 'Angel Beats',
    episodes: 13,
    score: 7
  },
  {
    id: 0,
    title: 'Ao Haru Ride',
    episodes: 12,
    score: 7
  },
  {
    id: 0,
    title: 'Bleach',
    episodes: 366,
    score: 8
  },
  {
    id: 0,
    title: 'Btooom!',
    episodes: 12,
    score: 9
  }
];

// Pre-load anime list
if (animeList.length > 0) {
  updateAnimeList();
}

// Generate data for score options
for (let i = 0; i < 10; ++i) {
  const option = document.createElement('option');
  option.innerHTML = `${i + 1}`;

  const option2 = document.createElement('option');
  option2.innerHTML = `${i + 1}`;

  scoreInput.appendChild(option);
  updateScoreInput.appendChild(option2);
}

// Initialize dropdown value (score)
updateScoreInput.value = 5;
scoreInput.value = 5;

// Submitting a new anime
animeForm.addEventListener('submit', addAnime);
function addAnime(e) {
  e.preventDefault();

  if (titleInput.value === '' || episodesInput.value === '' || scoreInput.value === '') {
    hideSuccess();
    showError();
    setTimeout(() => hideError(), 3000);
  } else {
    hideError();
    showSuccess();
    setTimeout(() => hideSuccess(), 3000);

    // Capitalize each word of the title
    const words = titleInput.value.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    // const id = animeList.length + 1;
    const id = wordToHash(words.join(" "));
    const title = words.join(" ");
    const episodes = episodesInput.value;
    const score = scoreInput.value;
    animeList.push({id, title, episodes, score});

    updateAnimeList();

    titleInput.value = '';
    episodesInput.value = '';
    scoreInput.value = '';
  }
}

function wordToHash(word) {
  let hash = 0, n = word.length;
  if (n == 0) {
    return hash;
  }
  for (let i = 0; i < n; i++) {
    letter = word.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash;
  }
  return hash;
}

function showError() {
  msg.classList.add('alert');
  msg.classList.add('alert-danger');
  msg.innerHTML = '<strong>Error!</strong> Please complete fields below.';
}

function hideError() {
  msg.innerHTML = '';
  msg.classList.remove('alert-danger');
  msg.classList.remove('alert');
}

function showSuccess() {
  msg.classList.add('alert');
  msg.classList.add('alert-success');
  msg.innerHTML = '<strong>Success!</strong> New anime added in the list.';
}

function hideSuccess() {
  msg.innerHTML = '';
  msg.classList.remove('alert-success');
  msg.classList.remove('alert');
}

function updateAnimeList() {
  tableBody.innerHTML = '';
  for (let i = animeList.length - 1; i >= 0; i--) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td>
    <td>${animeList[i].title}</td>
    <td>${animeList[i].episodes}</td>
    <td>${animeList[i].score}</td>
    <td>
      <button id="btn-update" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button>
      <button id="btn-remove" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#removeModal">Remove</button>
    </td>`;
    tableBody.appendChild(tr);
  }
}

// Update modal


// Prompt user before removing a row
tableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-danger')) {
    currentRow = e;
  }
  if (e.target.classList.contains('btn-primary')) {
    currentRow = e;
  }
});

// Remove modal buttons
yesRemoveBtn.addEventListener('click', () => {
  modifyList(currentRow);
  $(removeModal).modal('hide');
});

cancelRemoveBtn.addEventListener('click', () => {
  $(removeModal).modal('hide');
});

function removeAnime(e) {
  const k = e.parentElement.parentElement.cells[0].innerHTML;
  animeList.splice(k - 1, 1);
}

function modifyList(e) {
  removeAnime(e.target);
  updateAnimeList();
  e.target.parentElement.parentElement.remove();
}

// Update modal buttons
saveUpdateBtn.addEventListener('click', () => {
  $(updateModal).modal('hide');
});

cancelUpdateBtn.addEventListener('click', () => {
  $(updateModal).modal('hide');
});

// TODO: add seasons, ovas, and movies

// TODO: table pagination

// TODO: search bar functionality
