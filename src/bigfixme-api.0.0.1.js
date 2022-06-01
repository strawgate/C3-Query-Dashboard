/**
 * (C) Copyright Moran, Inc. 2013.  All Rights Reserved.
 * 
 * bigfix Dashboard Framework v0.0.1
 *
 * This file contains the main interactions with the console.
 * Within this file you'll find functions for creating fixlets,
 * computer groups, importing and exporting content, etc.
 */

try {
	bigfix;
} catch(e) {
	try {
		console.error("bigfixme-api.x.x.x.js must be loaded after bigfixme.x.x.x.js");
	} catch(e) {
		alert("bigfixme-api.x.x.x.js must be loaded after bigfixme.x.x.x.js");
	}
}


bigfix.relevance = {};
bigfix.dashboarddata = {};
bigfix.properties = {};
bigfix.analyses = {};
bigfix.fixlets = {};
bigfix.actions = {};



bigfix.dashboardID = EvaluateRelevance('dashboard id of current wizard');
bigfix.siteName = EvaluateRelevance('name of site of current wizard');
bigfix.consoleUsername = EvaluateRelevance('name of current console user');


(function() {	

})();


	


/***********************************************/
	bigfix.replaceAll = function(find, replace, str) {
		return str.replace(new RegExp(find, 'g'), replace);
	};
	
	bigfix.GetShortDate = function() {
		//2013-09-07
		//return moment().format("YYYY-MM-DD");
		
		var year = ((new Date()).getFullYear()).toString();
		var month = ((new Date()).getMonth() + 1).toString();
		if (month.length < 2) month = '0' + month;
		var day = ((new Date()).getDate()).toString();
		if (day.length < 2) day = '0' + day;
		
		//alert(year + '-' + month + '-' + day);
		return (year + '-' + month + '-' + day);
	};

	bigfix.GetLongDate = function() {
		//Thu, 30 May 2013 23:10:47 +0000
		//return moment().format("ddd, DD MMM YYYY hh:mm:ss +0000");
		return bigfix.relevance.evaluate('now');
	};
/***********************************************/








/***********************************************/
	bigfix.dashboarddata.add = function(varName, varValue) {
		try {
			StoreSharedVariable(bigfix.dashboardID, varName, varValue);
			return true;
		} catch (e) {
			return undefined;
		}
	};

	bigfix.dashboarddata.remove = function(varName) {
		try {
			DeleteSharedVariable(bigfix.dashboardID, varName);
			return true;
		} catch (e) {
			return undefined;
		}
	};
/***********************************************/






/***********************************************/
	bigfix.relevance.evaluate = function(relevance, callbackObj) {
	
		if(callbackObj !== undefined && callbackObj !== null) {
			var results;
			
			if(callbackObj.failure !== undefined && callbackObj.failure !== null) {
				callbackObj.failure = bigfix.relevance.errorWrapper(relevance, callbackObj.failure);
			} else {
				callbackObj.failure = bigfix.relevance.errorWrapper(relevance, bigfix.relevance.defaultErrorHandler);
			}
			
			try {
				results = Relevance(relevance, callbackObj);
			} catch (e2) {
				return undefined;
			}	
			
			return results;
		} else {
			var results;
					
			try {
				results = EvaluateRelevance(relevance);
			} catch (e2) {
				return undefined;
			}	
			
			return results;
		}
	};

	bigfix.relevance.errorWrapper = function(relevance, customErrorHandler) {
		if(customErrorHandler !== undefined && customErrorHandler != null) {
			return function(errorMessage){
				customErrorHandler(relevance, new Error(errorMessage));
			};
		}
		
		return function(errorMessage){
			bigfix.relevance.defaultErrorHandler(relevance, new Error(errorMessage));
		};
	};


	bigfix.relevance.defaultErrorHandler = function(relevance, error){
		// rethrow error
		throw error;
	};


	

	bigfix.properties.add = function(propName, propRelevance) {
		try {
			var propID = this.id(propName);
			if (propID == undefined) {	//create if it doesn't already exist	
				var propXml = this.xml(propName, propRelevance);
				//alert(propXml);
				var results = ImportXML(propXml, false);
				//alert('results=' + results);
				if (results == undefined) {
					return false;  //user canceled proces
				}
				return true;  //successfully created
			} else {
				return true;  //property already created
			}		
		} catch (e) {
			return undefined;
		}
	};

	bigfix.properties.remove = function(propName) {
		try {
			var propID = this.id(propName);
			if (propID != undefined) {  //delete it only if it exists
				DeleteProperty( propID );
				return true;  //property successfully deleted
			} else {
				return true;  //property doesn't exist
			}
		} catch (e) {
			return undefined;
		}
	};
		
	bigfix.properties.xml = function(propName, propRelevance) {
		var xml = '<?xml version="1.0"?>\n';
		xml += '<BES xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation=' + '"BES.xsd"' + '>\n';
		xml += '<Property Name="' + propName + '" SkipUI="true"><![CDATA[';
		xml += propRelevance + '\n';
		//xml += 'true';
		xml += ']]></Property>\n';
		xml += '</BES>\n';
		return unescape(encodeURIComponent(xml));
	};
	
	bigfix.properties.id = function(propName) {
		var propID = bigfix.relevance.evaluate('id of bes property whose (name of it = "' + propName + '" AND not exists source analysis of it)');
		if (propID != undefined) {	
			return propID.split(',')[1].replace(' ','');
		} else {
			return undefined;
		}
	};
/***********************************************/







/***********************************************/
	bigfix.actions.start = function(actionXml, computerIDs) {
		try {
			var results = undefined;
			
			if (computerIDs !== undefined && computerIDs !== null) {
				results = ImportXML(actionXml, undefined, undefined, computerIDs);
			} else {
				results = ImportXML(actionXml);
			}
			if (results == undefined) {
				return false;  //user canceled proces
			}
			return true;  //successfully created
		} catch (e) {
			alert(e.message);
			return undefined;
		}
	};
/***********************************************/







/***********************************************/
	bigfix.analyses.isAnalysisActive = function(analysisID, siteName) {
		if (siteName == undefined) siteName = bigfix.siteName;
		return bigfix.relevance.evaluate('exists best activations whose(active flag of it) of fixlets whose(id of it = ' + analysisID + ' ) of bes sites whose(name of it = "' + siteName + '")');
	};

	bigfix.analyses.activateAnalyses = function(analysisIDs) {
		if (Object.prototype.toString.call(analysisIDs) === '[object Array]') {
			return ActivateAnalyses(analysisIDs);
		}
		
		return ActivateAnalyses(analysisIDs);
	};

	bigfix.analyses.deactivateAnalyses = function(analysisIDs) {
		if(Object.prototype.toString.call(analysisIDs) === '[object Array]') {
			return  deactivateAnalysesHook(analysisIDs);
		}
		
		return deactivateAnalysisHook(analysisIDs);
	};
	
	bigfix.analyses.add = function(analysisXml, siteName) {
		if (siteName == 'ActionSite') siteName = undefined;
		
		try {
			//alert(analysisXml);
			var results = ImportXMLToSite(analysisXml, siteName, false);
			//alert('results=' + results);
			if (results == undefined) {
				return false;  //user canceled proces
			}
			return true;  //successfully created
		} catch (e) {
			//alert('ERROR:  ' + e.message);
			return undefined;
		}
	};
	
	bigfix.analyses.remove = function(analysisName, siteName) {
		try {
			var analysisID = this.id(analysisName, siteName);
			if (analysisID != undefined) {  //delete it only if it exists
				DeleteFixlet( analysisID );
				return true;  //property successfully deleted
			} else {
				return true;  //property doesn't exist
			}
		} catch (e) {
			return undefined;
		}
	};	
	
	bigfix.analyses.applicabilityCount = function(analysisName, siteName) {
		try {
			var id = this.id(analysisName, siteName);
			if (id != undefined) {
				return bigfix.relevance.evaluate('applicable computer count of bes fixlet whose (id of it = ' + id + ')');
			} else {
				return 0; //doesn't exist... so count is always 0
			}
		} catch (e) {
			return undefined;
		}
	};
	
	bigfix.analyses.id = function(analysisName, siteName) {
		if (siteName == undefined) siteName = bigfix.siteName;		
		var rel = 'id of bes fixlet whose (name of site of it = "' + siteName + '" AND analysis flag of it AND name of it = "' + analysisName + '")';
		//alert(rel);
		var analysisID = bigfix.relevance.evaluate(rel);
		//alert(analysisID);
		if (analysisID != undefined) {	
			return analysisID;
		} else {
			return undefined;
		}
	};
/***********************************************/






/***********************************************/
	bigfix.fixlets.add = function(fixletXml, siteKey) {
		if (siteKey == 'ActionSite') siteKey = undefined;
		
		try {
			var results = ImportXMLToSite(fixletXml, siteKey, false);
			//alert('results=' + results);
			if (results == undefined) {
				return false;  //user canceled proces
			}
			return true;  //successfully created
		} catch (e) {
			alert(e.message);
			return undefined;
		}
	};

	bigfix.fixlets.remove = function(fixletName) {
		try {
			var fixletID = this.id(fixletName);
			if (fixletID != undefined) {  //delete it only if it exists
				DeleteFixlet( fixletID );
				return true;  //property successfully deleted
			} else {
				return true;  //property doesn't exist
			}
		} catch (e) {
			return undefined;
		}
	};	
	
	bigfix.fixlets.applicabilityCount = function(fixletName, siteName) {
		try {
			var id = this.id(fixletName, siteName);
			if (id != undefined) {
				return bigfix.relevance.evaluate('applicable computer count of bes fixlet whose (id of it = ' + id + ')');
			} else {
				return 0; //doesn't exist... so count is always 0
			}
		} catch (e) {
			return undefined;
		}
	};
	
	bigfix.fixlets.id = function(fixletName, siteName) {
		if (siteName == undefined) siteName = bigfix.siteName;
		var fixletID = bigfix.relevance.evaluate('id of bes fixlet whose (name of site of it = "' + siteName + '" AND (fixlet flag of it OR task flag of it) AND name of it = "' + fixletName + '")');
		if (fixletID != undefined) {	
			return fixletID;
		} else {
			return undefined;
		}
	};
/***********************************************/

	
	
	
	
	
	
	
	
	