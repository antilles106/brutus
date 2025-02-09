// Atomic Expression
//Start

PROGRAM = left:VAL INDENTATION? ops:OPS INDENTATION? right:PROGRAM{
    if (ops === "OR"){
        //if operation is "OR", the union of two files are returned.
        return "Return Union!!!";
    }else if (ops === "AND"){
        //if operation is "OR", the union of two files are returned.
        return "Return Intersection!!!";
    }

}
/left:VAL INDENTATION? ops:OPS INDENTATION? right:VAL{
    if (ops === "OR"){
        //if operation is "OR", the union of two files are returned.
        return "Return Union!!!";
    }else if (ops === "AND"){
        //if operation is "OR", the intersection of two files are returned.
        return "Return Intersection!!!";
    }
}
/ val:VAL{
    return val;
}

VAL = "(" INDENTATION? atm:PROGRAM INDENTATION? ")"{
    return atm;
}/atm:ATOMIC{
    return atm; 
}

ATOMIC = cols:COLS INDENTATION? "="  INDENTATION? "'" exprs:EXPRS "'"{
    // When Atomic is parsed, return JSON_out and filenamelist into OPTION
    return "Return Atomic!!!";
}

COLS = "STIP" / "SOURCE" / "A" / "YEAR" / "MONTH"
EXPRS = [A-Za-z0-9]+
OPS = UNION/INTERSECTION
UNION = "OR"
INTERSECTION = "AND"
INDENTATION = [ \t]*