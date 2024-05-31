import "./weatherInfo.css";
const API_KEY = "a54e8173e89a01136c32d57287b49764";

export default function WeatherInfo(Info) {
  const weatherCardsDiv = document.querySelector(".weather-cards");
  const currentWeatherDiv = document.querySelector(".current-weather");

  const createWeatherCard = (cityName, weatherItem, ind) => {
    if (ind === 0) {
      return ` <div class="details">
        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h4>Temperature : ${(weatherItem.main.temp - 273.15).toFixed(
          2
        )} &deg;C</h4>
        <h4>Wind : ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity : ${weatherItem.main.humidity}%</h4>
        <h4>Feels Like:${(weatherItem.main.feels_like - 273.15).toFixed(
          2
        )} &deg;C</h4>
      </div>
      <div className="icon">
      <img src="https://openweathermap.org/img/wn/${
        weatherItem.weather[0].icon
      }@4x.png" alt="weather-icon" className="img"/>
      <h4> ${weatherItem.weather[0].description}  </h4>
      </div>`;
    } else {
      return `
      <li class="card" key={weatherItem.dt}>
        <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
        <img src=https://openweathermap.org/img/wn/${
          weatherItem.weather[0].icon
        }@2x.png
             alt="weather-icon"
             className="img"/>
        <h4>Temperature : ${(weatherItem.main.temp - 273.15).toFixed(
          2
        )} &deg;C</h4>
        <h4>Wind : ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity : ${weatherItem.main.humidity}%</h4>
      </li>
    `;
    }
  };

  const getWeatherDetails = (cityName, lat, lon, city) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDayForecast = data.list.filter((forecast) => {
          const forecastDATE = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDATE)) {
            return uniqueForecastDays.push(forecastDATE);
          }
        });

        //to clear prev input
        city.city[0] = "";
        weatherCardsDiv.innerHTML = "";
        currentWeatherDiv.innerHTML = "";

        
        fiveDayForecast.map((weatherItem, ind) => {
          if (ind === 0) {
            {
              currentWeatherDiv.insertAdjacentHTML(
                "beforeend",
                createWeatherCard(cityName, weatherItem, ind)
              );
            }
          } else {
            {
              weatherCardsDiv.insertAdjacentHTML(
                "beforeend",
                createWeatherCard(cityName, weatherItem, ind)
              );
            }
          }
        });
      })
      .catch((err) => {
        alert(`An error occured while fetching weather forecast`);
        console.log(err);
      });
  };

  const getCityCoordinates = (city) => {
    let cityName;
    let flag = false;
    if (Array.isArray(city.city)) {
      cityName = city.city[0];
      flag = true;
    } else {
      flag = false;
    }
    console.log("cityName-->", cityName);
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(GEOCODING_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          if (flag && cityName !== "") {
            return alert(`No Coordinates found for ${cityName}`);
          }
        }
        if (city.city[1] == "1") {
          console.log(data);
          const { name, lat, lon } = data[0];
          return getWeatherDetails(name, lat, lon, city); //Getting the coordinates of location
        }
      })
      .catch(() => {
        if (flag && cityName !== "") {
          alert(`No Coordinates found for ${cityName}`);
        }
      });
  };

  return (
    <div className="weather-data">
      <div>
        {Info.city[0] === "" && !(Info[1] === "0") ? (
          <h2 style={{ color: "red" }}>Please Enter A valid City</h2>
        ) : (
          <h3></h3>
        )}
      </div>

      {console.log("LOC---->", getCityCoordinates(Info))}
      {console.log("hey", { Info })}
      <div className="current-weather">
        <div className="details">
          <h2>_______ ( ______ )</h2>
          <h4>Temperature : ___&deg;C</h4>
          <h4>Wind : __M/S</h4>
          <h4>Humidity : __% </h4>
        </div>
      </div>
      <div className="days-forecast">
        <h2>5-Day Forecast</h2>
        <ul className="weather-cards">
          <li className="card">
            <h3>( ______ )</h3>
            <h4>Temperature : ___&deg;C</h4>
            <h4>Wind : __M/S</h4>
            <h4>Humidity : __% </h4>
          </li>
          <li className="card">
            <h3>( ______ )</h3>
            <h4>Temperature : ___&deg;C</h4>
            <h4>Wind : __M/S</h4>
            <h4>Humidity : __% </h4>
          </li>
          <li className="card">
            <h3>( ______ )</h3>
            <h4>Temperature : ___&deg;C</h4>
            <h4>Wind : __M/S</h4>
            <h4>Humidity : __% </h4>
          </li>
          <li className="card">
            <h3>( ______ )</h3>
            <h4>Temperature : ___&deg;C</h4>
            <h4>Wind : __M/S</h4>
            <h4>Humidity : __% </h4>
          </li>
          <li className="card">
            <h3>( ______ )</h3>
            <h4>Temperature : ___&deg;C</h4>
            <h4>Wind : __M/S</h4>
            <h4>Humidity : __% </h4>
          </li>
        </ul>
      </div>
    </div>
  );
}
