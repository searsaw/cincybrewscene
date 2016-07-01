$( document ).ready(function() {

	$('.datepicker').datepicker({
    	format: 'mm/dd/yyyy',
    	startDate: '+0d'
	});

	var currentArray = [];

	$('.brewery').css('cursor','pointer');
	$("body").on("click",'.brewery', function(){
		var id = $(this).data('breweryid');
		var arrayPosition = currentArray.indexOf(id);

		$(this).toggleClass('active');
		
		if(arrayPosition > -1)
		{
			currentArray.splice(arrayPosition,1);
			return false;
		}
		
		currentArray.push(id);
	});

	var date = new Date();

	var hours = date.getHours(); 

	$('.timepicker').timepicker({
	    timeFormat: 'h:mm p',
	    defaultTime: hours+':00',
	    startTime: hours+':00',
	});

	$('form').on('submit', event => {
		event.preventDefault();

		var data = {
			name: $(this).find('.name').val(),
			time: $(this).find('.start').val(),
			date: $(this).find('.datepicker').val(),
			breweries:currentArray,
		};

		$.ajax({
		  type: "POST",
		  url: '/brewery/create',
		  data: data,
		  success: response => {
		  	if(response.errors)
		  	{
		  		alert(response.errors.name.message);
		  		return;
		  	}
		  	window.location.href = '/map/'+response._id;
		  }		
		});
	});


	$(".fa-thumbs-up").on("click",function(){
		var id = $(this).data('id');
		$.ajax({
		  type: "POST",
		  url: '/crawl/vote',
		  data: {crawl:id},
		  success: response => {
		  	if(response.errors)
		  	{
		  		alert(response.errors.name.message);
		  		return;
		  	}
		  	else if(response.upserted)
		  	{
		  		var vote = $(".vote").html();
		  		$(".vote").html(parseInt(vote)+1);
		  	}
		  	else {
		  		alert("You can only vote once.");
		  	}
		  }		
		});
	});
});