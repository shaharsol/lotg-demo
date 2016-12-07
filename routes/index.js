var express = require('express');
var router = express.Router();
var util = require('util');
var config = require('config');
var lotg = require('../../lotg/lotg')
var util =require('util')
var _ = require('underscore')


router.get('/',function(req,res,next){

  lotg.init({
    scm: config.get('scm')
  })

  lotg.getUserRepos(config.get('access_token'),function(err,repos){
    if(err){
      console.log('err is: %s',err)
    }else{
      res.render('index/index',{
        repos: repos,
        _: _
      })
    }
  })

})

router.get('/commits/:repo_id',function(req,res,next){

  lotg.init({
    scm: config.get('scm')
  })

  lotg.getRepoCommits(config.get('access_token'),req.params.repo_id,function(err,commits){
    if(err){
      console.log('err is: %s',err)
    }else{
      res.render('index/commits',{
        commits: commits,
        _: _
      })
    }
  })

})


module.exports = router;
