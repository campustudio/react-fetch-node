let express = require('express')
let router = express.Router() // eslint-disable-line

/* GET home page. */
router.post('/orders-filtering', function(req, res, next) {
  console.log('post /orders-filtering req.body: ', req.body)

  // res.render('index', { title: 'orders-filtering' })
})

module.exports = router
