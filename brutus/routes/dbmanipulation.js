/**
 * DB (sqlite3) manipulation.
 */
var express = require('express');
var router = express.Router();
const path = require('path');

const dir = process.env.NODE_ENV === 'development'
? path.join(__dirname, '/../bin/')
: process.resourcesPath;

var sqlite3 = require('sqlite3');
const { switch_EnglishN } = require('./utils');
var db = new sqlite3.Database(path.join(dir,'sqlite3.db'));

router.get('/dbdeletefinish', function(req, res, next) {
  db.serialize(function(){
    var stmt = db.prepare('DELETE FROM problems where id = ?');
    stmt.run(req.query.delid);
    stmt.finalize();
    db.run('delete from sqlite_sequence where name="problems";');
  })
  res.render('dbdeletefinish', { title: 'Brutus' });
});

router.get('/dbregister', function(req, res, next) {
  res.render('dbregister', { title: 'Brutus' });
});

router.get('/dbedit', function(req, res, next) {
  db.serialize(function(){
    db.get("select * from problems where id = ?",req.query.editid,(err,row)=>{
      res.render('dbedit', { content: JSON.stringify(row).replace(/\\r\\n/g,"\\\\r\\\\n"), editid: req.query.editid, title: 'Brutus' });
    })
  });
});

router.post('/dbeditfinish', function(req, res, next) {
    db.serialize(function () {
      var stmt = db.prepare('UPDATE problems set authors = ?, source= ?,date = ?,tourney=?,distinction=?,fen=?,stip=?,conditions=? where id=?;')
      stmt.run(req.body.authors,req.body.source,req.body.date,req.body.tourney,req.body.distinction,req.body.fen,req.body.stip,req.body.conditions,req.body.id);
      stmt.finalize();
    })
    res.render('dbeditfinish', { title: 'Brutus' });
});

router.get('/dbselect', function(req, res, next) {
    var id = [];
    var authors = [];
    db.serialize(function(){
        db.all("select * from problems",function(err,row){
        res.render('dbselect', { title: 'Brutus',
            content: JSON.stringify(row) === undefined ? "" : JSON.stringify(row).replace(/\\r\\n/g,"<br>")});
        });
    });
});


router.post('/dbregisterfinish', function(req, res, next) {
    db.serialize(function () {
        var fen = req.body.fen;
        if (req.body.knightoption === "EnglishN"){
          fen = switch_EnglishN(fen);
        }

        var stmt = db.prepare('INSERT INTO problems (authors,source,date,tourney,distinction,fen,stip,conditions) VALUES (?,?,?,?,?,?,?,?)')
        stmt.run(req.body.authors,req.body.source,req.body.date,req.body.tourney,req.body.distinction,fen,req.body.stip,req.body.conditions);
        stmt.finalize();
    })
    res.render('dbregisterfinish', { title: 'Brutus' });
});

module.exports = router;
