
const request = require('postman-request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib3Jhc2g5OTgiLCJhIjoiY2toeTRocWNkMDIwbDMxbXRwdmY5aHUwbSJ9.1HZ4u7f-SrMVTbAxoF4dPg&limit=1'
    request( {url, json: true}, (error,{ body }={}) => {
        if(error) {
            callback('Unable to connect to the services!')
        } else if (body.features.length === 0){
            callback('Unable to find location!')

        } else {
            callback('',{
                 lon  : body.features[0].center[0],
                 lat : body.features[0].center[1],
                 loc : body.features[0].place_name
            })
        }
    }
    )

}

module.exports = geocode