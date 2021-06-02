const express = require('express');
const path = require('path');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const qs = require('qs');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname, '/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(path.join(__dirname, '/dist/index.html')));
// });

app.post('/upload_images', (req, res) => {
  var data = qs.stringify({
    'key': '03514aaea9e7500a875ebd93152f4d75',
    'image': req.body.image
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