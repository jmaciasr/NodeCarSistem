(function($, window){
	// constants
	var BASE_URL = 'http://localhost:8080'; // server
	
	// variables
	var form = null;
	var table = null;
	

	function _loadTable(data){
		// clear the table content
		table.find('tbody').html('');
		
		if(!data)
			$.ajax({
				url: BASE_URL+'/cars',
				type: 'GET',
				// dataType: 'json'
			}).then(_composeTBody, _logError);
		else
			_composeTBody(data);
	}
	
	/**
	 
	 */
	function _composeTBody(data){
		var tbody = $('<tbody></tbody>');
		
		// there are no cars
		if(!data.total){
			tbody.append($('<tr><th colspan="5" class="text-center">There are no cars.</th></tr>'));
			return table.append(tbody);
		}
		
		// create the tds for echa car
		data.records.forEach(function(car){
			var tr = $('<tr></tr>');
			tr.append($('<th>#'+car.id+'</th>'));
			tr.append($('<td>'+car.model+'</td>'));
			tr.append($('<td>'+car.brand+'</td>'));
			tr.append($('<td>'+car.year+'</td>'));
			tr.append($('<td>'+car.price+'</td>'));
			tr.append($('<td>'+car.color+'</td>'));
			var actions = $('<td width="150px"></td>');
			actions.append(_composeEditButton(car));
			actions.append(_composeDeleteButton(car));
			tr.append(actions);
			tbody.append(tr);
		});
		table.append(tbody);
	}
	
	/*
	 */
	function _composeDeleteButton(car){
		var button = $('<button class="btn btn-sm btn-danger pull-right">Delete</button>');
		button.on('click', function(){
			var message = 'Are you sure you want to delete '+car.model+' '+car.brand;
			message += "\nThis action will delete the users permanently."
			if(confirm(message)) _deleteCar(car.id);
		});
		return button;
	}
	
	/*
	 */
	function _deleteCar(id){
		$.ajax({
			url: BASE_URL+'/car',
			type: 'DELETE',
			data: {id: id}
		}).then(_loadTable, _logError);
	}
	
	/*
	 */
	function _composeEditButton(car){
		var button = $('<button class="btn btn-sm btn-primary">Edit</button>');
		button.on('click', function(){
			// load the data into the form
			form[0].id.value = car.id;
			form[0].model.value = car.model;
			form[0].brand.value = car.brand;
			form[0].year.value = car.year;
			form[0].price.value = car.price;
			form[0].color.value = car.color;
			console.log('edit', car);
		});
		return button
	}
	
	/*
	 */
	function _submitForm(event){
		event.preventDefault();
		var data = form.serializeArray();
		var data = {
			id: form[0].id.value,
			model: form[0].model.value,
			brand: form[0].brand.value,
			year: form[0].year.value,
			price: form[0].price.value,
			color: form[0].color.value,
		}
		console.log('data', data);
		
		$.ajax({
			url: BASE_URL+'/car',
			type: data.id == 0 ? 'POST' : 'PUT',
			data: data
		}).then(
			function (data){
				form[0].reset();
				_loadTable(data);
			},
			_logError
		);
	}
	
	/*
	 */
	function _logError(error){
		console.error(error);
	}
	
	/* app
	 * @private
	 */
	function _init(){
		form = $('#carForm');
		table = $('#cars');
		
		_loadTable();
		
		form.on('submit', _submitForm)
	}
	
	_init();
})(jQuery, window);