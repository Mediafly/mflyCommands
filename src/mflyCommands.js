(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mflyCommands = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUserInfo() {
    return internalMethods_1.get('account');
}
exports.getUserInfo = getUserInfo;
function logout() {
    window.location.href = '/interactive-redirect/v5/account/logout';
}
exports.logout = logout;

},{"./internalMethods":16}],2:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function showSettings(x, y, width, height) {
    return internalMethods_1.showUI('app-settings', x, y, width, height);
}
exports.showSettings = showSettings;
function showUserManagement(x, y, width, height) {
    return internalMethods_1.showUI('user-management', x, y, width, height);
}
exports.showUserManagement = showUserManagement;
function showSecondScreenOptions() {
    return internalMethods_1.post('control/show-ui', { ui: 'second-screen' });
}
exports.showSecondScreenOptions = showSecondScreenOptions;
function email(id) {
    return internalMethods_1.post('control/email', { id: id });
}
exports.email = email;
function composeEmail(options) {
    return internalMethods_1.post('control/compose-email', options);
}
exports.composeEmail = composeEmail;
function showAnnotations() {
    return internalMethods_1.post('control/show-ui', { ui: 'annotations' });
}
exports.showAnnotations = showAnnotations;
function takeAndEmailScreenshot() {
    return internalMethods_1.post('control/email-screenshot');
}
exports.takeAndEmailScreenshot = takeAndEmailScreenshot;

},{"./internalMethods":16}],3:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function refresh() {
    return internalMethods_1.post('sync');
}
exports.refresh = refresh;
function getSyncStatus() {
    return internalMethods_1.get('sync', 'status');
}
exports.getSyncStatus = getSyncStatus;

},{"./internalMethods":16}],4:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getCollections() {
    return internalMethods_1.get('collections');
}
exports.getCollections = getCollections;
function getCollection(id) {
    return internalMethods_1.get("collections/" + id, 'items');
}
exports.getCollection = getCollection;
function createCollection(name) {
    return internalMethods_1.post('collections', { name: name });
}
exports.createCollection = createCollection;
function addItemToCollection(collectionId, itemId) {
    return internalMethods_1.post("collections/" + collectionId + "/items", { ids: [itemId] });
}
exports.addItemToCollection = addItemToCollection;
function removeItemFromCollection(collectionId, itemId) {
    return internalMethods_1.ddelete("collections/" + collectionId + "/items/" + itemId);
}
exports.removeItemFromCollection = removeItemFromCollection;
function deleteCollection(id, shared) {
    if (shared === void 0) { shared = false; }
    return internalMethods_1.ddelete("collections/" + id + "?shared=" + shared);
}
exports.deleteCollection = deleteCollection;
function reorderItemInCollection(collectionId, itemId, position) {
    return internalMethods_1.put("collections/" + collectionId + "/items/" + itemId + "/order?position=" + position);
}
exports.reorderItemInCollection = reorderItemInCollection;
function renameCollection(id, name) {
    return internalMethods_1.put("collections/" + id, { name: name });
}
exports.renameCollection = renameCollection;
// UI Methods
function showCollections(x, y, width, height) {
    return internalMethods_1.showUI('collections', x, y, width, height);
}
exports.showCollections = showCollections;
function showAddToCollection(x, y, width, height) {
    return internalMethods_1.showUI('add-to-collection', x, y, width, height);
}
exports.showAddToCollection = showAddToCollection;

},{"./internalMethods":16}],5:[function(require,module,exports){
"use strict";
var device_1 = require('./device');
function isUnsupported(url) {
    if (!device_1.isWeb()) {
        return false;
    }
    var unsupportedStatements = [
        '/control/',
        '/downloads',
        '/online-status',
        '/system/gps'
    ];
    return unsupportedStatements.some(function (statement) { return url.indexOf(statement) > -1; });
}
exports.isUnsupported = isUnsupported;

},{"./device":8}],6:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function showControlBars() {
    return internalMethods_1.post('control/show-ui', {
        ui: 'control-bar',
        visible: true
    });
}
exports.showControlBars = showControlBars;
function hideControlBars(x, y, width, height) {
    return internalMethods_1.post('control/show-ui', {
        ui: 'control-bar',
        visible: false
    });
}
exports.hideControlBars = hideControlBars;

},{"./internalMethods":16}],7:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getCredentials() {
    return internalMethods_1.get('credentials');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCredentials;

},{"./internalMethods":16}],8:[function(require,module,exports){
"use strict";
var developmentPrefix = 'http://localhost:8000/';
var webPrefix = '/interactive-api/v5/';
exports.deviceTypes = {
    development: 'development',
    mobile: 'mobile',
    web: 'web',
    desktop: 'desktop'
};
function isWindows8() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("msie") !== -1) {
        if (userAgent.indexOf("webview") !== -1) {
            return true;
        }
    }
    return false;
}
exports.isWindows8 = isWindows8;
function isLocalhostForDevelopment() {
    return (window.location.host.indexOf('localhost:8000') > -1);
}
exports.isLocalhostForDevelopment = isLocalhostForDevelopment;
function getDeviceType() {
    if (isLocalhostForDevelopment()) {
        return exports.deviceTypes.development;
    }
    else {
        var deviceTypeCookie = document.cookie.split(';').filter(function (c) { return c.split('=')[0].toLowerCase().trim() === 'devicetype'; });
        if (deviceTypeCookie.length > 0) {
            return deviceTypeCookie[0].split('=')[1];
        }
        else {
            return exports.deviceTypes.mobile;
        }
    }
}
exports.getDeviceType = getDeviceType;
exports.isWeb = function () { return getDeviceType() === exports.deviceTypes.web; };
exports.isDesktop = function () { return getDeviceType() === exports.deviceTypes.desktop; };
function getPrefix() {
    var deviceType = getDeviceType();
    switch (deviceType) {
        case exports.deviceTypes.development:
            return developmentPrefix;
        default:
            return webPrefix;
    }
}
exports.getPrefix = getPrefix;

},{}],9:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function showDownloader(x, y, width, height) {
    return internalMethods_1.showUI('downloads', x, y, width, height);
}
exports.showDownloader = showDownloader;
function getDownloadStatus(id) {
    return id ? internalMethods_1.get("downloads/" + id + "/status") : internalMethods_1.get('downloads/status');
}
exports.getDownloadStatus = getDownloadStatus;
function addToDownloader(id) {
    return internalMethods_1.post('downloads', { ids: [id] });
}
exports.addToDownloader = addToDownloader;
function removeFromDownloader(id) {
    return internalMethods_1.ddelete("downloads/" + id);
}
exports.removeFromDownloader = removeFromDownloader;

},{"./internalMethods":16}],10:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function sendEmail(options) {
    return internalMethods_1.post('email', options);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendEmail;

},{"./internalMethods":16}],11:[function(require,module,exports){
"use strict";
var device_1 = require('./device');
var item_1 = require('./item');
function embed(element, id, page) {
    item_1.getItem(id).then(function (i) {
        var pageArg = page ? "?page=" + page : '';
        if (device_1.isWeb()) {
            element.attr('src', i.resourceUrl + pageArg);
        }
        else {
            getResource(i.resourceUrl + pageArg).then(function () {
                return element.attr('src', i.resourceUrl + pageArg);
            });
        }
    });
}
exports.embed = embed;
function embedImage(element, id, options) {
    var params = [];
    if (typeof options != 'undefined') {
        params = [
            { name: 'position', value: options.page },
            { name: 'size', value: options.size },
            { name: 'width', value: options.width },
            { name: 'height', value: options.height },
            { name: 'maxWidth', value: options.maxWidth },
            { name: 'maxHeight', value: options.maxHeight },
            { name: 'rotate', value: options.rotate },
        ].filter(function (x) {
            return !!x.value;
        });
    }
    item_1.getItem(id).then(function (i) {
        var url = i.resourceUrl;
        if (params.length > 0) {
            url += '?' + $.param(params);
        }
        if (device_1.isWeb()) {
            element.attr('src', url);
        }
        else {
            getResource(url).then(function () {
                return element.attr('src', url);
            });
        }
    });
}
exports.embedImage = embedImage;
function getResource(url) {
    return $.get(url).then(function (data, textStatus, request) {
        // Check for retry.
        // iOS returns 202. Due to system limitations, Android returns 200 + blank response body
        if (request.status === 202 || (request.status == 200 && !request.responseText)) {
            // Suggested delay amount is set in the Retry-After header on iOS. Default to 3 seconds if not found.
            var delayFor = parseInt(request.getResponseHeader("Retry-After")) || 3;
            var deferred = $.Deferred();
            setTimeout(function () {
                getResource(url).then(function (data) { return deferred.resolve(data); });
            }, delayFor * 1000);
            return deferred.promise();
        }
        else {
            // Content retrieved. Resolve the promise.
            return data;
        }
    });
}
function getData(id) {
    return item_1.getItem(id).then(function (i) {
        return getResource(i.resourceUrl);
    });
}
exports.getData = getData;

},{"./device":8,"./item":17}],12:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function objToString(obj) {
    var result = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += key + ':' + obj[key] + ',';
        }
    }
    result.slice(0, result.length - 1);
    return result;
}
function filter(obj) {
    var Deferred = $.Deferred();
    var result = [];
    var offset = 0;
    var limit = 100;
    var getPage = function () {
        var filter = encodeURIComponent(objToString(obj));
        return internalMethods_1.get("items?filter=" + filter + "&offset=" + offset + "&limit=" + limit)
            .done(function (data) {
            result = result.concat(data);
            if (data.length < limit) {
                Deferred.resolve(result);
            }
            else {
                offset += limit;
                getPage();
            }
        }).fail(function () {
            Deferred.reject();
        });
    };
    getPage();
    return Deferred.promise();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filter;

},{"./internalMethods":16}],13:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getFolder(id) {
    return internalMethods_1.get('items', id + "/items");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolder;

},{"./internalMethods":16}],14:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getGpsCoordinates() {
    return internalMethods_1.get('system', 'gps');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGpsCoordinates;

},{"./internalMethods":16}],15:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getInteractiveInfo() {
    return internalMethods_1.get('interactive');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInteractiveInfo;

},{"./internalMethods":16}],16:[function(require,module,exports){
"use strict";
var device = require('./device');
var commandSupport_1 = require('./commandSupport');
function InteractivesInterfaceIsDefined() {
    return typeof InteractivesInterface !== 'undefined';
}
function get(func, param, expectJson) {
    if (param === void 0) { param = null; }
    if (expectJson === void 0) { expectJson = true; }
    var prefix = device.getPrefix();
    var url = prefix + func + (param === null ? '' : '/' + param);
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    var deferred = $.Deferred();
    $.ajax({
        url: url,
        success: function (data, textStatus, request) {
            // Content retrieved. Transform to JSON if supposed to.
            if (expectJson && request && request.getResponseHeader("Content-Type").indexOf("text/html") > -1) {
                // This was sent back as text/html JSON.parse it to a JSON object.
                data = JSON.parse(data);
            }
            // Resolve the promise.
            deferred.resolveWith(this, [data, request.status]);
        },
        error: function (data, status, request) {
            // Content could not be retrieved. Reject the promise.
            if (device.isWeb() && data.status === 401) {
                // Viewer does not have an authenticated session. Take user to Viewer root.
                sessionStorage.setItem('returnUrl', window.location.href);
                window.location.replace(data.responseJSON.returnUrl);
            }
            deferred.reject(this, [request, data.status]);
        }
    });
    return deferred.promise();
}
exports.get = get;
function post(func, data) {
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (InteractivesInterfaceIsDefined()) {
        var result = InteractivesInterface.post(url, JSON.stringify(data));
        var resultJSON = JSON.parse(result);
        if (resultJSON.status === 200) {
            deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
        }
        else {
            deferred.rejectWith(this, [resultJSON.data, resultJSON.status]);
        }
    }
    else {
        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (data, textStatus, request) {
                deferred.resolveWith(this, [data, request.status]);
            },
            error: function (data, status, request) {
                if (device.isWeb() && data.status === 401) {
                    // Viewer does not have an authenticated session. Take user to Viewer root.
                    sessionStorage.setItem('returnUrl', window.location.href);
                    window.location.replace(data.responseJSON.returnUrl);
                }
                deferred.reject(this, [request, data.status]);
            }
        });
    }
    return deferred.promise();
}
exports.post = post;
function ddelete(func, data) {
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (InteractivesInterfaceIsDefined()) {
        var result = InteractivesInterface.delete(url, JSON.stringify(data));
        var resultJSON = JSON.parse(result);
        deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
    }
    else {
        $.ajax({
            method: 'DELETE',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (data, textStatus, request) {
                deferred.resolveWith(this, [data, request.status]);
            },
            error: function (data, status, request) {
                if (device.isWeb() && data.status === 401) {
                    // Viewer does not have an authenticated session. Take user to Viewer root.
                    sessionStorage.setItem('returnUrl', window.location.href);
                    window.location.replace(data.responseJSON.returnUrl);
                }
                deferred.reject(this, [request, data.status]);
            }
        });
    }
    return deferred.promise();
}
exports.ddelete = ddelete;
function put(func, data) {
    if (data === void 0) { data = null; }
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (InteractivesInterfaceIsDefined()) {
        var result = InteractivesInterface.put(url, JSON.stringify(data));
        var resultJSON = JSON.parse(result);
        deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
    }
    else {
        $.ajax({
            method: 'PUT',
            data: data,
            url: url,
            success: function (data, textStatus, request) {
                deferred.resolveWith(this, [data, request.status]);
            },
            error: function (data, status, request) {
                if (device.isWeb() && data.status === 401) {
                    // Viewer does not have an authenticated session. Take user to Viewer root.
                    sessionStorage.setItem('returnUrl', window.location.href);
                    window.location.replace(data.responseJSON.returnUrl);
                }
                deferred.reject(this, [request, data.status]);
            }
        });
    }
    return deferred.promise();
}
exports.put = put;
function showUI(name, x, y, width, height) {
    return post('control/show-ui', {
        ui: name,
        position: {
            x: x,
            y: y,
            width: width,
            height: height
        }
    });
}
exports.showUI = showUI;

},{"./commandSupport":5,"./device":8}],17:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getItem(id) {
    return internalMethods_1.get('items', id);
}
exports.getItem = getItem;
function getCurrentItem() {
    return getItem('__self__');
}
exports.getCurrentItem = getCurrentItem;
function getShare(id) {
    return internalMethods_1.get('items', id + '/share');
}
exports.getShare = getShare;
function getLastViewedContent() {
    return internalMethods_1.get('items', '?list=last-viewed');
}
exports.getLastViewedContent = getLastViewedContent;
function getRecentlyCreatedContent() {
    return internalMethods_1.get('items', '?list=recently-created');
}
exports.getRecentlyCreatedContent = getRecentlyCreatedContent;

},{"./internalMethods":16}],18:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
var device_1 = require('./device');
var useLocalStorage = device_1.isWeb() || device_1.isDesktop();
function getValuesWithPrefix(prefix) {
    if (useLocalStorage) {
        return $.Deferred(function (dfd) {
            var all = {};
            for (var key in localStorage) {
                // Check if key startswith prefix
                if (key.slice(0, prefix.length) == prefix) {
                    all[key] = localStorage.getItem(key);
                }
            }
            dfd.resolveWith(this, [all, 200]);
        });
    }
    else {
        return internalMethods_1.get("info?prefix=" + prefix);
    }
}
function getAllValues() {
    if (useLocalStorage) {
        var all = {};
        for (var key in localStorage) {
            all[key] = localStorage.getItem(key);
        }
        return $.when(all);
    }
    else {
        return internalMethods_1.get('info');
    }
}
function getValues(prefix) {
    if (prefix) {
        // Get values with specified prefix
        return getValuesWithPrefix(prefix);
    }
    else {
        return getAllValues();
    }
}
exports.getValues = getValues;
function getValue(key) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    if (useLocalStorage) {
        return $.Deferred(function (dfd) {
            var value = localStorage.getItem(key);
            if (value) {
                dfd.resolveWith(this, [value, 200]);
            }
            else {
                dfd.rejectWith(this, [value, 404]);
            }
        });
    }
    else {
        return internalMethods_1.get("info", key, false);
    }
}
exports.getValue = getValue;
function putValue(key, value) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    if (useLocalStorage) {
        return $.Deferred(function (dfd) {
            localStorage.setItem(key, value);
            dfd.resolveWith(this, ['', 200]);
        });
    }
    else {
        return internalMethods_1.post("info", [{ key: key, value: value }]);
    }
}
exports.putValue = putValue;
function deleteKey(key) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    if (useLocalStorage) {
        return $.Deferred(function (dfd) {
            localStorage.removeItem(key);
            dfd.resolveWith(this, ['', 200]);
        });
    }
    else {
        return internalMethods_1.ddelete("info/" + key);
    }
}
exports.deleteKey = deleteKey;

},{"./device":8,"./internalMethods":16}],19:[function(require,module,exports){
"use strict";
var item_1 = require('./item');
var device_1 = require('./device');
function close() {
    window.location.href = '/interactive-redirect/v5/items/__self__/back';
}
exports.close = close;
function next() {
    window.location.href = '/interactive-redirect/v5/items/__self__/next';
}
exports.next = next;
function previous() {
    window.location.href = '/interactive-redirect/v5/items/__self__/previous';
}
exports.previous = previous;
function openItem(id, bookmark) {
    item_1.getItem(id).then(function (item) {
        var params = {};
        var url = item.url;
        if (device_1.isWeb() || device_1.isDesktop()) {
            params['returnurl'] = window.location.href;
        }
        if (bookmark) {
            params['bookmark'] = bookmark;
        }
        url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
        window.location.href = window.location.protocol + "//" + window.location.host + url;
    });
}
exports.openItem = openItem;
exports.open = openItem;
function openFolder(id) {
    item_1.getItem(id).then(function (item) {
        window.location.href = item.url;
    });
}
exports.openFolder = openFolder;
function goto() {
    console.error('goto method is now deprecated. Please use openItem going forward.');
}
exports.goto = goto;
function browse() {
    console.error('browse method is now deprecated. Please use openItem going forward.');
}
exports.browse = browse;

},{"./device":8,"./item":17}],20:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function addNotification(id) {
    return internalMethods_1.post("notifications/" + id);
}
exports.addNotification = addNotification;
function removeNotification(id) {
    return internalMethods_1.ddelete("notifications/" + id);
}
exports.removeNotification = removeNotification;
function getNotificationStatus(id) {
    return internalMethods_1.get("notifications/" + id);
}
exports.getNotificationStatus = getNotificationStatus;
function showNotificationManager(x, y, width, height) {
    return internalMethods_1.showUI('notifications', x, y, width, height);
}
exports.showNotificationManager = showNotificationManager;

},{"./internalMethods":16}],21:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getOnlineStatus(argument) {
    return internalMethods_1.get('system', 'online-status');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOnlineStatus;

},{"./internalMethods":16}],22:[function(require,module,exports){
"use strict";
var utils_1 = require('./utils');
function openWindow(url) {
    return window.open(url, "InteractivesWindow" + utils_1.guid());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = openWindow;

},{"./utils":29}],23:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postAction(options) {
    return internalMethods_1.post('actions', options);
}
exports.postAction = postAction;
function postPageView(id, page) {
    return internalMethods_1.post('actions', {
        type: 'document',
        id: id,
        page: page
    });
}
exports.postPageView = postPageView;

},{"./internalMethods":16}],24:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postEvent(key, properties) {
    return internalMethods_1.post("events", { key: key, properties: JSON.stringify(properties) });
}
exports.postEvent = postEvent;

},{"./internalMethods":16}],25:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function search(term, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 100; }
    var dfd1 = $.Deferred();
    var result = [];
    var obj = {
        term: term,
        offset: offset,
        limit: limit
    };
    var getPage = function () {
        var qs = $.param(obj);
        internalMethods_1.get('items?' + qs)
            .done(function (data) {
            result = result.concat(data);
            if (data.length < obj.limit) {
                dfd1.resolve(result);
            }
            else {
                obj.offset += obj.limit;
                getPage();
            }
        }).fail(function () {
            dfd1.reject();
        });
    };
    getPage();
    return dfd1.promise();
}
exports.search = search;
function showSearch(x, y, width, height) {
    return internalMethods_1.showUI('search', x, y, width, height);
}
exports.showSearch = showSearch;

},{"./internalMethods":16}],26:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getValuesWithPrefix(prefix) {
    return internalMethods_1.get("syncedinfo?prefix=" + prefix);
}
function getAllValues() {
    return internalMethods_1.get('syncedinfo');
}
function getSyncedValues(prefix) {
    if (prefix) {
        // Get values with specified prefix
        return getValuesWithPrefix(prefix);
    }
    else {
        return getAllValues();
    }
}
exports.getSyncedValues = getSyncedValues;
function getSyncedValue(key) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    return internalMethods_1.get('syncedinfo', key, false);
}
exports.getSyncedValue = getSyncedValue;
function putSyncedValue(key, value) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    return internalMethods_1.post("syncedinfo", [{ key: key, value: value }]);
}
exports.putSyncedValue = putSyncedValue;
function deleteSyncedKey(key) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    return internalMethods_1.ddelete("syncedinfo", [key]);
}
exports.deleteSyncedKey = deleteSyncedKey;

},{"./internalMethods":16}],27:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.get('system');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":16}],28:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":16}],29:[function(require,module,exports){
"use strict";
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
exports.guid = guid;

},{}],30:[function(require,module,exports){
"use strict";
var packageJson = require('../../package.json');
function version() {
    return packageJson.version;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = version;

},{"../../package.json":32}],31:[function(require,module,exports){
/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) for example, http://localhost:8000/ .
 */
"use strict";
var interactiveInfo_1 = require('./commands/interactiveInfo');
var systemInfo_1 = require('./commands/systemInfo');
var onlineStatus_1 = require('./commands/onlineStatus');
var uploadUrl_1 = require('./commands/uploadUrl');
var item = require('./commands/item');
var collections = require('./commands/collections');
var folder_1 = require('./commands/folder');
var filter_1 = require('./commands/filter');
var gpsCoordinates_1 = require('./commands/gpsCoordinates');
var search_1 = require('./commands/search');
var navigation_1 = require('./commands/navigation');
var downloader = require('./commands/downloader');
var notification = require('./commands/notification');
var accountInfo = require('./commands/accountInfo');
var localKeyValueStorage = require('./commands/localKeyValueStorage');
var syncedKeyValueStorage = require('./commands/syncedKeyValueStorage');
var applicationSync = require('./commands/applicationSync');
var navigation = require('./commands/navigation');
var appFeatures = require('./commands/appFeatures');
var controls_1 = require('./commands/controls');
var embed_1 = require('./commands/embed');
var postAction_1 = require('./commands/postAction');
var postEvent_1 = require('./commands/postEvent');
var device_1 = require('./commands/device');
var openWindow_1 = require('./commands/openWindow');
var email_1 = require('./commands/email');
var credentials_1 = require('./commands/credentials');
var version_1 = require('./commands/version');
var mflyCommands = {
    close: navigation_1.close,
    getInteractiveInfo: interactiveInfo_1.default,
    getCredentials: credentials_1.default,
    getSystemInfo: systemInfo_1.default,
    getOnlineStatus: onlineStatus_1.default,
    getGpsCoordinates: gpsCoordinates_1.default,
    getUploadUrl: uploadUrl_1.default,
    getFolder: folder_1.default,
    filter: filter_1.default,
    search: search_1.search,
    showSearch: search_1.showSearch,
    hideControlBars: controls_1.hideControlBars,
    showControlBars: controls_1.showControlBars,
    embed: embed_1.embed,
    embedImage: embed_1.embedImage,
    getData: embed_1.getData,
    getDeviceType: device_1.getDeviceType,
    getPrefix: device_1.getPrefix,
    isLocalhostForDevelopment: device_1.isLocalhostForDevelopment,
    isWindows8: device_1.isWindows8,
    openWindow: openWindow_1.default,
    postAction: postAction_1.postAction,
    postPageView: postAction_1.postPageView,
    postEvent: postEvent_1.postEvent,
    sendEmail: email_1.default,
    version: version_1.default
};
$.extend(mflyCommands, item);
$.extend(mflyCommands, collections);
$.extend(mflyCommands, downloader);
$.extend(mflyCommands, notification);
$.extend(mflyCommands, accountInfo);
$.extend(mflyCommands, localKeyValueStorage);
$.extend(mflyCommands, syncedKeyValueStorage);
$.extend(mflyCommands, applicationSync);
$.extend(mflyCommands, navigation);
$.extend(mflyCommands, appFeatures);
module.exports = mflyCommands;

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/collections":4,"./commands/controls":6,"./commands/credentials":7,"./commands/device":8,"./commands/downloader":9,"./commands/email":10,"./commands/embed":11,"./commands/filter":12,"./commands/folder":13,"./commands/gpsCoordinates":14,"./commands/interactiveInfo":15,"./commands/item":17,"./commands/localKeyValueStorage":18,"./commands/navigation":19,"./commands/notification":20,"./commands/onlineStatus":21,"./commands/openWindow":22,"./commands/postAction":23,"./commands/postEvent":24,"./commands/search":25,"./commands/syncedKeyValueStorage":26,"./commands/systemInfo":27,"./commands/uploadUrl":28,"./commands/version":30}],32:[function(require,module,exports){
module.exports={
  "name": "mfly-commands",
  "version": "2.0.0",
  "description": "mflyCommands.js for Mediafly Interactives",
  "main": "index.js",
  "scripts": {
    "clean": "rm -rf .temp src & mkdir src",
    "compile": "tsc",
    "browserify": "browserify .temp/mflyCommands.js --debug --standalone mflyCommands --outfile src/mflyCommands.js",
    "prebuild": "npm run clean",
    "build": "npm run compile && npm run browserify",
    "watch": "npm run build & chokidar mflyCommands.ts commands/**/*.ts -c 'npm run build' --polling --poll-interval 100 --verbose",
    "postinstall": "typings install & bower install"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/mediafly/mflyCommands.git"
  },
  "author": {
    "name": "Nachiket Mehta",
    "email": "nmehta@mediafly.com",
    "url": "https://github.com/mediafly"
  },
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/mediafly/mflyCommands/issues"
  },
  "homepage": "https://github.com/mediafly/mflyCommands#readme",
  "keywords": [
    "mflyCommands",
    "Mediafly",
    "Interactives"
  ],
  "dependencies": {
    "jquery": "^1.11.0"
  },
  "devDependencies": {
    "browserify": "13.1.0",
    "browserify-shim": "3.8.12",
    "chokidar-cli": "1.2.0",
    "typescript": "2.0.3"
  }
}

},{}]},{},[31])(31)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudGVtcC9jb21tYW5kcy9hY2NvdW50SW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2FwcEZlYXR1cmVzLmpzIiwiLnRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwiLnRlbXAvY29tbWFuZHMvY29sbGVjdGlvbnMuanMiLCIudGVtcC9jb21tYW5kcy9jb21tYW5kU3VwcG9ydC5qcyIsIi50ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwiLnRlbXAvY29tbWFuZHMvY3JlZGVudGlhbHMuanMiLCIudGVtcC9jb21tYW5kcy9kZXZpY2UuanMiLCIudGVtcC9jb21tYW5kcy9kb3dubG9hZGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZW1haWwuanMiLCIudGVtcC9jb21tYW5kcy9lbWJlZC5qcyIsIi50ZW1wL2NvbW1hbmRzL2ZpbHRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2ZvbGRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2dwc0Nvb3JkaW5hdGVzLmpzIiwiLnRlbXAvY29tbWFuZHMvaW50ZXJhY3RpdmVJbmZvLmpzIiwiLnRlbXAvY29tbWFuZHMvaW50ZXJuYWxNZXRob2RzLmpzIiwiLnRlbXAvY29tbWFuZHMvaXRlbS5qcyIsIi50ZW1wL2NvbW1hbmRzL2xvY2FsS2V5VmFsdWVTdG9yYWdlLmpzIiwiLnRlbXAvY29tbWFuZHMvbmF2aWdhdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL25vdGlmaWNhdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL29ubGluZVN0YXR1cy5qcyIsIi50ZW1wL2NvbW1hbmRzL29wZW5XaW5kb3cuanMiLCIudGVtcC9jb21tYW5kcy9wb3N0QWN0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvcG9zdEV2ZW50LmpzIiwiLnRlbXAvY29tbWFuZHMvc2VhcmNoLmpzIiwiLnRlbXAvY29tbWFuZHMvc3luY2VkS2V5VmFsdWVTdG9yYWdlLmpzIiwiLnRlbXAvY29tbWFuZHMvc3lzdGVtSW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL3VwbG9hZFVybC5qcyIsIi50ZW1wL2NvbW1hbmRzL3V0aWxzLmpzIiwiLnRlbXAvY29tbWFuZHMvdmVyc2lvbi5qcyIsIi50ZW1wL21mbHlDb21tYW5kcy5qcyIsInBhY2thZ2UuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2FjY291bnQnKTtcclxufVxyXG5leHBvcnRzLmdldFVzZXJJbmZvID0gZ2V0VXNlckluZm87XHJcbmZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9hY2NvdW50L2xvZ291dCc7XHJcbn1cclxuZXhwb3J0cy5sb2dvdXQgPSBsb2dvdXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93U2V0dGluZ3MoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYXBwLXNldHRpbmdzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2V0dGluZ3MgPSBzaG93U2V0dGluZ3M7XHJcbmZ1bmN0aW9uIHNob3dVc2VyTWFuYWdlbWVudCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCd1c2VyLW1hbmFnZW1lbnQnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dVc2VyTWFuYWdlbWVudCA9IHNob3dVc2VyTWFuYWdlbWVudDtcclxuZnVuY3Rpb24gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ3NlY29uZC1zY3JlZW4nIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMgPSBzaG93U2Vjb25kU2NyZWVuT3B0aW9ucztcclxuZnVuY3Rpb24gZW1haWwoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsJywgeyBpZDogaWQgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWFpbCA9IGVtYWlsO1xyXG5mdW5jdGlvbiBjb21wb3NlRW1haWwob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvY29tcG9zZS1lbWFpbCcsIG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMuY29tcG9zZUVtYWlsID0gY29tcG9zZUVtYWlsO1xyXG5mdW5jdGlvbiBzaG93QW5ub3RhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ2Fubm90YXRpb25zJyB9KTtcclxufVxyXG5leHBvcnRzLnNob3dBbm5vdGF0aW9ucyA9IHNob3dBbm5vdGF0aW9ucztcclxuZnVuY3Rpb24gdGFrZUFuZEVtYWlsU2NyZWVuc2hvdCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsLXNjcmVlbnNob3QnKTtcclxufVxyXG5leHBvcnRzLnRha2VBbmRFbWFpbFNjcmVlbnNob3QgPSB0YWtlQW5kRW1haWxTY3JlZW5zaG90O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdzeW5jJyk7XHJcbn1cclxuZXhwb3J0cy5yZWZyZXNoID0gcmVmcmVzaDtcclxuZnVuY3Rpb24gZ2V0U3luY1N0YXR1cygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmMnLCAnc3RhdHVzJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jU3RhdHVzID0gZ2V0U3luY1N0YXR1cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnY29sbGVjdGlvbnMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb25zID0gZ2V0Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJjb2xsZWN0aW9ucy9cIiArIGlkLCAnaXRlbXMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb24gPSBnZXRDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBjcmVhdGVDb2xsZWN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb2xsZWN0aW9ucycsIHsgbmFtZTogbmFtZSB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNvbGxlY3Rpb24gPSBjcmVhdGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBhZGRJdGVtVG9Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXNcIiwgeyBpZHM6IFtpdGVtSWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkSXRlbVRvQ29sbGVjdGlvbiA9IGFkZEl0ZW1Ub0NvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbiA9IHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gZGVsZXRlQ29sbGVjdGlvbihpZCwgc2hhcmVkKSB7XHJcbiAgICBpZiAoc2hhcmVkID09PSB2b2lkIDApIHsgc2hhcmVkID0gZmFsc2U7IH1cclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiY29sbGVjdGlvbnMvXCIgKyBpZCArIFwiP3NoYXJlZD1cIiArIHNoYXJlZCk7XHJcbn1cclxuZXhwb3J0cy5kZWxldGVDb2xsZWN0aW9uID0gZGVsZXRlQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gcmVvcmRlckl0ZW1JbkNvbGxlY3Rpb24oY29sbGVjdGlvbklkLCBpdGVtSWQsIHBvc2l0aW9uKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucHV0KFwiY29sbGVjdGlvbnMvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9pdGVtcy9cIiArIGl0ZW1JZCArIFwiL29yZGVyP3Bvc2l0aW9uPVwiICsgcG9zaXRpb24pO1xyXG59XHJcbmV4cG9ydHMucmVvcmRlckl0ZW1JbkNvbGxlY3Rpb24gPSByZW9yZGVySXRlbUluQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gcmVuYW1lQ29sbGVjdGlvbihpZCwgbmFtZSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnB1dChcImNvbGxlY3Rpb25zL1wiICsgaWQsIHsgbmFtZTogbmFtZSB9KTtcclxufVxyXG5leHBvcnRzLnJlbmFtZUNvbGxlY3Rpb24gPSByZW5hbWVDb2xsZWN0aW9uO1xyXG4vLyBVSSBNZXRob2RzXHJcbmZ1bmN0aW9uIHNob3dDb2xsZWN0aW9ucyh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdjb2xsZWN0aW9ucycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd0NvbGxlY3Rpb25zID0gc2hvd0NvbGxlY3Rpb25zO1xyXG5mdW5jdGlvbiBzaG93QWRkVG9Db2xsZWN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2FkZC10by1jb2xsZWN0aW9uJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93QWRkVG9Db2xsZWN0aW9uID0gc2hvd0FkZFRvQ29sbGVjdGlvbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbmZ1bmN0aW9uIGlzVW5zdXBwb3J0ZWQodXJsKSB7XHJcbiAgICBpZiAoIWRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgdW5zdXBwb3J0ZWRTdGF0ZW1lbnRzID0gW1xyXG4gICAgICAgICcvY29udHJvbC8nLFxyXG4gICAgICAgICcvZG93bmxvYWRzJyxcclxuICAgICAgICAnL29ubGluZS1zdGF0dXMnLFxyXG4gICAgICAgICcvc3lzdGVtL2dwcydcclxuICAgIF07XHJcbiAgICByZXR1cm4gdW5zdXBwb3J0ZWRTdGF0ZW1lbnRzLnNvbWUoZnVuY3Rpb24gKHN0YXRlbWVudCkgeyByZXR1cm4gdXJsLmluZGV4T2Yoc3RhdGVtZW50KSA+IC0xOyB9KTtcclxufVxyXG5leHBvcnRzLmlzVW5zdXBwb3J0ZWQgPSBpc1Vuc3VwcG9ydGVkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd0NvbnRyb2xCYXJzKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogJ2NvbnRyb2wtYmFyJyxcclxuICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnNob3dDb250cm9sQmFycyA9IHNob3dDb250cm9sQmFycztcclxuZnVuY3Rpb24gaGlkZUNvbnRyb2xCYXJzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7XHJcbiAgICAgICAgdWk6ICdjb250cm9sLWJhcicsXHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuaGlkZUNvbnRyb2xCYXJzID0gaGlkZUNvbnRyb2xCYXJzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0Q3JlZGVudGlhbHMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdjcmVkZW50aWFscycpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Q3JlZGVudGlhbHM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2ZWxvcG1lbnRQcmVmaXggPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XHJcbnZhciB3ZWJQcmVmaXggPSAnL2ludGVyYWN0aXZlLWFwaS92NS8nO1xyXG5leHBvcnRzLmRldmljZVR5cGVzID0ge1xyXG4gICAgZGV2ZWxvcG1lbnQ6ICdkZXZlbG9wbWVudCcsXHJcbiAgICBtb2JpbGU6ICdtb2JpbGUnLFxyXG4gICAgd2ViOiAnd2ViJyxcclxuICAgIGRlc2t0b3A6ICdkZXNrdG9wJ1xyXG59O1xyXG5mdW5jdGlvbiBpc1dpbmRvd3M4KCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIm1zaWVcIikgIT09IC0xKSB7XHJcbiAgICAgICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwid2Vidmlld1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNXaW5kb3dzOCA9IGlzV2luZG93czg7XHJcbmZ1bmN0aW9uIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSB7XHJcbiAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdDo4MDAwJykgPiAtMSk7XHJcbn1cclxuZXhwb3J0cy5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50ID0gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudDtcclxuZnVuY3Rpb24gZ2V0RGV2aWNlVHlwZSgpIHtcclxuICAgIGlmIChpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50KCkpIHtcclxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkZXZpY2VUeXBlQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNwbGl0KCc9JylbMF0udG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdkZXZpY2V0eXBlJzsgfSk7XHJcbiAgICAgICAgaWYgKGRldmljZVR5cGVDb29raWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlVHlwZUNvb2tpZVswXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGV2aWNlVHlwZXMubW9iaWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldERldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlO1xyXG5leHBvcnRzLmlzV2ViID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0RGV2aWNlVHlwZSgpID09PSBleHBvcnRzLmRldmljZVR5cGVzLndlYjsgfTtcclxuZXhwb3J0cy5pc0Rlc2t0b3AgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXREZXZpY2VUeXBlKCkgPT09IGV4cG9ydHMuZGV2aWNlVHlwZXMuZGVza3RvcDsgfTtcclxuZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xyXG4gICAgdmFyIGRldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGRldmljZVR5cGUpIHtcclxuICAgICAgICBjYXNlIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBkZXZlbG9wbWVudFByZWZpeDtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gd2ViUHJlZml4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0UHJlZml4ID0gZ2V0UHJlZml4O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd0Rvd25sb2FkZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnZG93bmxvYWRzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93RG93bmxvYWRlciA9IHNob3dEb3dubG9hZGVyO1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGlkID8gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiZG93bmxvYWRzL1wiICsgaWQgKyBcIi9zdGF0dXNcIikgOiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2Rvd25sb2Fkcy9zdGF0dXMnKTtcclxufVxyXG5leHBvcnRzLmdldERvd25sb2FkU3RhdHVzID0gZ2V0RG93bmxvYWRTdGF0dXM7XHJcbmZ1bmN0aW9uIGFkZFRvRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2Rvd25sb2FkcycsIHsgaWRzOiBbaWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkVG9Eb3dubG9hZGVyID0gYWRkVG9Eb3dubG9hZGVyO1xyXG5mdW5jdGlvbiByZW1vdmVGcm9tRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJkb3dubG9hZHMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVGcm9tRG93bmxvYWRlciA9IHJlbW92ZUZyb21Eb3dubG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2VuZEVtYWlsKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdlbWFpbCcsIG9wdGlvbnMpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gc2VuZEVtYWlsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxudmFyIGl0ZW1fMSA9IHJlcXVpcmUoJy4vaXRlbScpO1xyXG5mdW5jdGlvbiBlbWJlZChlbGVtZW50LCBpZCwgcGFnZSkge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgcGFnZUFyZyA9IHBhZ2UgPyBcIj9wYWdlPVwiICsgcGFnZSA6ICcnO1xyXG4gICAgICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgaS5yZXNvdXJjZVVybCArIHBhZ2VBcmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UmVzb3VyY2UoaS5yZXNvdXJjZVVybCArIHBhZ2VBcmcpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0cignc3JjJywgaS5yZXNvdXJjZVVybCArIHBhZ2VBcmcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmVtYmVkID0gZW1iZWQ7XHJcbmZ1bmN0aW9uIGVtYmVkSW1hZ2UoZWxlbWVudCwgaWQsIG9wdGlvbnMpIHtcclxuICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHBhcmFtcyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogb3B0aW9ucy5wYWdlIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3NpemUnLCB2YWx1ZTogb3B0aW9ucy5zaXplIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3dpZHRoJywgdmFsdWU6IG9wdGlvbnMud2lkdGggfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnaGVpZ2h0JywgdmFsdWU6IG9wdGlvbnMuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heFdpZHRoJywgdmFsdWU6IG9wdGlvbnMubWF4V2lkdGggfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4SGVpZ2h0JywgdmFsdWU6IG9wdGlvbnMubWF4SGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3JvdGF0ZScsIHZhbHVlOiBvcHRpb25zLnJvdGF0ZSB9LFxyXG4gICAgICAgIF0uZmlsdGVyKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIXgudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHZhciB1cmwgPSBpLnJlc291cmNlVXJsO1xyXG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB1cmwgKz0gJz8nICsgJC5wYXJhbShwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmF0dHIoJ3NyYycsIHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRSZXNvdXJjZSh1cmwpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0cignc3JjJywgdXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWJlZEltYWdlID0gZW1iZWRJbWFnZTtcclxuZnVuY3Rpb24gZ2V0UmVzb3VyY2UodXJsKSB7XHJcbiAgICByZXR1cm4gJC5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJldHJ5LlxyXG4gICAgICAgIC8vIGlPUyByZXR1cm5zIDIwMi4gRHVlIHRvIHN5c3RlbSBsaW1pdGF0aW9ucywgQW5kcm9pZCByZXR1cm5zIDIwMCArIGJsYW5rIHJlc3BvbnNlIGJvZHlcclxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMiB8fCAocmVxdWVzdC5zdGF0dXMgPT0gMjAwICYmICFyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpIHtcclxuICAgICAgICAgICAgLy8gU3VnZ2VzdGVkIGRlbGF5IGFtb3VudCBpcyBzZXQgaW4gdGhlIFJldHJ5LUFmdGVyIGhlYWRlciBvbiBpT1MuIERlZmF1bHQgdG8gMyBzZWNvbmRzIGlmIG5vdCBmb3VuZC5cclxuICAgICAgICAgICAgdmFyIGRlbGF5Rm9yID0gcGFyc2VJbnQocmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIlJldHJ5LUFmdGVyXCIpKSB8fCAzO1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZ2V0UmVzb3VyY2UodXJsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpOyB9KTtcclxuICAgICAgICAgICAgfSwgZGVsYXlGb3IgKiAxMDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgcmV0cmlldmVkLiBSZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXREYXRhKGlkKSB7XHJcbiAgICByZXR1cm4gaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UmVzb3VyY2UoaS5yZXNvdXJjZVVybCk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmdldERhdGEgPSBnZXREYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gb2JqVG9TdHJpbmcob2JqKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBrZXkgKyAnOicgKyBvYmpba2V5XSArICcsJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQuc2xpY2UoMCwgcmVzdWx0Lmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBmaWx0ZXIob2JqKSB7XHJcbiAgICB2YXIgRGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgb2Zmc2V0ID0gMDtcclxuICAgIHZhciBsaW1pdCA9IDEwMDtcclxuICAgIHZhciBnZXRQYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSBlbmNvZGVVUklDb21wb25lbnQob2JqVG9TdHJpbmcob2JqKSk7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcIml0ZW1zP2ZpbHRlcj1cIiArIGZpbHRlciArIFwiJm9mZnNldD1cIiArIG9mZnNldCArIFwiJmxpbWl0PVwiICsgbGltaXQpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IGxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICBEZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gbGltaXQ7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgRGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgZ2V0UGFnZSgpO1xyXG4gICAgcmV0dXJuIERlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGZpbHRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEZvbGRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCArIFwiL2l0ZW1zXCIpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Rm9sZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0R3BzQ29vcmRpbmF0ZXMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nLCAnZ3BzJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRHcHNDb29yZGluYXRlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEludGVyYWN0aXZlSW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2ludGVyYWN0aXZlJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRJbnRlcmFjdGl2ZUluZm87XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2aWNlID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxudmFyIGNvbW1hbmRTdXBwb3J0XzEgPSByZXF1aXJlKCcuL2NvbW1hbmRTdXBwb3J0Jyk7XHJcbmZ1bmN0aW9uIEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgSW50ZXJhY3RpdmVzSW50ZXJmYWNlICE9PSAndW5kZWZpbmVkJztcclxufVxyXG5mdW5jdGlvbiBnZXQoZnVuYywgcGFyYW0sIGV4cGVjdEpzb24pIHtcclxuICAgIGlmIChwYXJhbSA9PT0gdm9pZCAwKSB7IHBhcmFtID0gbnVsbDsgfVxyXG4gICAgaWYgKGV4cGVjdEpzb24gPT09IHZvaWQgMCkgeyBleHBlY3RKc29uID0gdHJ1ZTsgfVxyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jICsgKHBhcmFtID09PSBudWxsID8gJycgOiAnLycgKyBwYXJhbSk7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgLy8gQ29udGVudCByZXRyaWV2ZWQuIFRyYW5zZm9ybSB0byBKU09OIGlmIHN1cHBvc2VkIHRvLlxyXG4gICAgICAgICAgICBpZiAoZXhwZWN0SnNvbiAmJiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIikuaW5kZXhPZihcInRleHQvaHRtbFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHdhcyBzZW50IGJhY2sgYXMgdGV4dC9odG1sIEpTT04ucGFyc2UgaXQgdG8gYSBKU09OIG9iamVjdC5cclxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2UuXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgLy8gQ29udGVudCBjb3VsZCBub3QgYmUgcmV0cmlldmVkLiBSZWplY3QgdGhlIHByb21pc2UuXHJcbiAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLmdldCA9IGdldDtcclxuZnVuY3Rpb24gcG9zdChmdW5jLCBkYXRhKSB7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgIGlmIChJbnRlcmFjdGl2ZXNJbnRlcmZhY2VJc0RlZmluZWQoKSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBJbnRlcmFjdGl2ZXNJbnRlcmZhY2UucG9zdCh1cmwsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB2YXIgcmVzdWx0SlNPTiA9IEpTT04ucGFyc2UocmVzdWx0KTtcclxuICAgICAgICBpZiAocmVzdWx0SlNPTi5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0SlNPTi5kYXRhLCByZXN1bHRKU09OLnN0YXR1c10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0V2l0aCh0aGlzLCBbcmVzdWx0SlNPTi5kYXRhLCByZXN1bHRKU09OLnN0YXR1c10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5wb3N0ID0gcG9zdDtcclxuZnVuY3Rpb24gZGRlbGV0ZShmdW5jLCBkYXRhKSB7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgIGlmIChJbnRlcmFjdGl2ZXNJbnRlcmZhY2VJc0RlZmluZWQoKSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBJbnRlcmFjdGl2ZXNJbnRlcmZhY2UuZGVsZXRlKHVybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHZhciByZXN1bHRKU09OID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRKU09OLmRhdGEsIHJlc3VsdEpTT04uc3RhdHVzXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5kZGVsZXRlID0gZGRlbGV0ZTtcclxuZnVuY3Rpb24gcHV0KGZ1bmMsIGRhdGEpIHtcclxuICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cclxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYztcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IEludGVyYWN0aXZlc0ludGVyZmFjZS5wdXQodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdEpTT04gPSBKU09OLnBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucHV0ID0gcHV0O1xyXG5mdW5jdGlvbiBzaG93VUkobmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogbmFtZSxcclxuICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93VUkgPSBzaG93VUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRJdGVtKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkKTtcclxufVxyXG5leHBvcnRzLmdldEl0ZW0gPSBnZXRJdGVtO1xyXG5mdW5jdGlvbiBnZXRDdXJyZW50SXRlbSgpIHtcclxuICAgIHJldHVybiBnZXRJdGVtKCdfX3NlbGZfXycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q3VycmVudEl0ZW0gPSBnZXRDdXJyZW50SXRlbTtcclxuZnVuY3Rpb24gZ2V0U2hhcmUoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQgKyAnL3NoYXJlJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTaGFyZSA9IGdldFNoYXJlO1xyXG5mdW5jdGlvbiBnZXRMYXN0Vmlld2VkQ29udGVudCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgJz9saXN0PWxhc3Qtdmlld2VkJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRMYXN0Vmlld2VkQ29udGVudCA9IGdldExhc3RWaWV3ZWRDb250ZW50O1xyXG5mdW5jdGlvbiBnZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9cmVjZW50bHktY3JlYXRlZCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudCA9IGdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG52YXIgdXNlTG9jYWxTdG9yYWdlID0gZGV2aWNlXzEuaXNXZWIoKSB8fCBkZXZpY2VfMS5pc0Rlc2t0b3AoKTtcclxuZnVuY3Rpb24gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpIHtcclxuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGwgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0c3dpdGggcHJlZml4XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFtrZXldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW2FsbCwgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICB2YXIgYWxsID0ge307XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICBhbGxba2V5XSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkLndoZW4oYWxsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2luZm8nKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRWYWx1ZXMocHJlZml4KSB7XHJcbiAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgLy8gR2V0IHZhbHVlcyB3aXRoIHNwZWNpZmllZCBwcmVmaXhcclxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0VmFsdWVzID0gZ2V0VmFsdWVzO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZShrZXkpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3RXaXRoKHRoaXMsIFsnSW52YWxpZCBrZXkgcHJvdmlkZWQnLCA1MDBdKTtcclxuICAgIH1cclxuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFt2YWx1ZSwgMjAwXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZmQucmVqZWN0V2l0aCh0aGlzLCBbdmFsdWUsIDQwNF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mb1wiLCBrZXksIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFZhbHVlID0gZ2V0VmFsdWU7XHJcbmZ1bmN0aW9uIHB1dFZhbHVlKGtleSwgdmFsdWUpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3RXaXRoKHRoaXMsIFsnSW52YWxpZCBrZXkgcHJvdmlkZWQnLCA1MDBdKTtcclxuICAgIH1cclxuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiaW5mb1wiLCBbeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH1dKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnB1dFZhbHVlID0gcHV0VmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZUtleShrZXkpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3RXaXRoKHRoaXMsIFsnSW52YWxpZCBrZXkgcHJvdmlkZWQnLCA1MDBdKTtcclxuICAgIH1cclxuICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGlzLCBbJycsIDIwMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJpbmZvL1wiICsga2V5KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlbGV0ZUtleSA9IGRlbGV0ZUtleTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpdGVtXzEgPSByZXF1aXJlKCcuL2l0ZW0nKTtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gY2xvc2UoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvaXRlbXMvX19zZWxmX18vYmFjayc7XHJcbn1cclxuZXhwb3J0cy5jbG9zZSA9IGNsb3NlO1xyXG5mdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL25leHQnO1xyXG59XHJcbmV4cG9ydHMubmV4dCA9IG5leHQ7XHJcbmZ1bmN0aW9uIHByZXZpb3VzKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL3ByZXZpb3VzJztcclxufVxyXG5leHBvcnRzLnByZXZpb3VzID0gcHJldmlvdXM7XHJcbmZ1bmN0aW9uIG9wZW5JdGVtKGlkLCBib29rbWFyaykge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgcGFyYW1zID0ge307XHJcbiAgICAgICAgdmFyIHVybCA9IGl0ZW0udXJsO1xyXG4gICAgICAgIGlmIChkZXZpY2VfMS5pc1dlYigpIHx8IGRldmljZV8xLmlzRGVza3RvcCgpKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1sncmV0dXJudXJsJ10gPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvb2ttYXJrKSB7XHJcbiAgICAgICAgICAgIHBhcmFtc1snYm9va21hcmsnXSA9IGJvb2ttYXJrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPiAtMSA/ICcmJyA6ICc/JykgKyAkLnBhcmFtKHBhcmFtcyk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIHVybDtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMub3Blbkl0ZW0gPSBvcGVuSXRlbTtcclxuZXhwb3J0cy5vcGVuID0gb3Blbkl0ZW07XHJcbmZ1bmN0aW9uIG9wZW5Gb2xkZXIoaWQpIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBpdGVtLnVybDtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMub3BlbkZvbGRlciA9IG9wZW5Gb2xkZXI7XHJcbmZ1bmN0aW9uIGdvdG8oKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdnb3RvIG1ldGhvZCBpcyBub3cgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBvcGVuSXRlbSBnb2luZyBmb3J3YXJkLicpO1xyXG59XHJcbmV4cG9ydHMuZ290byA9IGdvdG87XHJcbmZ1bmN0aW9uIGJyb3dzZSgpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ2Jyb3dzZSBtZXRob2QgaXMgbm93IGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugb3Blbkl0ZW0gZ29pbmcgZm9yd2FyZC4nKTtcclxufVxyXG5leHBvcnRzLmJyb3dzZSA9IGJyb3dzZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGFkZE5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMuYWRkTm90aWZpY2F0aW9uID0gYWRkTm90aWZpY2F0aW9uO1xyXG5mdW5jdGlvbiByZW1vdmVOb3RpZmljYXRpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwibm90aWZpY2F0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZU5vdGlmaWNhdGlvbiA9IHJlbW92ZU5vdGlmaWNhdGlvbjtcclxuZnVuY3Rpb24gZ2V0Tm90aWZpY2F0aW9uU3RhdHVzKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwibm90aWZpY2F0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmdldE5vdGlmaWNhdGlvblN0YXR1cyA9IGdldE5vdGlmaWNhdGlvblN0YXR1cztcclxuZnVuY3Rpb24gc2hvd05vdGlmaWNhdGlvbk1hbmFnZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnbm90aWZpY2F0aW9ucycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd05vdGlmaWNhdGlvbk1hbmFnZXIgPSBzaG93Tm90aWZpY2F0aW9uTWFuYWdlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldE9ubGluZVN0YXR1cyhhcmd1bWVudCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgJ29ubGluZS1zdGF0dXMnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldE9ubGluZVN0YXR1cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5mdW5jdGlvbiBvcGVuV2luZG93KHVybCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5vcGVuKHVybCwgXCJJbnRlcmFjdGl2ZXNXaW5kb3dcIiArIHV0aWxzXzEuZ3VpZCgpKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG9wZW5XaW5kb3c7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBwb3N0QWN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdhY3Rpb25zJywgb3B0aW9ucyk7XHJcbn1cclxuZXhwb3J0cy5wb3N0QWN0aW9uID0gcG9zdEFjdGlvbjtcclxuZnVuY3Rpb24gcG9zdFBhZ2VWaWV3KGlkLCBwYWdlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIHtcclxuICAgICAgICB0eXBlOiAnZG9jdW1lbnQnLFxyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICBwYWdlOiBwYWdlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnBvc3RQYWdlVmlldyA9IHBvc3RQYWdlVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHBvc3RFdmVudChrZXksIHByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiZXZlbnRzXCIsIHsga2V5OiBrZXksIHByb3BlcnRpZXM6IEpTT04uc3RyaW5naWZ5KHByb3BlcnRpZXMpIH0pO1xyXG59XHJcbmV4cG9ydHMucG9zdEV2ZW50ID0gcG9zdEV2ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2VhcmNoKHRlcm0sIG9mZnNldCwgbGltaXQpIHtcclxuICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSAwOyB9XHJcbiAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDEwMDsgfVxyXG4gICAgdmFyIGRmZDEgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgIHRlcm06IHRlcm0sXHJcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgICAgbGltaXQ6IGxpbWl0XHJcbiAgICB9O1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHFzID0gJC5wYXJhbShvYmopO1xyXG4gICAgICAgIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXM/JyArIHFzKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBvYmoubGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGRmZDEucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLm9mZnNldCArPSBvYmoubGltaXQ7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGZkMS5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gZGZkMS5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5zZWFyY2ggPSBzZWFyY2g7XHJcbmZ1bmN0aW9uIHNob3dTZWFyY2goeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnc2VhcmNoJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2VhcmNoID0gc2hvd1NlYXJjaDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwic3luY2VkaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nKTtcclxufVxyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZXMocHJlZml4KSB7XHJcbiAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgLy8gR2V0IHZhbHVlcyB3aXRoIHNwZWNpZmllZCBwcmVmaXhcclxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0U3luY2VkVmFsdWVzID0gZ2V0U3luY2VkVmFsdWVzO1xyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZShrZXkpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3RXaXRoKHRoaXMsIFsnSW52YWxpZCBrZXkgcHJvdmlkZWQnLCA1MDBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nLCBrZXksIGZhbHNlKTtcclxufVxyXG5leHBvcnRzLmdldFN5bmNlZFZhbHVlID0gZ2V0U3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIHB1dFN5bmNlZFZhbHVlKGtleSwgdmFsdWUpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3RXaXRoKHRoaXMsIFsnSW52YWxpZCBrZXkgcHJvdmlkZWQnLCA1MDBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwic3luY2VkaW5mb1wiLCBbeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH1dKTtcclxufVxyXG5leHBvcnRzLnB1dFN5bmNlZFZhbHVlID0gcHV0U3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZVN5bmNlZEtleShrZXkpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3RXaXRoKHRoaXMsIFsnSW52YWxpZCBrZXkgcHJvdmlkZWQnLCA1MDBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwic3luY2VkaW5mb1wiLCBba2V5XSk7XHJcbn1cclxuZXhwb3J0cy5kZWxldGVTeW5jZWRLZXkgPSBkZWxldGVTeW5jZWRLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRTeXN0ZW1JbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRTeXN0ZW1JbmZvO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VXBsb2FkVXJsKGtleSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgXCJ1cGxvYWR1cmw/a2V5PVwiICsga2V5KTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVwbG9hZFVybDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmZ1bmN0aW9uIGd1aWQoKSB7XHJcbiAgICBmdW5jdGlvbiBzNCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xyXG4gICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn1cclxuZXhwb3J0cy5ndWlkID0gZ3VpZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBwYWNrYWdlSnNvbiA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xyXG5mdW5jdGlvbiB2ZXJzaW9uKCkge1xyXG4gICAgcmV0dXJuIHBhY2thZ2VKc29uLnZlcnNpb247XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB2ZXJzaW9uO1xyXG4iLCIvKipcclxuICogKGMpIDIwMTMtMjAxNiwgTWVkaWFmbHksIEluYy5cclxuICogbWZseUNvbW1hbmRzIGlzIGEgc2luZ2xldG9uIGluc3RhbmNlIHdoaWNoIHdyYXBzIGNvbW1vbiBtZmx5IGNhbGxzIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cclxuICogQmVmb3JlIHVzZSwgcGxlYXNlIGJlIHN1cmUgdG8gY2FsbCBzZXRQcmVmaXggaWYgeW91IGFyZSB3b3JraW5nIG9uIGEgZGV2ZWxvcG1lbnQgcGxhdGZvcm0gKGUuZy5cclxuICogYSBsb2NhbCB3ZWJzZXJ2ZXIgb24gYSBQQykgZm9yIGV4YW1wbGUsIGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8gLlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcmFjdGl2ZUluZm9fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvaW50ZXJhY3RpdmVJbmZvJyk7XHJcbnZhciBzeXN0ZW1JbmZvXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3N5c3RlbUluZm8nKTtcclxudmFyIG9ubGluZVN0YXR1c18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9vbmxpbmVTdGF0dXMnKTtcclxudmFyIHVwbG9hZFVybF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy91cGxvYWRVcmwnKTtcclxudmFyIGl0ZW0gPSByZXF1aXJlKCcuL2NvbW1hbmRzL2l0ZW0nKTtcclxudmFyIGNvbGxlY3Rpb25zID0gcmVxdWlyZSgnLi9jb21tYW5kcy9jb2xsZWN0aW9ucycpO1xyXG52YXIgZm9sZGVyXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ZvbGRlcicpO1xyXG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ZpbHRlcicpO1xyXG52YXIgZ3BzQ29vcmRpbmF0ZXNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMnKTtcclxudmFyIHNlYXJjaF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zZWFyY2gnKTtcclxudmFyIG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbmF2aWdhdGlvbicpO1xyXG52YXIgZG93bmxvYWRlciA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZG93bmxvYWRlcicpO1xyXG52YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnLi9jb21tYW5kcy9ub3RpZmljYXRpb24nKTtcclxudmFyIGFjY291bnRJbmZvID0gcmVxdWlyZSgnLi9jb21tYW5kcy9hY2NvdW50SW5mbycpO1xyXG52YXIgbG9jYWxLZXlWYWx1ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2xvY2FsS2V5VmFsdWVTdG9yYWdlJyk7XHJcbnZhciBzeW5jZWRLZXlWYWx1ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3N5bmNlZEtleVZhbHVlU3RvcmFnZScpO1xyXG52YXIgYXBwbGljYXRpb25TeW5jID0gcmVxdWlyZSgnLi9jb21tYW5kcy9hcHBsaWNhdGlvblN5bmMnKTtcclxudmFyIG5hdmlnYXRpb24gPSByZXF1aXJlKCcuL2NvbW1hbmRzL25hdmlnYXRpb24nKTtcclxudmFyIGFwcEZlYXR1cmVzID0gcmVxdWlyZSgnLi9jb21tYW5kcy9hcHBGZWF0dXJlcycpO1xyXG52YXIgY29udHJvbHNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvY29udHJvbHMnKTtcclxudmFyIGVtYmVkXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2VtYmVkJyk7XHJcbnZhciBwb3N0QWN0aW9uXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3Bvc3RBY3Rpb24nKTtcclxudmFyIHBvc3RFdmVudF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9wb3N0RXZlbnQnKTtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9kZXZpY2UnKTtcclxudmFyIG9wZW5XaW5kb3dfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvb3BlbldpbmRvdycpO1xyXG52YXIgZW1haWxfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZW1haWwnKTtcclxudmFyIGNyZWRlbnRpYWxzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NyZWRlbnRpYWxzJyk7XHJcbnZhciB2ZXJzaW9uXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3ZlcnNpb24nKTtcclxudmFyIG1mbHlDb21tYW5kcyA9IHtcclxuICAgIGNsb3NlOiBuYXZpZ2F0aW9uXzEuY2xvc2UsXHJcbiAgICBnZXRJbnRlcmFjdGl2ZUluZm86IGludGVyYWN0aXZlSW5mb18xLmRlZmF1bHQsXHJcbiAgICBnZXRDcmVkZW50aWFsczogY3JlZGVudGlhbHNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0U3lzdGVtSW5mbzogc3lzdGVtSW5mb18xLmRlZmF1bHQsXHJcbiAgICBnZXRPbmxpbmVTdGF0dXM6IG9ubGluZVN0YXR1c18xLmRlZmF1bHQsXHJcbiAgICBnZXRHcHNDb29yZGluYXRlczogZ3BzQ29vcmRpbmF0ZXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0VXBsb2FkVXJsOiB1cGxvYWRVcmxfMS5kZWZhdWx0LFxyXG4gICAgZ2V0Rm9sZGVyOiBmb2xkZXJfMS5kZWZhdWx0LFxyXG4gICAgZmlsdGVyOiBmaWx0ZXJfMS5kZWZhdWx0LFxyXG4gICAgc2VhcmNoOiBzZWFyY2hfMS5zZWFyY2gsXHJcbiAgICBzaG93U2VhcmNoOiBzZWFyY2hfMS5zaG93U2VhcmNoLFxyXG4gICAgaGlkZUNvbnRyb2xCYXJzOiBjb250cm9sc18xLmhpZGVDb250cm9sQmFycyxcclxuICAgIHNob3dDb250cm9sQmFyczogY29udHJvbHNfMS5zaG93Q29udHJvbEJhcnMsXHJcbiAgICBlbWJlZDogZW1iZWRfMS5lbWJlZCxcclxuICAgIGVtYmVkSW1hZ2U6IGVtYmVkXzEuZW1iZWRJbWFnZSxcclxuICAgIGdldERhdGE6IGVtYmVkXzEuZ2V0RGF0YSxcclxuICAgIGdldERldmljZVR5cGU6IGRldmljZV8xLmdldERldmljZVR5cGUsXHJcbiAgICBnZXRQcmVmaXg6IGRldmljZV8xLmdldFByZWZpeCxcclxuICAgIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQ6IGRldmljZV8xLmlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQsXHJcbiAgICBpc1dpbmRvd3M4OiBkZXZpY2VfMS5pc1dpbmRvd3M4LFxyXG4gICAgb3BlbldpbmRvdzogb3BlbldpbmRvd18xLmRlZmF1bHQsXHJcbiAgICBwb3N0QWN0aW9uOiBwb3N0QWN0aW9uXzEucG9zdEFjdGlvbixcclxuICAgIHBvc3RQYWdlVmlldzogcG9zdEFjdGlvbl8xLnBvc3RQYWdlVmlldyxcclxuICAgIHBvc3RFdmVudDogcG9zdEV2ZW50XzEucG9zdEV2ZW50LFxyXG4gICAgc2VuZEVtYWlsOiBlbWFpbF8xLmRlZmF1bHQsXHJcbiAgICB2ZXJzaW9uOiB2ZXJzaW9uXzEuZGVmYXVsdFxyXG59O1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGl0ZW0pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGNvbGxlY3Rpb25zKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBub3RpZmljYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFjY291bnRJbmZvKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgc3luY2VkS2V5VmFsdWVTdG9yYWdlKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBsaWNhdGlvblN5bmMpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcEZlYXR1cmVzKTtcclxubW9kdWxlLmV4cG9ydHMgPSBtZmx5Q29tbWFuZHM7XHJcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwibWZseS1jb21tYW5kc1wiLFxuICBcInZlcnNpb25cIjogXCIyLjAuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwibWZseUNvbW1hbmRzLmpzIGZvciBNZWRpYWZseSBJbnRlcmFjdGl2ZXNcIixcbiAgXCJtYWluXCI6IFwiaW5kZXguanNcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImNsZWFuXCI6IFwicm0gLXJmIC50ZW1wIHNyYyAmIG1rZGlyIHNyY1wiLFxuICAgIFwiY29tcGlsZVwiOiBcInRzY1wiLFxuICAgIFwiYnJvd3NlcmlmeVwiOiBcImJyb3dzZXJpZnkgLnRlbXAvbWZseUNvbW1hbmRzLmpzIC0tZGVidWcgLS1zdGFuZGFsb25lIG1mbHlDb21tYW5kcyAtLW91dGZpbGUgc3JjL21mbHlDb21tYW5kcy5qc1wiLFxuICAgIFwicHJlYnVpbGRcIjogXCJucG0gcnVuIGNsZWFuXCIsXG4gICAgXCJidWlsZFwiOiBcIm5wbSBydW4gY29tcGlsZSAmJiBucG0gcnVuIGJyb3dzZXJpZnlcIixcbiAgICBcIndhdGNoXCI6IFwibnBtIHJ1biBidWlsZCAmIGNob2tpZGFyIG1mbHlDb21tYW5kcy50cyBjb21tYW5kcy8qKi8qLnRzIC1jICducG0gcnVuIGJ1aWxkJyAtLXBvbGxpbmcgLS1wb2xsLWludGVydmFsIDEwMCAtLXZlcmJvc2VcIixcbiAgICBcInBvc3RpbnN0YWxsXCI6IFwidHlwaW5ncyBpbnN0YWxsICYgYm93ZXIgaW5zdGFsbFwiXG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQrc3NoOi8vZ2l0QGdpdGh1Yi5jb20vbWVkaWFmbHkvbWZseUNvbW1hbmRzLmdpdFwiXG4gIH0sXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJOYWNoaWtldCBNZWh0YVwiLFxuICAgIFwiZW1haWxcIjogXCJubWVodGFAbWVkaWFmbHkuY29tXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vbWVkaWFmbHlcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJJU0NcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9tZWRpYWZseS9tZmx5Q29tbWFuZHMvaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9tZWRpYWZseS9tZmx5Q29tbWFuZHMjcmVhZG1lXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwibWZseUNvbW1hbmRzXCIsXG4gICAgXCJNZWRpYWZseVwiLFxuICAgIFwiSW50ZXJhY3RpdmVzXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwianF1ZXJ5XCI6IFwiXjEuMTEuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImJyb3dzZXJpZnlcIjogXCIxMy4xLjBcIixcbiAgICBcImJyb3dzZXJpZnktc2hpbVwiOiBcIjMuOC4xMlwiLFxuICAgIFwiY2hva2lkYXItY2xpXCI6IFwiMS4yLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCIyLjAuM1wiXG4gIH1cbn1cbiJdfQ==
