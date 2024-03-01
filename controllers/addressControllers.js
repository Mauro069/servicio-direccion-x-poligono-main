const NodeGeocoder = require('node-geocoder')
const turf = require('@turf/turf')

const polygons = require('../data/polygons.json')

const searchArea = async (req, res) => {
  try {
    const { address } = req.query
    console.log(req.query)

    const pointPolygon = [
      [
        [-60.804608260353874, -32.92886121438853],
        [-60.80451170083326, -32.93136462652991],
        [-60.80322424057656, -32.932958488723976],
        [-60.801357423215705, -32.93289545517178],
        [-60.80159345759467, -32.928744146633875]
      ]
    ]

    if (!address || !pointPolygon) {
      throw new Error('No ingresaste una direccion o un area')
    }

    const geocoderOptions = {
      provider: 'openstreetmap'
    }
    const geocoder = NodeGeocoder(geocoderOptions)

    const geocoded = await geocoder.geocode(address)

    if (!geocoded || geocoded.length === 0) {
      throw new Error('No se pudo encontrar la direccion')
    }

    const [{ longitude, latitude }] = geocoded

    const point = turf.point([longitude, latitude])

    const isValidAddress = turf.booleanPointInPolygon(
      point,
      turf.multiPolygon([pointPolygon])
    )

    return res.json({
      esta_dentro: isValidAddress,
      message: isValidAddress
        ? 'Se encontro la direccion dentro del area'
        : 'La direccion no se encuentra dentro del area marcada'
    })
  } catch (error) {
    console.log('ERROR when searching AREA: ', error)
    return res.status(500).json({ message: error.message })
  }
}

const searchAddress = async (req, res) => {
  try {
    const address = req.body.address
    if (!req.body.address) throw new Error('No ingresaste una direccion valida')

    const geocoderOptions = {
      provider: 'openstreetmap'
    }
    const geocoder = NodeGeocoder(geocoderOptions)

    const geocoded = await geocoder.geocode(address)

    if (!geocoded || geocoded.length === 0) {
      throw new Error('No se pudo encontrar la direccion')
    }
    const [{ longitude, latitude }] = geocoded

    const point = turf.point([longitude, latitude])

    const addressFound = polygons.features.find(feature => {
      const multiPolygon = feature.geometry.coordinates
      return turf.booleanPointInPolygon(point, turf.multiPolygon(multiPolygon))
    })

    const isValidAddress = Boolean(addressFound)

    return res.json({
      esta_dentro: isValidAddress,
      message: isValidAddress
        ? 'Se encontro la direccion dentro de una de las ciudades marcadas'
        : 'La direccion ingresada no se encuentra dentro de ninguna de las ciudades marcadas',
      city: addressFound?.properties.NAME_1
    })
  } catch (error) {
    console.log('ERROR when searching ADDRESS: ', error)
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { searchArea, searchAddress }
