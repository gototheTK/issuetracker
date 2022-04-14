'use strict';

module.exports = function (app) {

  const projects = {};
  let count = 1;
  
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let filter = req.query;

      if(projects[project]){

        const result = Object.keys(filter).length === 0 ? projects[project] : projects[project].filter((item) => {

          for(let key in filter){
            if(item[key] === filter[key]){}
            else{
              return false;
            }
          }
          
          return true;
          
        });
        res.json(result);
      }else {
        res.json([]);
      }
      
    })
    .post(function (req, res){
      let project = req.params.project;

      const required_fileds = {
        issue_title:'',
        issue_text:'',
        created_by:'',
      }
      for(let key in required_fileds){
        if(req.body[key]){
          required_fileds[key] = req.body[key]
        }else{

          res.json({ error: 'required field(s) missing' });
          return
        }
        
      }

      let result = req.query;

      result.assigned_to = '';
      result.status_text = '';
      result.open = true;
      result._id = '' + count++;
      
      
      for(let key in req.body){
        result[key] = req.body[key];
      }
      
      
      result.created_on = new Date().toISOString();
      result.updated_on = new Date().toISOString();

      projects[project] ? 
      projects[project].push(result) :
      projects[project] = [result];
      
      res.send(result);
    })
    
    .put(function (req, res){
      let project = req.params.project
      
      const _id = req.body._id;
      
      if(_id){
        const keys = Object.keys(req.body);
        if(keys.length === 1){
          res.json({ error: 'no update field(s) sent', '_id': _id });
          return
        }
      }else{
        res.json({ error: 'missing _id' })
        return
      }


      for(let i=0; i<projects[project].length; i++){

        if(projects[project][i]._id === _id){
          for(let key in req.body){
            projects[project][i][key] = req.body[key];
          }
            projects[project][i].updated_on = new Date().toISOString();
          res.json({  result: 'successfully updated', '_id': _id });      
          return
          
        }
        
      }
      
    res.json({ error: 'could not update', '_id': _id});
          return


    })
    
    .delete(function (req, res){
      let project = req.params.project;

      const _id = req.body._id;

      if(_id){

        for(let i=0; i<projects[project].length; i++){

        if(projects[project][i]._id === _id){

          projects[project].splice(i,1);
   
          res.json({ result: 'successfully deleted', '_id': _id });      
          return
          
        }
        
      }
        
      }else{
        res.json({ error: 'missing _id'});
          return
      }

      res.json({ error: 'could not delete', '_id': _id});
          return
      
    });
    
};
