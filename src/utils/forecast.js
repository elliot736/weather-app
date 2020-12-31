const request = require('postman-request')

const forecast = (lat,lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=983e0b8b67cdc02f66860a2b4e61135a&query='+lat+','+ lon
    request ({url ,json : true },(error,{ body } = {} ) => {
      if (error) {
        callback('Unable to connect to the services!')


      } else if (body.error) {
        callback('Unable to find the location.', undefined)
      } else {
      //   callback(undefined, {
      //     summary: body.current.weather_descriptions,
      //     temperature: body.current.temperature ,
      //     precipProbability: body.current.feelslike
      // })
      callback('',body.current.weather_descriptions+ '. It is currently '+ body.current.temperature + ' degress out.' + 'It feels like ' + body.current.feelslike+' degress out.\n The humidity is : ' + body.current.humidity + '%.')
      }
  })
}
module.exports = forecast
