
goog.provide('consy.apps.plans.Plan');
goog.provide('consy.apps.plans.Plan.List');

goog.require('consy.apps.users.User');
goog.require('consy.frame.Model');
goog.require('consy.frame.ModelList');
goog.require('consy.utils');

/** 
* @constructor
* @param {Object} json
**/
consy.apps.plans.Plan = function(json) {
    consy.frame.Model.call(this);
    json = json || {};
    this.attendants = json['attendants'];
    this.where = json['where'];
    this.when = json['when'];
    this.what = json['what'];
    this.posted_from = json['posted_from'];
    this.location = json['location'];
    this.creator = json['creator'];
    this.broadcast = json['broadcast'];
    this.created = json['created'];
    this.revision = json['revision'];
};
goog.inherits(consy.apps.plans.Plan, consy.frame.Model);
consy.apps.plans.Plan.prototype.save = function(clbk, that) {
    that = that || this;
    if (typeof this.revision != 'undefined')
        throw ('Plan.save can only be used to create new plans (for now)');

    var json = new Object();
    json['what'] = this.what;
    json['client'] = consy.PLATFORM;
    if (this.where) json['where'] = this.where;
    if (this.when) json['when'] = this.when.UTC();
    if (this.posted_from) json['posted_from'] = this.posted_from;
    if (this.location) json['location'] = this.location;
    if (this.broadcast) json['broadcast'] = this.broadcast;
    consy.frame.apiRequest({path: '/events/', method: 'POST', body: json},
            function(resp, status) {
        if (status == 201)
            consy.log('rejoice!');
        else
            consy.log(status, resp);
        if (clbk) clbk.call(that, resp, status);
    });
};
consy.apps.plans.Plan.prototype.prepForDisplay = function() {
    this.createdDisplay = consy.utils.formatDate(this.created);
};
/**
* Get a plan from the cache or server
* @param {string} revision
* @param {function(consy.apps.plans.models.Plan, number)} callback
**/
consy.apps.plans.Plan.get = function(revision, clbk, that) {
    that = that || consy.apps.plans.Plan;
    consy.frame.apiRequest('/events/' + revision + '/', function(resp, status) {
        if (status == 200)
            clbk.call(that, new consy.apps.plans.Plan(resp['event']), status);
        else
            clbk.call(that, null, status);
    });
};
/**
* Get a list of plans from the server
* @param {function(array, number)} callback
**/
consy.apps.plans.Plan.getList = function(clbk, that) {
    that = that || consy.apps.plans.Plan;
    consy.frame.apiRequest('/events/', function(resp, status) {
        if (status == 200)
            clbk.call(that, new consy.apps.plans.Plan.List(resp['events']), status);
        else
            clbk.call(that, null, status);
    });
};



/** @constructor **/
consy.apps.plans.Plan.List = function(){
    consy.frame.ModelList.call(this);
};
goog.inherits(consy.apps.plans.Plan.List, consy.frame.ModelList);
consy.apps.plans.Plan.List.prototype.Model = consy.apps.plans.Plan;




