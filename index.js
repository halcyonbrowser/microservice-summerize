var express = require('express')
var bodyParser = require('body-parser')
var app = express()

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var exec = require('child_process').exec;

app.post('/sum', (req, res)=> {
  var url = req.body.url;
  if(url)
  {
    exec("docker run -e URL="+url+" sum", function(error, stdout, stderr) {
      // command output is in stdout
      //console.log('run')
      //console.log(stdout)
      res.send(stdout)
    });
  } else {
    res.status(404).json({err: "A url was not provided. The post body must have a url"})
  }
})

app.listen(port, () => {
  console.log('Sum server listening on port ', port)
})
