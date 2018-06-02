// Initialise. If the database doesn't exist, it is created
var roster = new localStorageDB("Roster", localStorage);

// Check if the database was just created. Useful for initial database setup
if( roster.isNew() ) {
	roster.createTable("devices", ["deviceID", "type"]);

	// insert some data
	roster.insert("devices", {deviceID: 26, type: "dialysis"});
  roster.insert("devices", {deviceID: 958, type: "dialysis"});
  roster.insert("devices", {deviceID: 2651, type: "insulin pump"});
  roster.insert("devices", {deviceID: 3820, type: "dialysis"});
	roster.insert("devices", {deviceID: 6631, type: "insulin pump"});



  roster.createTable("groups", ["groupID", "name"]);

	// insert some data
	roster.insert("groups", {deviceID: 1, name: "North America"});
	roster.insert("groups", {deviceID: 2, name: "Spain"});
	roster.insert("groups", {deviceID: 3, name: "France"});
	roster.insert("groups", {deviceID: 4, name: "Portugal"});

  roster.createTable("policies", ["policyID", "name"]);

	// insert some data
	roster.insert("policies", {policyID: 1, name: "Device Policy #1"});
	roster.insert("policies", {policyID: 2, name: "Device Policy #2"});
	roster.insert("policies", {policyID: 3, name: "Device Policy #3"});

  roster.createTable("rules", ["ruleID", "name", "description"]);

	// insert some data
	roster.insert("rules", {ruleID: 1, name: "GDPR Pseudonymisation", description: "Pseudonymisation of personal data"});
	roster.insert("rules", {ruleID: 2, name: "GDPR Anonymization", description: "Anonymization of personal data"});
	roster.insert("rules", {ruleID: 3, name: "128 bit encryption ", description: "128 bit encryption of personal data"});
  roster.insert("rules", {ruleID: 4, name: "256 bit encryption", description: "256 bit encryption of personal data"});

  roster.createTable("group_membership", ["groupID", "deviceID"]);
  roster.createTable("policy_membership", ["policyID", "ruleID"]);
  roster.createTable("group_policies", ["groupID", "policyID"]);


	// commit the database to localStorage
	// all create/drop/insert/update/delete operations should be committed
	roster.commit();

  // set initial device count
  localStorage.deviceCount = roster.queryAll("devices").length;
}

if (localStorage.clickcount) {

} else {
  localStorage.clickcount = 0;
}


function checkDeviceNumber(newNum) {
  var device = roster.queryAll("devices", {
	   query: {deviceID: newNum}
  });

  if (device.length) {
    return true;
  } else {
    return false;
  }

}


function getRandomArbitrary(min, max) {
    var newNum = Math.floor(Math.random() * (max - min + 1)) + min;

    while (checkDeviceNumber(newNum)) {
      newNum = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return newNum;
}

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}


function clickCounter() {
    if(typeof(Storage) !== "undefined") {
      console.log("Code for localStorage/sessionStorage")
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "Local storage test: You have clicked the button " + localStorage.clickcount + " time(s).";
    } else {
      console.log("Sorry! No Web Storage support..")
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// document.getElementById("result").innerHTML = "Local storage test: You have clicked the button " +
// localStorage.clickcount + " time(s).";

// function displayAdminTools() {
//   $("#admin_tools").show();
// }
