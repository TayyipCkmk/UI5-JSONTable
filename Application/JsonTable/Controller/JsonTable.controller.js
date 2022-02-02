sap.ui.define([
  "sap/ui/core/mvc/Controller",
  'sap/m/MessageToast',
  "sap/ui/thirdparty/jquery",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment"
], 
  function (Controller, MessageToast, jquery, JSONModel, Fragment) {
  "use strict";
    return Controller.extend(
      "ui5Tutorial.Application.JsonTable.Controller.JsonTable", {
        
        onInit: function () {
          this.getView().setModel(oModel)
          var myHeaders = new Headers();
          myHeaders.append("Cookie", "__cfduid=deb8e5acdb4da306c158964a5333f68fb1616595319");

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
            .then(response => response.text())
            .then(result => {
              var parsedList = JSON.parse(result)
              oModel.setProperty("/tableList", parsedList)
            })
            .catch(error => console.log('error', error));
        },
      _getDialog: function () {
        
        if (!this._oDialog) {
          this._oDialog = sap.ui.xmlfragment("ui5Tutorial.Application.JsonDialog.Views.JsonDialog", this);
          this.getView().addDependent(this._oDialog);
        }
        return this._oDialog;
      },
      onOpenDialog: function (oEvent) {
        var sPath = oEvent.oSource.getBindingContext().sPath
        var detailBody = oModel.getProperty(sPath)
       // var detailId = this.getView().byId("detail");
       // debugger
       oModel.setProperty("/detailItem",detailBody)
        console.log(oModel.getProperty(sPath).body)
        this._getDialog().open();
      },
      onCloseDialog: function () {
        this._getDialog().close();
      }
    }
    );
  });
