/**
 * this represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device() {
    this.available = false;
    this.platform = null;
    this.version  = null;
    this.name     = null;
    this.gap      = null;
    this.uuid     = null;
}

navigator.device = window.device = new Device();

Device.prototype.poll = function(callback) {
    var result = document.cookie;
    eval(result + (callback ? ";callback();" : ""));
    clearTimeout(this.poller);
    this.poller = setTimeout('window.device.poll();',500);
}

Device.prototype.init = function() {
    this.isIPhone = false;
    this.isIPod = false;
    this.isBlackBerry = true;
	this.poller = false;
    try {
        PhoneGap.exec("initialize");
		this.poll(function() {
			PhoneGap.available = typeof device.name == "string";
		});
		this.poller = setTimeout('window.device.poll();',500);
    } catch(e) {
        alert("[PhoneGap Error] Error initializing.");
    }
};
window.device.init();