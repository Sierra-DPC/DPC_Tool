/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";

$.import("sap.hana.democontent.epm.services", "session");
var SESSIONINFO = $.sap.hana.democontent.epm.services.session;

function validateEmail(email) {
	var re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/
function CfgCreate(param) {

	try {
		var after = param.afterTableName;

		//Get Input New Record Values
		var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
		var rs = null;
		var Config = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "Details");
		pStmt.close();
		console.log(JSON.stringify(Config));
		console.log(Config.Details[0].NAME);
		//Validate Email
	//	if (!validateEmail(Config.Details[0].Email)) {
	//		throw "Invalid email for " + Config.Details[0].FirstName +
	//			" No Way! E-Mail must be valid and " + Config.Details[0].Email + " has problems";
	//	}

		pStmt = param.connection.prepareStatement("insert into \"ConfigDupCheck\" (\"BUS_AREA\", \"OBJECT_ID\", \"RULE\", \"SEQNO\", \"NAME\") values(?,?,?,?,?)");

		pStmt.setString(1, Config.Details[0].BUS_AREA.toString());
		pStmt.setString(2, Config.Details[0].OBJECT_ID.toString());
		pStmt.setString(3, Config.Details[0].RULE.toString());
		pStmt.setString(4, Config.Details[0].SEQNO.toString());
		pStmt.setString(5, Config.Details[0].NAME.toString());

		pStmt.executeUpdate();
		pStmt.close();
		//		}
	} catch (e) {
		console.error(e);
		throw e;
	}
}