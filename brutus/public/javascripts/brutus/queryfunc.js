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
      }
    }
    var rset = new Set(ret);
    return rset;
  }
  
  function prob_sort(problems,num,col,sort_style){
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
        }else if (problems[a].source.year > problems[b].source.year){
          ans = 1;
        }else if (problems[a].source.year < problems[b].source.year){
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
        }else if (problems[a].source.month > problems[b].source.month){
          ans = 1;
        }else if (problems[a].source.month < problems[b].source.month){
          ans = -1;
        }else {
          ans = 0;
        }
      }
      return sort_style.toLowerCase() === "asc" ? ans : -ans;
    })
  }
  