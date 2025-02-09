const parser = require('./parser');

var fen_parser = function(req){
    var white = [];
    var black = [];
    
    var rank = 8;
    var file = 1;
  
    var fen = req.body.fen;
    if (req.body.knightoption && req.body.knightoption === "EnglishN"){
      fen = switch_EnglishN(fen);
    }
  
    var position = 0;
    while(position < fen.length){
      if (fen[position] == "/"){
        rank = rank - 1;
        file = 1;
        position = position + 1;
      }else if((fen[position] == ".")){ //Popeye's way when a piece is indicated by two or more letters
        file_str = String.fromCharCode(file+96);
        piece_str = fen[position+1].toUpperCase() + fen[position+2].toUpperCase();
        algebraic_str = piece_str + file_str + String(rank);
        file = file + 1;
        if (fen[position+1] == fen[position+1].toUpperCase()){ // If upper case, it is a White piece.
          white.push(algebraic_str);
        }else{
          black.push(algebraic_str);
        }    
        position = position + 3;
  
      }else if(fen[position] in ['1','2','3','4','5','6','7','8','9']){ //TODO: modify
        file = file + parseInt(fen[position]);
        position = position + 1;
      }else{
        file_str = String.fromCharCode(file+96);
        piece_str = fen[position].toUpperCase();
        algebraic_str = piece_str + file_str + String(rank);
        file = file + 1;
        if (fen[position] == fen[position].toUpperCase()){ // If upper case, it is a White piece.
          white.push(algebraic_str);
        }else{
          black.push(algebraic_str);
        }
        position = position + 1;
      }
    }
  
    return "White " + white.join(' ')+ "\nBlack "+black.join(" ");
  };

  var get_pieces_from_condition = function(req){
    conditions = req.body.conditions.replace(/<br>/g,"\r\n");
    var ret = [];
    var targ = ['neutral','white', 'black'];
    for(let i=0;i<targ.length;i++){
      var pattern = new RegExp("Pieces?[\\s]*(" + targ[i] + "[A-Za-z0-9\\s]*)$","gi");
      var ans = [...conditions.matchAll(pattern)];
      for(let i=0;i<ans.length;i++){
        ret = ret.concat(ans[i][1]);
      }  
    }
    return ret;
  }
  
  var get_pieces_from_yaml = function(yaml_out,targ){
    algebraic_str = "";
  
    if (yaml_out[targ].algebraic.white){
      algebraic_str += "White ";
      for(let i=0;i<yaml_out[targ].algebraic.white.length;i++){
        algebraic_str += yaml_out[targ].algebraic.white[i];
        algebraic_str += " ";
      }
      algebraic_str += "\n";
    }
    if (yaml_out[targ].algebraic.black){
      algebraic_str += "Black ";
      for(let i=0;i<yaml_out[targ].algebraic.black.length;i++){
        algebraic_str += yaml_out[targ].algebraic.black[i];
        algebraic_str += " ";
      }  
      algebraic_str += "\n";
    }
    if (yaml_out[targ].algebraic.neutral){
      algebraic_str += "Neutral ";
      for(let i=0;i<yaml_out[targ].algebraic.neutral.length;i++){
        algebraic_str += yaml_out[targ].algebraic.neutral[i];
        algebraic_str += " ";
      }
      algebraic_str += "\n";
    }
    return algebraic_str;
  }
  
  var get_conditions_from_yaml = function(yaml_out,targ){
    // Conditions and Options are included by "Options"
    ret = ""
    ret_condition = "Condition ";
    ret_option = "Option ";
    is_condition = false
    is_option = false
    // TODO: modify
    Options = ["Intelligent","Defence 1","SetPlay","Duplex"];
  
    if (yaml_out[targ].options){
      for(let i=0;i<yaml_out[targ].options.length;i++){
        if (Options.indexOf(yaml_out[targ].options[i]) == -1 ){
          ret_condition += yaml_out[targ].options[i];
          ret_condition += " ";
          is_condition = true;          
        }else{
          ret_option += yaml_out[targ].options[i];
          ret_option += " ";
          is_option = true;
        }
      }
      ret_condition += "\n";
      ret_option += "\n";
    }
    ret = is_condition ? ret + ret_condition : ret;
    ret = is_option ? ret + ret_option: ret;
    return ret;
  }
  
  var get_twin_from_yaml = function(yaml_out,targ){
    ret = "";
    if(yaml_out[targ].twins){
      for(let key in yaml_out[targ].twins){
        ret += "Twin ";
        ret += yaml_out[targ].twins[key];
        ret += "\n";
      }
    }
    return ret;
  }
  
  var select_by_query = function(json_out,query,filenamelist){
    var filename = [];
    var ret = [];

    var problems = {
      "json_out":json_out,
      "filenamelist":filenamelist
    };

    var queryres = parser.parse(query,{},problems);

    queryres.forEach(element => {
      ret.push(json_out[element]);
      filename.push(filenamelist[element])
    });
  
    //escaping
    //TODO: modify
    for(let i=0;i<ret.length;i++){
      if(ret[i].source && ret[i].source.name){
        ret[i].source.name = ret[i].source.name.replace(/\'/g,"`").replace(/\"/g,"`");
      }
      if(ret[i].authors){
        for(let j=0;j<ret[i].authors.length;j++){
          ret[i].authors[j] = ret[i].authors[j].replace(/\'/g,"`").replace(/\"/g,"`");
        }
      }
      if(ret[i].comments){
        for(let j=0;j<ret[i].comments.length;j++){
          ret[i].comments[j] = ret[i].comments[j].replace(/\'/g,"`").replace(/\"/g,"`");
        }
      }
    }
    return {ret,filename};
  }
  
var switch_EnglishN = function(fen){
  // "N" and the previous two letters are not "." -> "S"
  //one letter "N" to "S"
  for(let i=0;i<fen.length;i++){
    if (fen[i] === "N"){
      
      if(i==0){
        fen = "S" + fen.slice(1,fen.length);
      }else if (i==1){
        if (fen[0] != "."){
          fen = fen[0] + "S" + fen.slice(2,fen.length);
        }
      }else{
        if (fen[i-1] != "." && fen[i-2] != "."){
          fen = fen.slice(0,i) + "S" + fen.slice(i+1,fen.length);
        }
      }
    }else if (fen[i] === "n"){
      if(i==0){
        fen = "s" + fen.slice(1,fen.length);
      }else if (i==1){
        if (fen[0] != "."){
          fen = fen[0] + "s" + fen.slice(2,fen.length);
        }
      }else{
        if (fen[i-1] != "." && fen[i-2] != "."){
          fen = fen.slice(0,i) + "s" + fen.slice(i+1,fen.length);
        }
      }
    }
  }
  fen = fen.replace(/\.NR/g,"N");  
  fen = fen.replace(/\.nr/g,"n");  
  return fen;  
}

module.exports = {fen_parser,
    get_pieces_from_condition,
    get_pieces_from_yaml,
    get_conditions_from_yaml,
    get_twin_from_yaml,
    select_by_query,
    switch_EnglishN};