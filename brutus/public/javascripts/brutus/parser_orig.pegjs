// Atomic Expression

PROGRAM = out:SELECT INDENTATION? "ORDER BY"i INDENTATION? cols:COLS INDENTATION? sort_style:SORT_STYLE{
	return prob_sort(problems_for_query,out,cols,sort_style);
}/out:SELECT{
	return out;
}

SELECT = left:VAL INDENTATION? ops:OPS INDENTATION? right:SELECT{
    if (ops.toLowerCase() == "or"){
        return left.union(right);
    }else if (ops.toLowerCase() == "and"){
        return left.intersection(right);
    }
}
/left:VAL INDENTATION? ops:OPS INDENTATION? right:VAL{
    if (ops.toLowerCase() == "or"){
        return left.union(right);
    }else if (ops.toLowerCase() == "and"){
        return left.intersection(right);
    }
}
/ val:VAL{
    return val;
}

VAL = "(" INDENTATION? atm:SELECT INDENTATION? ")"{
    return atm;
}/atm:ATOMIC{
    return atm; 
}

ATOMIC = INDENTATION? ALL INDENTATION?{
   return "All!";
}
/INDENTATION? cols:COLS INDENTATION? EQ  INDENTATION? "'" exprs:EXPRS "'" INDENTATION?{
    var ret = select_by_value(problems_for_query,cols,exprs.join(''));
    return ret;
}
/INDENTATION? cols:INEQ_COLS INDENTATION? ineq:INEQ INDENTATION? "'" exprs:EXPRS "'" INDENTATION?{
    return select_by_ineq_value(problems_for_query,cols,ineq,exprs.join(''));
}
COLS = "STIP"i / "SOURCE"i / "A"i / NUM_COLS
EXPRS = [A-Za-z0-9#/]+
OPS = UNION/INTERSECTION
UNION = "OR"i
INTERSECTION = "AND"i
INDENTATION = [ \t]*
SORT_STYLE = "ASC"i/"DESC"i
INEQ_COLS = NUM_COLS
NUM_COLS = "YEAR"i / "MONTH"i / "DATE"i
EQ = "="
INEQ = ">=" / "<=" /">" / "<"
ALL = "*"