// @generated by Peggy 4.2.0.
//
// https://peggyjs.org/

"use strict";

var problems_for_query = [];
var filenamelist_for_query = [];

//return index of the selected problem
function select_by_value(json_out,filename,key,expr){
  var ret = [];
  for(let i=0;i<json_out.length;i++){
    if (key === "STIP" && json_out[i].stipulation){
      if(json_out[i].stipulation.toLowerCase().indexOf(expr.toLowerCase()) != -1){
        ret.push(i);
      }
    }else 
    if (key === "A" && json_out[i].authors){
      for(let j=0;j<json_out[i].authors.length;j++){
        if(json_out[i].authors[j].toLowerCase().indexOf(expr.toLowerCase()) != -1){
          ret.push(i);
        }                    
      }
    }else 
    if (key === "SOURCE" && json_out[i].source){
      if(json_out[i].source.name){
        if(json_out[i].source.name.toLowerCase().indexOf(expr.toLowerCase()) != -1){
          ret.push(i);
        }  
      }
    }else 
    if (key === "YEAR" && json_out[i].source.date){
      if (json_out[i].source.date.year){
        if(json_out[i].source.date.year === parseInt(expr)){
          ret.push(i);
        }            
      }
    }else 
    if (key === "MONTH" && json_out[i].source.date){
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


function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options, problems) {
  options = options !== undefined ? options : {};

  //define as a global variable so that atomic function can read them
  problems_for_query = problems.json_out;
  filenamelist_for_query = problems.filenamelist;

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { PROGRAM: peg$parsePROGRAM };
  var peg$startRuleFunction = peg$parsePROGRAM;

  var peg$c0 = "(";
  var peg$c1 = ")";
  var peg$c2 = "=";
  var peg$c3 = "'";
  var peg$c4 = "STIP";
  var peg$c5 = "SOURCE";
  var peg$c6 = "A";
  var peg$c7 = "YEAR";
  var peg$c8 = "MONTH";
  var peg$c9 = "OR";
  var peg$c10 = "Or";
  var peg$c11 = "or";
  var peg$c12 = "AND";
  var peg$c13 = "And";
  var peg$c14 = "and";

  var peg$r0 = /^[A-Za-z0-9#]/;
  var peg$r1 = /^[ \t]/;

  var peg$e0 = peg$literalExpectation("(", false);
  var peg$e1 = peg$literalExpectation(")", false);
  var peg$e2 = peg$literalExpectation("=", false);
  var peg$e3 = peg$literalExpectation("'", false);
  var peg$e4 = peg$literalExpectation("STIP", false);
  var peg$e5 = peg$literalExpectation("SOURCE", false);
  var peg$e6 = peg$literalExpectation("A", false);
  var peg$e7 = peg$literalExpectation("YEAR", false);
  var peg$e8 = peg$literalExpectation("MONTH", false);
  var peg$e9 = peg$classExpectation([["A", "Z"], ["a", "z"], ["0", "9"]], false, false);
  var peg$e10 = peg$literalExpectation("OR", false);
  var peg$e11 = peg$literalExpectation("Or", false);
  var peg$e12 = peg$literalExpectation("or", false);
  var peg$e13 = peg$literalExpectation("AND", false);
  var peg$e14 = peg$literalExpectation("And", false);
  var peg$e15 = peg$literalExpectation("and", false);
  var peg$e16 = peg$classExpectation([" ", "\t"], false, false);

  var peg$f0 = function(left, ops, right) {
    if (["OR","Or","or"].indexOf(ops) != -1){
        //if operation is "OR", the union of two files are returned.
        return left.union(right);
    }else if (["AND","And","and"].indexOf(ops) != -1){
        //if operation is "OR", the union of two files are returned.
        return left.intersection(right);
    }

};
  var peg$f2 = function(val) {
    return val;
};
  var peg$f3 = function(atm) {
    return atm;
};
  var peg$f4 = function(atm) {
    return atm; 
};
  var peg$f5 = function(cols, exprs) {
    // When Atomic is parsed, return JSON_out and filenamelist into OPTION
    var ret = select_by_value(problems_for_query,filenamelist_for_query,cols,exprs.join(''));
    // return "Return Atomic!!!";
    return ret;
};
  var peg$currPos = options.peg$currPos | 0;
  var peg$savedPos = peg$currPos;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;

  var peg$result;

  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {}
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsePROGRAM() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseVAL();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseINDENTATION();
      s3 = peg$parseOPS();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseINDENTATION();
        s5 = peg$parsePROGRAM();
        if (s5 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f0(s1, s3, s5);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseVAL();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseINDENTATION();
        s3 = peg$parseOPS();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseINDENTATION();
          s5 = peg$parseVAL();
          if (s5 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f0(s1, s3, s5);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseVAL();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$f2(s1);
        }
        s0 = s1;
      }
    }

    return s0;
  }

  function peg$parseVAL() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 40) {
      s1 = peg$c0;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseINDENTATION();
      s3 = peg$parsePROGRAM();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseINDENTATION();
        if (input.charCodeAt(peg$currPos) === 41) {
          s5 = peg$c1;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e1); }
        }
        if (s5 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f3(s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseATOMIC();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f4(s1);
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parseATOMIC() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    s1 = peg$parseINDENTATION();
    s2 = peg$parseCOLS();
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINDENTATION();
      if (input.charCodeAt(peg$currPos) === 61) {
        s4 = peg$c2;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e2); }
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parseINDENTATION();
        if (input.charCodeAt(peg$currPos) === 39) {
          s6 = peg$c3;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e3); }
        }
        if (s6 !== peg$FAILED) {
          s7 = peg$parseEXPRS();
          if (s7 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s8 = peg$c3;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e3); }
            }
            if (s8 !== peg$FAILED) {
              s9 = peg$parseINDENTATION();
              peg$savedPos = s0;
              s0 = peg$f5(s2, s7);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCOLS() {
    var s0;

    if (input.substr(peg$currPos, 4) === peg$c4) {
      s0 = peg$c4;
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e4); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c5) {
        s0 = peg$c5;
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e5); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 65) {
          s0 = peg$c6;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e6); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c7) {
            s0 = peg$c7;
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e7); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c8) {
              s0 = peg$c8;
              peg$currPos += 5;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e8); }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseEXPRS() {
    var s0, s1;

    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r0.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = input.charAt(peg$currPos);
        if (peg$r0.test(s1)) {
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e9); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseOPS() {
    var s0;

    s0 = peg$parseUNION();
    if (s0 === peg$FAILED) {
      s0 = peg$parseINTERSECTION();
    }

    return s0;
  }

  function peg$parseUNION() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c9) {
      s0 = peg$c9;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c10) {
        s0 = peg$c10;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e11); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c11) {
          s0 = peg$c11;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e12); }
        }
      }
    }

    return s0;
  }

  function peg$parseINTERSECTION() {
    var s0;

    if (input.substr(peg$currPos, 3) === peg$c12) {
      s0 = peg$c12;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c13) {
        s0 = peg$c13;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e14); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c14) {
          s0 = peg$c14;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e15); }
        }
      }
    }

    return s0;
  }

  function peg$parseINDENTATION() {
    var s0, s1;

    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r1.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r1.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e16); }
      }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (options.peg$library) {
    return /** @type {any} */ ({
      peg$result,
      peg$currPos,
      peg$FAILED,
      peg$maxFailExpected,
      peg$maxFailPos
    });
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  StartRules: ["PROGRAM"],
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
