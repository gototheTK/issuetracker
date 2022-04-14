const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('test_issue1', (done)=>{ chai.request(server).post('/api/issues/{project}').send({
      issue_title:'asd',
      issue_text: 'asd',
      created_by: 'asd',
      assigned_to: 'asd',
      status_text: 'asd'
    }).end((err, res)=>{
      assert.containsAllKeys(res.body, {
      issue_title:'asd',
      issue_text: 'asd',
      created_by: 'asd',
      assigned_to: 'asd',
      status_text: 'asd'
    });
    });
      done();
  });

  test('test_issue2', (done)=>{ chai.request(server).post('/api/issues/{project}').send({
      issue_title:'asd',
      issue_text: 'asd',
      created_by: 'asd',
      assigned_to: '',
      status_text: ''
    }).end((err, res)=>{
      assert.containsAllKeys(res.body, {
      issue_title:'asd',
      issue_text: 'asd',
      created_by: 'asd',
      assigned_to: '',
      status_text: ''
    });
    });
      done();
  });

  test('test_issue3', (done)=>{ chai.request(server).post('/api/issues/{project}').send({
      issue_text: 'asd',
      created_by: 'asd',
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"error":"required field(s) missing"}');
    done();
    });                
      
  });
  

  test('test_issue4', (done)=>{ chai.request(server).get('/api/issues/{project}').end((err, res)=>{
      assert.equal(res.status, 200);
    });
      done();
  });

  test('test_issue5', (done)=>{
    chai.request(server).post('/api/issues/{project}?assigned=Joe').end((err, res)=>{
      assert.equal(res.status, 200);
    });
      done();
  });

  test('test_issue6', (done)=>{
    chai.request(server).post('/api/issues/{project}?assigned=Joe&open=true').end((err, res)=>{
      assert.equal(res.status, 200);
    });
      done();
  });

  test('test_issue7', (done)=>{ chai.request(server).put('/api/issues/{project}').send({
      _id:'1',
      issue_text: 'asddd'
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"result":"successfully updated","_id":"1"}')                  
      done();
    });
      
  });

  test('test_issue8', (done)=>{ chai.request(server).put('/api/issues/{project}').send({
      _id:'1',
      issue_text: 'asd',
      created_by: 'asd',
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"result":"successfully updated","_id":"1"}');                  
      done();
    });
  });

  test('test_issue9', (done)=>{ chai.request(server).put('/api/issues/{project}').send({
      issue_text: 'asd',
      created_by: 'asd',
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"error":"missing _id"}')   
      done();
    });
      
  });

  test('test_issue10', (done)=>{ chai.request(server).put('/api/issues/{project}').send({
      _id: '1'
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"error":"no update field(s) sent","_id":"1"}')   
      done();
    });
      
  });

  test('test_issue11', (done)=>{ chai.request(server).put('/api/issues/{project}').send({
      _id: 'dd12399999999',
      issue_text: 'asd',
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"error":"could not update","_id":"dd12399999999"}');
      done();
    });
      
  });

  test('test_issue12', (done)=>{ chai.request(server).delete('/api/issues/{project}').send({
      _id: '1'
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"result":"successfully deleted","_id":"1"}')
      done();
    });
      
  });

  test('test_issue13', (done)=>{ chai.request(server).delete('/api/issues/{project}').send({
      _id: 'dd99999999'
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"error":"could not delete","_id":"dd99999999"}');
      done();
    });
      
  });

  test('test_issue14', (done)=>{ chai.request(server).delete('/api/issues/{project}').send({
      
  }).end((err, res)=>{
      assert.equal(res.status, 200);
    assert.strictEqual(res.text, '{"error":"missing _id"}');   
      done();
    });
      
  });

     
  
});
