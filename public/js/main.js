$( document ).ready(function() {

	$('.datepicker').datepicker();

	$(".brewery").on("click",function(){
		$(this).toggleClass('active');
	})

});