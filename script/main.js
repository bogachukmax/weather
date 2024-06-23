const Search_btn = document.querySelector(`.Search_btn`);
const Back_Button = document.getElementById(`Back_Button`);
const Back_Button2 = document.querySelector(`.ExitButton`);
const Back_Button3 = document.querySelector(`.ExitButton2`);

const Weather_Container = document.getElementById(`Weather`);
const Search_Container = document.getElementById(`Search`);

const regestraionForm = document.getElementById(`regestraionForm`);

regestraionForm.addEventListener(`keypress`, (e) =>{
   if (e.key === `Enter`) {
      e.preventDefault();
      cityName();
   }
})

window.addEventListener(`keypress`, (e) =>{
   if (e.key === `Enter`) {
      e.preventDefault();
      cityName();
   }
})

Search_btn.addEventListener(`click`, (e) =>{
   cityName();
})

function cityName() {
   const city = document.querySelector('.Search input');

   if (city.value.length === 0) {
      city.classList.add(`is-invalid`);
   } else{
      city.classList.remove(`is-invalid`);
      city.style.borderColor = '#0d3271';
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city.value}&lang=en&units=metric&appid=284391bdaa29d6c5d4b2c72daed3cce1`;
      weather(url);
   }
}

async function weather(url) {
   try {
      const response = await fetch(url);
      const data = await response.json();
      const city = document.querySelector('.Search input');

      if (response.status === 404) {
         city.style.borderColor = 'red';
         city.classList.add(`is-invalid`);
      } else{
         city.style.borderColor = '#0d3271';
      }

      main(data);
      newElementTable(data);
   } catch (error) {
      console.log(error);
   }
}

function main(data){
   document.getElementById(`time`).innerHTML = `As of ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
   setInterval(()=>{
      document.getElementById('time').innerHTML = `As of ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
   },1000);
   
   document.getElementById(`cityName`).innerHTML =`${data.city.name}`;
   document.getElementById(`cityName2`).innerHTML =`${data.city.name}`;
   document.getElementById(`dateWeather`).innerHTML = `Weather on: ${data.list[0].dt_txt}`;
   document.getElementById(`generalPng`).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`
   document.getElementById(`weatherStatus`).innerHTML = data.list[0].weather[0].description;
   document.getElementById(`temp`).innerHTML = `${parseInt(data.list[0].main.temp)}°`;
   document.getElementById(`tempFelling`).innerHTML = `${Math.round(data.list[0].main.temp)}°`

   document.getElementById(`tempMax`).innerHTML = `${parseInt(data.list[0].main.temp_max)}°`;
   document.getElementById(`tempMin`).innerHTML = `${parseInt(data.list[0].main.temp_min)}°`;
   document.getElementById(`humidity`).innerHTML = `${data.list[0].main.humidity}%`;

   document.getElementById(`preasure`).innerHTML = `${data.list[0].main.pressure} Pa`;
   document.getElementById(`seaLevel`).innerHTML = `${data.list[0].main.sea_level} m`;
   document.getElementById(`visibility`).innerHTML = `${data.list[0].visibility} m`;

   Weather_Container.style.display = `block`;
   Search_Container.style.display = `none`;
}

Back_Button.addEventListener('click',(e)=>{
   Weather_Container.style.display = `none`;
   Search_Container.style.display = `block`;

   const table = document.getElementById('tableWithInfo');
   table.innerHTML = ``;
})

Back_Button2.addEventListener('click',(e)=>{
   Weather_Container.style.display = `none`;
   Search_Container.style.display = `block`;

   const table = document.getElementById('tableWithInfo');
   table.innerHTML = ``;
})

Back_Button3.addEventListener('click',(e)=>{
   Weather_Container.style.display = `none`;
   Search_Container.style.display = `block`;

   const table = document.getElementById('tableWithInfo');
   table.innerHTML = ``;
})


function newElementTable(data) {
   const table = document.getElementById('tableWithInfo')
   let i = 1;
   data.list.forEach(item => {
     const {dt_txt, main, visibility, wind, weather} = item;
     const {feels_like, humidity, pressure, sea_level, temp, temp_max, temp_min} = main;
     const weatherDescription = weather[0].description;
     const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

     const rowHtml = `
      <div class="col-12 row rowBottom"> 
         <div class="middleItemTable WeatherToday col-lg-3 col-md-4 col-6">Weather on: ${data.list[i].dt_txt}</div> 
         <div class="middleItemTable col-lg-2 col-md-4 col-6">Temp: ${Math.floor(temp_max)}° / ${Math.floor(temp_min)}°</div>
         <div class="middleItemTable col-lg-1 col-md-4 col-6"><img src='${weatherIconUrl}' alt="img" class="clouds"></div>
         <div class="middleItemTable WeatherToday col-lg-2 col-md-4 col-6">Humidity: ${humidity}%</div>
         <div class="middleItemTable WeatherToday col-lg-2 col-md-4 col-6">Pressure: ${pressure} Pa</div>
         <div class="middleItemTable WeatherToday col-lg-2 col-md-4 col-6">Visibility: ${visibility} m</div>
      </div>
     `
     i++;
     const row = document.createElement('div')
     row.innerHTML = rowHtml
     table.appendChild(row)
   })
}
 