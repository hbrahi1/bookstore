sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "ca.bra.freestyle",
		settings : {
			id : "freestyle"
		},
		async: true
	}).placeAt("content");
});