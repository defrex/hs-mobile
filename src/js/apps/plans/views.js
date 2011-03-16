
goog.provide('consy.apps.plans.PlanList');
goog.provide('consy.apps.plans.PlanNew');
goog.provide('consy.apps.plans.PlanView');

goog.require('consy.apps.plans.Plan');
goog.require('consy.apps.plans.Plan.List');
goog.require('consy.apps.plans.PlanForm');
goog.require('consy.apps.users.User');
goog.require('consy.frame.View');
goog.require('consy.tmpl.plans');
goog.require('consy.tmpl.ui.list');
goog.require('consy.ui.dialog.DateTimeDialog');
goog.require('consy.ui.dialog.Wait');

(function() {
    var Plan = consy.apps.plans.Plan,
        PlanList = consy.apps.plans.Plan.List,
        User = consy.apps.users.User,
        PlanForm = consy.apps.plans.PlanForm;

    /**
    * @constructor
    * @extends consy.frame.View
    **/
    consy.apps.plans.PlanList = function() {
        consy.frame.View.apply(this, arguments);
    };
    goog.inherits(consy.apps.plans.PlanList, consy.frame.View);
    consy.apps.plans.PlanList.prototype.template = consy.tmpl.plans.PlanList;
    consy.apps.plans.PlanList.prototype.enterDocument = function() {
        Plan.getList(function(plans) {
            if (plans instanceof PlanList) plans.each(function(rev) {
                this.doc.q('.plan-list ul').append(
                        consy.tmpl.ui.list.ListItemLoading({id: rev}));
                Plan.get(rev, function(plan) {
                    plan.prepForDisplay();
                    this.doc.q('#' + rev).html(consy.tmpl.plans.PlanListItem({
                        plan: plan,
                        creator: {
                            avatar: User.avatarUrl(plan.creator),
                            link: '/users/' + plan.creator + '/'
                        }
                    }));
                    this.prepClick();
                }, this);
            }, this);
        }, this);
    };
    consy.apps.plans.PlanList.prototype.prepClick = function() {
        this.doc.q('.plan-list li').on('click', function(e) {
            consy.controller.goTo('/plans/' + this.attr('id') + '/');
        });
    };

    /**
    * @constructor
    * @extends consy.frame.View
    **/
    consy.apps.plans.PlanView = function(revision) {
        consy.frame.View.apply(this, arguments);
        this.revision = revision;
    };
    goog.inherits(consy.apps.plans.PlanView, consy.frame.View);
    consy.apps.plans.PlanView.prototype.template = consy.tmpl.plans.PlanView;
    consy.apps.plans.PlanView.prototype.prepContext = function(clbk, that) {
        that = that || this;
        Plan.get(this.revision, function(plan) {
            plan.prepForDisplay();
            this.plan = plan;
            this.creator = {};
            this.creator.avatar = User.avatarUrl(plan.creator);
            this.creator.link = '/users/' + plan.creator + '/';
            clbk.call(that);
        }, this);
    };

    /**
    * @constructor
    * @extends consy.frame.View
    **/
    consy.apps.plans.PlanNew = function() {
        consy.frame.View.apply(this, arguments);
    };
    goog.inherits(consy.apps.plans.PlanNew, consy.frame.View);
    consy.apps.plans.PlanNew.prototype.template = consy.tmpl.plans.PlanNew;
    consy.apps.plans.PlanNew.prototype.enterDocument = function() {
        this.form = new PlanForm();
        this.doc.q('.plan-new form').on('submit', function(e) {
            e.preventDefault();
            this.submit();
        }, this);
        this.doc.q('#when').on('click', function(e) {
            e.preventDefault();
            this.whenDialog = new consy.ui.dialog.DateTimeDialog();
            this.whenDialog.render();
            this.whenDialog.addEventListener(goog.ui.Dialog.SELECT_EVENT,
                    function(e) {
                if (e.key == 'ok') {
                    this.when = this.whenDialog.date;
                    this.doc.q('#when').html(consy.utils.formatDate(this.when));
                    this.doc.q('#when').style('color', '#222');
                }
            }, false, this);
        }, this);
    };
    consy.apps.plans.PlanNew.prototype.submit = function() {
        this.form.validate(function(valid) {
            if (!valid) return this.form.displayErrors();

            var wait = new consy.ui.dialog.Wait('Creating Plan...');
            wait.display();

            var plan = new Plan();
            plan.what = form.fields.what.val();
            plan.where = form.fields.where.val();
            if (this.when) plan.when = this.when;

            plan.save(function(resp, status) {
                wait.remove();
                if (status == 201)
                    consy.controller.goTo('/plans/' + resp['revision'] + '/');
                else
                    consy.log(status, resp);
            }, this);
        }, this);
    };
})();












