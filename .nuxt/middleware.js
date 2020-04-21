const middleware = {}

middleware['route'] = require('../middleware/route.js')
middleware['route'] = middleware['route'].default || middleware['route']

export default middleware
