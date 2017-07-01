const fs = require('fs');

const PATH = __dirname+'/../data/cars.json';

module.exports = Car;

/*
 */
function Car(data = {model: '', brand: '', year: 0}){
	var self = this;
	self.id = _getId(data.id);
	self.model = data.model;
	self.brand = data.brand;
	self.year = data.year;
	self.price = data.price;
	self.color = data.color;
	
	self.valid = function(){
		let year = +self.year;
		let price = +self.price;
		if(self.model === '' || self.brand === '' || self.model === '' || isNaN(year) || isNaN(price))
			return false;
		return true;
	}
}

/*
 */
function _getId(id){
	if(id > 0) return id;
	let data = '';
	try{
		data = require(PATH);
	}catch (err){ // file is empty
		return 1;
	}
	return ++data.counter;
}