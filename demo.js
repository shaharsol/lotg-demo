var config = require('config');
var lotg = require('../lotg/lotg')
var util =require('util')

lotg.init({
  scm: config.get('scm')
})

lotg.getUserRepos(config.get('access_token'),function(err,repos){
  if(err){
    console.log('err is: %s',err)
  }else{
    console.log(util.inspect(repos))
  }
})
