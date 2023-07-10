let { populationData } = require('../utils/readline')


exports.getPopulation = (req, res) =>{
    const { city, state } = req.params
    const data = populationData.find(item => {
        return item.city.toLowerCase() === city.toLowerCase() && item.state.toLowerCase() === state.toLowerCase()
    });
    data ? res.status(200).json({population: data.population}) : res.status(400).json({message: `State: ${state} with city: ${city} not found`})
}



exports.updatePopulation = (req, res) =>{
    const { city, state } = req.params,
             population  = req.body;

    let change = false;
    try{
     populationData = populationData.map((location) => {
        if (location.city.toLowerCase() === city.toLowerCase() && location.state.toLowerCase() === state.toLowerCase()) {
            change = true
            return {
                ...location,
                population,
            };
        }
        return location;
    });
    if(change){
        res.status(200).json({message: `The city of ${city} in the state of ${state} has its population updated to ${population}`})
    }
    else if(!change){
        populationData.push({
            city: city.toLowerCase(),
            state: state.toLowerCase(),
            population: population ? population : 0
            })
                res.status(201).json({message: `The city of ${city} in the state of ${state} has been added with population ${population}`})
        }
    } catch(err){
        res.json(400).json({message:`Error ${err} occurred`})
    }
}


