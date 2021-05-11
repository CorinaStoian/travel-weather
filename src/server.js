const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('weather_app','root','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const Conditions = sequelize.define('conditions',
{
	name : Sequelize.STRING,
	icon : Sequelize.STRING
})

const WeatherDatas = sequelize.define('weatherdatas', 
{
	timestamp : Sequelize.TIME,
	temperature : Sequelize.NUMERIC,
	humidity : Sequelize.NUMERIC
})

const Cities = sequelize.define('cities',
{
	name : Sequelize.STRING,
	latitude : Sequelize.NUMERIC,
	longitude : Sequelize.NUMERIC,
})

const Countries = sequelize.define('countries',
{
	name : Sequelize.STRING
})

Countries.hasMany(Cities)
Cities.hasOne(WeatherDatas)
WeatherDatas.hasOne(Conditions)

const app = express()
app.use(bodyParser.json())
app.use(express.static('../simple-app/build'))


app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

//Countries

app.get('/countries', (request, response) => {
    Countries.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/countries/:id', (request, response) => {
    Countries.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/countries', (request, response) => {
    Countries.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.put('/countries/:id', (request, response) => {
    Countries.findById(request.params.id).then((country) => {
        if(country) {
            country.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/countries/:id', (request, response) => {
    Countries.findById(request.params.id).then((country) => {
        if(country) {
            country.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//Cities

app.get('/cities', (request, response) => {
    Cities.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/cities/:id', (request, response) => {
    Cities.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/cities', (request, response) => {
    Cities.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.put('/cities/:id', (request, response) => {
    Cities.findById(request.params.id).then((city) => {
        if(city) {
            city.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/cities/:id', (request, response) => {
    Cities.findById(request.params.id).then((city) => {
        if(city) {
            city.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//Conditions

app.get('/conditions', (request, response) => {
    Conditions.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/conditions/:id', (request, response) => {
    Conditions.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/conditions', (request, response) => {
    Cities.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.put('/conditions/:id', (request, response) => {
    Conditions.findById(request.params.id).then((condition) => {
        if(condition) {
            condition.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/conditions/:id', (request, response) => {
    Cities.findById(request.params.id).then((condition) => {
        if(condition) {
            condition.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//Weatherdatas

app.get('/weatherdatas', (request, response) => {
    WeatherDatas.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/weatherdatas/:id', (request, response) => {
    WeatherDatas.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.post('/weatherdatas', (request, response) => {
    WeatherDatas.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.put('/weatherdatas/:id', (request, response) => {
    WeatherDatas.findById(request.params.id).then((weather) => {
        if(weather) {
            weather.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/weatherdatas/:id', (request, response) => {
    WeatherDatas.findById(request.params.id).then((weather) => {
        if(weather) {
            weather.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.listen(8080)
