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
  
  function prob_sort(problems,col,sort_style){
    return [...problems].toSorted((a,b)=>{
      var ans;
      if (col.toLowerCase() === "stip"){
        if (a.stipulation > b.stipulation){
          ans = 1;
        }else if (a.stipulation < b.stipulation){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "a"){
        if (a.authors && b.authors === void 0){
          ans = -1;
        }else if (a.authors === void 0 && b.authors){
          ans = 1;
        }else if (a.authors === void 0 && b.authors === void 0){
          ans = 0;
        }else if (a.authors[0] > b.authors[0]){
          ans = 1;
        }else if (a.authors[0] < b.authors[0]){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "source"){
        if (a.source && b.source === void 0){
          ans = -1;
        }else if (a.source === void 0 && b.source){
          ans = 1;
        }else if (a.source === void 0 && b.source === void 0){
          ans = 0;
        }else if (a.source.name > b.source.name){
          ans = 1;
        }else if (a.source.name < b.source.name){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "year"){
        if (a.source && b.source === void 0){
          ans = -1;
        }else if (a.source === void 0 && b.source){
          ans = 1;
        }else if (a.source === void 0 && b.source === void 0){
          ans = 0;
        }else if (a.source.year > b.source.year){
          ans = 1;
        }else if (a.source.year < b.source.year){
          ans = -1;
        }else {
          ans = 0;
        }
      }else if (col.toLowerCase() === "month"){
        if (a.source && b.source === void 0){
          ans = -1;
        }else if (a.source === void 0 && b.source){
          ans = 1;
        }else if (a.source === void 0 && b.source === void 0){
          ans = 0;
        }else if (a.source.month > b.source.month){
          ans = 1;
        }else if (a.source.month < b.source.month){
          ans = -1;
        }else {
          ans = 0;
        }
      }
      return sort_style.toLowerCase() === "asc" ? ans : -ans;
    })
  }
  