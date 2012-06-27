'use strict'
;( function($, window, undefined) {
// TODO rewrite everything
        // Create the defaults once
        var pluginName = 'keyShortcutFormatter', document = window.document, defaults = {
            domClass : 'key-shortcut',
            delimiter : '+'
        };

        // The actual plugin constructor
        function Plugin(element, options) {
            this.element = element;

            this.options = $.extend({}, defaults, options);

            this._defaults = defaults;
            this._name = pluginName;

            this.init();
        }


        Plugin.prototype.init = function() {

            var options = this.options;
            var methods = {
                // returns all shortcuts in document
                // getShortcuts() returns [shortcuts]
                getShortcuts : function () {
                    var shortcuts = [];
                    $('.' + options.domClass).each(function () {
                        shortcuts.push($(this));
                    });
                    return shortcuts;
                },
                // returns array with keys
                // getKeys("<span class='key key-ctrl'>ctrl + 0</span>") returns [ctrl, 0]
                getKeys : function (shortcut) {
                    var words = shortcut.text().split(" "),
                    keys = [];
                    $.each(words, function (i, v) {
                        // test for delimiter
                        // continue if delimiter
                        if(v===options.delimiter) {
                            return true;
                        }
                        keys.push(v.toLowerCase());
                    })
                    return keys;
                },
                // add HTML markup to key (key)
                // enhanceKey("ctrl") = <span class='key key-ctrl'>ctrl</span>
                enhanceKey : function (key) {
                    return $('<span/>')
                        .text(key)
                        .data('key', key)
                        .addClass('key-' + key + ' key');
                },
                getDelimiter : function () {
                    return $('<span/>')
                        .text(options.delimiter)
                        .data('key', 'delimiter')
                        .addClass('key-delimiter key-' + options.delimiter);
                }
            }
            
            $('body').addClass('key-shortcut-formatter');
            $(methods.getShortcuts()).each(function () {
                var shortcut = this;
                var keys = methods.getKeys(this);
                var enhancedKeys = [];
                $.each(keys, function (i,v) {
                    enhancedKeys.push(methods.enhanceKey(v));
                })
                shortcut.empty();
                $.each(enhancedKeys, function (i,v) {
                    shortcut.append(v);
                    if(i<enhancedKeys.length-1) {
                        shortcut.append(methods.getDelimiter())
                    }
                })
            })
        };

        $.fn[pluginName] = function(options) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    }(jQuery, window)); 

jQuery(document).ready(function () {
    jQuery(document).keyShortcutFormatter();
})

