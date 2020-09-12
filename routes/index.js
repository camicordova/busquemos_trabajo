var express = require('express');
var axios =  require('axios');
//var BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?";
var BASE_URL = "https://jobs.github.com/positions.json?";
var router = express.Router();

function urlify(text) {
  var partes = text.split('href="');
  var partes2 = partes[1].split('"');
  return '<a class="postular btn btn-info" href="' + partes2[0] + '">Postular</a>';
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('jobs', { title: 'Busquemos trabajo', jobs:null });
});
router.post('/', async function(req, res, next) {
  console.log(req.body);
  var query = "";
  
  if (req.body.search != "") {
    query = query + "search=" + encodeURIComponent(req.body.search);
  }
  if (req.body.location) {
    if(query.length != 0){
      query = query + "&";
    }
    query = query + "location=" + encodeURIComponent(req.body.location);
  } 
  if (req.body.full_time) {
    if(query.length != 0){
      query = query + "&";
    }
    query = query + "full_time=true";
  } 
  console.log(BASE_URL + query);
  if (query != ""){
    var datos = await axios.get(BASE_URL + query);
    console.log(datos);
    var result = datos.data.map((job)=>{
      job.how_to_apply = urlify(job.how_to_apply);
      return job;
    })
    res.render('jobs', { title: 'Busquemos trabajo', jobs:result });
  }
});

module.exports = router;
