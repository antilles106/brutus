function parse_date_expr(date_expr){
  return date_expr.split("/");
}

//return index of the selected problem
function select_by_value(json_out,key,expr){
    var ret = [];
    for(let i=0;i<json_out.length;i++){
      if (key.toLowerCase() === "stip" && json_out[i].stipulation){
        if(json_out[i].stipulation.toLowerCase().indexOf(expr.toLowerCase()) != -1){
          ret.push(i);
        }
      }else 
      if (key.toLowerCase() === "a" && json_out[i].authors){
        for(let j=0;j<json_out[i].authors.length;j++){
          if(json_out[i].authors[j].toLowerCase().indexOf(expr.toLowerCase()) != -1){
            ret.push(i);
          }
        }
      }else 
      if (key.toLowerCase() === "source" && json_out[i].source){
        if(json_out[i].source.name){
          if(json_out[i].source.name.toLowerCase().indexOf(expr.toLowerCase()) != -1){
            ret.push(i);
          }  
        }
      }else 
      if (key.toLowerCase() === "year" && json_out[i].source && json_out[i].source.date){
        if (json_out[i].source.date.year){
          if(json_out[i].source.date.year === parseInt(expr)){
            ret.push(i);
          }            
        }
      }else 
      if (key.toLowerCase() === "month" && json_out[i].source && json_out[i].source.date){
        if (json_out[i].source.date.month){
          if(json_out[i].source.date.month === parseInt(expr)){
            ret.push(i);
          }
        }
      }else 
      if (key.toLowerCase() === "date" && json_out[i].source && json_out[i].source.date){
        if (json_out[i].source.date.month && json_out[i].source.date.year){
          var date_expr = parse_date_expr(expr);
          if(json_out[i].source.date.year === parseInt(date_expr[1]) && 
            json_out[i].source.date.month === parseInt(date_expr[0])){
            ret.push(i);
          }
        }
      }
    }
    var rset = new Set(ret);
    return rset;
  }
  
function check_ineq(source,expr,ineq){
  if (ineq === ">"){
    return source > expr ? 1 : 0;
  }else if (ineq === "<"){
    return source < expr ? 1 : 0;
  }else if (ineq === ">="){
    return source >= expr ? 1 : 0;
  }else if (ineq === "<="){
    return source <= expr ? 1 : 0;
  }
  return 0;
}

function select_by_ineq_value(json_out,key,ineq,expr){
  var ret = [];
  for(let i=0;i<json_out.length;i++){
    if (key.toLowerCase() === "year" && json_out[i].source && json_out[i].source.date){
      if (json_out[i].source.date.year){
        if(check_ineq(json_out[i].source.date.year,parseInt(expr),ineq)){
          ret.push(i);
        }            
      }
    }else 
    if (key.toLowerCase() === "month" && json_out[i].source && json_out[i].source.date){
      if (json_out[i].source.date.month){
        if(check_ineq(json_out[i].source.date.month,parseInt(expr),ineq)){
          ret.push(i);
        }
      }
    }else 
    if (key.toLowerCase() === "date" && json_out[i].source && json_out[i].source.date){
      if (json_out[i].source.date.month && json_out[i].source.date.year){
        var date_expr = parse_date_expr(expr);
        //greater than
        if (ineq === ">"){
          if (json_out[i].source.date.year > parseInt(date_expr[1])){
            ret.push(i);
          }else if (json_out[i].source.date.year === parseInt(date_expr[1])
            && json_out[i].source.date.month > parseInt(date_expr[0])){
            ret.push(i);
          }
        } else if (ineq === "<"){
          if (json_out[i].source.date.year < parseInt(date_expr[1])){
            ret.push(i);
          }else if (json_out[i].source.date.year === parseInt(date_expr[1])
            && json_out[i].source.date.month < parseInt(date_expr[0])){
            ret.push(i);
          }
        }else if (ineq === ">="){
          if (json_out[i].source.date.year > parseInt(date_expr[1])){
            ret.push(i);
          }else if (json_out[i].source.date.year === parseInt(date_expr[1])
            && json_out[i].source.date.month >= parseInt(date_expr[0])){
            ret.push(i);
          }
        }else if (ineq === "<="){
          if (json_out[i].source.date.year < parseInt(date_expr[1])){
            ret.push(i);
          }else if (json_out[i].source.date.year === parseInt(date_expr[1])
            && json_out[i].source.date.month <= parseInt(date_expr[0])){
            ret.push(i);
          }
        }
      }
    }
  }
  var rset = new Set(ret);
  return rset;

}

  function prob_sort(problems,num,col,sort_style){
    console.log(col)
    return [...num].toSorted((a,b)=>{
      var ans;
      if (col.toLowerCase() === "stip"){
        if (problems[a].stipulation > problems[b].stipulation){
          ans = 1;
        }else if (problems[a].stipulation < problems[b].stipulation){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "a"){
        if (problems[a].authors && problems[b].authors === void 0){
          ans = -1;
        }else if (problems[a].authors === void 0 && problems[b].authors){
          ans = 1;
        }else if (problems[a].authors === void 0 && problems[b].authors === void 0){
          ans = 0;
        }else if (problems[a].authors[0] > problems[b].authors[0]){
          ans = 1;
        }else if (problems[a].authors[0] < problems[b].authors[0]){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "source"){
        console.log(a);
        console.log(b);
        if (problems[a].source && problems[b].source === void 0){
          ans = -1;
        }else if (problems[a].source === void 0 && problems[b].source){
          ans = 1;
        }else if (problems[a].source === void 0 && problems[b].source === void 0){
          ans = 0;
        }else if (problems[a].source.name > problems[b].source.name){
          ans = 1;
        }else if (problems[a].source.name < problems[b].source.name){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "year"){
        
        if (problems[a].source && problems[b].source === void 0){
          ans = -1;
        }else if (problems[a].source === void 0 && problems[b].source){
          ans = 1;
        }else if (problems[a].source === void 0 && problems[b].source === void 0){
          ans = 0;
        }else if (problems[a].source.date && problems[b].source.date === void 0){
          ans = -1;
        }else if (problems[a].source.date === void 0 && problems[b].source.date){
          ans = 1;
        }else if (problems[a].source.date === void 0 && problems[b].source.date === void 0){
          ans = 0;
        }else if (parseInt(problems[a].source.date.year) > parseInt(problems[b].source.date.year)){
          ans = 1;
        }else if (parseInt(problems[a].source.date.year) < parseInt(problems[b].source.date.year)){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "month"){
        if (problems[a].source && problems[b].source === void 0){
          ans = -1;
        }else if (problems[a].source === void 0 && problems[b].source){
          ans = 1;
        }else if (problems[a].source === void 0 && problems[b].source === void 0){
          ans = 0;
        }else if (problems[a].source.date && problems[b].source.date === void 0){
          ans = -1;
        }else if (problems[a].source.date === void 0 && problems[b].source.date){
          ans = 1;
        }else if (problems[a].source.date === void 0 && problems[b].source.date === void 0){
          ans = 0;
        }else if (parseInt(problems[a].source.date.month) > parseInt(problems[b].source.date.month)){
          ans = 1;
        }else if (parseInt(problems[a].source.date.month) < parseInt(problems[b].source.date.month)){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "date"){
        if (problems[a].source && problems[b].source === void 0){
          ans = -1;
        }else if (problems[a].source === void 0 && problems[b].source){
          ans = 1;
        }else if (problems[a].source === void 0 && problems[b].source === void 0){
          ans = 0;
        }else if (problems[a].source.date && problems[b].source.date === void 0){
          ans = -1;
        }else if (problems[a].source.date === void 0 && problems[b].source.date){
          ans = 1;
        }else if (problems[a].source.date === void 0 && problems[b].source.date === void 0){
          ans = 0;
        }else if (parseInt(problems[a].source.date.year) > parseInt(problems[b].source.date.year)){
            ans = 1;
        }else if (parseInt(problems[a].source.date.year) < parseInt(problems[b].source.date.year)){
            ans = -1;
          // if year is equal
        }else if (parseInt(problems[a].source.date.month) > parseInt(problems[b].source.date.month)){
          ans = 1;
        }else if (parseInt(problems[a].source.date.month) < parseInt(problems[b].source.date.month)){
          ans = -1;
        }else {
          ans = 0;
        }
      }
      return sort_style.toLowerCase() === "asc" ? ans : -ans;
    })
  }
  