sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("ca.bra.freestyle.controller.App", { 
      onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
    });
 });
 