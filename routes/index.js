var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
router.use(methodOverride('_method'))

/* GET home page. */

let posts =[
  {
    id:uuidv4(),
    username:"Joy",
    contain:"i love coding",
  },
  {
    id:uuidv4(),
    username:"obaidul",
    contain:"i like play Football",
  },
  {
    id:uuidv4(),
    username:"Haque",
    contain:"i love cricket",
  },
];



router.get('/post', function(req, res,) {
  res.render('index',{posts});
});
router.get('/post/user',(req,res)=>{
  res.render('form')
});

router.post('/post',(req,res)=>{
  let id =uuidv4();
  let {username,contain}=req.body;
  posts.push({id,username,contain});
  res.redirect('/post');
});

router.get('/post/:id',(req,res)=>{
  let {id}=req.params;
  let post =posts.find((p)=>id === p.id);
  res.render('show',{post});
});

router.get('/post/:id/edit',(req,res)=>{
  let {id}=req.params;
  let post =posts.find((p)=> id===p.id);
  res.render('edit',{post});
});

router.patch('/post/:id',(req,res)=>{
  let {id}=req.params;
  let post =posts.find((p)=> id === p.id);
  post.contain=req.body.contain;
  res.redirect('/post');
});

router.delete('/post/:id',(req,res)=>{
  let {id}=req.params;
  posts=posts.filter((p)=> id!== p.id);
  res.redirect('/post')
});
module.exports = router;
