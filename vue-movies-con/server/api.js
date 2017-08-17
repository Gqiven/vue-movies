//api 接口
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

// 获取数据接口
router.get('/api/movies/top250',(req,res) => {
    // 通过模型去查找数据库
    models.find({}, function(err,data){
    	if (err) {
            //res.send(err);
            return res.json({err: err});
        } else {
            //res.send(data);
            return res.json({data: data});
        }
    });
});

module.exports = router;