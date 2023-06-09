sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/Device"
 ], function (UIComponent, JSONModel, ResourceModel, Device) {
    "use strict";
    return UIComponent.extend("ca.bra.freestyle.Component", {

        metadata : {
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
        },

       init : function () {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
          // set data model
          var oData = {
             recipient : {
                name : "World"
             }
          };
          var oModel = new JSONModel(oData);
          this.setModel(oModel);
            // disable batch grouping for v2 API of the northwind service
            this.getModel("invoice").setUseBatch(false);

            // set device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");          
 
          // set i18n model
          var i18nModel = new ResourceModel({
             bundleName: "ca.bra.freestyle.i18n.i18n"
          });
          this.setModel(i18nModel, "i18n");

         // create the views based on the url/hash
         this.getRouter().initialize();   
                
       },
       getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

    });
 });
 