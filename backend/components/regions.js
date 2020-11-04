const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { insertQuery, selectQuery, updateQuery, deleteQuery, joinQuery } = require("../database/sequelize/commons");


//REGION
//1. get regions
async function listRegions(req, res, next) {
  const query = selectQuery("regions", "*");
  const [regions] = await sequelize.query(query, { raw: true });
  req.regionsList = regions;
  next();
}

//2. post region

async function existenceRegion(req, res, next) {
    const { name } = req.body;
    console.log(req.body)
    console.log(req.body.name)
    const dbRegions = await findRegion(name);
    if (!dbRegions) {
      next();
    } else {
      res.status(405).json("Region exist");
    }
  }

  
async function findRegion(name) {
  console.log(name)
    const query = selectQuery("regions", "name", `name = '${name}'`);
    const [dbRegions] = await sequelize.query(query, { raw: true });
    const foundRegion = dbRegions[0];
    return foundRegion;
  }
  
  async function addRegion(req, res, next) {
    const {name} = req.body;
      console.log(req.body)
      if (name) {
        const query = insertQuery("regions", "name", [name]);
        [region_id] = await sequelize.query(query, { raw: true });
        console.log(region_id)
        req.createdRegionId = region_id;
        console.log(region_id)
        next();
      } else {
        res.status(400).json("Bad Request: Missing Arguments");
      }

  }

  //COUNTRIES


  //1. get countries
  async function listCountriesByRegion(req, res, next) {
    let id = req.params.region_id;
    const query = joinQuery("countries", "name", "regions", "region_id", `${id}`, "country_id")
    const [countries] = await sequelize.query(query, { raw: true });
    req.countriesList = countries;
    next();
  }
  


  //2. post country

async function existenceCountry(req, res, next) {
  const { name, region_id } = req.body;
  console.log(req.body)
  const dbCountries = await findCountry(name);
  if (!dbCountries) {
    next();
  } else {
    res.status(405).json("Country exist");
  }
}


async function findCountry(name) {
console.log(name)
  const query = selectQuery("countries", "name, region_id", `name = '${name}'`);
  const [dbCountries] = await sequelize.query(query, { raw: true });
  const foundCountry = dbCountries[0];
  return foundCountry;
}

async function addCountry(req, res, next) {
  const {name, region_id} = req.body;
    console.log(req.body)
    if (name) {
      const query = insertQuery("countries", "name, region_id", [name, region_id]);
      [country_id] = await sequelize.query(query, { raw: true });
      console.log(country_id)
      req.createdCountryId = country_id;
      console.log(country_id)
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }

}



  //CITIES

   //1. get cities
  

async function listCitiesByCountry(req, res, next) {
  let id = req.params.country_id;
  const query = joinQuery("cities", "name", "countries", "country_id", `${id}`, "city_id")
  const [cities] = await sequelize.query(query, { raw: true });
  req.citiesList = cities;
  next();
}

 //2. post cities

 async function existenceCity(req, res, next) {
  const { name, country_id } = req.body;
  console.log(req.body)
  const dbCities = await findCity(name);
  if (!dbCities) {
    next();
  } else {
    res.status(405).json("Country exist");
  }
}


async function findCity(name) {
console.log(name)
  const query = selectQuery("cities", "name, country_id", `name = '${name}'`);
  const [dbCities] = await sequelize.query(query, { raw: true });
  const foundCity = dbCities[0];
  return foundCity;
}

async function addCity(req, res, next) {
  const {name, country_id} = req.body;
    console.log(req.body)
    if (name) {
      const query = insertQuery("cities", "name, country_id", [name, country_id]);
      [city_id] = await sequelize.query(query, { raw: true });
      req.createdCityId = city_id;
      console.log(city_id)
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }

}

  module.exports = {listRegions, existenceRegion,  addRegion, listCountriesByRegion, existenceCountry,  addCountry, listCitiesByCountry, existenceCity, addCity };




/*   SELECT countries.name FROM countries JOIN regions ON countries.region_id = regions.region_id */