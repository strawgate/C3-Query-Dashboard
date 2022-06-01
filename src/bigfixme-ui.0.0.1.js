/**
 * (C) Copyright Moran, Inc. 2013.  All Rights Reserved.
 * 
 * bigfix Dashboard Framework v0.0.1
 *
 * This file contains the User Interface components of our 
 * framework.  You'll find UI initializers, extensions, etc.
 */
 

try {
	bigfix;
} catch(e) {
	try {
		console.error("bigfixme-ui.x.x.x.js must be loaded after bigfixme-api.x.x.x.js");
	} catch(e) {
		alert("bigfixme-ui.x.x.x.js must be loaded after bigfixme-api.x.x.x.js");
	}
}

bigfix.ui = {};


$(function(){
	$("body").first().FrameworkHeader();		
	$("body").first().FrameworkFooter();	
	
	$("button").button();   //initialize all <button></button> objects to graphical buttons
});



(function($) {
	$.fn.FrameworkHeader = function(){
		var title = $(document).find("title").text();
		if (title == undefined) title = 'Dashboard Title';
		this.prepend('<div bigfixRole="bigfix-header">' + title + '</div>');
	
		
		$("*[bigfixRole='bigfix-header']").addClass('bigfix-header');
		
		//take current contents and wrap it in a header title section
		var title = $("*[bigfixRole='bigfix-header']").text();
		$("*[bigfixRole='bigfix-header']").html('<div bigfixRole="bigfix-header-title">' + title + '</div>');
		$("*[bigfixRole='bigfix-header-title']").addClass('bigfix-header-title');
		
		$("*[bigfixRole='bigfix-header']").append( '<div bigfixRole="bigfix-header-navigation"><button bigfixRole="refreshButton" class="btn btn-labeled btn-info">refresh</button></div>' );
		$("*[bigfixRole='bigfix-header-navigation']").addClass("bigfix-header-navigation");

		$("*[bigfixRole='refreshButton']").click(function() {
			bigfix.ui.TimeStamp(new Date());
		});

				
		//add the Progress dialog just in case
		$("*[bigfixRole='bigfix-header']").append( '<div bigfixRole="bigfix-progress-dialog" title="Loading..." style="display:none;"><center><table width="75px" height="75px" border="0"><tr><td valign="middle" align="center"><center><img src="progress32.gif" /></center></td></tr></table></center></div>');
		$("*[bigfixRole='bigfix-progress-dialog']").addClass('bigfix-progress-dialog');
		
	}
	
	//this is the function which adds our additional code for displaying links to the framework and 
	//an expandable section for more information, etc.
	$.fn.FrameworkFooter = function(){
		this.append('<div bigfixRole="bigfix-footer"></div>');
		
		
		$("*[bigfixRole='bigfix-footer']").addClass("bigfix-footer");
		//$("*[bigfixRole='bigfix-footer']").append('<div class="bigfix-footer">');
		//$("*[bigfixRole='bigfix-footer']").append('<a href="javascript.void(0)" id="bigfix-hidden-footer-link">bigfix.me Dashboard Framework v0.0.1</a>');
		//$("*[bigfixRole='bigfix-footer']").append('</div>');
		
		
		$("*[bigfixRole='bigfix-footer']").append( '<div bigfixRole="bigfix-timestamp">' + new Date() + '</div>' );
		$("*[bigfixRole='bigfix-timestamp']").addClass('bigfix-timestamp');
		
		//To Do:  expand this section by including an area that expands open to show links to videos, training, the framework itself, etc...
		var hiddenframe = '<br /><div id="bigfix-hidden-footer" style="display: none;">';
		hiddenframe += '<div id="bigfix-hidden-footer-title">Dashboard Framework v0.0.1</div>';
		hiddenframe += '<div id="bigfix-logo" style="display: none;"></div>';
		hiddenframe += '<div id="bigfix-hidden-text">';
		hiddenframe += 'We are all a part of the <a href="http://bigfix.me">bigfix.me</a> community and this dashboard was built using one of our community projects.  You are the reason our commuity is great, so please participate, share content, and vote on your fellow members content.  Together we can make BigFix better for everyone!';
		hiddenframe += '<br /><br />To learn more about this framework... <a href="http://bigfix.me/projects/details/18">click here</a>.';
		hiddenframe += '<br />If you\'re interested in sharing fixlets, analyses or relevance statements please share it using the share form at <a href="http://bigfix.me/share">http://bigfix.me/share</a>.';
		hiddenframe += '</div>';
		hiddenframe += '</div>';
				
		$("*[bigfixRole='bigfix-footer']").append(hiddenframe);
		//$("*[bigfixRole='bigfix-footer']").append('	<iframe width="560" height="315" src="//www.youtube.com/embed/jLXbgttNxvc" frameborder="0" allowfullscreen></iframe>');
		//$("*[bigfixRole='bigfix-footer']").append('<object width="560" height="315"><param name="movie" value="//www.youtube.com/v/jLXbgttNxvc?hl=en_US&amp;version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="//www.youtube.com/v/jLXbgttNxvc?hl=en_US&amp;version=3" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>');
				
		
		$('#bigfix-hidden-footer-link').click(function() {
			$('#bigfix-logo').hide();
			$('#bigfix-hidden-footer').toggle("slow").promise().done(function() {
				if ($('#bigfix-hidden-footer-link').text() == 'Close') {
					$('#bigfix-hidden-footer-link').removeClass('bigfix-hidden-footer-link');
					$('#bigfix-hidden-footer-link').text('bigfix.me Dashboard Framework v0.0.1');
					$('#bigfix-logo').hide();
				} else {
					$('#bigfix-hidden-footer-link').addClass('bigfix-hidden-footer-link');
					$('#bigfix-hidden-footer-link').text('Close');
					$('#bigfix-logo').show();
				}
				
			});
			return false;
		});		
	}
	
}(jQuery));



bigfix.ui.ChangeTitle = function(title) {
	$("*[bigfixRole='bigfix-header-title']").text(title);
}



bigfix.ui.SignDashboard = function(Name, blogUrl, bigfixmeUrl, linkedinUrl, twitterUrl) {

	var sig = '<style>';
	sig += '.signature {';
	sig += '	position:fixed; ';
	sig += '	bottom:-14px; ';
	sig += '	border:1px solid #B2D4F5;';
	sig += '	padding:3px;';
	sig += '	background-color:white;';
	sig += '	left:-143px;';
	sig += '}';
	sig += '.signature:hover {';
	sig += '    left:0px;';
	sig += '	bottom:-1px;';
	sig += '	background-color:#F5F6F7;';
	sig += '}';
	sig += '</style>';
	sig += '<div class="signature">';
	sig += '	<table cellpadding="0" cellspacing="0"><tr>';
	sig += '		<td>';
	if (blogUrl != undefined) {
		sig += '			<font size="-2">from <a href="' + blogUrl + '">' + Name + '</a></font> ';
	} else {
		sig += '			<font size="-2">from ' + Name + '</font> ';
	}
	sig += '		</td>';
	if (bigfixmeUrl != undefined) {
		sig += '		<td style="padding-left:3px;">';
		sig += '			<a href="' + bigfixmeUrl + '"><div style="display:block; width:12px; height:12px; background-image: url(socialmedia_12.png); background-repeat:no-repeat; background-position:0px 0px;" /></a> ';
		sig += '		</td>';
	}
	if (linkedinUrl != undefined) {
		sig += '		<td style="padding-left:3px;">';
		sig += '			<a href="linkedinUrl"><div style="display:block; width:12px; height:12px; background-image: url(socialmedia_12.png); background-repeat:no-repeat; background-position:-12px 0px;" /></a> ';
		sig += '		</td>';
	}
	if (twitterUrl != undefined) {
		sig += '		<td style="padding-left:3px;">';
		sig += '			<a href="' + twitterUrl + '"><div style="display:block; width:12px; height:12px; background-image: url(socialmedia_12.png); background-repeat:no-repeat; background-position:-36px 0px;" /></a> ';
		sig += '		</td>';
	}
	sig += '	</tr></table>';
	sig += '</div>';

	$("body").append(sig);
};



bigfix.ui.TimeStamp = function(newValue) {
	$("*[bigfixRole='bigfix-timestamp']").html("" + newValue);
};


bigfix.ui.ShowLoading = function() {
	$("*[bigfixRole='bigfix-progress-dialog']").dialog({
			width:'auto',
			height: 'auto',
			modal: true,
			position: "top",
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close", $(this).parent()).hide() },
			dialogClass: 'alert',
			resizable:false
		});	
};

bigfix.ui.HideLoading = function() {
	$("*[bigfixRole='bigfix-progress-dialog']").dialog('close')	
};






bigfix.ui.ShowInfo = function(title, description) {
	var diag = $("#bigfix-ui-information");
	//alert(diag.length);
	if (diag.length <= 0) {
		var stringDiv = '<div id="bigfix-ui-information">\n';
		stringDiv += '<p bigfixRole="title">' + title + '</p>\n';
		if (description != undefined) {
			stringDiv += '<p bigfixRole="description">' + description + '</p>\n';
		}
		stringDiv += '</div>\n';

		$("*[bigfixRole='bigfix-header']").append( stringDiv );
		
		$("#bigfix-ui-information").notification({type:'information'});	
	} else {
		diag.find("*[bigfixRole='title']").text(title);
		
		var descObj = diag.find("*[bigfixRole='title']");
		if (description != undefined) {
			if (descObj.length <= 0) {
				diag.append('<p bigfixRole="description">' + description + '</p>\n');
			} else {
				descObj.text(description);
			}
		} else {
			if (descObj.length <= 0) {
				diag.remove(descObj);
			}
		}	
		diag.show();
	}
};

bigfix.ui.ShowWarning = function(title, description) {
	var diag = $("#bigfix-ui-warning");
	//alert(diag.length);
	if (diag.length <= 0) {	
		var stringDiv = '<div id="bigfix-ui-warning">\n';
		stringDiv += '<p bigfixRole="title">' + title + '</p>\n';
		if (description != undefined) {
			stringDiv += '<p bigfixRole="description">' + description + '</p>\n';
		}
		stringDiv += '</div>\n';

		$("*[bigfixRole='bigfix-header']").append( stringDiv );
		
		$("#bigfix-ui-warning").notification({type:'warning'});	
	} else {
		diag.find("*[bigfixRole='title']").text(title);
		
		var descObj = diag.find("*[bigfixRole='title']");
		if (description != undefined) {
			if (descObj.length <= 0) {
				diag.append('<p bigfixRole="description">' + description + '</p>\n');
			} else {
				descObj.text(description);
			}
		} else {
			if (descObj.length <= 0) {
				diag.remove(descObj);
			}
		}	
		diag.show();
	}
};

bigfix.ui.ShowError = function(title, description) {
	var diag = $("#bigfix-ui-error");
	//alert(diag.length);
	if (diag.length <= 0) {	
		var stringDiv = '<div id="bigfix-ui-error">\n';
		stringDiv += '<p bigfixRole="title">' + title + '</p>\n';
		if (description != undefined) {
			stringDiv += '<p bigfixRole="description">' + description + '</p>\n';
		}
		stringDiv += '</div>\n';

		$("*[bigfixRole='bigfix-header']").append( stringDiv );
		
		$("#bigfix-ui-error").notification({type:'error'});	
	} else {
		diag.find("*[bigfixRole='title']").text(title);
		
		var descObj = diag.find("*[bigfixRole='title']");
		if (description != undefined) {
			if (descObj.length <= 0) {
				diag.append('<p bigfixRole="description">' + description + '</p>\n');
			} else {
				descObj.text(description);
			}
		} else {
			if (descObj.length <= 0) {
				diag.remove(descObj);
			}
		}	
		diag.show();
	}
};


/* Notification Area for Info, Warning and Error Messages */
$.widget("bigfix.notification", {
	options: {
		type: null,
		closable: true
	},
	
	_create: function() {
		var self = this;

		var $notifyText= this.element.find("*[bigfixRole='title']")
			.addClass("bigfix-notification-text")		
			.addClass("bigfix-container");
			
		var $notifyText= this.element.find("*[bigfixRole='description']")
			.addClass("bigfix-notification-description");				

		this.element.addClass('bigfix-notification')
			.addClass('bigfix-' + this.options.type);
			
		if(this.options.closable){
			var $actionContainer = 	$('<div class="yui3-g"></div>')
				.addClass("bigfix-notification-actionContainer");
			
			var $closeLinkContainer = $('<div class="yui3-u"></div>')
				.addClass("bigfix-notification-closeLinkContainer");
				
			var $closeLink = $('<span class="ui-icon ui-icon-closethick"></span>')
				.addClass("bigfix-notification-closeLink");

			$actionContainer.append($closeLinkContainer.append($closeLink));
				
			this.element.prepend($actionContainer);	
			
			$closeLink.click(function(event){
				self.close(event);
			});
		}
		
		var $img = $('<span></span>')
			.addClass("bigfix-indicator")
			.addClass("bigfix-" + this.options.type + "-indicator");
		
		this.element.prepend($img)
		
	},
	
	close: function(event){
		if (false === this._trigger( "close", event)) {
			return;
		}			
		this.element.hide();
		this._trigger( "closed", event)
	},

	open: function(){
		this.element.show();
	},
	
	destroy: function() {
		$(window).off('resize.bigfix.ui');
		
		this.element.removeClass('bigfix-dashboard-item');

		this.element.find("*[bigfixRole='header']")
			.removeClass("ui-widget-header")
			.removeClass("ui-corner-all")
			.removeClass("bigfix-dashboard-item-header");				

		var $notifyText= this.element.find("*[bigfixRole='notifyText']")
			.removeClass("bigfix-notification-text")		
			.removeClass("bigfix-container");
			
		var $notifyText= this.element.find("*[bigfixRole='description']")
			.removeClass("bigfix-notification-description");				

		this.element.removeClass('bigfix.ui-message')
			.removeClass('bigfix.ui-' + this.options.type);
			
		this.element.find('.bigfix.ui-message-actionContainer').remove();
		this.element.find('.bigfix.ui-indicator').remove();

		return $.Widget.prototype.destroy.call(this);
	}
	
});



	
	
	
	
	
	
bigfix.ui.RequireAnalyses = function(obj) {
	$("*[bigfixRole='bigfix-header']").append('<div id="bigfix-analysis-warning"></div>');
	
	$("#bigfix-analysis-warning").analysisWarning( obj )
				.bind( "analysiswarningactivate" )
				.bind( "analysiswarningactivated", function() {
					$("#show").show();
				});	
};
	
	

/* Special Notification for activating one or more analyses */
$.widget("bigfix.analysisWarning", $.bigfix.notification, {
	options: {
		analysesInfo: null,
		closable: false
	},
	
	_create: function() {
		//alert('_create');
		var self = this;
		var areAnalysesActivated = this._getAnalysesStatus();
		if (areAnalysesActivated == 'True'){
			//alert('all analyses are already activated... hide warning');
			this.element.hide();
			return;
		}
		//alert('some analyses are not activated... show warning');
		
		this.options.type = 'warning';			
					
		var links = this._getInactiveAnalysisLinks();			
		//alert('links=' + links);
		if (links != undefined) {  //if links is undefined, then silently ignore the warning request and add nothing.
			var $notifyText= this.element.find("*[bigfixRole='notifyText']");
			if(!$notifyText.length){
				var notifyText = links.length>1?bigfix.tags.analysesWarningDefault:bigfix.tags.analysisWarningDefault;
				$notifyText = $('<div bigfixRole="notifyText">' + notifyText + "</div>");
				this.element.prepend($notifyText);
			}
			
			//alert('1');
			$.bigfix.notification.prototype._create.call(this);
			//alert('3');
			var $linksContainer = $('<div></div>')
				.addClass('bigfix-notification-description');
			
			var $ul = $('<ul></ul>')
				.addClass('bigfix-analysisWarning-list');
			
			$.each(links, function(index, val) {
				var $li = $("<li></li>").append(val);
				$ul.append($li);
			});
				
			$linksContainer.append($ul);	
			this.element.append($linksContainer);
			var activate = links.length>1?bigfix.tags.analysesWarningActivate:bigfix.tags.analysisWarningActivate;
			
			var $activate = $('<button>' + activate + '</button>').button();
			$activate.click(function(event){
				if (false === self._trigger( "activate", event)) {
					return;
				}
				
				if(self._doAnalysesActivation()){
					self.element.hide();
					self._trigger( "activated", event);
				}
			});

			this.element.append($activate);	
		}
	},

	refresh: function(){
		if(this._getAnalysesStatus()){
			this.element.hide();
		} else {
			this.element.show();
		}
	},

	destroy: function() {
		var $notifyText= this.element.find("*[bigfixRole='notifyText']");
		if($notifyText.html()==bigfix.analysesWarningDefault || $notifyText.html()==bigfix.analysisWarningDefault){
			$notifyText.remove();
		}
		
		this.element.find("button.bigfix-plain-button").remove();
		this.element.find(".bigfix-notification-description").remove();

		return $.bigfix.message.prototype.destroy.call(this);
	},
	
	_getSiteRelevance: function(siteName) {
		if (siteName == undefined) siteName = bigfix.siteName;
		
		//we could be in an external site or a custom site... so compensate for both
		var siteRel = 'bes site whose (name of it contains "' + siteName + '")';
		try {
			var siteExists = bigfix.relevance.evaluate('exists ' + siteRel);
			//alert(siteExists + ' --------- ' + 'exists ' + siteRel);
			if (siteExists == 'False')
			{
				siteRel = 'bes custom site whose (name of it contains "' + siteName + '")';
				siteExists = bigfix.relevance.evaluate('exists ' + siteRel);
				//alert(siteExists + ' --------- ' + 'exists ' + siteRel);
				if (siteExists == 'False')
				{
					return undefined;
				}
			}
		} catch (e) {
			return undefined;
		}
		return siteRel;
	},
	
	_getInactiveAnalysisLinks : function (){
		var analysesInfo = this.options.analysesInfo;
		
		var relArray = new Array();
		for (var i = 0; i < analysesInfo.length; i++) {
			var ids = analysesInfo[i].ids;
			//alert('i=' + i + '     ids=' + ids.join('; '));
			var siteName = analysesInfo[i].siteName;
			var siteRel = this._getSiteRelevance(siteName);
			//alert('siteRel=' + siteRel);
			if (siteRel == undefined)
			{
				return undefined;
			}
			
			//alert('ids=' + ids.join('; '));
			var rel = '';
			if (ids !== undefined && ids !== null) {
				for (var j = 0; j < ids.length; j++) {
					var idsRel = [];
					for(var j = 0; j < ids.length; j++){
						idsRel.push('id of it = ' + ids[j]);
					}
					var rel = 'links of fixlets whose ((' + idsRel.join(' OR ') + ')'
								+ ' AND analysis flag of it and (not exists best activation of it OR not (active flag of best activation of it)))'
								+ ' of ' +  siteRel;
					relArray.push(rel);
				}
			}
		}
		//alert('relArray=' + relArray.join('; '));
		return bigfix.relevance.evaluate(relArray.join('; '));
	},

	_getAnalysesStatus : function(){
		var analysesInfo = this.options.analysesInfo;
		var relArray = new Array();
		for (var i = 0; i < analysesInfo.length; i++) {
			var ids = analysesInfo[i].ids;
			var siteName = analysesInfo[i].siteName;
			var siteRel = this._getSiteRelevance(siteName);
			var rel = '';
			if (ids !== undefined && ids !== null) {
				for (var j = 0; j < ids.length; j++) {
					rel += 'not exists fixlets whose (id of it = ' + ids[j] + ' AND (not exists best activation of it OR not active flag of best activation of it)) of ' + siteRel;
					if (j != ids.length - 1) {
						rel += ' AND ';
					}
				}
				relArray.push(rel);
			}
		}
		var rel = relArray.join(' AND ');
		//alert(rel);
		return (bigfix.relevance.evaluate(rel));
	},
	
	_doAnalysesActivation : function () {
		var analysesInfo = this.options.analysesInfo;
		var relArray = new Array();
		for (var i = 0; i < analysesInfo.length; i++) {
			var ids = analysesInfo[i].ids;
			var siteName = analysesInfo[i].siteName;
			var siteRel = this._getSiteRelevance(siteName);
			var rel = '';

			var rel = '('
						+ '(if (exists id of site of it) then id of site of it as string else id of all bes sites whose (master site flag of it) as string)'
						+ ' & ":" & id of it as string) of fixlets (' + ids.join(';') + ')'
						+ ' whose (not exists best activation of it OR not active flag of best activation of it) of ' + siteRel;
			relArray.push(rel);
		}		
		
		var a_ids = bigfix.relevance.evaluate(relArray.join('; '));
		try
		{
			return bigfix.analyses.activateAnalyses(a_ids.toArray());			
		} catch(e) {
			return bigfix.analyses.activateAnalyses(a_ids);			
		}
	}
});



