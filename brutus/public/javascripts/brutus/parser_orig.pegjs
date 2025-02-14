// Atomic Expression

PROGRAM = out:SELECT INDENTATION? "ORDER BY"i INDENTATION? cols:COLS INDENTATION? sort_style:SORT_STYLE{
	return sort_style;
}/out:SELECT{
	return out;
}

SELECT = left:VAL INDENTATION? ops:OPS INDENTATION? right:SELECT{
    if (ops.toLowerCase() == "or"){
        return "Return Union!!!";
    }else if (ops.toLowerCase() == "and"){
        return "Return Intersection!!!";
    }
}
/left:VAL INDENTATION? ops:OPS INDENTATION? right:VAL{
    if (ops.toLowerCase() == "or"){
        return "Return Union!!!";
    }else if (ops.toLowerCase() == "and"){
        return "Return Intersection!!!";
    }
}
/ val:VAL{
    return "Return Raw Value!!!";
}

VAL = "(" INDENTATION? atm:SELECT INDENTATION? ")"{
    return atm;
}/atm:ATOMIC{
    return atm; 
}

ATOMIC = INDENTATION? cols:COLS INDENTATION? EQ  INDENTATION? "'" exprs:EXPRS "'" INDENTATION?{
    // When Atomic is parsed, return JSON_out and filenamelist into OPTION
    return "Return Atomic!!!";
}
/INDENTATION? cols:INEQ_COLS INDENTATION? ineq:INEQ INDENTATION? "'" exprs:EXPRS "'" INDENTATION?{
    // When Atomic is parsed, return JSON_out and filenamelist into OPTION
    return "Return Ineq Atomic!!!";
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