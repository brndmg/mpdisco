/*! mpdisco 2014-06-26 */
!function(a,b){if("function"==typeof define&&define.amd)define(["backbone","underscore"],function(Backbone,_){return a.Marionette=b(a,Backbone,_)});else if("undefined"!=typeof exports){var Backbone=require("backbone"),_=require("underscore");module.exports=b(a,Backbone,_)}else a.Marionette=b(a,a.Backbone,a._)}(this,function(a,Backbone,_){"use strict";function b(a,b){var c=new Error(a);throw c.name=b||"Error",c}!function(Backbone,_){var a=Backbone.ChildViewContainer;return Backbone.ChildViewContainer=function(Backbone,_){var a=function(a){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),_.each(a,this.add,this)};_.extend(a.prototype,{add:function(a,b){var c=a.cid;return this._views[c]=a,a.model&&(this._indexByModel[a.model.cid]=c),b&&(this._indexByCustom[b]=c),this._updateLength(),this},findByModel:function(a){return this.findByModelCid(a.cid)},findByModelCid:function(a){var b=this._indexByModel[a];return this.findByCid(b)},findByCustom:function(a){var b=this._indexByCustom[a];return this.findByCid(b)},findByIndex:function(a){return _.values(this._views)[a]},findByCid:function(a){return this._views[a]},remove:function(a){var b=a.cid;return a.model&&delete this._indexByModel[a.model.cid],_.any(this._indexByCustom,function(a,c){return a===b?(delete this._indexByCustom[c],!0):void 0},this),delete this._views[b],this._updateLength(),this},call:function(a){this.apply(a,_.tail(arguments))},apply:function(a,b){_.each(this._views,function(c){_.isFunction(c[a])&&c[a].apply(c,b||[])})},_updateLength:function(){this.length=_.size(this._views)}});var b=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return _.each(b,function(b){a.prototype[b]=function(){var a=_.values(this._views),c=[a].concat(_.toArray(arguments));return _[b].apply(_,c)}}),a}(Backbone,_),Backbone.ChildViewContainer.VERSION="0.1.4",Backbone.ChildViewContainer.noConflict=function(){return Backbone.ChildViewContainer=a,this},Backbone.ChildViewContainer}(Backbone,_),function(Backbone,_){var a=Backbone.Wreqr,b=Backbone.Wreqr={};return Backbone.Wreqr.VERSION="1.3.1",Backbone.Wreqr.noConflict=function(){return Backbone.Wreqr=a,this},b.Handlers=function(Backbone,_){var a=function(a){this.options=a,this._wreqrHandlers={},_.isFunction(this.initialize)&&this.initialize(a)};return a.extend=Backbone.Model.extend,_.extend(a.prototype,Backbone.Events,{setHandlers:function(a){_.each(a,function(a,b){var c=null;_.isObject(a)&&!_.isFunction(a)&&(c=a.context,a=a.callback),this.setHandler(b,a,c)},this)},setHandler:function(a,b,c){var d={callback:b,context:c};this._wreqrHandlers[a]=d,this.trigger("handler:add",a,b,c)},hasHandler:function(a){return!!this._wreqrHandlers[a]},getHandler:function(a){var b=this._wreqrHandlers[a];if(b)return function(){var a=Array.prototype.slice.apply(arguments);return b.callback.apply(b.context,a)}},removeHandler:function(a){delete this._wreqrHandlers[a]},removeAllHandlers:function(){this._wreqrHandlers={}}}),a}(Backbone,_),b.CommandStorage=function(){var a=function(a){this.options=a,this._commands={},_.isFunction(this.initialize)&&this.initialize(a)};return _.extend(a.prototype,Backbone.Events,{getCommands:function(a){var b=this._commands[a];return b||(b={command:a,instances:[]},this._commands[a]=b),b},addCommand:function(a,b){var c=this.getCommands(a);c.instances.push(b)},clearCommands:function(a){var b=this.getCommands(a);b.instances=[]}}),a}(),b.Commands=function(a){return a.Handlers.extend({storageType:a.CommandStorage,constructor:function(b){this.options=b||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this);var c=Array.prototype.slice.call(arguments);a.Handlers.prototype.constructor.apply(this,c)},execute:function(a,b){a=arguments[0],b=Array.prototype.slice.call(arguments,1),this.hasHandler(a)?this.getHandler(a).apply(this,b):this.storage.addCommand(a,b)},_executeCommands:function(a,b,c){var d=this.storage.getCommands(a);_.each(d.instances,function(a){b.apply(c,a)}),this.storage.clearCommands(a)},_initializeStorage:function(a){var b,c=a.storageType||this.storageType;b=_.isFunction(c)?new c:c,this.storage=b}})}(b),b.RequestResponse=function(a){return a.Handlers.extend({request:function(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);return this.hasHandler(a)?this.getHandler(a).apply(this,b):void 0}})}(b),b.EventAggregator=function(Backbone,_){var a=function(){};return a.extend=Backbone.Model.extend,_.extend(a.prototype,Backbone.Events),a}(Backbone,_),b.Channel=function(a){var b=function(a){this.vent=new Backbone.Wreqr.EventAggregator,this.reqres=new Backbone.Wreqr.RequestResponse,this.commands=new Backbone.Wreqr.Commands,this.channelName=a};return _.extend(b.prototype,{reset:function(){return this.vent.off(),this.vent.stopListening(),this.reqres.removeAllHandlers(),this.commands.removeAllHandlers(),this},connectEvents:function(a,b){return this._connect("vent",a,b),this},connectCommands:function(a,b){return this._connect("commands",a,b),this},connectRequests:function(a,b){return this._connect("reqres",a,b),this},_connect:function(a,b,c){if(b){c=c||this;var d="vent"===a?"on":"setHandler";_.each(b,function(b,e){this[a][d](e,_.bind(b,c))},this)}}}),b}(b),b.radio=function(a){var b=function(){this._channels={},this.vent={},this.commands={},this.reqres={},this._proxyMethods()};_.extend(b.prototype,{channel:function(a){if(!a)throw new Error("Channel must receive a name");return this._getChannel(a)},_getChannel:function(b){var c=this._channels[b];return c||(c=new a.Channel(b),this._channels[b]=c),c},_proxyMethods:function(){_.each(["vent","commands","reqres"],function(a){_.each(c[a],function(b){this[a][b]=d(this,a,b)},this)},this)}});var c={vent:["on","off","trigger","once","stopListening","listenTo","listenToOnce"],commands:["execute","setHandler","setHandlers","removeHandler","removeAllHandlers"],reqres:["request","setHandler","setHandlers","removeHandler","removeAllHandlers"]},d=function(a,b,c){return function(d){var e=a._getChannel(d)[b],f=Array.prototype.slice.call(arguments,1);return e[c].apply(e,f)}};return new b}(b),Backbone.Wreqr}(Backbone,_);var c=a.Marionette,d=Backbone.Marionette={};d.VERSION="2.0.1",d.noConflict=function(){return a.Marionette=c,this},Backbone.Marionette=d,d.Deferred=Backbone.$.Deferred;var e=Array.prototype.slice;return d.extend=Backbone.Model.extend,d.getOption=function(a,b){if(a&&b){var c;return c=a.options&&void 0!==a.options[b]?a.options[b]:a[b]}},d.proxyGetOption=function(a){return d.getOption(this,a)},d.normalizeMethods=function(a){var b={},c;return _.each(a,function(a,d){c=a,_.isFunction(c)||(c=this[c]),c&&(b[d]=c)},this),b},d.normalizeUIKeys=function(a,b){return"undefined"!=typeof a?(_.each(_.keys(a),function(c){var d=/@ui.[a-zA-Z_$0-9]*/g;c.match(d)&&(a[c.replace(d,function(a){return b[a.slice(4)]})]=a[c],delete a[c])}),a):void 0},d.actAsCollection=function(a,b){var c=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];_.each(c,function(c){a[c]=function(){var a=_.values(_.result(this,b)),d=[a].concat(_.toArray(arguments));return _[c].apply(_,d)}})},d.triggerMethod=function(){function a(a,b,c){return c.toUpperCase()}var b=/(^|:)(\w)/gi,c=function(c){var d="on"+c.replace(b,a),e=this[d],f;return _.isFunction(e)&&(f=e.apply(this,_.tail(arguments))),_.isFunction(this.trigger)&&this.trigger.apply(this,arguments),f};return c}(),d.MonitorDOMRefresh=function(a){function b(a){a._isShown=!0,d(a)}function c(a){a._isRendered=!0,d(a)}function d(a){a._isShown&&a._isRendered&&e(a)&&_.isFunction(a.triggerMethod)&&a.triggerMethod("dom:refresh")}function e(b){return a.contains(b.el)}return function(a){a.listenTo(a,"show",function(){b(a)}),a.listenTo(a,"render",function(){c(a)})}}(document.documentElement),function(a){function c(a,c,d,e){var f=e.split(/\s+/);_.each(f,function(e){var f=a[e];f||b('Method "'+e+'" was configured as an event handler, but does not exist.'),a.listenTo(c,d,f)})}function d(a,b,c,d){a.listenTo(b,c,d)}function e(a,b,c,d){var e=d.split(/\s+/);_.each(e,function(d){var e=a[d];a.stopListening(b,c,e)})}function f(a,b,c,d){a.stopListening(b,c,d)}function g(a,b,c,d,e){b&&c&&(_.isFunction(c)&&(c=c.call(a)),_.each(c,function(c,f){_.isFunction(c)?d(a,b,f,c):e(a,b,f,c)}))}a.bindEntityEvents=function(a,b,e){g(a,b,e,d,c)},a.unbindEntityEvents=function(a,b,c){g(a,b,c,f,e)},a.proxyBindEntityEvents=function(b,c){return a.bindEntityEvents(this,b,c)},a.proxyUnbindEntityEvents=function(b,c){return a.unbindEntityEvents(this,b,c)}}(d),d.Callbacks=function(){this._deferred=d.Deferred(),this._callbacks=[]},_.extend(d.Callbacks.prototype,{add:function(a,b){var c=_.result(this._deferred,"promise");this._callbacks.push({cb:a,ctx:b}),c.then(function(c){b&&(c.context=b),a.call(c.context,c.options)})},run:function(a,b){this._deferred.resolve({options:a,context:b})},reset:function(){var a=this._callbacks;this._deferred=d.Deferred(),this._callbacks=[],_.each(a,function(a){this.add(a.cb,a.ctx)},this)}}),d.Controller=function(a){this.triggerMethod=d.triggerMethod,this.options=a||{},_.isFunction(this.initialize)&&this.initialize(this.options)},d.Controller.extend=d.extend,_.extend(d.Controller.prototype,Backbone.Events,{destroy:function(){var a=Array.prototype.slice.call(arguments);this.triggerMethod.apply(this,["before:destroy"].concat(a)),this.triggerMethod.apply(this,["destroy"].concat(a)),this.stopListening(),this.off()},triggerMethod:d.triggerMethod,getOption:d.proxyGetOption}),d.Region=function(a){if(this.options=a||{},this.el=this.getOption("el"),this.el=this.el instanceof Backbone.$?this.el[0]:this.el,this.el||b('An "el" must be specified for a region.',"NoElError"),this.$el=this.getEl(this.el),this.initialize){var c=Array.prototype.slice.apply(arguments);this.initialize.apply(this,c)}},_.extend(d.Region,{buildRegion:function(a,c){var d=_.isString(a),e=_.isString(a.selector),f=_.isUndefined(a.regionClass),g=_.isFunction(a);g||d||e||b("Region must be specified as a Region class,a selector string or an object with selector property");var h,i;d&&(h=a),a.selector&&(h=a.selector,delete a.selector),g&&(i=a),!g&&f&&(i=c),a.regionClass&&(i=a.regionClass,delete a.regionClass),(d||g)&&(a={}),a.el=h;var j=new i(a);return a.parentEl&&(j.getEl=function(b){if(_.isObject(b))return Backbone.$(b);var c=a.parentEl;return _.isFunction(c)&&(c=c()),c.find(b)}),j}}),_.extend(d.Region.prototype,Backbone.Events,{show:function(a,b){this._ensureElement();var c=b||{},d=a!==this.currentView,e=!!c.preventDestroy,f=!!c.forceShow,g=!!this.currentView,h=!e&&d;h&&this.empty();var i=d||f;return i?(a.render(),g&&this.triggerMethod("before:swap",a),this.triggerMethod("before:show",a),this.triggerMethod.call(a,"before:show"),this.attachHtml(a),this.currentView=a,g&&this.triggerMethod("swap",a),this.triggerMethod("show",a),_.isFunction(a.triggerMethod)?a.triggerMethod("show"):this.triggerMethod.call(a,"show"),this):this},_ensureElement:function(){_.isObject(this.el)||(this.$el=this.getEl(this.el),this.el=this.$el[0]),this.$el&&0!==this.$el.length||b('An "el" '+this.$el.selector+" must exist in DOM")},getEl:function(a){return Backbone.$(a)},attachHtml:function(a){this.el.innerHTML="",this.el.appendChild(a.el)},empty:function(){var a=this.currentView;a&&!a.isDestroyed&&(this.triggerMethod("before:empty",a),a.destroy?a.destroy():a.remove&&a.remove(),this.triggerMethod("empty",a),delete this.currentView)},attachView:function(a){this.currentView=a},reset:function(){this.empty(),this.$el&&(this.el=this.$el.selector),delete this.$el},getOption:d.proxyGetOption,triggerMethod:d.triggerMethod}),d.Region.extend=d.extend,d.RegionManager=function(a){var b=a.Controller.extend({constructor:function(b){this._regions={},a.Controller.call(this,b)},addRegions:function(a,b){var c={};return _.each(a,function(a,d){_.isString(a)&&(a={selector:a}),a.selector&&(a=_.defaults({},a,b));var e=this.addRegion(d,a);c[d]=e},this),c},addRegion:function(b,c){var d,e=_.isObject(c),f=_.isString(c),g=!!c.selector;return d=f||e&&g?a.Region.buildRegion(c,a.Region):_.isFunction(c)?a.Region.buildRegion(c,a.Region):c,this.triggerMethod("before:add:region",b,d),this._store(b,d),this.triggerMethod("add:region",b,d),d},get:function(a){return this._regions[a]},getRegions:function(){return _.clone(this._regions)},removeRegion:function(a){var b=this._regions[a];this._remove(a,b)},removeRegions:function(){_.each(this._regions,function(a,b){this._remove(b,a)},this)},emptyRegions:function(){_.each(this._regions,function(a){a.empty()},this)},destroy:function(){this.removeRegions(),a.Controller.prototype.destroy.apply(this,arguments)},_store:function(a,b){this._regions[a]=b,this._setLength()},_remove:function(a,b){this.triggerMethod("before:remove:region",a,b),b.empty(),b.stopListening(),delete this._regions[a],this._setLength(),this.triggerMethod("remove:region",a,b)},_setLength:function(){this.length=_.size(this._regions)}});return a.actAsCollection(b.prototype,"_regions"),b}(d),d.TemplateCache=function(a){this.templateId=a},_.extend(d.TemplateCache,{templateCaches:{},get:function(a){var b=this.templateCaches[a];return b||(b=new d.TemplateCache(a),this.templateCaches[a]=b),b.load()},clear:function(){var a,b=e.call(arguments),c=b.length;if(c>0)for(a=0;c>a;a++)delete this.templateCaches[b[a]];else this.templateCaches={}}}),_.extend(d.TemplateCache.prototype,{load:function(){if(this.compiledTemplate)return this.compiledTemplate;var a=this.loadTemplate(this.templateId);return this.compiledTemplate=this.compileTemplate(a),this.compiledTemplate},loadTemplate:function(a){var c=Backbone.$(a).html();return c&&0!==c.length||b('Could not find template: "'+a+'"',"NoTemplateError"),c},compileTemplate:function(a){return _.template(a)}}),d.Renderer={render:function(a,c){a||b("Cannot render the template since its false, null or undefined.","TemplateNotFoundError");var e;return(e="function"==typeof a?a:d.TemplateCache.get(a))(c)}},d.View=Backbone.View.extend({constructor:function(a){_.bindAll(this,"render"),this.options=_.extend({},_.result(this,"options"),_.isFunction(a)?a.call(this):a),this.events=this.normalizeUIKeys(_.result(this,"events")),_.isObject(this.behaviors)&&new d.Behaviors(this),Backbone.View.apply(this,arguments),d.MonitorDOMRefresh(this),this.listenTo(this,"show",this.onShowCalled)},getTemplate:function(){return this.getOption("template")},mixinTemplateHelpers:function(a){a=a||{};var b=this.getOption("templateHelpers");return _.isFunction(b)&&(b=b.call(this)),_.extend(a,b)},normalizeUIKeys:function(a){var b=_.result(this,"ui"),c=_.result(this,"_uiBindings");return d.normalizeUIKeys(a,c||b)},configureTriggers:function(){if(this.triggers){var a={},b=this.normalizeUIKeys(_.result(this,"triggers"));return _.each(b,function(b,c){var d=_.isObject(b),e=d?b.event:b;a[c]=function(a){if(a){var c=a.preventDefault,f=a.stopPropagation,g=d?b.preventDefault:c,h=d?b.stopPropagation:f;g&&c&&c.apply(a),h&&f&&f.apply(a)}var i={view:this,model:this.model,collection:this.collection};this.triggerMethod(e,i)}},this),a}},delegateEvents:function(a){this._delegateDOMEvents(a),this.bindEntityEvents(this.model,this.getOption("modelEvents")),this.bindEntityEvents(this.collection,this.getOption("collectionEvents"))},_delegateDOMEvents:function(a){a=a||this.events,_.isFunction(a)&&(a=a.call(this)),a=this.normalizeUIKeys(a);var b={},c=_.result(this,"behaviorEvents")||{},d=this.configureTriggers();_.extend(b,c,a,d),Backbone.View.prototype.delegateEvents.call(this,b)},undelegateEvents:function(){var a=Array.prototype.slice.call(arguments);Backbone.View.prototype.undelegateEvents.apply(this,a),this.unbindEntityEvents(this.model,this.getOption("modelEvents")),this.unbindEntityEvents(this.collection,this.getOption("collectionEvents"))},onShowCalled:function(){},_ensureViewIsIntact:function(){if(this.isDestroyed){var a=new Error("Cannot use a view thats already been destroyed.");throw a.name="ViewDestroyedError",a}},destroy:function(){if(!this.isDestroyed){var a=Array.prototype.slice.call(arguments);this.triggerMethod.apply(this,["before:destroy"].concat(a)),this.isDestroyed=!0,this.triggerMethod.apply(this,["destroy"].concat(a)),this.unbindUIElements(),this.remove()}},bindUIElements:function(){if(this.ui){this._uiBindings||(this._uiBindings=this.ui);var a=_.result(this,"_uiBindings");this.ui={},_.each(_.keys(a),function(b){var c=a[b];this.ui[b]=this.$(c)},this)}},unbindUIElements:function(){this.ui&&this._uiBindings&&(_.each(this.ui,function(a,b){delete this.ui[b]},this),this.ui=this._uiBindings,delete this._uiBindings)},triggerMethod:d.triggerMethod,normalizeMethods:d.normalizeMethods,getOption:d.proxyGetOption,bindEntityEvents:d.proxyBindEntityEvents,unbindEntityEvents:d.proxyUnbindEntityEvents}),d.ItemView=d.View.extend({constructor:function(){d.View.apply(this,arguments)},serializeData:function(){var a={};return this.model?a=this.model.toJSON():this.collection&&(a={items:this.collection.toJSON()}),a},render:function(){this._ensureViewIsIntact(),this.triggerMethod("before:render",this);var a=this.serializeData();a=this.mixinTemplateHelpers(a);var b=this.getTemplate(),c=d.Renderer.render(b,a);return this.attachElContent(c),this.bindUIElements(),this.triggerMethod("render",this),this},attachElContent:function(a){return this.$el.html(a),this},destroy:function(){this.isDestroyed||d.View.prototype.destroy.apply(this,arguments)}}),d.CollectionView=d.View.extend({childViewEventPrefix:"childview",constructor:function(a){var b=a||{};this.sort=_.isUndefined(b.sort)?!0:b.sort,this._initChildViewStorage(),d.View.apply(this,arguments),this._initialEvents(),this.initRenderBuffer()},initRenderBuffer:function(){this.elBuffer=document.createDocumentFragment(),this._bufferedChildren=[]},startBuffering:function(){this.initRenderBuffer(),this.isBuffering=!0},endBuffering:function(){this.isBuffering=!1,this._triggerBeforeShowBufferedChildren(),this.attachBuffer(this,this.elBuffer),this._triggerShowBufferedChildren(),this.initRenderBuffer()},_triggerBeforeShowBufferedChildren:function(){this._isShown&&_.invoke(this._bufferedChildren,"triggerMethod","before:show")},_triggerShowBufferedChildren:function(){this._isShown&&(_.each(this._bufferedChildren,function(a){_.isFunction(a.triggerMethod)?a.triggerMethod("show"):d.triggerMethod.call(a,"show")}),this._bufferedChildren=[])},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this.render),this.sort&&this.listenTo(this.collection,"sort",this._sortViews))},_onCollectionAdd:function(a,b,c){this.destroyEmptyView();var d=this.getChildView(a),e=this.collection.indexOf(a);this.addChild(a,d,e)},_onCollectionRemove:function(a){var b=this.children.findByModel(a);this.removeChildView(b),this.checkEmpty()},onShowCalled:function(){this.children.each(function(a){_.isFunction(a.triggerMethod)?a.triggerMethod("show"):d.triggerMethod.call(a,"show")})},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._renderChildren(),this.triggerMethod("render",this),this},_sortViews:function(){var a=this.collection.find(function(a,b){var c=this.children.findByModel(a);return c&&c._index!==b},this);a&&this.render()},_renderChildren:function(){this.startBuffering(),this.destroyEmptyView(),this.destroyChildren(),this.isEmpty(this.collection)?this.showEmptyView():(this.triggerMethod("before:render:collection",this),this.showCollection(),this.triggerMethod("render:collection",this)),this.endBuffering()},showCollection:function(){var a;this.collection.each(function(b,c){a=this.getChildView(b),this.addChild(b,a,c)},this)},showEmptyView:function(){var a=this.getEmptyView();if(a&&!this._showingEmptyView){this.triggerMethod("before:render:empty"),this._showingEmptyView=!0;var b=new Backbone.Model;this.addEmptyView(b,a),this.triggerMethod("render:empty")}},destroyEmptyView:function(){this._showingEmptyView&&(this.destroyChildren(),delete this._showingEmptyView)},getEmptyView:function(){return this.getOption("emptyView")},addEmptyView:function(a,b){var c=this.getOption("emptyViewOptions")||this.getOption("childViewOptions");_.isFunction(c)&&(c=c.call(this));var d=this.buildChildView(a,b,c);this._isShown&&this.triggerMethod.call(d,"before:show"),this.children.add(d),this.renderChildView(d,-1),this._isShown&&this.triggerMethod.call(d,"show")},getChildView:function(a){var c=this.getOption("childView");return c||b('A "childView" must be specified',"NoChildViewError"),c},addChild:function(a,b,c){var d=this.getOption("childViewOptions");_.isFunction(d)&&(d=d.call(this,a,c));var e=this.buildChildView(a,b,d);return this._updateIndices(e,!0,c),this._addChildView(e,c),e},_updateIndices:function(a,b,c){this.sort&&(b?(a._index=c,this.children.each(function(b){b._index>=a._index&&b._index++})):this.children.each(function(b){b._index>=a._index&&b._index--}))},_addChildView:function(a,b){this.proxyChildEvents(a),this.triggerMethod("before:add:child",a),this.children.add(a),this.renderChildView(a,b),this._isShown&&!this.isBuffering&&(_.isFunction(a.triggerMethod)?a.triggerMethod("show"):d.triggerMethod.call(a,"show")),this.triggerMethod("add:child",a)},renderChildView:function(a,b){a.render(),this.attachHtml(this,a,b)},buildChildView:function(a,b,c){var d=_.extend({model:a},c);return new b(d)},removeChildView:function(a){a&&(this.triggerMethod("before:remove:child",a),a.destroy?a.destroy():a.remove&&a.remove(),this.stopListening(a),this.children.remove(a),this.triggerMethod("remove:child",a),this._updateIndices(a,!1))},isEmpty:function(a){return!this.collection||0===this.collection.length},checkEmpty:function(){this.isEmpty(this.collection)&&this.showEmptyView()},attachBuffer:function(a,b){a.$el.append(b)},attachHtml:function(a,b,c){a.isBuffering?(a.elBuffer.appendChild(b.el),a._bufferedChildren.push(b)):a._insertBefore(b,c)||a._insertAfter(b)},_insertBefore:function(a,b){var c,d=this.sort&&b<this.children.length-1;return d&&(c=this.children.find(function(a){return a._index===b+1})),c?(c.$el.before(a.el),!0):!1},_insertAfter:function(a){this.$el.append(a.el)},_initChildViewStorage:function(){this.children=new Backbone.ChildViewContainer},destroy:function(){this.isDestroyed||(this.triggerMethod("before:destroy:collection"),this.destroyChildren(),this.triggerMethod("destroy:collection"),d.View.prototype.destroy.apply(this,arguments))},destroyChildren:function(){this.children.each(this.removeChildView,this),this.checkEmpty()},proxyChildEvents:function(a){var b=this.getOption("childViewEventPrefix");this.listenTo(a,"all",function(){var c=Array.prototype.slice.call(arguments),d=c[0],e=this.normalizeMethods(_.result(this,"childEvents"));c[0]=b+":"+d,c.splice(1,0,a),"undefined"!=typeof e&&_.isFunction(e[d])&&e[d].apply(this,c.slice(1)),this.triggerMethod.apply(this,c)},this)}}),d.CompositeView=d.CollectionView.extend({constructor:function(){d.CollectionView.apply(this,arguments)},_initialEvents:function(){this.once("render",function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this._renderChildren),this.sort&&this.listenTo(this.collection,"sort",this._sortViews))})},getChildView:function(a){var c=this.getOption("childView")||this.constructor;return c||b('A "childView" must be specified',"NoChildViewError"),c},serializeData:function(){var a={};return this.model&&(a=this.model.toJSON()),a},render:function(){return this._ensureViewIsIntact(),this.isRendered=!0,this.resetChildViewContainer(),this.triggerMethod("before:render",this),this._renderRoot(),this._renderChildren(),this.triggerMethod("render",this),this},_renderChildren:function(){this.isRendered&&d.CollectionView.prototype._renderChildren.call(this)},_renderRoot:function(){var a={};a=this.serializeData(),a=this.mixinTemplateHelpers(a),this.triggerMethod("before:render:template");var b=this.getTemplate(),c=d.Renderer.render(b,a);this.attachElContent(c),this.bindUIElements(),this.triggerMethod("render:template")},attachElContent:function(a){return this.$el.html(a),this},attachBuffer:function(a,b){var c=this.getChildViewContainer(a);c.append(b)},_insertAfter:function(a){var b=this.getChildViewContainer(this);b.append(a.el)},getChildViewContainer:function(a){if("$childViewContainer"in a)return a.$childViewContainer;var c,e=d.getOption(a,"childViewContainer");if(e){var f=_.isFunction(e)?e.call(a):e;c="@"===f.charAt(0)&&a.ui?a.ui[f.substr(4)]:a.$(f),c.length<=0&&b('The specified "childViewContainer" was not found: '+a.childViewContainer,"ChildViewContainerMissingError")}else c=a.$el;return a.$childViewContainer=c,c},resetChildViewContainer:function(){this.$childViewContainer&&delete this.$childViewContainer}}),d.LayoutView=d.ItemView.extend({regionClass:d.Region,constructor:function(a){a=a||{},this._firstRender=!0,this._initializeRegions(a),d.ItemView.call(this,a)},render:function(){return this._ensureViewIsIntact(),this._firstRender?this._firstRender=!1:this._reInitializeRegions(),d.ItemView.prototype.render.apply(this,arguments)},destroy:function(){this.isDestroyed||(this.regionManager.destroy(),d.ItemView.prototype.destroy.apply(this,arguments))},addRegion:function(a,b){this.triggerMethod("before:region:add",a);var c={};return c[a]=b,this._buildRegions(c)[a]},addRegions:function(a){return this.regions=_.extend({},this.regions,a),this._buildRegions(a)},removeRegion:function(a){return this.triggerMethod("before:region:remove",a),delete this.regions[a],this.regionManager.removeRegion(a)},getRegion:function(a){return this.regionManager.get(a)},getRegions:function(){return this.regionManager.getRegions()},_buildRegions:function(a){var b=this,c={regionClass:this.getOption("regionClass"),parentEl:function(){return b.$el}};return this.regionManager.addRegions(a,c)},_initializeRegions:function(a){var b;this._initRegionManager(),b=_.isFunction(this.regions)?this.regions(a):this.regions||{};var c=this.getOption.call(a,"regions");_.isFunction(c)&&(c=c.call(this,a)),_.extend(b,c),this.addRegions(b)},_reInitializeRegions:function(){this.regionManager.emptyRegions(),this.regionManager.each(function(a){a.reset()})},getRegionManager:function(){return new d.RegionManager},_initRegionManager:function(){this.regionManager=this.getRegionManager(),this.listenTo(this.regionManager,"before:add:region",function(a){this.triggerMethod("before:add:region",a)}),this.listenTo(this.regionManager,"add:region",function(a,b){this[a]=b,this.triggerMethod("add:region",a,b)}),this.listenTo(this.regionManager,"before:remove:region",function(a){this.triggerMethod("before:remove:region",a)}),this.listenTo(this.regionManager,"remove:region",function(a,b){delete this[a],this.triggerMethod("remove:region",a,b)})}}),d.Behavior=function(_,Backbone){function a(a,b){this.view=b,this.defaults=_.result(this,"defaults")||{},this.options=_.extend({},this.defaults,a),this.$=function(){return this.view.$.apply(this.view,arguments)},this.initialize.apply(this,arguments)}return _.extend(a.prototype,Backbone.Events,{initialize:function(){},destroy:function(){this.stopListening()},triggerMethod:d.triggerMethod,getOption:d.proxyGetOption,bindEntityEvents:d.proxyBindEntityEvents,unbindEntityEvents:d.proxyUnbindEntityEvents}),a.extend=d.extend,a}(_,Backbone),d.Behaviors=function(a,_){function b(a,c){c=b.parseBehaviors(a,c||_.result(a,"behaviors")),b.wrap(a,c,["bindUIElements","unbindUIElements","delegateEvents","undelegateEvents","behaviorEvents","triggerMethod","setElement","destroy"])}var c={setElement:function(a,b){a.apply(this,_.tail(arguments,2)),_.each(b,function(a){a.$el=this.$el},this)},destroy:function(a,b){var c=_.tail(arguments,2);a.apply(this,c),_.invoke(b,"destroy",c)},bindUIElements:function(a,b){a.apply(this),_.invoke(b,a)},unbindUIElements:function(a,b){a.apply(this),_.invoke(b,a)},triggerMethod:function(a,b){var c=_.tail(arguments,2);a.apply(this,c),_.each(b,function(b){a.apply(b,c)})},delegateEvents:function(b,c){var d=_.tail(arguments,2);b.apply(this,d),_.each(c,function(b){a.bindEntityEvents(b,this.model,a.getOption(b,"modelEvents")),a.bindEntityEvents(b,this.collection,a.getOption(b,"collectionEvents"))},this)},undelegateEvents:function(b,c){var d=_.tail(arguments,2);b.apply(this,d),_.each(c,function(b){a.unbindEntityEvents(b,this.model,a.getOption(b,"modelEvents")),a.unbindEntityEvents(b,this.collection,a.getOption(b,"collectionEvents"))},this)},behaviorEvents:function(b,c){var d={},e=_.result(this,"ui");return _.each(c,function(b,c){var f={},g=_.clone(_.result(b,"events"))||{},h=_.result(b,"ui"),i=_.extend({},e,h);g=a.normalizeUIKeys(g,i),_.each(_.keys(g),function(a){var d=new Array(c+2).join(" "),e=a+d,h=_.isFunction(g[a])?g[a]:b[g[a]];f[e]=_.bind(h,b)}),d=_.extend(d,f)}),d}};return _.extend(b,{behaviorsLookup:function(){throw new Error("You must define where your behaviors are stored.See https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.behaviors.md#behaviorslookup")},getBehaviorClass:function(a,c){return a.behaviorClass?a.behaviorClass:_.isFunction(b.behaviorsLookup)?b.behaviorsLookup.apply(this,arguments)[c]:b.behaviorsLookup[c]},parseBehaviors:function(a,c){return _.chain(c).map(function(c,d){var e=b.getBehaviorClass(c,d),f=new e(c,a),g=b.parseBehaviors(a,_.result(f,"behaviors"));return[f].concat(g)}).flatten().value()},wrap:function(a,b,d){_.each(d,function(d){a[d]=_.partial(c[d],a[d],b)})}}),b}(d,_),d.AppRouter=Backbone.Router.extend({constructor:function(a){Backbone.Router.apply(this,arguments),this.options=a||{};var b=this.getOption("appRoutes"),c=this._getController();this.processAppRoutes(c,b),this.on("route",this._processOnRoute,this)},appRoute:function(a,b){var c=this._getController();this._addAppRoute(c,a,b)},_processOnRoute:function(a,b){var c=_.invert(this.appRoutes)[a];_.isFunction(this.onRoute)&&this.onRoute(a,c,b)},processAppRoutes:function(a,b){if(b){var c=_.keys(b).reverse();_.each(c,function(c){this._addAppRoute(a,c,b[c])},this)}},_getController:function(){return this.getOption("controller")},_addAppRoute:function(a,c,d){var e=a[d];e||b('Method "'+d+'" was not found on the controller'),this.route(c,d,_.bind(e,a))},getOption:d.proxyGetOption}),d.Application=function(a){this._initRegionManager(),this._initCallbacks=new d.Callbacks;var b=Backbone.Wreqr.radio.channel("global");this.vent=b.vent,this.commands=b.commands,this.reqres=b.reqres,this.submodules={},_.extend(this,a)},_.extend(d.Application.prototype,Backbone.Events,{execute:function(){this.commands.execute.apply(this.commands,arguments)},request:function(){return this.reqres.request.apply(this.reqres,arguments)},addInitializer:function(a){this._initCallbacks.add(a)},start:function(a){this.triggerMethod("before:start",a),this._initCallbacks.run(a,this),this.triggerMethod("start",a)},addRegions:function(a){return this._regionManager.addRegions(a)},emptyRegions:function(){this._regionManager.emptyRegions()},removeRegion:function(a){this._regionManager.removeRegion(a)},getRegion:function(a){return this._regionManager.get(a)},getRegions:function(){return this._regionManager.getRegions()},module:function(a,b){var c=d.Module.getClass(b),f=e.call(arguments);return f.unshift(this),c.create.apply(c,f)},_initRegionManager:function(){this._regionManager=new d.RegionManager,this.listenTo(this._regionManager,"before:add:region",function(a){this.triggerMethod("before:add:region",a)}),this.listenTo(this._regionManager,"add:region",function(a,b){this[a]=b,this.triggerMethod("add:region",a,b)}),this.listenTo(this._regionManager,"before:remove:region",function(a){this.triggerMethod("before:remove:region",a)}),this.listenTo(this._regionManager,"remove:region",function(a,b){delete this[a],this.triggerMethod("remove:region",a,b)
})},triggerMethod:d.triggerMethod}),d.Application.extend=d.extend,d.Module=function(a,b,c){this.moduleName=a,this.options=_.extend({},this.options,c),this.initialize=c.initialize||this.initialize,this.submodules={},this._setupInitializersAndFinalizers(),this.app=b,this.startWithParent=!0,_.isFunction(this.initialize)&&this.initialize(a,b,this.options)},d.Module.extend=d.extend,_.extend(d.Module.prototype,Backbone.Events,{initialize:function(){},addInitializer:function(a){this._initializerCallbacks.add(a)},addFinalizer:function(a){this._finalizerCallbacks.add(a)},start:function(a){this._isInitialized||(_.each(this.submodules,function(b){b.startWithParent&&b.start(a)}),this.triggerMethod("before:start",a),this._initializerCallbacks.run(a,this),this._isInitialized=!0,this.triggerMethod("start",a))},stop:function(){this._isInitialized&&(this._isInitialized=!1,this.triggerMethod("before:stop"),_.each(this.submodules,function(a){a.stop()}),this._finalizerCallbacks.run(void 0,this),this._initializerCallbacks.reset(),this._finalizerCallbacks.reset(),this.triggerMethod("stop"))},addDefinition:function(a,b){this._runModuleDefinition(a,b)},_runModuleDefinition:function(a,b){if(a){var c=_.flatten([this,this.app,Backbone,d,Backbone.$,_,b]);a.apply(this,c)}},_setupInitializersAndFinalizers:function(){this._initializerCallbacks=new d.Callbacks,this._finalizerCallbacks=new d.Callbacks},triggerMethod:d.triggerMethod}),_.extend(d.Module,{create:function(a,b,c){var d=a,f=e.call(arguments);f.splice(0,3),b=b.split(".");var g=b.length,h=[];return h[g-1]=c,_.each(b,function(b,e){var g=d;d=this._getModule(g,b,a,c),this._addModuleDefinition(g,d,h[e],f)},this),d},_getModule:function(a,b,c,d,e){var f=_.extend({},d),g=this.getClass(d),h=a[b];return h||(h=new g(b,c,f),a[b]=h,a.submodules[b]=h),h},getClass:function(a){var b=d.Module;return a?a.prototype instanceof b?a:a.moduleClass||b:b},_addModuleDefinition:function(a,b,c,d){var e=this._getDefine(c),f=this._getStartWithParent(c,b);e&&b.addDefinition(e,d),this._addStartWithParent(a,b,f)},_getStartWithParent:function(a,b){var c;return _.isFunction(a)&&a.prototype instanceof d.Module?(c=b.constructor.prototype.startWithParent,_.isUndefined(c)?!0:c):_.isObject(a)?(c=a.startWithParent,_.isUndefined(c)?!0:c):!0},_getDefine:function(a){return!_.isFunction(a)||a.prototype instanceof d.Module?_.isObject(a)?a.define:null:a},_addStartWithParent:function(a,b,c){b.startWithParent=b.startWithParent&&c,b.startWithParent&&!b.startWithParentIsConfigured&&(b.startWithParentIsConfigured=!0,a.addInitializer(function(a){b.startWithParent&&b.start(a)}))}}),d});