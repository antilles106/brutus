// Atomic Expression

PROGRAM = left:VAL INDENTATION? ops:OPS INDENTATION? right:PROGRAM{
    if (["OR","Or","or"].indexOf(ops) != -1){
        return "Return Union!!!";
    }else if (["AND","And","and"].indexOf(ops) != -1){
        return "Return Intersection!!!";
    }
}
/left:VAL INDENTATION? ops:OPS INDENTATION? right:VAL{
    if (["OR","Or","or"].indexOf(ops) != -1){
        return "Return Union!!!";
    }else if (["AND","And","and"].indexOf(ops) != -1){
        return "Return Intersection!!!";
    }
}
/ val:VAL{
    return "Return Raw Value!!!";
}

VAL = "(" INDENTATION? atm:PROGRAM INDENTATION? ")"{
    return atm;
}/atm:ATOMIC{
    return atm; 
}

ATOMIC = INDENTATION? cols:COLS INDENTATION? "="  INDENTATION? "'" exprs:EXPRS "'" INDENTATION?{
    // When Atomic is parsed, return JSON_out and filenamelist into OPTION
    return "Return Atomic!!!";
}

COLS = "STIP" / "SOURCE" / "A" / "YEAR" / "MONTH"
EXPRS = [A-Za-z0-9]+
OPS = UNION/INTERSECTION
UNION = "OR" / "Or" / "or"
INTERSECTION = "AND" / "And" / "and"
INDENTATION = [ \t]*
