/*! mpdisco 2014-06-26 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function($,a){var b=0,c=Array.prototype.slice,d=$.cleanData;$.cleanData=function(a){for(var b=0,c;null!=(c=a[b]);b++)try{$(c).triggerHandler("remove")}catch(e){}d(a)},$.widget=function(a,b,c){var d,e,f,g,h={},i=a.split(".")[0];a=a.split(".")[1],d=i+"-"+a,c||(c=b,b=$.Widget),$.expr[":"][d.toLowerCase()]=function(a){return!!$.data(a,d)},$[i]=$[i]||{},e=$[i][a],f=$[i][a]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new f(a,b)},$.extend(f,e,{version:c.version,_proto:$.extend({},c),_childConstructors:[]}),g=new b,g.options=$.widget.extend({},g.options),$.each(c,function(a,c){return $.isFunction(c)?void(h[a]=function(){var d=function(){return b.prototype[a].apply(this,arguments)},e=function(c){return b.prototype[a].apply(this,c)};return function(){var a=this._super,b=this._superApply,f;return this._super=d,this._superApply=e,f=c.apply(this,arguments),this._super=a,this._superApply=b,f}}()):void(h[a]=c)}),f.prototype=$.widget.extend(g,{widgetEventPrefix:e?g.widgetEventPrefix:a},h,{constructor:f,namespace:i,widgetName:a,widgetFullName:d}),e?($.each(e._childConstructors,function(a,b){var c=b.prototype;$.widget(c.namespace+"."+c.widgetName,f,b._proto)}),delete e._childConstructors):b._childConstructors.push(f),$.widget.bridge(a,f)},$.widget.extend=function(b){for(var d=c.call(arguments,1),e=0,f=d.length,g,h;f>e;e++)for(g in d[e])h=d[e][g],d[e].hasOwnProperty(g)&&h!==a&&(b[g]=$.isPlainObject(h)?$.isPlainObject(b[g])?$.widget.extend({},b[g],h):$.widget.extend({},h):h);return b},$.widget.bridge=function(b,d){var e=d.prototype.widgetFullName||b;$.fn[b]=function(f){var g="string"==typeof f,h=c.call(arguments,1),i=this;return f=!g&&h.length?$.widget.extend.apply(null,[f].concat(h)):f,this.each(g?function(){var c,d=$.data(this,e);return d?$.isFunction(d[f])&&"_"!==f.charAt(0)?(c=d[f].apply(d,h),c!==d&&c!==a?(i=c&&c.jquery?i.pushStack(c.get()):c,!1):void 0):$.error("no such method '"+f+"' for "+b+" widget instance"):$.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+f+"'")}:function(){var a=$.data(this,e);a?a.option(f||{})._init():$.data(this,e,new d(f,this))}),i}},$.Widget=function(){},$.Widget._childConstructors=[],$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(a,c){c=$(c||this.defaultElement||this)[0],this.element=$(c),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=$.widget.extend({},this.options,this._getCreateOptions(),a),this.bindings=$(),this.hoverable=$(),this.focusable=$(),c!==this&&($.data(c,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===c&&this.destroy()}}),this.document=$(c.style?c.ownerDocument:c.document||c),this.window=$(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:$.noop,widget:function(){return this.element},option:function(b,c){var d=b,e,f,g;if(0===arguments.length)return $.widget.extend({},this.options);if("string"==typeof b)if(d={},e=b.split("."),b=e.shift(),e.length){for(f=d[b]=$.widget.extend({},this.options[b]),g=0;g<e.length-1;g++)f[e[g]]=f[e[g]]||{},f=f[e[g]];if(b=e.pop(),c===a)return f[b]===a?null:f[b];f[b]=c}else{if(c===a)return this.options[b]===a?null:this.options[b];d[b]=c}return this._setOptions(d),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(a,b,c){var d,e=this;"boolean"!=typeof a&&(c=b,b=a,a=!1),c?(b=d=$(b),this.bindings=this.bindings.add(b)):(c=b,b=this.element,d=this.widget()),$.each(c,function(c,f){function g(){return a||e.options.disabled!==!0&&!$(this).hasClass("ui-state-disabled")?("string"==typeof f?e[f]:f).apply(e,arguments):void 0}"string"!=typeof f&&(g.guid=f.guid=f.guid||g.guid||$.guid++);var h=c.match(/^(\w+)\s*(.*)$/),i=h[1]+e.eventNamespace,j=h[2];j?d.delegate(j,i,g):b.bind(i,g)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,a.unbind(b).undelegate(b)},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(a){this.hoverable=this.hoverable.add(a),this._on(a,{mouseenter:function(a){$(a.currentTarget).addClass("ui-state-hover")},mouseleave:function(a){$(a.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(a){this.focusable=this.focusable.add(a),this._on(a,{focusin:function(a){$(a.currentTarget).addClass("ui-state-focus")},focusout:function(a){$(a.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(a,b,c){var d,e,f=this.options[a];if(c=c||{},b=$.Event(b),b.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase(),b.target=this.element[0],e=b.originalEvent)for(d in e)d in b||(b[d]=e[d]);return this.element.trigger(b,c),!($.isFunction(f)&&f.apply(this.element[0],[b].concat(c))===!1||b.isDefaultPrevented())}},$.each({show:"fadeIn",hide:"fadeOut"},function(a,b){$.Widget.prototype["_"+a]=function(c,d,e){"string"==typeof d&&(d={effect:d});var f,g=d?d===!0||"number"==typeof d?b:d.effect||b:a;d=d||{},"number"==typeof d&&(d={duration:d}),f=!$.isEmptyObject(d),d.complete=e,d.delay&&c.delay(d.delay),f&&$.effects&&$.effects.effect[g]?c[a](d):g!==a&&c[g]?c[g](d.duration,d.easing,e):c.queue(function(b){$(this)[a](),e&&e.call(c[0]),b()})}})});