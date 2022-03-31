'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  create(json) {
    try{
      return this.model.create(json);
    }catch(e){
      console.log(e);
      return e;
    }
  }
  
  async get(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id } });
      } else {
        return await this.model.findAll({});
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async update(id, data) {
    try{
      let obj = await this.model.findOne({ where: { id } });
      return await obj.update(data);
    }catch(e){
      console.log(e);
    }
  }

  delete(id) {
    try{
      return this.model.destroy({ where: { id } });
    }catch(e){
      console.log(e);
    }
  }
}

module.exports = DataCollection;
