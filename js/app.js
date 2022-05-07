import citiesObj from '../data/navigation.js';

const { cities } = citiesObj;

const navigationList = document.getElementById('nav-list');
const navListSlider = document.getElementById('nav-list-slider');

let timeInterval = null;
let selectedCity = null;
let selectedTimezone = null;

function setTime(formatter) {
  navListSlider
    .querySelector('.currentTime')
    .setAttribute('data-label', formatter.format(new Date()));
}

function setCity(city, timezone) {
  navListSlider.style.left = city.offsetLeft + 'px';
  navListSlider.style.width = city.offsetWidth + 'px';

  const options = {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  let formatter = new Intl.DateTimeFormat([], options);
  setTime(formatter);

  if (timeInterval) {
    clearInterval(timeInterval);
  }

  timeInterval = setInterval(() => {
    setTime(formatter);
  }, 1000)

  city.classList.add('active');
}

function init() {
  cities.forEach(city => {
    let li = `
      <li class="nav-list__item">
        <a
          class="list-item__link"
          data-timezone="${city.timezone}"
        >
          ${city.label}
        </a>
      </li>
    `;
    navigationList.insertAdjacentHTML('beforeend', li);
  });

  selectedCity = navigationList.querySelector('.list-item__link');
  selectedTimezone = selectedCity.dataset.timezone;

  setCity(selectedCity, selectedTimezone);
}

function removeActiveClassFromCities() {
  navigationList.querySelectorAll('.list-item__link').forEach(item => {
    item.classList.remove('active');
  });
}

navigationList.addEventListener('click', (e) => {
  const city = e.target;
  const timezone = city.dataset.timezone;
  if (timezone) {
    selectedCity = city;
    selectedTimezone = timezone;
    removeActiveClassFromCities();
    setCity(city, timezone);
  }
})

window.addEventListener('resize', () => {
  navListSlider.classList.remove('__with-transition');
  setCity(selectedCity, selectedTimezone);
  navListSlider.classList.add('__with-transition');
})

init();