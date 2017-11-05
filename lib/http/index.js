const path = require('path')
const Promise = require('bluebird')
const readFile = Promise.promisify(require('fs').readFile)

let demoIndex = ''

function start (config, app, express) {
  return readFile(path.join(__dirname, '../../views/demo.html'), 'utf8')
    .then(function (view) {
      demoIndex = view.replace(/{{endpoint}}/g, config.endpoint).replace('{{tracking-id}}', config.tracking_id)
      app.use('/demo/assets', express.static(path.join(__dirname, '/../../assets')))
      app.get('/', getIndex)
    })
}

function getIndex (req, res) {
  res.send(demoIndex)
}

module.exports = {start: start}
