
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorContainer = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);

    breedSelect.addEventListener('change', async () => {
      hideContent();

      const selectedBreedId = breedSelect.value;
      showLoader();
      try {
        const cat = await fetchCatByBreed(selectedBreedId);
        displayCatInfo(cat);
      } catch (error) {
        showError();
        setTryAgainHandler();
      } finally {
        hideLoader();
      }
    });
  } catch (error) {
    showError();
    setTryAgainHandler();
  }
});

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  const error = Report.failure(
    'Oops! Something went wrong!',
    'Try reloading the page!',
    'Try again'
  );
  errorContainer.innerHTML = error;
  errorContainer.style.display = 'block';
}

function hideError() {
  errorContainer.style.display = 'none';
}

function setTryAgainHandler() {
  const tryAgainBtn = document.querySelector('.notiflix-report-btn-primary');
  tryAgainBtn.addEventListener('click', () => {
    window.location.reload();
  });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img class="js-image" src="${cat.url}" alt="Cat Image">
    <div class="js-wrapper-text">
      <p class="js-text-breed">${cat.breeds[0].name}</p>
      <p class="js-text-description">${cat.breeds[0].description}</p>
      <p class="js-text-temperament"><span>Temperament:</span> ${cat.breeds[0].temperament}</p>
    </div>
  `;
}

function hideContent() {
  catInfo.innerHTML = '';
  hideLoader();
  hideError();
}
