'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();

router.param('model', (req, res, next) => {
  try{
    const modelName = req.params.model;
    if (dataModules[modelName]) {
      req.model = dataModules[modelName];
      next();
    } else {
      next('Invalid Model');
    }
  }catch(e){
    console.log(e);
    return e;
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  try{
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  }catch(e){
    console.log(e);
    return e;
  }
}

async function handleGetOne(req, res) {
  try{
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  }catch(e){
    console.log(e);
    return e;
  }
}

async function handleCreate(req, res) {
  try{
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  }catch(e){
    console.log(e);
    return e;
  }
}

async function handleUpdate(req, res) {
  try{
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  }catch(e){
    console.log(e);
    return e;
  }
}

async function handleDelete(req, res) {
  try{
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  }catch(e){
    console.log(e);
    return e;
  }
}


module.exports = router;
