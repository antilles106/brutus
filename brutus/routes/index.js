/**
 * A main router file.
 */
var express = require('express');
var router = express.Router();
const yaml = require('js-yaml');
const { dialog } = require('electron');
var {olivetopopeye_controller,popeye_controller} = require('./controllers');
const  {get_pieces_from_yaml, 
  select_by_query} = require('./utils');
const path = require('path');

const dir = process.env.NODE_ENV === 'development'
? path.join(__dirname, '/../bin/')
: process.resourcesPath;

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(path.join(dir,'sqlite3.db'));

// create table for storing problems if not exists.
db.serialize(function () {
  db.run('CREATE TABLE if not exists problems (id INTEGER PRIMARY KEY AUTOINCREMENT, authors TEXT,source TEXT,date TEXT,tourney TEXT,distinction TEXT,fen TEXT,stip TEXT, conditions TEXT)');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Brutus' });
});

router.get('/fromfen', function(req, res, next) {
  res.render('fromfen', { title: 'Brutus' });
});

router.get('/result', function(req, res, next) {
  res.render('result', { title: 'Brutus' });
});

router.post('/popeye', popeye_controller);

router.post('/olivetopopeye',olivetopopeye_controller);

router.get('/fileopen',function(req,res,next){
  res.render('fileopen',{ title: 'Brutus' });
});

router.post('/queryresult',function(req,res,next){
  var json_out = yaml.loadAll(req.body.yaml);
  var filename = JSON.parse(req.body.filenamelist);
  var query = req.body.query;
  // try{
    var json_select = select_by_query(json_out,query,filename);
    res.render('queryresult',{ title: 'Brutus',
      out_json:JSON.stringify(json_select.ret),
      filenamelist:JSON.stringify(json_select.filename)});
  // }catch{
  //     dialog.showErrorBox("Olive open error","Query Parse Error.");
  //     res.location(req.get("Referrer") || "/");
  // }

});

router.post('/fileresult',function(req,res,next){
  try{
    if(req.body.json){
      targ = parseInt(req.body.popeye_id,10) - 1;
      var text = req.body.json;
      text = text.replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\//g,'\\/');
      var yaml_out = JSON.parse(text);
      mystip = yaml_out[targ].stipulation;
      mysol = yaml_out[targ].solution;
    }else{ // if (req.body.yaml)
      targ = parseInt(req.body.popeye_id,10) - 1;
      var yaml_out = yaml.loadAll(req.body.yaml);
      mystip = yaml_out[targ].stipulation;
      mysol = yaml_out[targ].solution;
    }
  }catch{
    dialog.showErrorBox("Olive open error","Something is wrong.");
    res.location(req.get("Referrer") || "/");
  }

  res.render('result',{ title: 'Brutus',
    "my_stip": mystip,
    "my_pieces":get_pieces_from_yaml(yaml_out,targ),
    "my_solution": mysol
   });
});


module.exports = router;