var App = function () {
	var handleLockUnlock = function(){
	$('#search-content-page .search-result-item .toggle-status-button').on('click',function(event){
		var status = $(this).data('status');
		console.log('Toggle lock is called. '+$(this).data('email')+' title: '+$(this).text()+' ,status: '+status);

		var that = $(this);
		
		var jqxhr = $.post( "/status",{email:$(this).data('email'),'status':$(this).data('status')}, function(data) {
  			console.log( "success data : "+JSON.stringify(data) );
  			if(data.type){
  				if(status == 'locked'){
  					that.html('Lock');
  					that.removeClass('btn-success');
  					that.addClass('btn-danger');
  				}else{
  					that.html('Unlock');
  					that.removeClass('btn-danger');
  					that.addClass('btn-success');
  				}
  				notify(true,data.msg);
  			}else{
  				notify(false,data.msg);
  			}
		})
  		.done(function() {
    		console.log( "second success");
  		})
  		.fail(function() {
    		console.log( "error");
  		})
  		.always(function() {
    		console.log( "finished");
  		});
 
		// Perform other work here ...
 
		// Set another completion function for the request above
		jqxhr.always(function() {
  			console.log( "second finished" );
		});
	});

	};


	var show = function(element,text){
		$(element).text(text)
		$(element).addClass('block').addClass('animate-show');
	}

	var hide = function(element){
		setTimeout(function(){
			$(element).removeClass('block').removeClass('animate-show');
	 		$(element).text('');
		},15000);
	}

	var notify = function(type,text){
		var element = '.msg-transition-danger'
		//var element = '.msg-transition-danger';
		console.log('type: '+type)
		if(type)
			element = '.msg-transition-success';

		show(element,text);
		hide(element);
	};

	return {
		init: function(){
			//init core elements.
			handleLockUnlock();
		}
	};
}();