/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-undef: 0*/
//To use a javascript controller its name must end with .controller.js
sap.ui.define([
	"opensap/odataBasic/controller/BaseController",
	"sap/ui/model/json/JSONModel",
		'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/v2/ODataModel',
	"sap/m/ColumnListItem",
	'sap/ui/table/Row',
	"sap/ui/model/Filter",
	"sap/m/ToolbarSpacer",
	"sap/ui/model/FilterOperator",
		"./Utils"
	

], function(BaseController, JSONModel,Controller, ODataModel,ToolbarSpacer, Filter,TableRow, ColumnListItem,FilterOperator, Utils) {
	"use strict";

	return BaseController.extend("opensap.odataBasic.controller.App", {

		logout: function(){
			window.location.href = "/my/logout";
		},
			_smartFilterBar: null,
				_smartFilterBar1: null,
			
		onInit: function() {
		
			this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
			var oConfig = this.getOwnerComponent().getModel("config");
			var userName = oConfig.getProperty("/UserName");
			var bpModel = this.getOwnerComponent().getModel("bpModel");
				var dpModel = this.getOwnerComponent().getModel("dpModel");
						var syModel = this.getOwnerComponent().getModel("syModel");
				var RModel = this.getOwnerComponent().getModel("RModel");
					var ItModel = this.getOwnerComponent().getModel("ItModel");
						var baModel = this.getOwnerComponent().getModel("baModel");
			
			var oSFilter = this.getView().byId("smartFilterBar");
			
			oSFilter.setModel(bpModel);
			oSFilter.setEntitySet("Vendor");
				this._smartFilterBar = this.getView().byId("smartFilterBar");
				
					var oSFilter1 = this.getView().byId("smartFilterBar1");
			 oSFilter1.setModel(bpModel);
			oSFilter1.setEntitySet("Vendor");
				this._smartFilterBar1 = this.getView().byId("smartFilterBar1");
				
				
			var oSystem = this.getView().byId("Sysid");
			oSystem.setModel(syModel);
		//	oSystem.setEntitySet("Sysid");
			
				var oSystem1 = this.getView().byId("Release");
			oSystem1.setModel(RModel);
			
			
	
			
			var oTable = this.getView().byId("bpTable");
				var bpModel = this.getOwnerComponent().getModel("bpModel");
				
				var oTable1 = this.getView().byId("dpTable");
				var dpModel = this.getOwnerComponent().getModel("dpModel");
				
	
				 
				// 	var oTable3 = this.getView().byId("table1");
				// var ItModel = this.getOwnerComponent().getModel("ItModel");
				// oTable3.setModel(ItModel);
				//  oTable3.setEntitySet("ConfigDupCheck");
				//  oTable3.setInitiallyVisibleFields("BUS_AREA,OBJECT_ID,RULE,SEQNO,NAME");
			
					var oSystem1 = this.getView().byId("ItemsST");
			oSystem1.setModel(ItModel);
			
				var oSystem2 = this.getView().byId("table1");
			oSystem2.setModel(ItModel);
			
				var oSystem21 = this.getView().byId("table");
			oSystem21.setModel(dpModel);
		
			function fnLoadMetadata() {
				try {
					oTable.setModel(bpModel);
					oTable.setEntitySet("Vendor");
					var oMeta = bpModel.getServiceMetadata();
					var headerFields = "";
					for (var i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) {
						var property = oMeta.dataServices.schema[0].entityType[0].property[i];
						headerFields += property.name + ",";
					}
					oTable.setInitiallyVisibleFields(headerFields);
				} catch (e) {
					console.log(e.toString());
				}
			}
			
			bpModel.attachMetadataLoaded(bpModel, function() {
				fnLoadMetadata();
			});
		
			
			fnLoadMetadata();
			
			
			this.oFieldsModel = this.initFieldsModel();
			this.getView().setModel(this.oFieldsModel);
			
				sap.ui.require(["sap/ui/table/sample/TableExampleUtils"], function(TableExampleUtils) {
				var oTb = oView.byId("infobar");
				oTb.addContent(new ToolbarSpacer());
				oTb.addContent(TableExampleUtils.createInfoButton("opensap.odataBasic"));
			}, function(oError){/*ignore*/});
		},

		onExit: function() {
			this.oFieldsModel.destroy();
		},

		initFieldsModel: function() {
		var oModel = this.getOwnerComponent().getModel("ItModel");
	
		  oModel.read('/TableFields', {success: function(data) {
                console.log('success');
            },
                 error : function(event) {
                 console.log('error');
                 }
            });

			// prepare and initialize the rank property
			// oData.TableFields.forEach(function(oField) {
			// 	oField.Rank = Utils.ranking.Initial;
			// }, this);

		
			return oModel;
		},
	// 	onAssignedFiltersChanged: function(oEvent) {
	
	onAssignedFiltersChanged: function (oEvent) {
	var oSmartTable = this.byId("bpTable");
	oSmartTable.rebindTable();

},

	onBeforeRebindTable: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams");
			var oSmtFilter = this.getView().byId("smartFilterBar");
			var oComboBox = oSmtFilter.getControlByKey("RELEASE");
			var aCountKeys = oComboBox.getSelectedKeys();
			var newFilter = new Filter("RELEASE", FilterOperator.EQ, aCountKeys);
			 if (aCountKeys.length > 0) {
				mBindingParams.filters.push(newFilter);
					
		 }
			
			var mBindingParams1 = oEvent.getParameter("bindingParams");
			var oSmtFilter1 = this.getView().byId("smartFilterBar");
			var oComboBox1 = oSmtFilter1.getControlByKey("Sysid");
			var aCountKeys1 = oComboBox1.getSelectedKeys();
			var newFilter1 = new Filter("SYS_NAME", FilterOperator.EQ, aCountKeys1);
			if (aCountKeys1.length > 0) {
				mBindingParams1.filters.push(newFilter1);
			
			// }
			
			// var mBindingParams2 = oEvent.getParameter("bindingParams");
			// var oSmtFilter2 = this.getView().byId("smartFilterBar");
			// var oComboBox2 = oSmtFilter2.getControlByKey("BUS_AREA");
			// var aCountKeys2 = oComboBox2.getSelectedKeys();
			// var newFilter2 = new Filter("BUS_AREA", FilterOperator.EQ, aCountKeys2);
			// if (aCountKeys2.length > 0) {
			// 	mBindingParams2.filters.push(newFilter2);
			
			// }
			
			// var mBindingParams3 = oEvent.getParameter("bindingParams");
			// var oSmtFilter3 = this.getView().byId("smartFilterBar");
			// var oComboBox3 = oSmtFilter3.getControlByKey("OBJECT_ID");
			// var aCountKeys3 = oComboBox3.getSelectedKeys();
			// var newFilter3 = new Filter("OBJECT_ID", FilterOperator.EQ, aCountKeys3);
			// if (aCountKeys3.length > 0) {
			// 	mBindingParams3.filters.push(newFilter3);
				this.getView().byId("bpTable").setVisible(true);
				
				
				
				
				
			}
		
		},

			
			onSort: function () {
			var oSmartTable = this.getView().byId("bpTable");
			if (oSmartTable) {
				oSmartTable.openPersonalisationDialog("Sort");
			}
		},

		onFilter: function () {
			var oSmartTable = this.getView().byId("bpTable");
			if (oSmartTable) {
				oSmartTable.openPersonalisationDialog("Filter");
			}
		},

		onGroup: function () {
		// 	MessageToast.show("Not available as this feature is disabled for this app in the view.xml");
		// },
		var oSmartTable = this.getView().byId("bpTable");
			if (oSmartTable) {
				oSmartTable.openPersonalisationDialog("Group");
			}
		},
		onColumns: function () {
			var oSmartTable = this.getView().byId("bpTable");
			if (oSmartTable) {
				oSmartTable.openPersonalisationDialog("Columns");
			}
		},

	
		onErrorCall: function(oError) {
			if (oError.statusCode === 500 || oError.statusCode === 400 || oError.statusCode === "500" || oError.statusCode === "400") {
				var errorRes = JSON.parse(oError.responseText);
				if (!errorRes.error.innererror) {
					sap.m.MessageBox.alert(errorRes.error.message.value);
				} else {
					if (!errorRes.error.innererror.message) {
						sap.m.MessageBox.alert(errorRes.error.innererror.toString());
					} else {
						sap.m.MessageBox.alert(errorRes.error.innererror.message);
					}
				}
				return;
			} else {
				sap.m.MessageBox.alert(oError.response.statusText);
				return;
			}
		 },
		 	onDropAvailableFieldsTable: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}

			// reset the rank property and update the model to refresh the bindings
			var oAvailableFieldsTable = Utils.getAvailableFieldsTable(this);
			var oFieldsModel = oAvailableFieldsTable.getModel();
			oFieldsModel.setProperty("Rank", Utils.ranking.Initial, oDraggedItemContext);
		},

		 	moveToAvailableFieldsTable: function() {
		var oSelectedFieldsTable = Utils.getSelectedFieldsTable(this);
			Utils.getSelectedItemContext(oSelectedFieldsTable, function(oSelectedItemContext, iSelectedItemIndex) {
				// reset the rank property and update the model to refresh the bindings
				var oFieldsModel = oSelectedFieldsTable.getModel();
				oFieldsModel.setProperty("Rank", "Utils.ranking.Initial", oSelectedItemContext);

				// select the previously selected position
				var aItemsOfSelectedFieldsTable = oSelectedFieldsTable.getItems();
				var oPrevItem = aItemsOfSelectedFieldsTable[Math.min(iSelectedItemIndex, aItemsOfSelectedFieldsTable.length - 1)];
				if (oPrevItem) {
					oPrevItem.setSelected(true);
				}
			});
		},

	onBeforeOpenContextMenu: function(oEvent) {
			oEvent.getParameter("listItem").setSelected(true);
		},
		moveToSelectedFieldsTable: function() {
			var oAvailableFieldsTable = Utils.getAvailableFieldsTable(this);
			Utils.getSelectedItemContext(oAvailableFieldsTable, function(oAvailableItemContext, iAvailableItemIndex) {
				var oSelectedFieldsTable = Utils.getSelectedFieldsTable(this);
				var oFirstItemOfSelectedFieldsTable = oSelectedFieldsTable.getItems()[0];
				var iNewRank = Utils.ranking.Default;

				if (oFirstItemOfSelectedFieldsTable) {
					var oFirstContextOfSelectedFieldsTable = oFirstItemOfSelectedFieldsTable.getBindingContext();
					iNewRank =  Utils.ranking.Before(oFirstContextOfSelectedFieldsTable.getProperty("Rank"));
				}

				var oFieldsModel = oAvailableFieldsTable.getModel();
				oFieldsModel.setProperty("Rank", iNewRank, oAvailableItemContext);

				// select the inserted and previously selected item
				oSelectedFieldsTable.getItems()[0].setSelected(true);
				var oPrevSelectedItem = oAvailableFieldsTable.getItems()[iAvailableItemIndex];
				if (oPrevSelectedItem) {
					oPrevSelectedItem.setSelected(true);
				}
			}.bind(this));
		},
		

		onDropSelectedFieldsTable: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("draggedControl");
			var oDraggedItemContext = oDraggedItem.getBindingContext();
			if (!oDraggedItemContext) {
				return;
			}

			var oRanking = Utils.ranking;
			var iNewRank = oRanking.Default;
			var oDroppedItem = oEvent.getParameter("droppedControl");

			if (oDroppedItem instanceof ColumnListItem) {
				// get the dropped row data
				var sDropPosition = oEvent.getParameter("dropPosition");
				var oDroppedItemContext = oDroppedItem.getBindingContext();
				var iDroppedItemRank = oDroppedItemContext.getProperty("Rank");
				var oDroppedTable = oDroppedItem.getParent();
				var iDroppedItemIndex = oDroppedTable.indexOfItem(oDroppedItem);

				// find the new index of the dragged row depending on the drop position
				var iNewItemIndex = iDroppedItemIndex + (sDropPosition === "After" ? 1 : -1);
				var oNewItem = oDroppedTable.getItems()[iNewItemIndex];
				if (!oNewItem) {
					// dropped before the first row or after the last row
					iNewRank = oRanking[sDropPosition](iDroppedItemRank);
				} else {
					// dropped between first and the last row
					var oNewItemContext = oNewItem.getBindingContext();
					iNewRank = oRanking.Between(iDroppedItemRank, oNewItemContext.getProperty("Rank"));
				}
			}

			// set the rank property and update the model to refresh the bindings
			var oSelectedFieldsTable = Utils.getSelectedFieldsTable(this);
			var oFieldsModel = oSelectedFieldsTable.getModel();
			oFieldsModel.setProperty("Rank", iNewRank, oDraggedItemContext);
		},

		moveSelectedItem: function(sDirection) {
			var oSelectedFieldsTable = Utils.getSelectedFieldsTable(this);
			Utils.getSelectedItemContext(oSelectedFieldsTable, function(oSelectedItemContext, iSelectedItemIndex) {
				var iSiblingItemIndex = iSelectedItemIndex + (sDirection === "Up" ? -1 : 1);
				var oSiblingItem = oSelectedFieldsTable.getItems()[iSiblingItemIndex];
				var oSiblingItemContext = oSiblingItem.getBindingContext();
				if (!oSiblingItemContext) {
					return;
				}

				// swap the selected and the siblings rank
				var oFieldsModel = oSelectedFieldsTable.getModel();
				var iSiblingItemRank = oSiblingItemContext.getProperty("Rank");
				var iSelectedItemRank = oSelectedItemContext.getProperty("Rank");

				oFieldsModel.setProperty("Rank", iSiblingItemRank, oSelectedItemContext);
				oFieldsModel.setProperty("Rank", iSelectedItemRank, oSiblingItemContext);

				// after move select the sibling
				oSelectedFieldsTable.getItems()[iSiblingItemIndex].setSelected(true);
			});
		},
	config: {
			initialRank: 0,
			defaultRank: 1024,
			rankAlgorithm: {
				Before: function(iRank) {
					return iRank + 1024;
				},
				Between: function(iRank1, iRank2) {
					// limited to 53 rows
					return (iRank1 + iRank2) / 2;
				},
				After: function(iRank) {
					return iRank / 2;
				}
			}
		},
		
		moveUp: function() {
			this.moveSelectedItem("Up");
		},

		moveDown: function() {
			this.moveSelectedItem("Down");
		},
			onDragStart: function(oEvent) {
			var oDraggedItem = oEvent.getParameter("target");
			var oDragSession = oEvent.getParameter("dragSession");

			// keep the dragged row context for the drop action
			oDragSession.setComplexData("draggedItemContext", oDraggedItem.getBindingContext());
		},
		
		onDropTable1: function(oEvent) {
			var oDragSession = oEvent.getParameter("dragSession");
			var oDraggedItemContext = oDragSession.getComplexData("draggedItemContext");
			if (!oDraggedItemContext) {
				return;
			}

			// reset the rank property and update the model to refresh the bindings
			this.oFieldsModel.setProperty("Rank", this.config.initialRank, oDraggedItemContext);
			this.oFieldsModel.refresh(true);
		},

		moveToTable1: function() {
			this.getSelectedItemContext("table20", function(oSelectedItemContext, iSelectedItemIndex, oTable2) {
				// reset the rank property and update the model to refresh the bindings
				this.oFieldsModel.setProperty("Rank", this.config.initialRank, oSelectedItemContext);
				this.oFieldsModel.refresh(true);

				// select the previous row when there is no row to select
				var oNextContext = oTable2.getContextByIndex(iSelectedItemIndex + 1);
				if (!oNextContext) {
					oTable2.setSelectedIndex(iSelectedItemIndex - 1);
				}
			});
		},

		onDropTable2: function(oEvent) {
			var oDragSession = oEvent.getParameter("dragSession");
			var oDraggedItemContext = oDragSession.getComplexData("draggedItemContext");
			if (!oDraggedItemContext) {
				return;
			}

			var oConfig = this.config;
			var iNewRank = oConfig.defaultRank;
			var oDroppedItem = oEvent.getParameter("droppedControl");

			if (oDroppedItem && oDroppedItem instanceof ColumnListItem) {
				// get the dropped row data
				var sDropPosition = oEvent.getParameter("dropPosition");
				var oDroppedItemContext = oDroppedItem.getBindingContext();
				var iDroppedItemRank = oDroppedItemContext.getProperty("Rank");
				var iDroppedIndex = oDroppedItem.getIndex();
				var oDroppedTable = oDroppedItem.getParent();

				// find the new index of the dragged row depending on the drop position
				var iNewItemIndex = iDroppedItemIndex + (sDropPosition === "After" ? 1 : -1);
				var oNewItemContext = oDroppedTable.getContextByIndex(iNewItemIndex);
				if (!oNewItemContext) {
					// dropped before the first row or after the last row
					iNewRank = oConfig.rankAlgorithm[sDropPosition](iDroppedItemRank);
				} else {
					// dropped between first and the last row
					iNewRank = oConfig.rankAlgorithm.Between(iDroppedItemRank, oNewItemContext.getProperty("Rank"));
				}
			}

			// set the rank property and update the model to refresh the bindings
			this.oFieldsModel.setProperty("Rank", iNewRank, oDraggedItemContext);
			this.oFieldsModel.refresh(true);
		},

		moveToTable2: function() {
			this.getSelectedItemContext("table10", function(oSelectedItemContext) {
				var oTable2 = this.byId("table20");
				var oFirstItemContext = oTable2.getContextByIndex(0);

				// insert always as a first row
				var iNewRank = this.config.defaultRank;
				if (oFirstItemContext) {
					iNewRank =  this.config.rankAlgorithm.Before(oFirstItemContext.getProperty("Rank"));
				}

				this.oFieldsModel.setProperty("Rank", iNewRank, oSelectedContext);
				this.oFieldsModel.refresh(true);

				// select the inserted row
				oTable2.setSelectedIndex(0);
			});
		},

		moveSelectedRow: function(sDirection) {
			this.getSelectedItemContext("table20", function(oSelectedItemContext, iSelectedItemIndex, oTable2) {
				var iSiblingItemIndex = iSelectedItemIndex + (sDirection === "Up" ? -1 : 1);
				var oSiblingItemContext = oTable2.getContextByIndex(iSiblingItemIndex);
				if (!oSiblingItemContext) {
					return;
				}

				// swap the selected and the siblings rank
				var iSiblingItemRank = oSiblingItemContext.getProperty("Rank");
				var iSelectedItemRank = oSelectedItemContext.getProperty("Rank");
				this.oFieldsModel.setProperty("Rank", iSiblingItemRank, oSelectedItemContext);
				this.oFieldsModel.setProperty("Rank", iSelectedItemRank, oSiblingItemContext);
				this.oFieldsModel.refresh(true);

				// after move select the sibling
				oTable2.setSelectedIndex(iSiblingItemIndex);
			});
		}

	});
});

