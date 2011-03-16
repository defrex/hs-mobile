function Store() {
	this.save_success = null;
	this.save_error = null;
	this.loadAll_success = null;
	this.loadAll_error = null;
	this.load_success = null;
	this.load_error = null;
	this.remove_success = null;
	this.remove_error = null;
	this.nuke_success = null;
	this.nuke_error = null;
};

Store.prototype.getAll = function(successCallback,errorCallback) {
	this.loadAll_success = successCallback;
	this.loadAll_error = errorCallback;
	PhoneGap.exec("store",["loadAll"]);
}

Store.prototype.put = function(successCallback,errorCallback,key,data) {
	this.save_success = successCallback;
	this.save_error = errorCallback;
	PhoneGap.exec("store",["save",key,data]);
}

Store.prototype.get = function(successCallback,errorCallback,key) {
	this.load_success = successCallback;
	this.load_error = errorCallback;
	PhoneGap.exec("store",["load",key]);
}

Store.prototype.remove = function(successCallback, errorCallback, key) {
	this.remove_success = successCallback;
	this.remove_error = errorCallback;
	PhoneGap.exec("store", ["remove",key]);
}
Store.prototype.nuke = function(successCallback, errorCallback) {
	this.nuke_success = successCallback;
	this.nuke_error = errorCallback;
	PhoneGap.exec("store", ["nuke"]);
}
if (typeof navigator.store == "undefined") navigator.store = new Store();
