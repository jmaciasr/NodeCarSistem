const PATH = __dirname+'/../data/carStyle.json';

module.exports = CarOptions;

/**
 * @param {Object} data
 * @constructor
 */
function CarOptions(data = {model: '', brand: '', year: 0}) {
	var self = this;
	self.description = data.description;    
	self.name = data.name;
	
	self.valid = function() {
		if(self.name === '') {
			return false;
        }
		return true;
	}
}