/**
 * controllers for a specific route.
 */
 
const { dialog } = require('electron');
const  {fen_parser, 
    get_pieces_from_condition, 
    get_pieces_from_yaml, 
    get_conditions_from_yaml, 
    get_twin_from_yaml,
    switch_EnglishN } = require('./utils');
  

const yaml = require('js-yaml');
const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

const dir = process.env.NODE_ENV === 'development'
? path.join(__dirname, '/../bin/')
: process.resourcesPath;

// calling Popeye and write the result to text file
var popeye_controller = function(req,res,next){
  var pieces_from_fen = fen_parser(req);

  var fen = req.body.fen;
  if (req.body.knightoption && req.body.knightoption === "EnglishN"){
    fen = switch_EnglishN(fen);
  }

  // write to tmp.txt
  data = "BeginProblem\nStipulation " + req.body.stip + "\nProtocol " + path.join(dir, "out.txt") + "\nOption Noboard Variation\nforsyth " + fen + "\n" + req.body.conditions.replace(/&amp;/g,'&').replace(/<br>/g,'\n') + "\nEndProblem\n";

  fs.writeFileSync(path.join(dir, "tmp.txt"),data);

  if (fs.existsSync(path.join(dir, "out.txt"))) {
    fs.unlinkSync(path.join(dir, "out.txt"));
  }

  child_process.execFileSync(path.join(dir, "pywin64.exe"), [path.join(dir, "tmp.txt")]);


  var l = fs.readFileSync(path.join(dir, "out.txt"));
  l_str = l.toString()
    .replace(/[\r\n|\n|\r]*solution finished\. .*[\r\n|\n|\r]*/i,'')
    .replace(/Popeye Windows-64Bit v[0-9]*\.[0-9]* .*[\r\n|\n|\r]*/i,'');

  var additional_pieces = get_pieces_from_condition(req);
  for(let i=0;i<additional_pieces.length;i++){
    pieces_from_fen = pieces_from_fen + "\n" + additional_pieces[i];
  }

  res.render('result', { title: 'Brutus',
    "my_stip":req.body.stip,
  "my_pieces":pieces_from_fen,  
  "my_solution":l_str});
}

//Reading Olive files, parsing them and solving the problem by popeye
var olivetopopeye_controller = function(req,res,next){
  try{
    if(req.body.json){
      targ = parseInt(req.body.popeye_id,10) - 1;
      var text = req.body.json;
      text = text.replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\//g,'\\/');
      var yaml_out = JSON.parse(text);
    }else{
      targ = parseInt(req.body.popeye_id,10) - 1;
      var yaml_out = yaml.loadAll(req.body.yaml);
    }
    mystip = yaml_out[targ].stipulation;
    var pieces = get_pieces_from_yaml(yaml_out,targ);
    var conditions = get_conditions_from_yaml(yaml_out,targ);
    var twins = get_twin_from_yaml(yaml_out,targ);
    data = "BeginProblem\nStipulation " + mystip + "\nProtocol " + path.join(dir, "out.txt") + "\nOption Noboard Variation\nPieces " + pieces + "\n" + conditions + twins + "\nEndProblem\n";

    fs.writeFileSync(path.join(dir, "tmp.txt"),data);

    if (fs.existsSync(path.join(dir, "out.txt"))) {
      fs.unlinkSync(path.join(dir, "out.txt"));
    }

    child_process.execFileSync(path.join(dir, "pywin64.exe"), [path.join(dir, "tmp.txt")]);

    var l = fs.readFileSync(path.join(dir, "out.txt"));
    l_str = l.toString()
      .replace(/[\r\n|\n|\r]*solution finished\. .*[\r\n|\n|\r]*/i,'')
      .replace(/Popeye Windows-64Bit v[0-9]*\.[0-9]* .*[\r\n|\n|\r]*/i,'');
  }catch{
    dialog.showErrorBox("Olive open error","Something is wrong.");
    res.render('fileopen',{ title: 'Brutus' });
  }

  res.render('result', { title: 'Brutus',
  "my_stip":mystip,
  "my_pieces":pieces,
  "my_solution":l_str});
}

module.exports = {popeye_controller,olivetopopeye_controller};