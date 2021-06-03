const express = require('express');
const path = require('path');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const qs = require('qs');
const proxy = require('express-http-proxy');

require('dotenv').config()

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, '/dist')));

//handles all the GET requests
app.use('/proxy',
  proxy('https://app-hrsei-api.herokuapp.com/', {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      //you can update headers
      proxyReqOpts.headers['Authorization'] = process.env.TOKEN;

      return proxyReqOpts;
    }
  })
)

app.post('/upload_images', (req, res) => {
  var data = qs.stringify({
    'key': '03514aaea9e7500a875ebd93152f4d75',
    'image': req.body.photo
  });
  var config = {
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
});


app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})