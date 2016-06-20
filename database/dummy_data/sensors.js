var all_sensors = { "data":[{
        "make": "Whirlpool",
        "model": "WM1001",
        "avgWaterUsed": 18.5,
        "avgEnergyUsed": 28.55,
        "avgWashCycleDuration": 180,
        "avgWashCycles": 4,
        "avgTemperature": 34.55,
        "avgDetergentUsed": 0.5
       },
       {
         "make": "Whirlpool",
        "model": "WM1008",
        "avgWaterUsed": 28.5,
        "avgEnergyUsed": 28.55,
        "avgWashCycleDuration": 180,
        "avgWashCycles": 4,
        "avgTemperature": 24.55,
        "avgDetergentUsed": 0.3
       }
     ]
};

var single_sensor =  { "data":[{
        "make": "Whirlpool",
        "model": "WM1001",
        "sku": "SKU1001",
        "value": 28.55,
        "timscale": "2"
       },
       {
        "make": "Whirlpool",
        "model": "WM5055",
        "sku": "SKU5055",
        "value": 23,
        "timscale": "24"
       }
     ]
};

module.exports.all_sensors = all_sensors;
module.exports.single_sensor = single_sensor;