# Brutus
 - v1.0.0 2025-02-07
 - v1.0.1 2025-02-09
 - v1.0.2 2025-02-11
 - v1.0.3 2025-02-16

## Overview
 - Brutus is a software devoted to chess problems presentation. It can load [Olive](https://github.com/dturevski/olive-gui) files and create an input into py2web.
 - It is under development, and is subject to further changes.

 - [Home](README_imgs/ss1.png)
 - [Load Olive file](README_imgs/ss2.png)
 - [Show a problem](README_imgs/ss3.png)

## Functions
 - It can show problems from a Forsyth string with a board (using py2web).
 - It can load Olive files and make a simple query to them.
 - It has an internal database, which can store problems.
 - Brutus includes a web server and it listens on port 127.0.0.1:3000 (so the other hosts cannot access to the server), but it can be used offline.

## Preliminaries
 - The package is running on Node.js + Express + Electron, and is dependent on the following libraries.
   + Popeye (https://github.com/thomas-maeder/popeye)
   + Py2web (https://github.com/dturevski/py2web)
   + SemanticUI (https://github.com/Semantic-Org/Semantic-UI-CSS/archive/master.zip)
   + js-yaml (https://github.com/nodeca/js-yaml)
 - Please put py2web files, jquery and other JS/CSS files in public/javascripts/brutus.
```
├─images
├─javascripts
│  └─brutus
│      │ components/ #from SemanticUI
│      │ themes/ #from SemanticUI
│      │ gc-large.gif #from py2web
│      │ gc-small.png #from py2web
│      │ jquery.min.js #from JQuery
|      | js-yaml.min.js #from js-yaml
|      | queryfunc.js
│      │ parser.js
│      │ py2web.css #from py2web
│      │ py2web.js #from py2web
|      | semantic.min.css #from SemanticUI
|      | semantic.min.js #from SemanticUI
└─stylesheets
        style.css
```

## How to run
### Development environment(npm)
 - As a prerequisite, Node.js is necessary.
 - change directory to brutus and run:
 ```powershell
   npm install
 ``` 

 - after running the command above, put Popeye executable (pywin64.exe) to brutus/bin/ and brutus/node_modules/electron/dist/resources/.
 - You can start the program by running the command below (using Electron).
 ```powershell
   npm start
 ```

- For windows users, by running the command below, you can make a standalone desktop application(using Electron-forge).
  The application will be created in out/brutus-win32-x64/. 
 ```powershell
   npm run make
 ```

### Environment without npm
- Please execute brutus-win32-64/brutus.exe (For Windows).

## How to use
- "Show Problem": Put Pieces and Solution (in the Popeye style) and click "Show diagram and solution", and you can show the problem with py2web style. If you want to show proofgames, please fill the solution only and set Advanced -> mode to PG. If you want to change the glyph of the fairy piece, please set Advanced -> glyphs.
- "Register to DB": Put the problem's information and you can store the problem in the internal database.
- "Solve from FEN": Put Forsyth and the stipulation and condition and click "submit" and you can show diagram and solution.
- "Solve from DB": Click "+" Button and you can register a problem to the internal DB. Set Problem ID and click "Solve" button and you can show diagram and solution.
- "Open Olive files": Click "Open Olive files" and you can load Olive files. You can also filter the Olive entry with a simple query.

### Query
You can use the following query. All words are case-insensitive. 
- "A='[Author name]'"
- "SOURCE='[Source name]'"
- "STIP='[Stipulation ]'"
- "YEAR='[Year (e.g. 2024)]'"
- "MONTH='[Month (e.g. 12)]'"
- "DATE='[Month/Year (e.g. 1/2025)]'"
- "*" suggests all entries
- "AND" statement 
- "OR" statement 
- "ORDER BY [COLUMN ] (ASC|DESC)"

The examples of query are as follows:
- "A='Doe' and STIP='H#'"
- "(STIP='H' or STIP='S') and SOURCE='Problemist'"
- "* order by date asc"

## Disclaimer
 - The author shall not be liable for any trouble, loss and damage caused by the use of this software.

