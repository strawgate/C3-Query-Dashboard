/**
 * (C) Copyright Moran, Inc. 2013.  All Rights Reserved.
 * 
 * bigfix Dashboard Framework v0.0.1
 *
 * This file contains the starting point for our framework. We 
 * define static values and lay the ground work before loading
 * the API and UI components.
 */

/* First we need to validate we're in an 8.0 or greater console context. */
try {
	Relevance;
} catch(e) {
	try {
		console.error('bigfix.me Dashboard Framework can only be used with 8.0+ consoles. Error: ' + e.message);
	} catch(e) {
		alert('bigfix.me Dashboard Framework can only be used with 8.0+ consoles. Error: ' + e.message);
	}
}
 
var bigfix = bigfix?bigfix:{};

bigfix.tags = {};

bigfix.tags.analysesWarningDefault = "You must activate the following analyses to view this dashboard.";
bigfix.tags.analysisWarningDefault = "You must activate the following analysis to view this dashboard.";
bigfix.tags.analysesWarningActivate = "Activate All";
bigfix.tags.analysisWarningActivate = "Activate";


