
const weather = document.getElementById('weather');
const popup = document.getElementById('weather-popup');
const loader = document.getElementById('loader');
const weatherRoot = document.getElementById('weather-content');
const close = document.getElementById('weather-close');
const textInput = document.getElementById('text-input');
const form = document.getElementById('form');

let store = {
    city:"Moscow",
    feelslike:0,
    cloudcover:0,
    temperature:0,
    humidity:0,
    observationTime:"00:00AM",
    pressure:0,
    uvIndex:0,
    visibility:0,
    description:"cloud",
    windSpeed:0,
    properties: {
        cloudcover:{},
        windSpeed:{},
        visibility:{},
        pressure:{}
    }
}


close.onclick = function(){
    popup.classList.remove('active');
}

const addLoader = () => {
    loader.classList.remove('loader-hidden');
}

const removeLoader = () => {
    loader.classList.add('loader-hidden');
}





const fetchData = async () => {
    try {
        addLoader();
    const query = localStorage.getItem('query') || store.city;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '725850a7c6mshd463aab6de43ddep1108f9jsn07248d7ebe8c',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    const result = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`, options);

    const data = await result.json();
    const {current:{
        feelslike_c:feelslike, 
        cloud:cloudcover,
        temp_c:temperature,
        humidity,
        last_updated:observationTime,
        pressure_in:pressure,
        uv: uvIndex,
        vis_km:visibility,
        condition:{text:description},
        wind_mph: windSpeed,},
        location:{name}
        } = data;


        store= {
            ...store,
            feelslike, 
            city:name,
            temperature,
            humidity,
            observationTime,
            uvIndex,
            description:description,
            windSpeed,
            properties: {
                cloudcover: {
                    title:"cloudcover",
                    value:`${cloudcover}%`,
                    icon:"cloud.png"
                },
                windSpeed:{
                    title:"windSpeed",
                    value:`${windSpeed}m/s`,
                    icon:"fog.png"},
                visibility:{
                    title:"visibility",
                    value:`${visibility}km`,
                    icon:"thunder.png"},
                pressure:{
                    title:"pressure",
                    value:`${pressure}`,
                    icon:"pressure.png"}
            }
        }
        setTimeout(removeLoader, 500); 
        renderComponent()
    } catch(err){
        console.log(err)
    }
}

fetchData();


const getImage = () => {
    let item = store.description.toLowerCase();
    switch(item){
        case "partly cloudy":
            return "partly.png";
        case "cloud":
            return "cloud.png";
        case "fog":
            return "fog.png";
        case "sunny":
            return "sunny.png";
        case "snow":
            return "snowflake.png";
        case "light snow, snow":
            return "snowflake.png";    
            case "blizzard":
                return "snowflake.png";  
        default:
            return "default.png";
    }
}

const renderProperty = (properties) => {
    return Object.values(properties).map((data)=>{
        const {title,value,icon} = data;
        return `<div class="property">
        <div class="property-icon">
            <img src="./public/weather-app/${icon}" alt="icon">
            </div>
                <div class="property-info">
                <div class="property-info__value">${value}</div>
                <div class="property-info__description">${title}</div>
            </div>
        </div>`
    }).join("");
}

const markup = () => {
    const {city, description, observationTime, temperature,properties} = store;

    const temperatureClass = temperature >=5? "weather-warm":"";

    return `    
<div class="container">
    <div class="top">
    <div class="city">
        <div class="city-subtitle">
            <p> Weather today in: </p>
            <div class="city-title" id="city">
            <span>${city}</span>
        </div>
        </div>
        <div class="top-right">
            <div class="city-info__subtitle">${observationTime}</div>
            <div class="city-info__title ${temperatureClass}">${temperature}°</div>
        </div>
    </div>
    <div class="city-info">
        <div class="top-descr">
        <img class="icon" src="./public/weather-app/${getImage()}" alt="icon">
        <div class="description">${description}</div>
        </div>
    </div>
    </div>
    <div class="properties" id="properties">${renderProperty(properties)}</div>
</div>`
}

const renderComponent = ()=>{
    weatherRoot.innerHTML = markup();
}


const handleInput=(e)=>{
    store = {
        ...store,
        city:e.target.value,
    }
}

const handleSubmit=(e)=>{
    e.preventDefault();
    const value = store.city;
    if(!value) return null;

    localStorage.setItem("query", value);
    fetchData();
}

form.addEventListener('submit', handleSubmit);
textInput.addEventListener('input', handleInput);

renderComponent();

