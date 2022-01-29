var Node1 = function() {
    function Node2(key, data) {
        this.next = null;
        this.key = key;
        this.data = data;
        this.left = null;
        this.right = null;
    }
    return Node2;
}();
function DEFAULT_COMPARE(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}
function splay(i, t, comparator) {
    var N = new Node1(null, null);
    var l = N;
    var r = N;
    while(true){
        var cmp = comparator(i, t.key);
        if (cmp < 0) {
            if (t.left === null) break;
            if (comparator(i, t.left.key) < 0) {
                var y = t.left;
                t.left = y.right;
                y.right = t;
                t = y;
                if (t.left === null) break;
            }
            r.left = t;
            r = t;
            t = t.left;
        } else if (cmp > 0) {
            if (t.right === null) break;
            if (comparator(i, t.right.key) > 0) {
                var y = t.right;
                t.right = y.left;
                y.left = t;
                t = y;
                if (t.right === null) break;
            }
            l.right = t;
            l = t;
            t = t.right;
        } else break;
    }
    l.right = t.left;
    r.left = t.right;
    t.left = N.right;
    t.right = N.left;
    return t;
}
function insert(i, data, t, comparator) {
    var node = new Node1(i, data);
    if (t === null) {
        node.left = node.right = null;
        return node;
    }
    t = splay(i, t, comparator);
    var cmp = comparator(i, t.key);
    if (cmp < 0) {
        node.left = t.left;
        node.right = t;
        t.left = null;
    } else if (cmp >= 0) {
        node.right = t.right;
        node.left = t;
        t.right = null;
    }
    return node;
}
function split(key, v, comparator) {
    var left = null;
    var right = null;
    if (v) {
        v = splay(key, v, comparator);
        var cmp = comparator(v.key, key);
        if (cmp === 0) {
            left = v.left;
            right = v.right;
        } else if (cmp < 0) {
            right = v.right;
            v.right = null;
            left = v;
        } else {
            left = v.left;
            v.left = null;
            right = v;
        }
    }
    return {
        left,
        right
    };
}
function merge1(left, right, comparator) {
    if (right === null) return left;
    if (left === null) return right;
    right = splay(left.key, right, comparator);
    right.left = left;
    return right;
}
function printRow(root, prefix, isTail, out, printNode) {
    if (root) {
        out("" + prefix + (isTail ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ") + printNode(root) + "\n");
        var indent = prefix + (isTail ? "    " : "\u2502   ");
        if (root.left) printRow(root.left, indent, false, out, printNode);
        if (root.right) printRow(root.right, indent, true, out, printNode);
    }
}
var Tree = function() {
    function Tree2(comparator) {
        if (comparator === void 0) {
            comparator = DEFAULT_COMPARE;
        }
        this._root = null;
        this._size = 0;
        this._comparator = comparator;
    }
    Tree2.prototype.insert = function(key, data) {
        this._size++;
        return this._root = insert(key, data, this._root, this._comparator);
    };
    Tree2.prototype.add = function(key, data) {
        var node = new Node1(key, data);
        if (this._root === null) {
            node.left = node.right = null;
            this._size++;
            this._root = node;
        }
        var comparator = this._comparator;
        var t = splay(key, this._root, comparator);
        var cmp = comparator(key, t.key);
        if (cmp === 0) this._root = t;
        else {
            if (cmp < 0) {
                node.left = t.left;
                node.right = t;
                t.left = null;
            } else if (cmp > 0) {
                node.right = t.right;
                node.left = t;
                t.right = null;
            }
            this._size++;
            this._root = node;
        }
        return this._root;
    };
    Tree2.prototype.remove = function(key) {
        this._root = this._remove(key, this._root, this._comparator);
    };
    Tree2.prototype._remove = function(i, t, comparator) {
        var x;
        if (t === null) return null;
        t = splay(i, t, comparator);
        var cmp = comparator(i, t.key);
        if (cmp === 0) {
            if (t.left === null) {
                x = t.right;
            } else {
                x = splay(i, t.left, comparator);
                x.right = t.right;
            }
            this._size--;
            return x;
        }
        return t;
    };
    Tree2.prototype.pop = function() {
        var node = this._root;
        if (node) {
            while(node.left)node = node.left;
            this._root = splay(node.key, this._root, this._comparator);
            this._root = this._remove(node.key, this._root, this._comparator);
            return {
                key: node.key,
                data: node.data
            };
        }
        return null;
    };
    Tree2.prototype.findStatic = function(key) {
        var current = this._root;
        var compare = this._comparator;
        while(current){
            var cmp = compare(key, current.key);
            if (cmp === 0) return current;
            else if (cmp < 0) current = current.left;
            else current = current.right;
        }
        return null;
    };
    Tree2.prototype.find = function(key) {
        if (this._root) {
            this._root = splay(key, this._root, this._comparator);
            if (this._comparator(key, this._root.key) !== 0) return null;
        }
        return this._root;
    };
    Tree2.prototype.contains = function(key) {
        var current = this._root;
        var compare = this._comparator;
        while(current){
            var cmp = compare(key, current.key);
            if (cmp === 0) return true;
            else if (cmp < 0) current = current.left;
            else current = current.right;
        }
        return false;
    };
    Tree2.prototype.forEach = function(visitor, ctx) {
        var current = this._root;
        var Q = [];
        var done = false;
        while(!done){
            if (current !== null) {
                Q.push(current);
                current = current.left;
            } else {
                if (Q.length !== 0) {
                    current = Q.pop();
                    visitor.call(ctx, current);
                    current = current.right;
                } else done = true;
            }
        }
        return this;
    };
    Tree2.prototype.range = function(low, high, fn, ctx) {
        var Q = [];
        var compare = this._comparator;
        var node = this._root;
        var cmp;
        while(Q.length !== 0 || node){
            if (node) {
                Q.push(node);
                node = node.left;
            } else {
                node = Q.pop();
                cmp = compare(node.key, high);
                if (cmp > 0) {
                    break;
                } else if (compare(node.key, low) >= 0) {
                    if (fn.call(ctx, node)) return this;
                }
                node = node.right;
            }
        }
        return this;
    };
    Tree2.prototype.keys = function() {
        var keys = [];
        this.forEach(function(_a) {
            var key = _a.key;
            return keys.push(key);
        });
        return keys;
    };
    Tree2.prototype.values = function() {
        var values = [];
        this.forEach(function(_a) {
            var data = _a.data;
            return values.push(data);
        });
        return values;
    };
    Tree2.prototype.min = function() {
        if (this._root) return this.minNode(this._root).key;
        return null;
    };
    Tree2.prototype.max = function() {
        if (this._root) return this.maxNode(this._root).key;
        return null;
    };
    Tree2.prototype.minNode = function(t) {
        if (t === void 0) {
            t = this._root;
        }
        if (t) while(t.left)t = t.left;
        return t;
    };
    Tree2.prototype.maxNode = function(t) {
        if (t === void 0) {
            t = this._root;
        }
        if (t) while(t.right)t = t.right;
        return t;
    };
    Tree2.prototype.at = function(index) {
        var current = this._root;
        var done = false;
        var i = 0;
        var Q = [];
        while(!done){
            if (current) {
                Q.push(current);
                current = current.left;
            } else {
                if (Q.length > 0) {
                    current = Q.pop();
                    if (i === index) return current;
                    i++;
                    current = current.right;
                } else done = true;
            }
        }
        return null;
    };
    Tree2.prototype.next = function(d) {
        var root = this._root;
        var successor = null;
        if (d.right) {
            successor = d.right;
            while(successor.left)successor = successor.left;
            return successor;
        }
        var comparator = this._comparator;
        while(root){
            var cmp = comparator(d.key, root.key);
            if (cmp === 0) break;
            else if (cmp < 0) {
                successor = root;
                root = root.left;
            } else root = root.right;
        }
        return successor;
    };
    Tree2.prototype.prev = function(d) {
        var root = this._root;
        var predecessor = null;
        if (d.left !== null) {
            predecessor = d.left;
            while(predecessor.right)predecessor = predecessor.right;
            return predecessor;
        }
        var comparator = this._comparator;
        while(root){
            var cmp = comparator(d.key, root.key);
            if (cmp === 0) break;
            else if (cmp < 0) root = root.left;
            else {
                predecessor = root;
                root = root.right;
            }
        }
        return predecessor;
    };
    Tree2.prototype.clear = function() {
        this._root = null;
        this._size = 0;
        return this;
    };
    Tree2.prototype.toList = function() {
        return toList(this._root);
    };
    Tree2.prototype.load = function(keys, values, presort) {
        if (values === void 0) {
            values = [];
        }
        if (presort === void 0) {
            presort = false;
        }
        var size = keys.length;
        var comparator = this._comparator;
        if (presort) sort(keys, values, 0, size - 1, comparator);
        if (this._root === null) {
            this._root = loadRecursive(keys, values, 0, size);
            this._size = size;
        } else {
            var mergedList = mergeLists(this.toList(), createList(keys, values), comparator);
            size = this._size + size;
            this._root = sortedListToBST({
                head: mergedList
            }, 0, size);
        }
        return this;
    };
    Tree2.prototype.isEmpty = function() {
        return this._root === null;
    };
    Object.defineProperty(Tree2.prototype, "size", {
        get: function() {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tree2.prototype, "root", {
        get: function() {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Tree2.prototype.toString = function(printNode) {
        if (printNode === void 0) {
            printNode = function(n) {
                return String(n.key);
            };
        }
        var out = [];
        printRow(this._root, "", true, function(v) {
            return out.push(v);
        }, printNode);
        return out.join("");
    };
    Tree2.prototype.update = function(key, newKey, newData) {
        var comparator = this._comparator;
        var _a = split(key, this._root, comparator), left = _a.left, right = _a.right;
        if (comparator(key, newKey) < 0) {
            right = insert(newKey, newData, right, comparator);
        } else {
            left = insert(newKey, newData, left, comparator);
        }
        this._root = merge1(left, right, comparator);
    };
    Tree2.prototype.split = function(key) {
        return split(key, this._root, this._comparator);
    };
    return Tree2;
}();
function loadRecursive(keys, values, start, end) {
    var size = end - start;
    if (size > 0) {
        var middle = start + Math.floor(size / 2);
        var key = keys[middle];
        var data = values[middle];
        var node = new Node1(key, data);
        node.left = loadRecursive(keys, values, start, middle);
        node.right = loadRecursive(keys, values, middle + 1, end);
        return node;
    }
    return null;
}
function createList(keys, values) {
    var head = new Node1(null, null);
    var p = head;
    for(var i = 0; i < keys.length; i++){
        p = p.next = new Node1(keys[i], values[i]);
    }
    p.next = null;
    return head.next;
}
function toList(root) {
    var current = root;
    var Q = [];
    var done = false;
    var head = new Node1(null, null);
    var p = head;
    while(!done){
        if (current) {
            Q.push(current);
            current = current.left;
        } else {
            if (Q.length > 0) {
                current = p = p.next = Q.pop();
                current = current.right;
            } else done = true;
        }
    }
    p.next = null;
    return head.next;
}
function sortedListToBST(list, start, end) {
    var size = end - start;
    if (size > 0) {
        var middle = start + Math.floor(size / 2);
        var left = sortedListToBST(list, start, middle);
        var root = list.head;
        root.left = left;
        list.head = list.head.next;
        root.right = sortedListToBST(list, middle + 1, end);
        return root;
    }
    return null;
}
function mergeLists(l1, l2, compare) {
    var head = new Node1(null, null);
    var p = head;
    var p1 = l1;
    var p2 = l2;
    while(p1 !== null && p2 !== null){
        if (compare(p1.key, p2.key) < 0) {
            p.next = p1;
            p1 = p1.next;
        } else {
            p.next = p2;
            p2 = p2.next;
        }
        p = p.next;
    }
    if (p1 !== null) {
        p.next = p1;
    } else if (p2 !== null) {
        p.next = p2;
    }
    return head.next;
}
function sort(keys, values, left, right, compare) {
    if (left >= right) return;
    var pivot = keys[left + right >> 1];
    var i = left - 1;
    var j = right + 1;
    while(true){
        do i++;
        while (compare(keys[i], pivot) < 0)
        do j--;
        while (compare(keys[j], pivot) > 0)
        if (i >= j) break;
        var tmp = keys[i];
        keys[i] = keys[j];
        keys[j] = tmp;
        tmp = values[i];
        values[i] = values[j];
        values[j] = tmp;
    }
    sort(keys, values, left, j, compare);
    sort(keys, values, j + 1, right, compare);
}
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== "undefined") {
    globalContext = window;
} else if (typeof self !== "undefined") {
    globalContext = self;
} else {
    globalContext = {
    };
}
if (typeof globalContext.setTimeout === "function") {
    cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === "function") {
    cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e2) {
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}
function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while((++queueIndex) < len){
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for(var i = 1; i < arguments.length; i++){
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
var title = "browser";
var platform = "browser";
var browser = true;
var argv = [];
var version = "";
var versions = {
};
var release = {
};
var config = {
};
function noop() {
}
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
    throw new Error("process.binding is not supported");
}
function cwd() {
    return "/";
}
function chdir(dir) {
    throw new Error("process.chdir is not supported");
}
function umask() {
    return 0;
}
var performance = globalContext.performance || {
};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
    return new Date().getTime();
};
function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 0.001;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1000000000);
    if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1000000000;
        }
    }
    return [
        seconds,
        nanoseconds
    ];
}
var startTime = new Date();
function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
}
var process = {
    nextTick,
    title,
    browser,
    env: {
        NODE_ENV: "production"
    },
    argv,
    version,
    versions,
    on,
    addListener,
    once,
    off,
    removeListener,
    removeAllListeners,
    emit,
    binding,
    cwd,
    chdir,
    umask,
    hrtime,
    platform,
    release,
    config,
    uptime
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isInBbox = function isInBbox2(bbox, point) {
    return bbox.ll.x <= point.x && point.x <= bbox.ur.x && bbox.ll.y <= point.y && point.y <= bbox.ur.y;
};
var getBboxOverlap = function getBboxOverlap2(b1, b2) {
    if (b2.ur.x < b1.ll.x || b1.ur.x < b2.ll.x || b2.ur.y < b1.ll.y || b1.ur.y < b2.ll.y) return null;
    var lowerX = b1.ll.x < b2.ll.x ? b2.ll.x : b1.ll.x;
    var upperX = b1.ur.x < b2.ur.x ? b1.ur.x : b2.ur.x;
    var lowerY = b1.ll.y < b2.ll.y ? b2.ll.y : b1.ll.y;
    var upperY = b1.ur.y < b2.ur.y ? b1.ur.y : b2.ur.y;
    return {
        ll: {
            x: lowerX,
            y: lowerY
        },
        ur: {
            x: upperX,
            y: upperY
        }
    };
};
var epsilon = Number.EPSILON;
if (epsilon === void 0) epsilon = Math.pow(2, -52);
var EPSILON_SQ = epsilon * epsilon;
var cmp = function cmp2(a, b) {
    if (-epsilon < a && a < epsilon) {
        if (-epsilon < b && b < epsilon) {
            return 0;
        }
    }
    var ab = a - b;
    if (ab * ab < EPSILON_SQ * a * b) {
        return 0;
    }
    return a < b ? -1 : 1;
};
var PtRounder = function() {
    function PtRounder2() {
        _classCallCheck(this, PtRounder2);
        this.reset();
    }
    _createClass(PtRounder2, [
        {
            key: "reset",
            value: function reset() {
                this.xRounder = new CoordRounder();
                this.yRounder = new CoordRounder();
            }
        },
        {
            key: "round",
            value: function round(x, y) {
                return {
                    x: this.xRounder.round(x),
                    y: this.yRounder.round(y)
                };
            }
        }
    ]);
    return PtRounder2;
}();
var CoordRounder = function() {
    function CoordRounder2() {
        _classCallCheck(this, CoordRounder2);
        this.tree = new Tree();
        this.round(0);
    }
    _createClass(CoordRounder2, [
        {
            key: "round",
            value: function round(coord) {
                var node = this.tree.add(coord);
                var prevNode = this.tree.prev(node);
                if (prevNode !== null && cmp(node.key, prevNode.key) === 0) {
                    this.tree.remove(coord);
                    return prevNode.key;
                }
                var nextNode = this.tree.next(node);
                if (nextNode !== null && cmp(node.key, nextNode.key) === 0) {
                    this.tree.remove(coord);
                    return nextNode.key;
                }
                return coord;
            }
        }
    ]);
    return CoordRounder2;
}();
var rounder = new PtRounder();
var crossProduct = function crossProduct2(a, b) {
    return a.x * b.y - a.y * b.x;
};
var dotProduct = function dotProduct2(a, b) {
    return a.x * b.x + a.y * b.y;
};
var compareVectorAngles = function compareVectorAngles2(basePt, endPt1, endPt2) {
    var v1 = {
        x: endPt1.x - basePt.x,
        y: endPt1.y - basePt.y
    };
    var v2 = {
        x: endPt2.x - basePt.x,
        y: endPt2.y - basePt.y
    };
    var kross = crossProduct(v1, v2);
    return cmp(kross, 0);
};
var length = function length2(v) {
    return Math.sqrt(dotProduct(v, v));
};
var sineOfAngle = function sineOfAngle2(pShared, pBase, pAngle) {
    var vBase = {
        x: pBase.x - pShared.x,
        y: pBase.y - pShared.y
    };
    var vAngle = {
        x: pAngle.x - pShared.x,
        y: pAngle.y - pShared.y
    };
    return crossProduct(vAngle, vBase) / length(vAngle) / length(vBase);
};
var cosineOfAngle = function cosineOfAngle2(pShared, pBase, pAngle) {
    var vBase = {
        x: pBase.x - pShared.x,
        y: pBase.y - pShared.y
    };
    var vAngle = {
        x: pAngle.x - pShared.x,
        y: pAngle.y - pShared.y
    };
    return dotProduct(vAngle, vBase) / length(vAngle) / length(vBase);
};
var horizontalIntersection = function horizontalIntersection2(pt, v, y) {
    if (v.y === 0) return null;
    return {
        x: pt.x + v.x / v.y * (y - pt.y),
        y
    };
};
var verticalIntersection = function verticalIntersection2(pt, v, x) {
    if (v.x === 0) return null;
    return {
        x,
        y: pt.y + v.y / v.x * (x - pt.x)
    };
};
var intersection = function intersection2(pt1, v1, pt2, v2) {
    if (v1.x === 0) return verticalIntersection(pt2, v2, pt1.x);
    if (v2.x === 0) return verticalIntersection(pt1, v1, pt2.x);
    if (v1.y === 0) return horizontalIntersection(pt2, v2, pt1.y);
    if (v2.y === 0) return horizontalIntersection(pt1, v1, pt2.y);
    var kross = crossProduct(v1, v2);
    if (kross == 0) return null;
    var ve = {
        x: pt2.x - pt1.x,
        y: pt2.y - pt1.y
    };
    var d1 = crossProduct(ve, v1) / kross;
    var d2 = crossProduct(ve, v2) / kross;
    var x1 = pt1.x + d2 * v1.x, x2 = pt2.x + d1 * v2.x;
    var y1 = pt1.y + d2 * v1.y, y2 = pt2.y + d1 * v2.y;
    var x = (x1 + x2) / 2;
    var y = (y1 + y2) / 2;
    return {
        x,
        y
    };
};
var SweepEvent = function() {
    _createClass(SweepEvent2, null, [
        {
            key: "compare",
            value: function compare(a, b) {
                var ptCmp = SweepEvent2.comparePoints(a.point, b.point);
                if (ptCmp !== 0) return ptCmp;
                if (a.point !== b.point) a.link(b);
                if (a.isLeft !== b.isLeft) return a.isLeft ? 1 : -1;
                return Segment.compare(a.segment, b.segment);
            }
        },
        {
            key: "comparePoints",
            value: function comparePoints(aPt, bPt) {
                if (aPt.x < bPt.x) return -1;
                if (aPt.x > bPt.x) return 1;
                if (aPt.y < bPt.y) return -1;
                if (aPt.y > bPt.y) return 1;
                return 0;
            }
        }
    ]);
    function SweepEvent2(point, isLeft) {
        _classCallCheck(this, SweepEvent2);
        if (point.events === void 0) point.events = [
            this
        ];
        else point.events.push(this);
        this.point = point;
        this.isLeft = isLeft;
    }
    _createClass(SweepEvent2, [
        {
            key: "link",
            value: function link(other) {
                if (other.point === this.point) {
                    throw new Error("Tried to link already linked events");
                }
                var otherEvents = other.point.events;
                for(var i = 0, iMax = otherEvents.length; i < iMax; i++){
                    var evt = otherEvents[i];
                    this.point.events.push(evt);
                    evt.point = this.point;
                }
                this.checkForConsuming();
            }
        },
        {
            key: "checkForConsuming",
            value: function checkForConsuming() {
                var numEvents = this.point.events.length;
                for(var i = 0; i < numEvents; i++){
                    var evt1 = this.point.events[i];
                    if (evt1.segment.consumedBy !== void 0) continue;
                    for(var j = i + 1; j < numEvents; j++){
                        var evt2 = this.point.events[j];
                        if (evt2.consumedBy !== void 0) continue;
                        if (evt1.otherSE.point.events !== evt2.otherSE.point.events) continue;
                        evt1.segment.consume(evt2.segment);
                    }
                }
            }
        },
        {
            key: "getAvailableLinkedEvents",
            value: function getAvailableLinkedEvents() {
                var events = [];
                for(var i = 0, iMax = this.point.events.length; i < iMax; i++){
                    var evt = this.point.events[i];
                    if (evt !== this && !evt.segment.ringOut && evt.segment.isInResult()) {
                        events.push(evt);
                    }
                }
                return events;
            }
        },
        {
            key: "getLeftmostComparator",
            value: function getLeftmostComparator(baseEvent) {
                var _this = this;
                var cache = new Map();
                var fillCache = function fillCache2(linkedEvent) {
                    var nextEvent = linkedEvent.otherSE;
                    cache.set(linkedEvent, {
                        sine: sineOfAngle(_this.point, baseEvent.point, nextEvent.point),
                        cosine: cosineOfAngle(_this.point, baseEvent.point, nextEvent.point)
                    });
                };
                return function(a, b) {
                    if (!cache.has(a)) fillCache(a);
                    if (!cache.has(b)) fillCache(b);
                    var _cache$get = cache.get(a), asine = _cache$get.sine, acosine = _cache$get.cosine;
                    var _cache$get2 = cache.get(b), bsine = _cache$get2.sine, bcosine = _cache$get2.cosine;
                    if (asine >= 0 && bsine >= 0) {
                        if (acosine < bcosine) return 1;
                        if (acosine > bcosine) return -1;
                        return 0;
                    }
                    if (asine < 0 && bsine < 0) {
                        if (acosine < bcosine) return -1;
                        if (acosine > bcosine) return 1;
                        return 0;
                    }
                    if (bsine < asine) return -1;
                    if (bsine > asine) return 1;
                    return 0;
                };
            }
        }
    ]);
    return SweepEvent2;
}();
var segmentId = 0;
var Segment = function() {
    _createClass(Segment2, null, [
        {
            key: "compare",
            value: function compare(a, b) {
                var alx = a.leftSE.point.x;
                var blx = b.leftSE.point.x;
                var arx = a.rightSE.point.x;
                var brx = b.rightSE.point.x;
                if (brx < alx) return 1;
                if (arx < blx) return -1;
                var aly = a.leftSE.point.y;
                var bly = b.leftSE.point.y;
                var ary = a.rightSE.point.y;
                var bry = b.rightSE.point.y;
                if (alx < blx) {
                    if (bly < aly && bly < ary) return 1;
                    if (bly > aly && bly > ary) return -1;
                    var aCmpBLeft = a.comparePoint(b.leftSE.point);
                    if (aCmpBLeft < 0) return 1;
                    if (aCmpBLeft > 0) return -1;
                    var bCmpARight = b.comparePoint(a.rightSE.point);
                    if (bCmpARight !== 0) return bCmpARight;
                    return -1;
                }
                if (alx > blx) {
                    if (aly < bly && aly < bry) return -1;
                    if (aly > bly && aly > bry) return 1;
                    var bCmpALeft = b.comparePoint(a.leftSE.point);
                    if (bCmpALeft !== 0) return bCmpALeft;
                    var aCmpBRight = a.comparePoint(b.rightSE.point);
                    if (aCmpBRight < 0) return 1;
                    if (aCmpBRight > 0) return -1;
                    return 1;
                }
                if (aly < bly) return -1;
                if (aly > bly) return 1;
                if (arx < brx) {
                    var _bCmpARight = b.comparePoint(a.rightSE.point);
                    if (_bCmpARight !== 0) return _bCmpARight;
                }
                if (arx > brx) {
                    var _aCmpBRight = a.comparePoint(b.rightSE.point);
                    if (_aCmpBRight < 0) return 1;
                    if (_aCmpBRight > 0) return -1;
                }
                if (arx !== brx) {
                    var ay = ary - aly;
                    var ax = arx - alx;
                    var by = bry - bly;
                    var bx = brx - blx;
                    if (ay > ax && by < bx) return 1;
                    if (ay < ax && by > bx) return -1;
                }
                if (arx > brx) return 1;
                if (arx < brx) return -1;
                if (ary < bry) return -1;
                if (ary > bry) return 1;
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            }
        }
    ]);
    function Segment2(leftSE, rightSE, rings, windings) {
        _classCallCheck(this, Segment2);
        this.id = ++segmentId;
        this.leftSE = leftSE;
        leftSE.segment = this;
        leftSE.otherSE = rightSE;
        this.rightSE = rightSE;
        rightSE.segment = this;
        rightSE.otherSE = leftSE;
        this.rings = rings;
        this.windings = windings;
    }
    _createClass(Segment2, [
        {
            key: "replaceRightSE",
            value: function replaceRightSE(newRightSE) {
                this.rightSE = newRightSE;
                this.rightSE.segment = this;
                this.rightSE.otherSE = this.leftSE;
                this.leftSE.otherSE = this.rightSE;
            }
        },
        {
            key: "bbox",
            value: function bbox() {
                var y1 = this.leftSE.point.y;
                var y2 = this.rightSE.point.y;
                return {
                    ll: {
                        x: this.leftSE.point.x,
                        y: y1 < y2 ? y1 : y2
                    },
                    ur: {
                        x: this.rightSE.point.x,
                        y: y1 > y2 ? y1 : y2
                    }
                };
            }
        },
        {
            key: "vector",
            value: function vector() {
                return {
                    x: this.rightSE.point.x - this.leftSE.point.x,
                    y: this.rightSE.point.y - this.leftSE.point.y
                };
            }
        },
        {
            key: "isAnEndpoint",
            value: function isAnEndpoint(pt) {
                return pt.x === this.leftSE.point.x && pt.y === this.leftSE.point.y || pt.x === this.rightSE.point.x && pt.y === this.rightSE.point.y;
            }
        },
        {
            key: "comparePoint",
            value: function comparePoint(point) {
                if (this.isAnEndpoint(point)) return 0;
                var lPt = this.leftSE.point;
                var rPt = this.rightSE.point;
                var v = this.vector();
                if (lPt.x === rPt.x) {
                    if (point.x === lPt.x) return 0;
                    return point.x < lPt.x ? 1 : -1;
                }
                var yDist = (point.y - lPt.y) / v.y;
                var xFromYDist = lPt.x + yDist * v.x;
                if (point.x === xFromYDist) return 0;
                var xDist = (point.x - lPt.x) / v.x;
                var yFromXDist = lPt.y + xDist * v.y;
                if (point.y === yFromXDist) return 0;
                return point.y < yFromXDist ? -1 : 1;
            }
        },
        {
            key: "getIntersection",
            value: function getIntersection(other) {
                var tBbox = this.bbox();
                var oBbox = other.bbox();
                var bboxOverlap = getBboxOverlap(tBbox, oBbox);
                if (bboxOverlap === null) return null;
                var tlp = this.leftSE.point;
                var trp = this.rightSE.point;
                var olp = other.leftSE.point;
                var orp = other.rightSE.point;
                var touchesOtherLSE = isInBbox(tBbox, olp) && this.comparePoint(olp) === 0;
                var touchesThisLSE = isInBbox(oBbox, tlp) && other.comparePoint(tlp) === 0;
                var touchesOtherRSE = isInBbox(tBbox, orp) && this.comparePoint(orp) === 0;
                var touchesThisRSE = isInBbox(oBbox, trp) && other.comparePoint(trp) === 0;
                if (touchesThisLSE && touchesOtherLSE) {
                    if (touchesThisRSE && !touchesOtherRSE) return trp;
                    if (!touchesThisRSE && touchesOtherRSE) return orp;
                    return null;
                }
                if (touchesThisLSE) {
                    if (touchesOtherRSE) {
                        if (tlp.x === orp.x && tlp.y === orp.y) return null;
                    }
                    return tlp;
                }
                if (touchesOtherLSE) {
                    if (touchesThisRSE) {
                        if (trp.x === olp.x && trp.y === olp.y) return null;
                    }
                    return olp;
                }
                if (touchesThisRSE && touchesOtherRSE) return null;
                if (touchesThisRSE) return trp;
                if (touchesOtherRSE) return orp;
                var pt = intersection(tlp, this.vector(), olp, other.vector());
                if (pt === null) return null;
                if (!isInBbox(bboxOverlap, pt)) return null;
                return rounder.round(pt.x, pt.y);
            }
        },
        {
            key: "split",
            value: function split1(point) {
                var newEvents = [];
                var alreadyLinked = point.events !== void 0;
                var newLeftSE = new SweepEvent(point, true);
                var newRightSE = new SweepEvent(point, false);
                var oldRightSE = this.rightSE;
                this.replaceRightSE(newRightSE);
                newEvents.push(newRightSE);
                newEvents.push(newLeftSE);
                var newSeg = new Segment2(newLeftSE, oldRightSE, this.rings.slice(), this.windings.slice());
                if (SweepEvent.comparePoints(newSeg.leftSE.point, newSeg.rightSE.point) > 0) {
                    newSeg.swapEvents();
                }
                if (SweepEvent.comparePoints(this.leftSE.point, this.rightSE.point) > 0) {
                    this.swapEvents();
                }
                if (alreadyLinked) {
                    newLeftSE.checkForConsuming();
                    newRightSE.checkForConsuming();
                }
                return newEvents;
            }
        },
        {
            key: "swapEvents",
            value: function swapEvents() {
                var tmpEvt = this.rightSE;
                this.rightSE = this.leftSE;
                this.leftSE = tmpEvt;
                this.leftSE.isLeft = true;
                this.rightSE.isLeft = false;
                for(var i = 0, iMax = this.windings.length; i < iMax; i++){
                    this.windings[i] *= -1;
                }
            }
        },
        {
            key: "consume",
            value: function consume(other) {
                var consumer = this;
                var consumee = other;
                while(consumer.consumedBy){
                    consumer = consumer.consumedBy;
                }
                while(consumee.consumedBy){
                    consumee = consumee.consumedBy;
                }
                var cmp3 = Segment2.compare(consumer, consumee);
                if (cmp3 === 0) return;
                if (cmp3 > 0) {
                    var tmp = consumer;
                    consumer = consumee;
                    consumee = tmp;
                }
                if (consumer.prev === consumee) {
                    var _tmp = consumer;
                    consumer = consumee;
                    consumee = _tmp;
                }
                for(var i = 0, iMax = consumee.rings.length; i < iMax; i++){
                    var ring = consumee.rings[i];
                    var winding = consumee.windings[i];
                    var index2 = consumer.rings.indexOf(ring);
                    if (index2 === -1) {
                        consumer.rings.push(ring);
                        consumer.windings.push(winding);
                    } else consumer.windings[index2] += winding;
                }
                consumee.rings = null;
                consumee.windings = null;
                consumee.consumedBy = consumer;
                consumee.leftSE.consumedBy = consumer.leftSE;
                consumee.rightSE.consumedBy = consumer.rightSE;
            }
        },
        {
            key: "prevInResult",
            value: function prevInResult() {
                if (this._prevInResult !== void 0) return this._prevInResult;
                if (!this.prev) this._prevInResult = null;
                else if (this.prev.isInResult()) this._prevInResult = this.prev;
                else this._prevInResult = this.prev.prevInResult();
                return this._prevInResult;
            }
        },
        {
            key: "beforeState",
            value: function beforeState() {
                if (this._beforeState !== void 0) return this._beforeState;
                if (!this.prev) this._beforeState = {
                    rings: [],
                    windings: [],
                    multiPolys: []
                };
                else {
                    var seg = this.prev.consumedBy || this.prev;
                    this._beforeState = seg.afterState();
                }
                return this._beforeState;
            }
        },
        {
            key: "afterState",
            value: function afterState() {
                if (this._afterState !== void 0) return this._afterState;
                var beforeState = this.beforeState();
                this._afterState = {
                    rings: beforeState.rings.slice(0),
                    windings: beforeState.windings.slice(0),
                    multiPolys: []
                };
                var ringsAfter = this._afterState.rings;
                var windingsAfter = this._afterState.windings;
                var mpsAfter = this._afterState.multiPolys;
                for(var i = 0, iMax = this.rings.length; i < iMax; i++){
                    var ring = this.rings[i];
                    var winding = this.windings[i];
                    var index2 = ringsAfter.indexOf(ring);
                    if (index2 === -1) {
                        ringsAfter.push(ring);
                        windingsAfter.push(winding);
                    } else windingsAfter[index2] += winding;
                }
                var polysAfter = [];
                var polysExclude = [];
                for(var _i = 0, _iMax = ringsAfter.length; _i < _iMax; _i++){
                    if (windingsAfter[_i] === 0) continue;
                    var _ring = ringsAfter[_i];
                    var poly = _ring.poly;
                    if (polysExclude.indexOf(poly) !== -1) continue;
                    if (_ring.isExterior) polysAfter.push(poly);
                    else {
                        if (polysExclude.indexOf(poly) === -1) polysExclude.push(poly);
                        var _index = polysAfter.indexOf(_ring.poly);
                        if (_index !== -1) polysAfter.splice(_index, 1);
                    }
                }
                for(var _i2 = 0, _iMax2 = polysAfter.length; _i2 < _iMax2; _i2++){
                    var mp = polysAfter[_i2].multiPoly;
                    if (mpsAfter.indexOf(mp) === -1) mpsAfter.push(mp);
                }
                return this._afterState;
            }
        },
        {
            key: "isInResult",
            value: function isInResult() {
                if (this.consumedBy) return false;
                if (this._isInResult !== void 0) return this._isInResult;
                var mpsBefore = this.beforeState().multiPolys;
                var mpsAfter = this.afterState().multiPolys;
                switch(operation.type){
                    case "union":
                        {
                            var noBefores = mpsBefore.length === 0;
                            var noAfters = mpsAfter.length === 0;
                            this._isInResult = noBefores !== noAfters;
                            break;
                        }
                    case "intersection":
                        {
                            var least;
                            var most;
                            if (mpsBefore.length < mpsAfter.length) {
                                least = mpsBefore.length;
                                most = mpsAfter.length;
                            } else {
                                least = mpsAfter.length;
                                most = mpsBefore.length;
                            }
                            this._isInResult = most === operation.numMultiPolys && least < most;
                            break;
                        }
                    case "xor":
                        {
                            var diff = Math.abs(mpsBefore.length - mpsAfter.length);
                            this._isInResult = diff % 2 === 1;
                            break;
                        }
                    case "difference":
                        {
                            var isJustSubject = function isJustSubject2(mps) {
                                return mps.length === 1 && mps[0].isSubject;
                            };
                            this._isInResult = isJustSubject(mpsBefore) !== isJustSubject(mpsAfter);
                            break;
                        }
                    default:
                        throw new Error("Unrecognized operation type found ".concat(operation.type));
                }
                return this._isInResult;
            }
        }
    ], [
        {
            key: "fromRing",
            value: function fromRing(pt1, pt2, ring) {
                var leftPt, rightPt, winding;
                var cmpPts = SweepEvent.comparePoints(pt1, pt2);
                if (cmpPts < 0) {
                    leftPt = pt1;
                    rightPt = pt2;
                    winding = 1;
                } else if (cmpPts > 0) {
                    leftPt = pt2;
                    rightPt = pt1;
                    winding = -1;
                } else throw new Error("Tried to create degenerate segment at [".concat(pt1.x, ", ").concat(pt1.y, "]"));
                var leftSE = new SweepEvent(leftPt, true);
                var rightSE = new SweepEvent(rightPt, false);
                return new Segment2(leftSE, rightSE, [
                    ring
                ], [
                    winding
                ]);
            }
        }
    ]);
    return Segment2;
}();
var RingIn = function() {
    function RingIn2(geomRing, poly, isExterior) {
        _classCallCheck(this, RingIn2);
        if (!Array.isArray(geomRing) || geomRing.length === 0) {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        }
        this.poly = poly;
        this.isExterior = isExterior;
        this.segments = [];
        if (typeof geomRing[0][0] !== "number" || typeof geomRing[0][1] !== "number") {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        }
        var firstPoint = rounder.round(geomRing[0][0], geomRing[0][1]);
        this.bbox = {
            ll: {
                x: firstPoint.x,
                y: firstPoint.y
            },
            ur: {
                x: firstPoint.x,
                y: firstPoint.y
            }
        };
        var prevPoint = firstPoint;
        for(var i = 1, iMax = geomRing.length; i < iMax; i++){
            if (typeof geomRing[i][0] !== "number" || typeof geomRing[i][1] !== "number") {
                throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
            }
            var point = rounder.round(geomRing[i][0], geomRing[i][1]);
            if (point.x === prevPoint.x && point.y === prevPoint.y) continue;
            this.segments.push(Segment.fromRing(prevPoint, point, this));
            if (point.x < this.bbox.ll.x) this.bbox.ll.x = point.x;
            if (point.y < this.bbox.ll.y) this.bbox.ll.y = point.y;
            if (point.x > this.bbox.ur.x) this.bbox.ur.x = point.x;
            if (point.y > this.bbox.ur.y) this.bbox.ur.y = point.y;
            prevPoint = point;
        }
        if (firstPoint.x !== prevPoint.x || firstPoint.y !== prevPoint.y) {
            this.segments.push(Segment.fromRing(prevPoint, firstPoint, this));
        }
    }
    _createClass(RingIn2, [
        {
            key: "getSweepEvents",
            value: function getSweepEvents() {
                var sweepEvents = [];
                for(var i = 0, iMax = this.segments.length; i < iMax; i++){
                    var segment = this.segments[i];
                    sweepEvents.push(segment.leftSE);
                    sweepEvents.push(segment.rightSE);
                }
                return sweepEvents;
            }
        }
    ]);
    return RingIn2;
}();
var PolyIn = function() {
    function PolyIn2(geomPoly, multiPoly) {
        _classCallCheck(this, PolyIn2);
        if (!Array.isArray(geomPoly)) {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        }
        this.exteriorRing = new RingIn(geomPoly[0], this, true);
        this.bbox = {
            ll: {
                x: this.exteriorRing.bbox.ll.x,
                y: this.exteriorRing.bbox.ll.y
            },
            ur: {
                x: this.exteriorRing.bbox.ur.x,
                y: this.exteriorRing.bbox.ur.y
            }
        };
        this.interiorRings = [];
        for(var i = 1, iMax = geomPoly.length; i < iMax; i++){
            var ring = new RingIn(geomPoly[i], this, false);
            if (ring.bbox.ll.x < this.bbox.ll.x) this.bbox.ll.x = ring.bbox.ll.x;
            if (ring.bbox.ll.y < this.bbox.ll.y) this.bbox.ll.y = ring.bbox.ll.y;
            if (ring.bbox.ur.x > this.bbox.ur.x) this.bbox.ur.x = ring.bbox.ur.x;
            if (ring.bbox.ur.y > this.bbox.ur.y) this.bbox.ur.y = ring.bbox.ur.y;
            this.interiorRings.push(ring);
        }
        this.multiPoly = multiPoly;
    }
    _createClass(PolyIn2, [
        {
            key: "getSweepEvents",
            value: function getSweepEvents() {
                var sweepEvents = this.exteriorRing.getSweepEvents();
                for(var i = 0, iMax = this.interiorRings.length; i < iMax; i++){
                    var ringSweepEvents = this.interiorRings[i].getSweepEvents();
                    for(var j = 0, jMax = ringSweepEvents.length; j < jMax; j++){
                        sweepEvents.push(ringSweepEvents[j]);
                    }
                }
                return sweepEvents;
            }
        }
    ]);
    return PolyIn2;
}();
var MultiPolyIn = function() {
    function MultiPolyIn2(geom, isSubject) {
        _classCallCheck(this, MultiPolyIn2);
        if (!Array.isArray(geom)) {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
        }
        try {
            if (typeof geom[0][0][0] === "number") geom = [
                geom
            ];
        } catch (ex) {
        }
        this.polys = [];
        this.bbox = {
            ll: {
                x: Number.POSITIVE_INFINITY,
                y: Number.POSITIVE_INFINITY
            },
            ur: {
                x: Number.NEGATIVE_INFINITY,
                y: Number.NEGATIVE_INFINITY
            }
        };
        for(var i = 0, iMax = geom.length; i < iMax; i++){
            var poly = new PolyIn(geom[i], this);
            if (poly.bbox.ll.x < this.bbox.ll.x) this.bbox.ll.x = poly.bbox.ll.x;
            if (poly.bbox.ll.y < this.bbox.ll.y) this.bbox.ll.y = poly.bbox.ll.y;
            if (poly.bbox.ur.x > this.bbox.ur.x) this.bbox.ur.x = poly.bbox.ur.x;
            if (poly.bbox.ur.y > this.bbox.ur.y) this.bbox.ur.y = poly.bbox.ur.y;
            this.polys.push(poly);
        }
        this.isSubject = isSubject;
    }
    _createClass(MultiPolyIn2, [
        {
            key: "getSweepEvents",
            value: function getSweepEvents() {
                var sweepEvents = [];
                for(var i = 0, iMax = this.polys.length; i < iMax; i++){
                    var polySweepEvents = this.polys[i].getSweepEvents();
                    for(var j = 0, jMax = polySweepEvents.length; j < jMax; j++){
                        sweepEvents.push(polySweepEvents[j]);
                    }
                }
                return sweepEvents;
            }
        }
    ]);
    return MultiPolyIn2;
}();
var RingOut = function() {
    _createClass(RingOut2, null, [
        {
            key: "factory",
            value: function factory(allSegments) {
                var ringsOut = [];
                for(var i = 0, iMax = allSegments.length; i < iMax; i++){
                    var segment = allSegments[i];
                    if (!segment.isInResult() || segment.ringOut) continue;
                    var prevEvent = null;
                    var event = segment.leftSE;
                    var nextEvent = segment.rightSE;
                    var events = [
                        event
                    ];
                    var startingPoint = event.point;
                    var intersectionLEs = [];
                    while(true){
                        prevEvent = event;
                        event = nextEvent;
                        events.push(event);
                        if (event.point === startingPoint) break;
                        while(true){
                            var availableLEs = event.getAvailableLinkedEvents();
                            if (availableLEs.length === 0) {
                                var firstPt = events[0].point;
                                var lastPt = events[events.length - 1].point;
                                throw new Error("Unable to complete output ring starting at [".concat(firstPt.x, ",") + " ".concat(firstPt.y, "]. Last matching segment found ends at") + " [".concat(lastPt.x, ", ").concat(lastPt.y, "]."));
                            }
                            if (availableLEs.length === 1) {
                                nextEvent = availableLEs[0].otherSE;
                                break;
                            }
                            var indexLE = null;
                            for(var j = 0, jMax = intersectionLEs.length; j < jMax; j++){
                                if (intersectionLEs[j].point === event.point) {
                                    indexLE = j;
                                    break;
                                }
                            }
                            if (indexLE !== null) {
                                var intersectionLE = intersectionLEs.splice(indexLE)[0];
                                var ringEvents = events.splice(intersectionLE.index);
                                ringEvents.unshift(ringEvents[0].otherSE);
                                ringsOut.push(new RingOut2(ringEvents.reverse()));
                                continue;
                            }
                            intersectionLEs.push({
                                index: events.length,
                                point: event.point
                            });
                            var comparator = event.getLeftmostComparator(prevEvent);
                            nextEvent = availableLEs.sort(comparator)[0].otherSE;
                            break;
                        }
                    }
                    ringsOut.push(new RingOut2(events));
                }
                return ringsOut;
            }
        }
    ]);
    function RingOut2(events) {
        _classCallCheck(this, RingOut2);
        this.events = events;
        for(var i = 0, iMax = events.length; i < iMax; i++){
            events[i].segment.ringOut = this;
        }
        this.poly = null;
    }
    _createClass(RingOut2, [
        {
            key: "getGeom",
            value: function getGeom() {
                var prevPt = this.events[0].point;
                var points = [
                    prevPt
                ];
                for(var i = 1, iMax = this.events.length - 1; i < iMax; i++){
                    var _pt = this.events[i].point;
                    var _nextPt = this.events[i + 1].point;
                    if (compareVectorAngles(_pt, prevPt, _nextPt) === 0) continue;
                    points.push(_pt);
                    prevPt = _pt;
                }
                if (points.length === 1) return null;
                var pt = points[0];
                var nextPt = points[1];
                if (compareVectorAngles(pt, prevPt, nextPt) === 0) points.shift();
                points.push(points[0]);
                var step = this.isExteriorRing() ? 1 : -1;
                var iStart = this.isExteriorRing() ? 0 : points.length - 1;
                var iEnd = this.isExteriorRing() ? points.length : -1;
                var orderedPoints = [];
                for(var _i = iStart; _i != iEnd; _i += step){
                    orderedPoints.push([
                        points[_i].x,
                        points[_i].y
                    ]);
                }
                return orderedPoints;
            }
        },
        {
            key: "isExteriorRing",
            value: function isExteriorRing() {
                if (this._isExteriorRing === void 0) {
                    var enclosing = this.enclosingRing();
                    this._isExteriorRing = enclosing ? !enclosing.isExteriorRing() : true;
                }
                return this._isExteriorRing;
            }
        },
        {
            key: "enclosingRing",
            value: function enclosingRing() {
                if (this._enclosingRing === void 0) {
                    this._enclosingRing = this._calcEnclosingRing();
                }
                return this._enclosingRing;
            }
        },
        {
            key: "_calcEnclosingRing",
            value: function _calcEnclosingRing() {
                var leftMostEvt = this.events[0];
                for(var i = 1, iMax = this.events.length; i < iMax; i++){
                    var evt = this.events[i];
                    if (SweepEvent.compare(leftMostEvt, evt) > 0) leftMostEvt = evt;
                }
                var prevSeg = leftMostEvt.segment.prevInResult();
                var prevPrevSeg = prevSeg ? prevSeg.prevInResult() : null;
                while(true){
                    if (!prevSeg) return null;
                    if (!prevPrevSeg) return prevSeg.ringOut;
                    if (prevPrevSeg.ringOut !== prevSeg.ringOut) {
                        if (prevPrevSeg.ringOut.enclosingRing() !== prevSeg.ringOut) {
                            return prevSeg.ringOut;
                        } else return prevSeg.ringOut.enclosingRing();
                    }
                    prevSeg = prevPrevSeg.prevInResult();
                    prevPrevSeg = prevSeg ? prevSeg.prevInResult() : null;
                }
            }
        }
    ]);
    return RingOut2;
}();
var PolyOut = function() {
    function PolyOut2(exteriorRing) {
        _classCallCheck(this, PolyOut2);
        this.exteriorRing = exteriorRing;
        exteriorRing.poly = this;
        this.interiorRings = [];
    }
    _createClass(PolyOut2, [
        {
            key: "addInterior",
            value: function addInterior(ring) {
                this.interiorRings.push(ring);
                ring.poly = this;
            }
        },
        {
            key: "getGeom",
            value: function getGeom() {
                var geom = [
                    this.exteriorRing.getGeom()
                ];
                if (geom[0] === null) return null;
                for(var i = 0, iMax = this.interiorRings.length; i < iMax; i++){
                    var ringGeom = this.interiorRings[i].getGeom();
                    if (ringGeom === null) continue;
                    geom.push(ringGeom);
                }
                return geom;
            }
        }
    ]);
    return PolyOut2;
}();
var MultiPolyOut = function() {
    function MultiPolyOut2(rings) {
        _classCallCheck(this, MultiPolyOut2);
        this.rings = rings;
        this.polys = this._composePolys(rings);
    }
    _createClass(MultiPolyOut2, [
        {
            key: "getGeom",
            value: function getGeom() {
                var geom = [];
                for(var i = 0, iMax = this.polys.length; i < iMax; i++){
                    var polyGeom = this.polys[i].getGeom();
                    if (polyGeom === null) continue;
                    geom.push(polyGeom);
                }
                return geom;
            }
        },
        {
            key: "_composePolys",
            value: function _composePolys(rings) {
                var polys = [];
                for(var i = 0, iMax = rings.length; i < iMax; i++){
                    var ring = rings[i];
                    if (ring.poly) continue;
                    if (ring.isExteriorRing()) polys.push(new PolyOut(ring));
                    else {
                        var enclosingRing = ring.enclosingRing();
                        if (!enclosingRing.poly) polys.push(new PolyOut(enclosingRing));
                        enclosingRing.poly.addInterior(ring);
                    }
                }
                return polys;
            }
        }
    ]);
    return MultiPolyOut2;
}();
var SweepLine = function() {
    function SweepLine2(queue2) {
        var comparator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Segment.compare;
        _classCallCheck(this, SweepLine2);
        this.queue = queue2;
        this.tree = new Tree(comparator);
        this.segments = [];
    }
    _createClass(SweepLine2, [
        {
            key: "process",
            value: function process2(event) {
                var segment = event.segment;
                var newEvents = [];
                if (event.consumedBy) {
                    if (event.isLeft) this.queue.remove(event.otherSE);
                    else this.tree.remove(segment);
                    return newEvents;
                }
                var node = event.isLeft ? this.tree.insert(segment) : this.tree.find(segment);
                if (!node) throw new Error("Unable to find segment #".concat(segment.id, " ") + "[".concat(segment.leftSE.point.x, ", ").concat(segment.leftSE.point.y, "] -> ") + "[".concat(segment.rightSE.point.x, ", ").concat(segment.rightSE.point.y, "] ") + "in SweepLine tree. Please submit a bug report.");
                var prevNode = node;
                var nextNode = node;
                var prevSeg = void 0;
                var nextSeg = void 0;
                while(prevSeg === void 0){
                    prevNode = this.tree.prev(prevNode);
                    if (prevNode === null) prevSeg = null;
                    else if (prevNode.key.consumedBy === void 0) prevSeg = prevNode.key;
                }
                while(nextSeg === void 0){
                    nextNode = this.tree.next(nextNode);
                    if (nextNode === null) nextSeg = null;
                    else if (nextNode.key.consumedBy === void 0) nextSeg = nextNode.key;
                }
                if (event.isLeft) {
                    var prevMySplitter = null;
                    if (prevSeg) {
                        var prevInter = prevSeg.getIntersection(segment);
                        if (prevInter !== null) {
                            if (!segment.isAnEndpoint(prevInter)) prevMySplitter = prevInter;
                            if (!prevSeg.isAnEndpoint(prevInter)) {
                                var newEventsFromSplit = this._splitSafely(prevSeg, prevInter);
                                for(var i = 0, iMax = newEventsFromSplit.length; i < iMax; i++){
                                    newEvents.push(newEventsFromSplit[i]);
                                }
                            }
                        }
                    }
                    var nextMySplitter = null;
                    if (nextSeg) {
                        var nextInter = nextSeg.getIntersection(segment);
                        if (nextInter !== null) {
                            if (!segment.isAnEndpoint(nextInter)) nextMySplitter = nextInter;
                            if (!nextSeg.isAnEndpoint(nextInter)) {
                                var _newEventsFromSplit = this._splitSafely(nextSeg, nextInter);
                                for(var _i = 0, _iMax = _newEventsFromSplit.length; _i < _iMax; _i++){
                                    newEvents.push(_newEventsFromSplit[_i]);
                                }
                            }
                        }
                    }
                    if (prevMySplitter !== null || nextMySplitter !== null) {
                        var mySplitter = null;
                        if (prevMySplitter === null) mySplitter = nextMySplitter;
                        else if (nextMySplitter === null) mySplitter = prevMySplitter;
                        else {
                            var cmpSplitters = SweepEvent.comparePoints(prevMySplitter, nextMySplitter);
                            mySplitter = cmpSplitters <= 0 ? prevMySplitter : nextMySplitter;
                        }
                        this.queue.remove(segment.rightSE);
                        newEvents.push(segment.rightSE);
                        var _newEventsFromSplit2 = segment.split(mySplitter);
                        for(var _i2 = 0, _iMax2 = _newEventsFromSplit2.length; _i2 < _iMax2; _i2++){
                            newEvents.push(_newEventsFromSplit2[_i2]);
                        }
                    }
                    if (newEvents.length > 0) {
                        this.tree.remove(segment);
                        newEvents.push(event);
                    } else {
                        this.segments.push(segment);
                        segment.prev = prevSeg;
                    }
                } else {
                    if (prevSeg && nextSeg) {
                        var inter = prevSeg.getIntersection(nextSeg);
                        if (inter !== null) {
                            if (!prevSeg.isAnEndpoint(inter)) {
                                var _newEventsFromSplit3 = this._splitSafely(prevSeg, inter);
                                for(var _i3 = 0, _iMax3 = _newEventsFromSplit3.length; _i3 < _iMax3; _i3++){
                                    newEvents.push(_newEventsFromSplit3[_i3]);
                                }
                            }
                            if (!nextSeg.isAnEndpoint(inter)) {
                                var _newEventsFromSplit4 = this._splitSafely(nextSeg, inter);
                                for(var _i4 = 0, _iMax4 = _newEventsFromSplit4.length; _i4 < _iMax4; _i4++){
                                    newEvents.push(_newEventsFromSplit4[_i4]);
                                }
                            }
                        }
                    }
                    this.tree.remove(segment);
                }
                return newEvents;
            }
        },
        {
            key: "_splitSafely",
            value: function _splitSafely(seg, pt) {
                this.tree.remove(seg);
                var rightSE = seg.rightSE;
                this.queue.remove(rightSE);
                var newEvents = seg.split(pt);
                newEvents.push(rightSE);
                if (seg.consumedBy === void 0) this.tree.insert(seg);
                return newEvents;
            }
        }
    ]);
    return SweepLine2;
}();
var POLYGON_CLIPPING_MAX_QUEUE_SIZE = typeof process !== "undefined" && process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE || 1000000;
var POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS = typeof process !== "undefined" && process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS || 1000000;
var Operation = function() {
    function Operation2() {
        _classCallCheck(this, Operation2);
    }
    _createClass(Operation2, [
        {
            key: "run",
            value: function run(type, geom, moreGeoms) {
                operation.type = type;
                rounder.reset();
                var multipolys = [
                    new MultiPolyIn(geom, true)
                ];
                for(var i = 0, iMax = moreGeoms.length; i < iMax; i++){
                    multipolys.push(new MultiPolyIn(moreGeoms[i], false));
                }
                operation.numMultiPolys = multipolys.length;
                if (operation.type === "difference") {
                    var subject = multipolys[0];
                    var _i = 1;
                    while(_i < multipolys.length){
                        if (getBboxOverlap(multipolys[_i].bbox, subject.bbox) !== null) _i++;
                        else multipolys.splice(_i, 1);
                    }
                }
                if (operation.type === "intersection") {
                    for(var _i2 = 0, _iMax = multipolys.length; _i2 < _iMax; _i2++){
                        var mpA = multipolys[_i2];
                        for(var j = _i2 + 1, jMax = multipolys.length; j < jMax; j++){
                            if (getBboxOverlap(mpA.bbox, multipolys[j].bbox) === null) return [];
                        }
                    }
                }
                var queue2 = new Tree(SweepEvent.compare);
                for(var _i3 = 0, _iMax2 = multipolys.length; _i3 < _iMax2; _i3++){
                    var sweepEvents = multipolys[_i3].getSweepEvents();
                    for(var _j = 0, _jMax = sweepEvents.length; _j < _jMax; _j++){
                        queue2.insert(sweepEvents[_j]);
                        if (queue2.size > POLYGON_CLIPPING_MAX_QUEUE_SIZE) {
                            throw new Error("Infinite loop when putting segment endpoints in a priority queue (queue size too big). Please file a bug report.");
                        }
                    }
                }
                var sweepLine = new SweepLine(queue2);
                var prevQueueSize = queue2.size;
                var node = queue2.pop();
                while(node){
                    var evt = node.key;
                    if (queue2.size === prevQueueSize) {
                        var seg = evt.segment;
                        throw new Error("Unable to pop() ".concat(evt.isLeft ? "left" : "right", " SweepEvent ") + "[".concat(evt.point.x, ", ").concat(evt.point.y, "] from segment #").concat(seg.id, " ") + "[".concat(seg.leftSE.point.x, ", ").concat(seg.leftSE.point.y, "] -> ") + "[".concat(seg.rightSE.point.x, ", ").concat(seg.rightSE.point.y, "] from queue. ") + "Please file a bug report.");
                    }
                    if (queue2.size > POLYGON_CLIPPING_MAX_QUEUE_SIZE) {
                        throw new Error("Infinite loop when passing sweep line over endpoints (queue size too big). Please file a bug report.");
                    }
                    if (sweepLine.segments.length > POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS) {
                        throw new Error("Infinite loop when passing sweep line over endpoints (too many sweep line segments). Please file a bug report.");
                    }
                    var newEvents = sweepLine.process(evt);
                    for(var _i4 = 0, _iMax3 = newEvents.length; _i4 < _iMax3; _i4++){
                        var _evt = newEvents[_i4];
                        if (_evt.consumedBy === void 0) queue2.insert(_evt);
                    }
                    prevQueueSize = queue2.size;
                    node = queue2.pop();
                }
                rounder.reset();
                var ringsOut = RingOut.factory(sweepLine.segments);
                var result = new MultiPolyOut(ringsOut);
                return result.getGeom();
            }
        }
    ]);
    return Operation2;
}();
var operation = new Operation();
var union = function union2(geom) {
    for(var _len = arguments.length, moreGeoms = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        moreGeoms[_key - 1] = arguments[_key];
    }
    return operation.run("union", geom, moreGeoms);
};
var intersection$1 = function intersection3(geom) {
    for(var _len2 = arguments.length, moreGeoms = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
        moreGeoms[_key2 - 1] = arguments[_key2];
    }
    return operation.run("intersection", geom, moreGeoms);
};
var xor = function xor2(geom) {
    for(var _len3 = arguments.length, moreGeoms = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++){
        moreGeoms[_key3 - 1] = arguments[_key3];
    }
    return operation.run("xor", geom, moreGeoms);
};
var difference = function difference2(subjectGeom) {
    for(var _len4 = arguments.length, clippingGeoms = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++){
        clippingGeoms[_key4 - 1] = arguments[_key4];
    }
    return operation.run("difference", subjectGeom, clippingGeoms);
};
var index = {
    union,
    intersection: intersection$1,
    xor,
    difference
};
let System, __instantiateAsync, __instantiate;
(()=>{
    const r = new Map();
    System = {
        register (id, d, f) {
            r.set(id, {
                d,
                f,
                exp: {
                }
            });
        }
    };
    async function dI(mid, src) {
        let id = mid.replace(/\.\w+$/i, "");
        if (id.includes("./")) {
            const [o, ...ia] = id.split("/").reverse(), [, ...sa] = src.split("/").reverse(), oa = [
                o
            ];
            let s = 0, i;
            while(i = ia.shift()){
                if (i === "..") s++;
                else if (i === ".") break;
                else oa.push(i);
            }
            if (s < sa.length) oa.push(...sa.slice(s));
            id = oa.reverse().join("/");
        }
        return r.has(id) ? gExpA(id) : import(mid);
    }
    function gC(id, main) {
        return {
            id,
            import: (m)=>dI(m, id)
            ,
            meta: {
                url: id,
                main
            }
        };
    }
    function gE(exp) {
        return (id, v)=>{
            v = typeof id === "string" ? {
                [id]: v
            } : id;
            for (const [id1, value] of Object.entries(v)){
                Object.defineProperty(exp, id1, {
                    value,
                    writable: true,
                    enumerable: true
                });
            }
        };
    }
    function rF(main) {
        for (const [id, m] of r.entries()){
            const { f , exp  } = m;
            const { execute: e , setters: s  } = f(gE(exp), gC(id, id === main));
            delete m.f;
            m.e = e;
            m.s = s;
        }
    }
    async function gExpA(id) {
        if (!r.has(id)) return;
        const m = r.get(id);
        if (m.s) {
            const { d , e , s  } = m;
            delete m.s;
            delete m.e;
            for(let i = 0; i < s.length; i++)s[i](await gExpA(d[i]));
            const r1 = e();
            if (r1) await r1;
        }
        return m.exp;
    }
    function gExp(id) {
        if (!r.has(id)) return;
        const m = r.get(id);
        if (m.s) {
            const { d , e , s  } = m;
            delete m.s;
            delete m.e;
            for(let i = 0; i < s.length; i++)s[i](gExp(d[i]));
            e();
        }
        return m.exp;
    }
    __instantiateAsync = async (m)=>{
        System = __instantiateAsync = __instantiate = undefined;
        rF(m);
        return gExpA(m);
    };
    __instantiate = (m)=>{
        System = __instantiateAsync = __instantiate = undefined;
        rF(m);
        return gExp(m);
    };
})();
System.register("-/clipper-lib@v6.4.2-JisZmmhC7gDAFmHQLYDu/dist=es2020/clipper-lib", [], function(exports_1, context_1) {
    "use strict";
    var clipper, __esModule;
    var __moduleName = context_1 && context_1.id;
    function createCommonjsModule(fn, basedir, module) {
        return module = {
            path: basedir,
            exports: {
            },
            require: function(path, base) {
                return commonjsRequire(path, base === undefined || base === null ? module.path : base);
            }
        }, fn(module, module.exports), module.exports;
    }
    function commonjsRequire() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }
    return {
        setters: [],
        execute: function() {
            clipper = createCommonjsModule(function(module) {
                (function() {
                    var ClipperLib = {
                    };
                    ClipperLib.version = "6.4.2.2";
                    ClipperLib.use_lines = true;
                    ClipperLib.use_xyz = false;
                    var isNode = false;
                    if (module.exports) {
                        module.exports = ClipperLib;
                        isNode = true;
                    } else {
                        if (typeof document !== "undefined") {
                            window.ClipperLib = ClipperLib;
                        } else {
                            self["ClipperLib"] = ClipperLib;
                        }
                    }
                    var navigator_appName;
                    if (!isNode) {
                        var nav = navigator.userAgent.toString().toLowerCase();
                        navigator_appName = navigator.appName;
                    } else {
                        var nav = "chrome";
                        navigator_appName = "Netscape";
                    }
                    var browser1 = {
                    };
                    if (nav.indexOf("chrome") != -1 && nav.indexOf("chromium") == -1) {
                        browser1.chrome = 1;
                    } else {
                        browser1.chrome = 0;
                    }
                    if (nav.indexOf("chromium") != -1) {
                        browser1.chromium = 1;
                    } else {
                        browser1.chromium = 0;
                    }
                    if (nav.indexOf("safari") != -1 && nav.indexOf("chrome") == -1 && nav.indexOf("chromium") == -1) {
                        browser1.safari = 1;
                    } else {
                        browser1.safari = 0;
                    }
                    if (nav.indexOf("firefox") != -1) {
                        browser1.firefox = 1;
                    } else {
                        browser1.firefox = 0;
                    }
                    if (nav.indexOf("firefox/17") != -1) {
                        browser1.firefox17 = 1;
                    } else {
                        browser1.firefox17 = 0;
                    }
                    if (nav.indexOf("firefox/15") != -1) {
                        browser1.firefox15 = 1;
                    } else {
                        browser1.firefox15 = 0;
                    }
                    if (nav.indexOf("firefox/3") != -1) {
                        browser1.firefox3 = 1;
                    } else {
                        browser1.firefox3 = 0;
                    }
                    if (nav.indexOf("opera") != -1) {
                        browser1.opera = 1;
                    } else {
                        browser1.opera = 0;
                    }
                    if (nav.indexOf("msie 10") != -1) {
                        browser1.msie10 = 1;
                    } else {
                        browser1.msie10 = 0;
                    }
                    if (nav.indexOf("msie 9") != -1) {
                        browser1.msie9 = 1;
                    } else {
                        browser1.msie9 = 0;
                    }
                    if (nav.indexOf("msie 8") != -1) {
                        browser1.msie8 = 1;
                    } else {
                        browser1.msie8 = 0;
                    }
                    if (nav.indexOf("msie 7") != -1) {
                        browser1.msie7 = 1;
                    } else {
                        browser1.msie7 = 0;
                    }
                    if (nav.indexOf("msie ") != -1) {
                        browser1.msie = 1;
                    } else {
                        browser1.msie = 0;
                    }
                    ClipperLib.biginteger_used = null;
                    var dbits;
                    function BigInteger(a, b, c) {
                        ClipperLib.biginteger_used = 1;
                        if (a != null) {
                            if ("number" == typeof a && "undefined" == typeof b) {
                                this.fromInt(a);
                            } else if ("number" == typeof a) {
                                this.fromNumber(a, b, c);
                            } else if (b == null && "string" != typeof a) {
                                this.fromString(a, 256);
                            } else {
                                this.fromString(a, b);
                            }
                        }
                    }
                    function nbi() {
                        return new BigInteger(null, undefined, undefined);
                    }
                    function am1(i, x, w, j, c, n) {
                        while((--n) >= 0){
                            var v = x * this[i++] + w[j] + c;
                            c = Math.floor(v / 67108864);
                            w[j++] = v & 67108863;
                        }
                        return c;
                    }
                    function am2(i, x, w, j, c, n) {
                        var xl = x & 32767, xh = x >> 15;
                        while((--n) >= 0){
                            var l = this[i] & 32767;
                            var h = this[i++] >> 15;
                            var m = xh * l + h * xl;
                            l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
                            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
                            w[j++] = l & 1073741823;
                        }
                        return c;
                    }
                    function am3(i, x, w, j, c, n) {
                        var xl = x & 16383, xh = x >> 14;
                        while((--n) >= 0){
                            var l = this[i] & 16383;
                            var h = this[i++] >> 14;
                            var m = xh * l + h * xl;
                            l = xl * l + ((m & 16383) << 14) + w[j] + c;
                            c = (l >> 28) + (m >> 14) + xh * h;
                            w[j++] = l & 268435455;
                        }
                        return c;
                    }
                    if (navigator_appName == "Microsoft Internet Explorer") {
                        BigInteger.prototype.am = am2;
                        dbits = 30;
                    } else if (navigator_appName != "Netscape") {
                        BigInteger.prototype.am = am1;
                        dbits = 26;
                    } else {
                        BigInteger.prototype.am = am3;
                        dbits = 28;
                    }
                    BigInteger.prototype.DB = dbits;
                    BigInteger.prototype.DM = (1 << dbits) - 1;
                    BigInteger.prototype.DV = 1 << dbits;
                    var BI_FP = 52;
                    BigInteger.prototype.FV = Math.pow(2, BI_FP);
                    BigInteger.prototype.F1 = BI_FP - dbits;
                    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
                    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
                    var BI_RC = new Array();
                    var rr, vv;
                    rr = "0".charCodeAt(0);
                    for(vv = 0; vv <= 9; ++vv){
                        BI_RC[rr++] = vv;
                    }
                    rr = "a".charCodeAt(0);
                    for(vv = 10; vv < 36; ++vv){
                        BI_RC[rr++] = vv;
                    }
                    rr = "A".charCodeAt(0);
                    for(vv = 10; vv < 36; ++vv){
                        BI_RC[rr++] = vv;
                    }
                    function int2char(n) {
                        return BI_RM.charAt(n);
                    }
                    function intAt(s, i) {
                        var c = BI_RC[s.charCodeAt(i)];
                        return c == null ? -1 : c;
                    }
                    function bnpCopyTo(r) {
                        for(var i = this.t - 1; i >= 0; --i){
                            r[i] = this[i];
                        }
                        r.t = this.t;
                        r.s = this.s;
                    }
                    function bnpFromInt(x) {
                        this.t = 1;
                        this.s = x < 0 ? -1 : 0;
                        if (x > 0) {
                            this[0] = x;
                        } else if (x < -1) {
                            this[0] = x + this.DV;
                        } else {
                            this.t = 0;
                        }
                    }
                    function nbv(i) {
                        var r = nbi();
                        r.fromInt(i);
                        return r;
                    }
                    function bnpFromString(s, b) {
                        var k;
                        if (b == 16) {
                            k = 4;
                        } else if (b == 8) {
                            k = 3;
                        } else if (b == 256) {
                            k = 8;
                        } else if (b == 2) {
                            k = 1;
                        } else if (b == 32) {
                            k = 5;
                        } else if (b == 4) {
                            k = 2;
                        } else {
                            this.fromRadix(s, b);
                            return;
                        }
                        this.t = 0;
                        this.s = 0;
                        var i = s.length, mi = false, sh = 0;
                        while((--i) >= 0){
                            var x = k == 8 ? s[i] & 255 : intAt(s, i);
                            if (x < 0) {
                                if (s.charAt(i) == "-") {
                                    mi = true;
                                }
                                continue;
                            }
                            mi = false;
                            if (sh == 0) {
                                this[this.t++] = x;
                            } else if (sh + k > this.DB) {
                                this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
                                this[this.t++] = x >> this.DB - sh;
                            } else {
                                this[this.t - 1] |= x << sh;
                            }
                            sh += k;
                            if (sh >= this.DB) {
                                sh -= this.DB;
                            }
                        }
                        if (k == 8 && (s[0] & 128) != 0) {
                            this.s = -1;
                            if (sh > 0) {
                                this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
                            }
                        }
                        this.clamp();
                        if (mi) {
                            BigInteger.ZERO.subTo(this, this);
                        }
                    }
                    function bnpClamp() {
                        var c = this.s & this.DM;
                        while(this.t > 0 && this[this.t - 1] == c){
                            --this.t;
                        }
                    }
                    function bnToString(b) {
                        if (this.s < 0) {
                            return "-" + this.negate().toString(b);
                        }
                        var k;
                        if (b == 16) {
                            k = 4;
                        } else if (b == 8) {
                            k = 3;
                        } else if (b == 2) {
                            k = 1;
                        } else if (b == 32) {
                            k = 5;
                        } else if (b == 4) {
                            k = 2;
                        } else {
                            return this.toRadix(b);
                        }
                        var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
                        var p = this.DB - i * this.DB % k;
                        if ((i--) > 0) {
                            if (p < this.DB && (d = this[i] >> p) > 0) {
                                m = true;
                                r = int2char(d);
                            }
                            while(i >= 0){
                                if (p < k) {
                                    d = (this[i] & (1 << p) - 1) << k - p;
                                    d |= this[--i] >> (p += this.DB - k);
                                } else {
                                    d = this[i] >> (p -= k) & km;
                                    if (p <= 0) {
                                        p += this.DB;
                                        --i;
                                    }
                                }
                                if (d > 0) {
                                    m = true;
                                }
                                if (m) {
                                    r += int2char(d);
                                }
                            }
                        }
                        return m ? r : "0";
                    }
                    function bnNegate() {
                        var r = nbi();
                        BigInteger.ZERO.subTo(this, r);
                        return r;
                    }
                    function bnAbs() {
                        return this.s < 0 ? this.negate() : this;
                    }
                    function bnCompareTo(a) {
                        var r = this.s - a.s;
                        if (r != 0) {
                            return r;
                        }
                        var i = this.t;
                        r = i - a.t;
                        if (r != 0) {
                            return this.s < 0 ? -r : r;
                        }
                        while((--i) >= 0){
                            if ((r = this[i] - a[i]) != 0) {
                                return r;
                            }
                        }
                        return 0;
                    }
                    function nbits(x) {
                        var r = 1, t;
                        if ((t = x >>> 16) != 0) {
                            x = t;
                            r += 16;
                        }
                        if ((t = x >> 8) != 0) {
                            x = t;
                            r += 8;
                        }
                        if ((t = x >> 4) != 0) {
                            x = t;
                            r += 4;
                        }
                        if ((t = x >> 2) != 0) {
                            x = t;
                            r += 2;
                        }
                        if ((t = x >> 1) != 0) {
                            x = t;
                            r += 1;
                        }
                        return r;
                    }
                    function bnBitLength() {
                        if (this.t <= 0) {
                            return 0;
                        }
                        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
                    }
                    function bnpDLShiftTo(n, r) {
                        var i;
                        for(i = this.t - 1; i >= 0; --i){
                            r[i + n] = this[i];
                        }
                        for(i = n - 1; i >= 0; --i){
                            r[i] = 0;
                        }
                        r.t = this.t + n;
                        r.s = this.s;
                    }
                    function bnpDRShiftTo(n, r) {
                        for(var i = n; i < this.t; ++i){
                            r[i - n] = this[i];
                        }
                        r.t = Math.max(this.t - n, 0);
                        r.s = this.s;
                    }
                    function bnpLShiftTo(n, r) {
                        var bs = n % this.DB;
                        var cbs = this.DB - bs;
                        var bm = (1 << cbs) - 1;
                        var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i;
                        for(i = this.t - 1; i >= 0; --i){
                            r[i + ds + 1] = this[i] >> cbs | c;
                            c = (this[i] & bm) << bs;
                        }
                        for(i = ds - 1; i >= 0; --i){
                            r[i] = 0;
                        }
                        r[ds] = c;
                        r.t = this.t + ds + 1;
                        r.s = this.s;
                        r.clamp();
                    }
                    function bnpRShiftTo(n, r) {
                        r.s = this.s;
                        var ds = Math.floor(n / this.DB);
                        if (ds >= this.t) {
                            r.t = 0;
                            return;
                        }
                        var bs = n % this.DB;
                        var cbs = this.DB - bs;
                        var bm = (1 << bs) - 1;
                        r[0] = this[ds] >> bs;
                        for(var i = ds + 1; i < this.t; ++i){
                            r[i - ds - 1] |= (this[i] & bm) << cbs;
                            r[i - ds] = this[i] >> bs;
                        }
                        if (bs > 0) {
                            r[this.t - ds - 1] |= (this.s & bm) << cbs;
                        }
                        r.t = this.t - ds;
                        r.clamp();
                    }
                    function bnpSubTo(a, r) {
                        var i = 0, c = 0, m = Math.min(a.t, this.t);
                        while(i < m){
                            c += this[i] - a[i];
                            r[i++] = c & this.DM;
                            c >>= this.DB;
                        }
                        if (a.t < this.t) {
                            c -= a.s;
                            while(i < this.t){
                                c += this[i];
                                r[i++] = c & this.DM;
                                c >>= this.DB;
                            }
                            c += this.s;
                        } else {
                            c += this.s;
                            while(i < a.t){
                                c -= a[i];
                                r[i++] = c & this.DM;
                                c >>= this.DB;
                            }
                            c -= a.s;
                        }
                        r.s = c < 0 ? -1 : 0;
                        if (c < -1) {
                            r[i++] = this.DV + c;
                        } else if (c > 0) {
                            r[i++] = c;
                        }
                        r.t = i;
                        r.clamp();
                    }
                    function bnpMultiplyTo(a, r) {
                        var x = this.abs(), y = a.abs();
                        var i = x.t;
                        r.t = i + y.t;
                        while((--i) >= 0){
                            r[i] = 0;
                        }
                        for(i = 0; i < y.t; ++i){
                            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
                        }
                        r.s = 0;
                        r.clamp();
                        if (this.s != a.s) {
                            BigInteger.ZERO.subTo(r, r);
                        }
                    }
                    function bnpSquareTo(r) {
                        var x = this.abs();
                        var i = r.t = 2 * x.t;
                        while((--i) >= 0){
                            r[i] = 0;
                        }
                        for(i = 0; i < x.t - 1; ++i){
                            var c = x.am(i, x[i], r, 2 * i, 0, 1);
                            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                                r[i + x.t] -= x.DV;
                                r[i + x.t + 1] = 1;
                            }
                        }
                        if (r.t > 0) {
                            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
                        }
                        r.s = 0;
                        r.clamp();
                    }
                    function bnpDivRemTo(m, q, r) {
                        var pm = m.abs();
                        if (pm.t <= 0) {
                            return;
                        }
                        var pt = this.abs();
                        if (pt.t < pm.t) {
                            if (q != null) {
                                q.fromInt(0);
                            }
                            if (r != null) {
                                this.copyTo(r);
                            }
                            return;
                        }
                        if (r == null) {
                            r = nbi();
                        }
                        var y = nbi(), ts = this.s, ms = m.s;
                        var nsh = this.DB - nbits(pm[pm.t - 1]);
                        if (nsh > 0) {
                            pm.lShiftTo(nsh, y);
                            pt.lShiftTo(nsh, r);
                        } else {
                            pm.copyTo(y);
                            pt.copyTo(r);
                        }
                        var ys = y.t;
                        var y0 = y[ys - 1];
                        if (y0 == 0) {
                            return;
                        }
                        var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
                        var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
                        var i = r.t, j = i - ys, t = q == null ? nbi() : q;
                        y.dlShiftTo(j, t);
                        if (r.compareTo(t) >= 0) {
                            r[r.t++] = 1;
                            r.subTo(t, r);
                        }
                        BigInteger.ONE.dlShiftTo(ys, t);
                        t.subTo(y, y);
                        while(y.t < ys){
                            y[y.t++] = 0;
                        }
                        while((--j) >= 0){
                            var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
                            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
                                y.dlShiftTo(j, t);
                                r.subTo(t, r);
                                while(r[i] < --qd){
                                    r.subTo(t, r);
                                }
                            }
                        }
                        if (q != null) {
                            r.drShiftTo(ys, q);
                            if (ts != ms) {
                                BigInteger.ZERO.subTo(q, q);
                            }
                        }
                        r.t = ys;
                        r.clamp();
                        if (nsh > 0) {
                            r.rShiftTo(nsh, r);
                        }
                        if (ts < 0) {
                            BigInteger.ZERO.subTo(r, r);
                        }
                    }
                    function bnMod(a) {
                        var r = nbi();
                        this.abs().divRemTo(a, null, r);
                        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
                            a.subTo(r, r);
                        }
                        return r;
                    }
                    function Classic(m) {
                        this.m = m;
                    }
                    function cConvert(x) {
                        if (x.s < 0 || x.compareTo(this.m) >= 0) {
                            return x.mod(this.m);
                        } else {
                            return x;
                        }
                    }
                    function cRevert(x) {
                        return x;
                    }
                    function cReduce(x) {
                        x.divRemTo(this.m, null, x);
                    }
                    function cMulTo(x, y, r) {
                        x.multiplyTo(y, r);
                        this.reduce(r);
                    }
                    function cSqrTo(x, r) {
                        x.squareTo(r);
                        this.reduce(r);
                    }
                    Classic.prototype.convert = cConvert;
                    Classic.prototype.revert = cRevert;
                    Classic.prototype.reduce = cReduce;
                    Classic.prototype.mulTo = cMulTo;
                    Classic.prototype.sqrTo = cSqrTo;
                    function bnpInvDigit() {
                        if (this.t < 1) {
                            return 0;
                        }
                        var x = this[0];
                        if ((x & 1) == 0) {
                            return 0;
                        }
                        var y = x & 3;
                        y = y * (2 - (x & 15) * y) & 15;
                        y = y * (2 - (x & 255) * y) & 255;
                        y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
                        y = y * (2 - x * y % this.DV) % this.DV;
                        return y > 0 ? this.DV - y : -y;
                    }
                    function Montgomery(m) {
                        this.m = m;
                        this.mp = m.invDigit();
                        this.mpl = this.mp & 32767;
                        this.mph = this.mp >> 15;
                        this.um = (1 << m.DB - 15) - 1;
                        this.mt2 = 2 * m.t;
                    }
                    function montConvert(x) {
                        var r = nbi();
                        x.abs().dlShiftTo(this.m.t, r);
                        r.divRemTo(this.m, null, r);
                        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
                            this.m.subTo(r, r);
                        }
                        return r;
                    }
                    function montRevert(x) {
                        var r = nbi();
                        x.copyTo(r);
                        this.reduce(r);
                        return r;
                    }
                    function montReduce(x) {
                        while(x.t <= this.mt2){
                            x[x.t++] = 0;
                        }
                        for(var i = 0; i < this.m.t; ++i){
                            var j = x[i] & 32767;
                            var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
                            j = i + this.m.t;
                            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
                            while(x[j] >= x.DV){
                                x[j] -= x.DV;
                                x[++j]++;
                            }
                        }
                        x.clamp();
                        x.drShiftTo(this.m.t, x);
                        if (x.compareTo(this.m) >= 0) {
                            x.subTo(this.m, x);
                        }
                    }
                    function montSqrTo(x, r) {
                        x.squareTo(r);
                        this.reduce(r);
                    }
                    function montMulTo(x, y, r) {
                        x.multiplyTo(y, r);
                        this.reduce(r);
                    }
                    Montgomery.prototype.convert = montConvert;
                    Montgomery.prototype.revert = montRevert;
                    Montgomery.prototype.reduce = montReduce;
                    Montgomery.prototype.mulTo = montMulTo;
                    Montgomery.prototype.sqrTo = montSqrTo;
                    function bnpIsEven() {
                        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
                    }
                    function bnpExp(e, z) {
                        if (e > 4294967295 || e < 1) {
                            return BigInteger.ONE;
                        }
                        var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
                        g.copyTo(r);
                        while((--i) >= 0){
                            z.sqrTo(r, r2);
                            if ((e & 1 << i) > 0) {
                                z.mulTo(r2, g, r);
                            } else {
                                var t = r;
                                r = r2;
                                r2 = t;
                            }
                        }
                        return z.revert(r);
                    }
                    function bnModPowInt(e, m) {
                        var z;
                        if (e < 256 || m.isEven()) {
                            z = new Classic(m);
                        } else {
                            z = new Montgomery(m);
                        }
                        return this.exp(e, z);
                    }
                    BigInteger.prototype.copyTo = bnpCopyTo;
                    BigInteger.prototype.fromInt = bnpFromInt;
                    BigInteger.prototype.fromString = bnpFromString;
                    BigInteger.prototype.clamp = bnpClamp;
                    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
                    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
                    BigInteger.prototype.lShiftTo = bnpLShiftTo;
                    BigInteger.prototype.rShiftTo = bnpRShiftTo;
                    BigInteger.prototype.subTo = bnpSubTo;
                    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
                    BigInteger.prototype.squareTo = bnpSquareTo;
                    BigInteger.prototype.divRemTo = bnpDivRemTo;
                    BigInteger.prototype.invDigit = bnpInvDigit;
                    BigInteger.prototype.isEven = bnpIsEven;
                    BigInteger.prototype.exp = bnpExp;
                    BigInteger.prototype.toString = bnToString;
                    BigInteger.prototype.negate = bnNegate;
                    BigInteger.prototype.abs = bnAbs;
                    BigInteger.prototype.compareTo = bnCompareTo;
                    BigInteger.prototype.bitLength = bnBitLength;
                    BigInteger.prototype.mod = bnMod;
                    BigInteger.prototype.modPowInt = bnModPowInt;
                    BigInteger.ZERO = nbv(0);
                    BigInteger.ONE = nbv(1);
                    function bnClone() {
                        var r = nbi();
                        this.copyTo(r);
                        return r;
                    }
                    function bnIntValue() {
                        if (this.s < 0) {
                            if (this.t == 1) {
                                return this[0] - this.DV;
                            } else if (this.t == 0) {
                                return -1;
                            }
                        } else if (this.t == 1) {
                            return this[0];
                        } else if (this.t == 0) {
                            return 0;
                        }
                        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
                    }
                    function bnByteValue() {
                        return this.t == 0 ? this.s : this[0] << 24 >> 24;
                    }
                    function bnShortValue() {
                        return this.t == 0 ? this.s : this[0] << 16 >> 16;
                    }
                    function bnpChunkSize(r) {
                        return Math.floor(Math.LN2 * this.DB / Math.log(r));
                    }
                    function bnSigNum() {
                        if (this.s < 0) {
                            return -1;
                        } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
                            return 0;
                        } else {
                            return 1;
                        }
                    }
                    function bnpToRadix(b) {
                        if (b == null) {
                            b = 10;
                        }
                        if (this.signum() == 0 || b < 2 || b > 36) {
                            return "0";
                        }
                        var cs = this.chunkSize(b);
                        var a = Math.pow(b, cs);
                        var d = nbv(a), y = nbi(), z = nbi(), r = "";
                        this.divRemTo(d, y, z);
                        while(y.signum() > 0){
                            r = (a + z.intValue()).toString(b).substr(1) + r;
                            y.divRemTo(d, y, z);
                        }
                        return z.intValue().toString(b) + r;
                    }
                    function bnpFromRadix(s, b) {
                        this.fromInt(0);
                        if (b == null) {
                            b = 10;
                        }
                        var cs = this.chunkSize(b);
                        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
                        for(var i = 0; i < s.length; ++i){
                            var x = intAt(s, i);
                            if (x < 0) {
                                if (s.charAt(i) == "-" && this.signum() == 0) {
                                    mi = true;
                                }
                                continue;
                            }
                            w = b * w + x;
                            if ((++j) >= cs) {
                                this.dMultiply(d);
                                this.dAddOffset(w, 0);
                                j = 0;
                                w = 0;
                            }
                        }
                        if (j > 0) {
                            this.dMultiply(Math.pow(b, j));
                            this.dAddOffset(w, 0);
                        }
                        if (mi) {
                            BigInteger.ZERO.subTo(this, this);
                        }
                    }
                    function bnpFromNumber(a, b, c) {
                        if ("number" == typeof b) {
                            if (a < 2) {
                                this.fromInt(1);
                            } else {
                                this.fromNumber(a, c);
                                if (!this.testBit(a - 1)) {
                                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                                }
                                if (this.isEven()) {
                                    this.dAddOffset(1, 0);
                                }
                                while(!this.isProbablePrime(b)){
                                    this.dAddOffset(2, 0);
                                    if (this.bitLength() > a) {
                                        this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                                    }
                                }
                            }
                        } else {
                            var x = new Array(), t = a & 7;
                            x.length = (a >> 3) + 1;
                            b.nextBytes(x);
                            if (t > 0) {
                                x[0] &= (1 << t) - 1;
                            } else {
                                x[0] = 0;
                            }
                            this.fromString(x, 256);
                        }
                    }
                    function bnToByteArray() {
                        var i = this.t, r = new Array();
                        r[0] = this.s;
                        var p = this.DB - i * this.DB % 8, d, k = 0;
                        if ((i--) > 0) {
                            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
                                r[k++] = d | this.s << this.DB - p;
                            }
                            while(i >= 0){
                                if (p < 8) {
                                    d = (this[i] & (1 << p) - 1) << 8 - p;
                                    d |= this[--i] >> (p += this.DB - 8);
                                } else {
                                    d = this[i] >> (p -= 8) & 255;
                                    if (p <= 0) {
                                        p += this.DB;
                                        --i;
                                    }
                                }
                                if ((d & 128) != 0) {
                                    d |= -256;
                                }
                                if (k == 0 && (this.s & 128) != (d & 128)) {
                                    ++k;
                                }
                                if (k > 0 || d != this.s) {
                                    r[k++] = d;
                                }
                            }
                        }
                        return r;
                    }
                    function bnEquals(a) {
                        return this.compareTo(a) == 0;
                    }
                    function bnMin(a) {
                        return this.compareTo(a) < 0 ? this : a;
                    }
                    function bnMax(a) {
                        return this.compareTo(a) > 0 ? this : a;
                    }
                    function bnpBitwiseTo(a, op, r) {
                        var i, f, m = Math.min(a.t, this.t);
                        for(i = 0; i < m; ++i){
                            r[i] = op(this[i], a[i]);
                        }
                        if (a.t < this.t) {
                            f = a.s & this.DM;
                            for(i = m; i < this.t; ++i){
                                r[i] = op(this[i], f);
                            }
                            r.t = this.t;
                        } else {
                            f = this.s & this.DM;
                            for(i = m; i < a.t; ++i){
                                r[i] = op(f, a[i]);
                            }
                            r.t = a.t;
                        }
                        r.s = op(this.s, a.s);
                        r.clamp();
                    }
                    function op_and(x, y) {
                        return x & y;
                    }
                    function bnAnd(a) {
                        var r = nbi();
                        this.bitwiseTo(a, op_and, r);
                        return r;
                    }
                    function op_or(x, y) {
                        return x | y;
                    }
                    function bnOr(a) {
                        var r = nbi();
                        this.bitwiseTo(a, op_or, r);
                        return r;
                    }
                    function op_xor(x, y) {
                        return x ^ y;
                    }
                    function bnXor(a) {
                        var r = nbi();
                        this.bitwiseTo(a, op_xor, r);
                        return r;
                    }
                    function op_andnot(x, y) {
                        return x & ~y;
                    }
                    function bnAndNot(a) {
                        var r = nbi();
                        this.bitwiseTo(a, op_andnot, r);
                        return r;
                    }
                    function bnNot() {
                        var r = nbi();
                        for(var i = 0; i < this.t; ++i){
                            r[i] = this.DM & ~this[i];
                        }
                        r.t = this.t;
                        r.s = ~this.s;
                        return r;
                    }
                    function bnShiftLeft(n) {
                        var r = nbi();
                        if (n < 0) {
                            this.rShiftTo(-n, r);
                        } else {
                            this.lShiftTo(n, r);
                        }
                        return r;
                    }
                    function bnShiftRight(n) {
                        var r = nbi();
                        if (n < 0) {
                            this.lShiftTo(-n, r);
                        } else {
                            this.rShiftTo(n, r);
                        }
                        return r;
                    }
                    function lbit(x) {
                        if (x == 0) {
                            return -1;
                        }
                        var r = 0;
                        if ((x & 65535) == 0) {
                            x >>= 16;
                            r += 16;
                        }
                        if ((x & 255) == 0) {
                            x >>= 8;
                            r += 8;
                        }
                        if ((x & 15) == 0) {
                            x >>= 4;
                            r += 4;
                        }
                        if ((x & 3) == 0) {
                            x >>= 2;
                            r += 2;
                        }
                        if ((x & 1) == 0) {
                            ++r;
                        }
                        return r;
                    }
                    function bnGetLowestSetBit() {
                        for(var i = 0; i < this.t; ++i){
                            if (this[i] != 0) {
                                return i * this.DB + lbit(this[i]);
                            }
                        }
                        if (this.s < 0) {
                            return this.t * this.DB;
                        }
                        return -1;
                    }
                    function cbit(x) {
                        var r = 0;
                        while(x != 0){
                            x &= x - 1;
                            ++r;
                        }
                        return r;
                    }
                    function bnBitCount() {
                        var r = 0, x = this.s & this.DM;
                        for(var i = 0; i < this.t; ++i){
                            r += cbit(this[i] ^ x);
                        }
                        return r;
                    }
                    function bnTestBit(n) {
                        var j = Math.floor(n / this.DB);
                        if (j >= this.t) {
                            return this.s != 0;
                        }
                        return (this[j] & 1 << n % this.DB) != 0;
                    }
                    function bnpChangeBit(n, op) {
                        var r = BigInteger.ONE.shiftLeft(n);
                        this.bitwiseTo(r, op, r);
                        return r;
                    }
                    function bnSetBit(n) {
                        return this.changeBit(n, op_or);
                    }
                    function bnClearBit(n) {
                        return this.changeBit(n, op_andnot);
                    }
                    function bnFlipBit(n) {
                        return this.changeBit(n, op_xor);
                    }
                    function bnpAddTo(a, r) {
                        var i = 0, c = 0, m = Math.min(a.t, this.t);
                        while(i < m){
                            c += this[i] + a[i];
                            r[i++] = c & this.DM;
                            c >>= this.DB;
                        }
                        if (a.t < this.t) {
                            c += a.s;
                            while(i < this.t){
                                c += this[i];
                                r[i++] = c & this.DM;
                                c >>= this.DB;
                            }
                            c += this.s;
                        } else {
                            c += this.s;
                            while(i < a.t){
                                c += a[i];
                                r[i++] = c & this.DM;
                                c >>= this.DB;
                            }
                            c += a.s;
                        }
                        r.s = c < 0 ? -1 : 0;
                        if (c > 0) {
                            r[i++] = c;
                        } else if (c < -1) {
                            r[i++] = this.DV + c;
                        }
                        r.t = i;
                        r.clamp();
                    }
                    function bnAdd(a) {
                        var r = nbi();
                        this.addTo(a, r);
                        return r;
                    }
                    function bnSubtract(a) {
                        var r = nbi();
                        this.subTo(a, r);
                        return r;
                    }
                    function bnMultiply(a) {
                        var r = nbi();
                        this.multiplyTo(a, r);
                        return r;
                    }
                    function bnSquare() {
                        var r = nbi();
                        this.squareTo(r);
                        return r;
                    }
                    function bnDivide(a) {
                        var r = nbi();
                        this.divRemTo(a, r, null);
                        return r;
                    }
                    function bnRemainder(a) {
                        var r = nbi();
                        this.divRemTo(a, null, r);
                        return r;
                    }
                    function bnDivideAndRemainder(a) {
                        var q = nbi(), r = nbi();
                        this.divRemTo(a, q, r);
                        return new Array(q, r);
                    }
                    function bnpDMultiply(n) {
                        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
                        ++this.t;
                        this.clamp();
                    }
                    function bnpDAddOffset(n, w) {
                        if (n == 0) {
                            return;
                        }
                        while(this.t <= w){
                            this[this.t++] = 0;
                        }
                        this[w] += n;
                        while(this[w] >= this.DV){
                            this[w] -= this.DV;
                            if ((++w) >= this.t) {
                                this[this.t++] = 0;
                            }
                            ++this[w];
                        }
                    }
                    function NullExp() {
                    }
                    function nNop(x) {
                        return x;
                    }
                    function nMulTo(x, y, r) {
                        x.multiplyTo(y, r);
                    }
                    function nSqrTo(x, r) {
                        x.squareTo(r);
                    }
                    NullExp.prototype.convert = nNop;
                    NullExp.prototype.revert = nNop;
                    NullExp.prototype.mulTo = nMulTo;
                    NullExp.prototype.sqrTo = nSqrTo;
                    function bnPow(e) {
                        return this.exp(e, new NullExp());
                    }
                    function bnpMultiplyLowerTo(a, n, r) {
                        var i = Math.min(this.t + a.t, n);
                        r.s = 0;
                        r.t = i;
                        while(i > 0){
                            r[--i] = 0;
                        }
                        var j;
                        for(j = r.t - this.t; i < j; ++i){
                            r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
                        }
                        for(j = Math.min(a.t, n); i < j; ++i){
                            this.am(0, a[i], r, i, 0, n - i);
                        }
                        r.clamp();
                    }
                    function bnpMultiplyUpperTo(a, n, r) {
                        --n;
                        var i = r.t = this.t + a.t - n;
                        r.s = 0;
                        while((--i) >= 0){
                            r[i] = 0;
                        }
                        for(i = Math.max(n - this.t, 0); i < a.t; ++i){
                            r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
                        }
                        r.clamp();
                        r.drShiftTo(1, r);
                    }
                    function Barrett(m) {
                        this.r2 = nbi();
                        this.q3 = nbi();
                        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
                        this.mu = this.r2.divide(m);
                        this.m = m;
                    }
                    function barrettConvert(x) {
                        if (x.s < 0 || x.t > 2 * this.m.t) {
                            return x.mod(this.m);
                        } else if (x.compareTo(this.m) < 0) {
                            return x;
                        } else {
                            var r = nbi();
                            x.copyTo(r);
                            this.reduce(r);
                            return r;
                        }
                    }
                    function barrettRevert(x) {
                        return x;
                    }
                    function barrettReduce(x) {
                        x.drShiftTo(this.m.t - 1, this.r2);
                        if (x.t > this.m.t + 1) {
                            x.t = this.m.t + 1;
                            x.clamp();
                        }
                        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
                        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
                        while(x.compareTo(this.r2) < 0){
                            x.dAddOffset(1, this.m.t + 1);
                        }
                        x.subTo(this.r2, x);
                        while(x.compareTo(this.m) >= 0){
                            x.subTo(this.m, x);
                        }
                    }
                    function barrettSqrTo(x, r) {
                        x.squareTo(r);
                        this.reduce(r);
                    }
                    function barrettMulTo(x, y, r) {
                        x.multiplyTo(y, r);
                        this.reduce(r);
                    }
                    Barrett.prototype.convert = barrettConvert;
                    Barrett.prototype.revert = barrettRevert;
                    Barrett.prototype.reduce = barrettReduce;
                    Barrett.prototype.mulTo = barrettMulTo;
                    Barrett.prototype.sqrTo = barrettSqrTo;
                    function bnModPow(e, m) {
                        var i = e.bitLength(), k, r = nbv(1), z;
                        if (i <= 0) {
                            return r;
                        } else if (i < 18) {
                            k = 1;
                        } else if (i < 48) {
                            k = 3;
                        } else if (i < 144) {
                            k = 4;
                        } else if (i < 768) {
                            k = 5;
                        } else {
                            k = 6;
                        }
                        if (i < 8) {
                            z = new Classic(m);
                        } else if (m.isEven()) {
                            z = new Barrett(m);
                        } else {
                            z = new Montgomery(m);
                        }
                        var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
                        g[1] = z.convert(this);
                        if (k > 1) {
                            var g2 = nbi();
                            z.sqrTo(g[1], g2);
                            while(n <= km){
                                g[n] = nbi();
                                z.mulTo(g2, g[n - 2], g[n]);
                                n += 2;
                            }
                        }
                        var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
                        i = nbits(e[j]) - 1;
                        while(j >= 0){
                            if (i >= k1) {
                                w = e[j] >> i - k1 & km;
                            } else {
                                w = (e[j] & (1 << i + 1) - 1) << k1 - i;
                                if (j > 0) {
                                    w |= e[j - 1] >> this.DB + i - k1;
                                }
                            }
                            n = k;
                            while((w & 1) == 0){
                                w >>= 1;
                                --n;
                            }
                            if ((i -= n) < 0) {
                                i += this.DB;
                                --j;
                            }
                            if (is1) {
                                g[w].copyTo(r);
                                is1 = false;
                            } else {
                                while(n > 1){
                                    z.sqrTo(r, r2);
                                    z.sqrTo(r2, r);
                                    n -= 2;
                                }
                                if (n > 0) {
                                    z.sqrTo(r, r2);
                                } else {
                                    t = r;
                                    r = r2;
                                    r2 = t;
                                }
                                z.mulTo(r2, g[w], r);
                            }
                            while(j >= 0 && (e[j] & 1 << i) == 0){
                                z.sqrTo(r, r2);
                                t = r;
                                r = r2;
                                r2 = t;
                                if ((--i) < 0) {
                                    i = this.DB - 1;
                                    --j;
                                }
                            }
                        }
                        return z.revert(r);
                    }
                    function bnGCD(a) {
                        var x = this.s < 0 ? this.negate() : this.clone();
                        var y = a.s < 0 ? a.negate() : a.clone();
                        if (x.compareTo(y) < 0) {
                            var t = x;
                            x = y;
                            y = t;
                        }
                        var i = x.getLowestSetBit(), g = y.getLowestSetBit();
                        if (g < 0) {
                            return x;
                        }
                        if (i < g) {
                            g = i;
                        }
                        if (g > 0) {
                            x.rShiftTo(g, x);
                            y.rShiftTo(g, y);
                        }
                        while(x.signum() > 0){
                            if ((i = x.getLowestSetBit()) > 0) {
                                x.rShiftTo(i, x);
                            }
                            if ((i = y.getLowestSetBit()) > 0) {
                                y.rShiftTo(i, y);
                            }
                            if (x.compareTo(y) >= 0) {
                                x.subTo(y, x);
                                x.rShiftTo(1, x);
                            } else {
                                y.subTo(x, y);
                                y.rShiftTo(1, y);
                            }
                        }
                        if (g > 0) {
                            y.lShiftTo(g, y);
                        }
                        return y;
                    }
                    function bnpModInt(n) {
                        if (n <= 0) {
                            return 0;
                        }
                        var d = this.DV % n, r = this.s < 0 ? n - 1 : 0;
                        if (this.t > 0) {
                            if (d == 0) {
                                r = this[0] % n;
                            } else {
                                for(var i = this.t - 1; i >= 0; --i){
                                    r = (d * r + this[i]) % n;
                                }
                            }
                        }
                        return r;
                    }
                    function bnModInverse(m) {
                        var ac = m.isEven();
                        if (this.isEven() && ac || m.signum() == 0) {
                            return BigInteger.ZERO;
                        }
                        var u = m.clone(), v = this.clone();
                        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
                        while(u.signum() != 0){
                            while(u.isEven()){
                                u.rShiftTo(1, u);
                                if (ac) {
                                    if (!a.isEven() || !b.isEven()) {
                                        a.addTo(this, a);
                                        b.subTo(m, b);
                                    }
                                    a.rShiftTo(1, a);
                                } else if (!b.isEven()) {
                                    b.subTo(m, b);
                                }
                                b.rShiftTo(1, b);
                            }
                            while(v.isEven()){
                                v.rShiftTo(1, v);
                                if (ac) {
                                    if (!c.isEven() || !d.isEven()) {
                                        c.addTo(this, c);
                                        d.subTo(m, d);
                                    }
                                    c.rShiftTo(1, c);
                                } else if (!d.isEven()) {
                                    d.subTo(m, d);
                                }
                                d.rShiftTo(1, d);
                            }
                            if (u.compareTo(v) >= 0) {
                                u.subTo(v, u);
                                if (ac) {
                                    a.subTo(c, a);
                                }
                                b.subTo(d, b);
                            } else {
                                v.subTo(u, v);
                                if (ac) {
                                    c.subTo(a, c);
                                }
                                d.subTo(b, d);
                            }
                        }
                        if (v.compareTo(BigInteger.ONE) != 0) {
                            return BigInteger.ZERO;
                        }
                        if (d.compareTo(m) >= 0) {
                            return d.subtract(m);
                        }
                        if (d.signum() < 0) {
                            d.addTo(m, d);
                        } else {
                            return d;
                        }
                        if (d.signum() < 0) {
                            return d.add(m);
                        } else {
                            return d;
                        }
                    }
                    var lowprimes = [
                        2,
                        3,
                        5,
                        7,
                        11,
                        13,
                        17,
                        19,
                        23,
                        29,
                        31,
                        37,
                        41,
                        43,
                        47,
                        53,
                        59,
                        61,
                        67,
                        71,
                        73,
                        79,
                        83,
                        89,
                        97,
                        101,
                        103,
                        107,
                        109,
                        113,
                        127,
                        131,
                        137,
                        139,
                        149,
                        151,
                        157,
                        163,
                        167,
                        173,
                        179,
                        181,
                        191,
                        193,
                        197,
                        199,
                        211,
                        223,
                        227,
                        229,
                        233,
                        239,
                        241,
                        251,
                        257,
                        263,
                        269,
                        271,
                        277,
                        281,
                        283,
                        293,
                        307,
                        311,
                        313,
                        317,
                        331,
                        337,
                        347,
                        349,
                        353,
                        359,
                        367,
                        373,
                        379,
                        383,
                        389,
                        397,
                        401,
                        409,
                        419,
                        421,
                        431,
                        433,
                        439,
                        443,
                        449,
                        457,
                        461,
                        463,
                        467,
                        479,
                        487,
                        491,
                        499,
                        503,
                        509,
                        521,
                        523,
                        541,
                        547,
                        557,
                        563,
                        569,
                        571,
                        577,
                        587,
                        593,
                        599,
                        601,
                        607,
                        613,
                        617,
                        619,
                        631,
                        641,
                        643,
                        647,
                        653,
                        659,
                        661,
                        673,
                        677,
                        683,
                        691,
                        701,
                        709,
                        719,
                        727,
                        733,
                        739,
                        743,
                        751,
                        757,
                        761,
                        769,
                        773,
                        787,
                        797,
                        809,
                        811,
                        821,
                        823,
                        827,
                        829,
                        839,
                        853,
                        857,
                        859,
                        863,
                        877,
                        881,
                        883,
                        887,
                        907,
                        911,
                        919,
                        929,
                        937,
                        941,
                        947,
                        953,
                        967,
                        971,
                        977,
                        983,
                        991,
                        997, 
                    ];
                    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
                    function bnIsProbablePrime(t) {
                        var i, x = this.abs();
                        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
                            for(i = 0; i < lowprimes.length; ++i){
                                if (x[0] == lowprimes[i]) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        if (x.isEven()) {
                            return false;
                        }
                        i = 1;
                        while(i < lowprimes.length){
                            var m = lowprimes[i], j = i + 1;
                            while(j < lowprimes.length && m < lplim){
                                m *= lowprimes[j++];
                            }
                            m = x.modInt(m);
                            while(i < j){
                                if (m % lowprimes[i++] == 0) {
                                    return false;
                                }
                            }
                        }
                        return x.millerRabin(t);
                    }
                    function bnpMillerRabin(t) {
                        var n1 = this.subtract(BigInteger.ONE);
                        var k = n1.getLowestSetBit();
                        if (k <= 0) {
                            return false;
                        }
                        var r = n1.shiftRight(k);
                        t = t + 1 >> 1;
                        if (t > lowprimes.length) {
                            t = lowprimes.length;
                        }
                        var a = nbi();
                        for(var i = 0; i < t; ++i){
                            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
                            var y = a.modPow(r, this);
                            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                                var j = 1;
                                while((j++) < k && y.compareTo(n1) != 0){
                                    y = y.modPowInt(2, this);
                                    if (y.compareTo(BigInteger.ONE) == 0) {
                                        return false;
                                    }
                                }
                                if (y.compareTo(n1) != 0) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    BigInteger.prototype.chunkSize = bnpChunkSize;
                    BigInteger.prototype.toRadix = bnpToRadix;
                    BigInteger.prototype.fromRadix = bnpFromRadix;
                    BigInteger.prototype.fromNumber = bnpFromNumber;
                    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
                    BigInteger.prototype.changeBit = bnpChangeBit;
                    BigInteger.prototype.addTo = bnpAddTo;
                    BigInteger.prototype.dMultiply = bnpDMultiply;
                    BigInteger.prototype.dAddOffset = bnpDAddOffset;
                    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
                    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
                    BigInteger.prototype.modInt = bnpModInt;
                    BigInteger.prototype.millerRabin = bnpMillerRabin;
                    BigInteger.prototype.clone = bnClone;
                    BigInteger.prototype.intValue = bnIntValue;
                    BigInteger.prototype.byteValue = bnByteValue;
                    BigInteger.prototype.shortValue = bnShortValue;
                    BigInteger.prototype.signum = bnSigNum;
                    BigInteger.prototype.toByteArray = bnToByteArray;
                    BigInteger.prototype.equals = bnEquals;
                    BigInteger.prototype.min = bnMin;
                    BigInteger.prototype.max = bnMax;
                    BigInteger.prototype.and = bnAnd;
                    BigInteger.prototype.or = bnOr;
                    BigInteger.prototype.xor = bnXor;
                    BigInteger.prototype.andNot = bnAndNot;
                    BigInteger.prototype.not = bnNot;
                    BigInteger.prototype.shiftLeft = bnShiftLeft;
                    BigInteger.prototype.shiftRight = bnShiftRight;
                    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
                    BigInteger.prototype.bitCount = bnBitCount;
                    BigInteger.prototype.testBit = bnTestBit;
                    BigInteger.prototype.setBit = bnSetBit;
                    BigInteger.prototype.clearBit = bnClearBit;
                    BigInteger.prototype.flipBit = bnFlipBit;
                    BigInteger.prototype.add = bnAdd;
                    BigInteger.prototype.subtract = bnSubtract;
                    BigInteger.prototype.multiply = bnMultiply;
                    BigInteger.prototype.divide = bnDivide;
                    BigInteger.prototype.remainder = bnRemainder;
                    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
                    BigInteger.prototype.modPow = bnModPow;
                    BigInteger.prototype.modInverse = bnModInverse;
                    BigInteger.prototype.pow = bnPow;
                    BigInteger.prototype.gcd = bnGCD;
                    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
                    BigInteger.prototype.square = bnSquare;
                    var Int128 = BigInteger;
                    Int128.prototype.IsNegative = function() {
                        if (this.compareTo(Int128.ZERO) == -1) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    Int128.op_Equality = function(val1, val2) {
                        if (val1.compareTo(val2) == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    Int128.op_Inequality = function(val1, val2) {
                        if (val1.compareTo(val2) != 0) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    Int128.op_GreaterThan = function(val1, val2) {
                        if (val1.compareTo(val2) > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    Int128.op_LessThan = function(val1, val2) {
                        if (val1.compareTo(val2) < 0) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    Int128.op_Addition = function(lhs, rhs) {
                        return new Int128(lhs, undefined, undefined).add(new Int128(rhs, undefined, undefined));
                    };
                    Int128.op_Subtraction = function(lhs, rhs) {
                        return new Int128(lhs, undefined, undefined).subtract(new Int128(rhs, undefined, undefined));
                    };
                    Int128.Int128Mul = function(lhs, rhs) {
                        return new Int128(lhs, undefined, undefined).multiply(new Int128(rhs, undefined, undefined));
                    };
                    Int128.op_Division = function(lhs, rhs) {
                        return lhs.divide(rhs);
                    };
                    Int128.prototype.ToDouble = function() {
                        return parseFloat(this.toString());
                    };
                    var Inherit = function(ce, ce2) {
                        var p;
                        if (typeof Object.getOwnPropertyNames === "undefined") {
                            for(p in ce2.prototype){
                                if (typeof ce.prototype[p] === "undefined" || ce.prototype[p] === Object.prototype[p]) {
                                    ce.prototype[p] = ce2.prototype[p];
                                }
                            }
                            for(p in ce2){
                                if (typeof ce[p] === "undefined") {
                                    ce[p] = ce2[p];
                                }
                            }
                            ce.$baseCtor = ce2;
                        } else {
                            var props = Object.getOwnPropertyNames(ce2.prototype);
                            for(var i = 0; i < props.length; i++){
                                if (typeof Object.getOwnPropertyDescriptor(ce.prototype, props[i]) === "undefined") {
                                    Object.defineProperty(ce.prototype, props[i], Object.getOwnPropertyDescriptor(ce2.prototype, props[i]));
                                }
                            }
                            for(p in ce2){
                                if (typeof ce[p] === "undefined") {
                                    ce[p] = ce2[p];
                                }
                            }
                            ce.$baseCtor = ce2;
                        }
                    };
                    ClipperLib.Path = function() {
                        return [];
                    };
                    ClipperLib.Path.prototype.push = Array.prototype.push;
                    ClipperLib.Paths = function() {
                        return [];
                    };
                    ClipperLib.Paths.prototype.push = Array.prototype.push;
                    ClipperLib.DoublePoint = function() {
                        var a = arguments;
                        this.X = 0;
                        this.Y = 0;
                        if (a.length === 1) {
                            this.X = a[0].X;
                            this.Y = a[0].Y;
                        } else if (a.length === 2) {
                            this.X = a[0];
                            this.Y = a[1];
                        }
                    };
                    ClipperLib.DoublePoint0 = function() {
                        this.X = 0;
                        this.Y = 0;
                    };
                    ClipperLib.DoublePoint0.prototype = ClipperLib.DoublePoint.prototype;
                    ClipperLib.DoublePoint1 = function(dp) {
                        this.X = dp.X;
                        this.Y = dp.Y;
                    };
                    ClipperLib.DoublePoint1.prototype = ClipperLib.DoublePoint.prototype;
                    ClipperLib.DoublePoint2 = function(x, y) {
                        this.X = x;
                        this.Y = y;
                    };
                    ClipperLib.DoublePoint2.prototype = ClipperLib.DoublePoint.prototype;
                    ClipperLib.PolyNode = function() {
                        this.m_Parent = null;
                        this.m_polygon = new ClipperLib.Path();
                        this.m_Index = 0;
                        this.m_jointype = 0;
                        this.m_endtype = 0;
                        this.m_Childs = [];
                        this.IsOpen = false;
                    };
                    ClipperLib.PolyNode.prototype.IsHoleNode = function() {
                        var result = true;
                        var node = this.m_Parent;
                        while(node !== null){
                            result = !result;
                            node = node.m_Parent;
                        }
                        return result;
                    };
                    ClipperLib.PolyNode.prototype.ChildCount = function() {
                        return this.m_Childs.length;
                    };
                    ClipperLib.PolyNode.prototype.Contour = function() {
                        return this.m_polygon;
                    };
                    ClipperLib.PolyNode.prototype.AddChild = function(Child) {
                        var cnt = this.m_Childs.length;
                        this.m_Childs.push(Child);
                        Child.m_Parent = this;
                        Child.m_Index = cnt;
                    };
                    ClipperLib.PolyNode.prototype.GetNext = function() {
                        if (this.m_Childs.length > 0) {
                            return this.m_Childs[0];
                        } else {
                            return this.GetNextSiblingUp();
                        }
                    };
                    ClipperLib.PolyNode.prototype.GetNextSiblingUp = function() {
                        if (this.m_Parent === null) {
                            return null;
                        } else if (this.m_Index === this.m_Parent.m_Childs.length - 1) {
                            return this.m_Parent.GetNextSiblingUp();
                        } else {
                            return this.m_Parent.m_Childs[this.m_Index + 1];
                        }
                    };
                    ClipperLib.PolyNode.prototype.Childs = function() {
                        return this.m_Childs;
                    };
                    ClipperLib.PolyNode.prototype.Parent = function() {
                        return this.m_Parent;
                    };
                    ClipperLib.PolyNode.prototype.IsHole = function() {
                        return this.IsHoleNode();
                    };
                    ClipperLib.PolyTree = function() {
                        this.m_AllPolys = [];
                        ClipperLib.PolyNode.call(this);
                    };
                    ClipperLib.PolyTree.prototype.Clear = function() {
                        for(var i = 0, ilen = this.m_AllPolys.length; i < ilen; i++){
                            this.m_AllPolys[i] = null;
                        }
                        this.m_AllPolys.length = 0;
                        this.m_Childs.length = 0;
                    };
                    ClipperLib.PolyTree.prototype.GetFirst = function() {
                        if (this.m_Childs.length > 0) {
                            return this.m_Childs[0];
                        } else {
                            return null;
                        }
                    };
                    ClipperLib.PolyTree.prototype.Total = function() {
                        var result = this.m_AllPolys.length;
                        if (result > 0 && this.m_Childs[0] !== this.m_AllPolys[0]) {
                            result--;
                        }
                        return result;
                    };
                    Inherit(ClipperLib.PolyTree, ClipperLib.PolyNode);
                    ClipperLib.Math_Abs_Int64 = ClipperLib.Math_Abs_Int32 = ClipperLib.Math_Abs_Double = function(a) {
                        return Math.abs(a);
                    };
                    ClipperLib.Math_Max_Int32_Int32 = function(a, b) {
                        return Math.max(a, b);
                    };
                    if (browser1.msie || browser1.opera || browser1.safari) {
                        ClipperLib.Cast_Int32 = function(a) {
                            return a | 0;
                        };
                    } else {
                        ClipperLib.Cast_Int32 = function(a) {
                            return ~~a;
                        };
                    }
                    if (typeof Number.toInteger === "undefined") {
                        Number.toInteger = null;
                    }
                    if (browser1.chrome) {
                        ClipperLib.Cast_Int64 = function(a) {
                            if (a < -2147483648 || a > 2147483647) {
                                return a < 0 ? Math.ceil(a) : Math.floor(a);
                            } else {
                                return ~~a;
                            }
                        };
                    } else if (browser1.firefox && typeof Number.toInteger === "function") {
                        ClipperLib.Cast_Int64 = function(a) {
                            return Number.toInteger(a);
                        };
                    } else if (browser1.msie7 || browser1.msie8) {
                        ClipperLib.Cast_Int64 = function(a) {
                            return parseInt(a, 10);
                        };
                    } else if (browser1.msie) {
                        ClipperLib.Cast_Int64 = function(a) {
                            if (a < -2147483648 || a > 2147483647) {
                                return a < 0 ? Math.ceil(a) : Math.floor(a);
                            }
                            return a | 0;
                        };
                    } else {
                        ClipperLib.Cast_Int64 = function(a) {
                            return a < 0 ? Math.ceil(a) : Math.floor(a);
                        };
                    }
                    ClipperLib.Clear = function(a) {
                        a.length = 0;
                    };
                    ClipperLib.PI = 3.141592653589793;
                    ClipperLib.PI2 = 2 * 3.141592653589793;
                    ClipperLib.IntPoint = function() {
                        var a = arguments, alen = a.length;
                        this.X = 0;
                        this.Y = 0;
                        if (ClipperLib.use_xyz) {
                            this.Z = 0;
                            if (alen === 3) {
                                this.X = a[0];
                                this.Y = a[1];
                                this.Z = a[2];
                            } else if (alen === 2) {
                                this.X = a[0];
                                this.Y = a[1];
                                this.Z = 0;
                            } else if (alen === 1) {
                                if (a[0] instanceof ClipperLib.DoublePoint) {
                                    var dp = a[0];
                                    this.X = ClipperLib.Clipper.Round(dp.X);
                                    this.Y = ClipperLib.Clipper.Round(dp.Y);
                                    this.Z = 0;
                                } else {
                                    var pt = a[0];
                                    if (typeof pt.Z === "undefined") {
                                        pt.Z = 0;
                                    }
                                    this.X = pt.X;
                                    this.Y = pt.Y;
                                    this.Z = pt.Z;
                                }
                            } else {
                                this.X = 0;
                                this.Y = 0;
                                this.Z = 0;
                            }
                        } else {
                            if (alen === 2) {
                                this.X = a[0];
                                this.Y = a[1];
                            } else if (alen === 1) {
                                if (a[0] instanceof ClipperLib.DoublePoint) {
                                    var dp = a[0];
                                    this.X = ClipperLib.Clipper.Round(dp.X);
                                    this.Y = ClipperLib.Clipper.Round(dp.Y);
                                } else {
                                    var pt = a[0];
                                    this.X = pt.X;
                                    this.Y = pt.Y;
                                }
                            } else {
                                this.X = 0;
                                this.Y = 0;
                            }
                        }
                    };
                    ClipperLib.IntPoint.op_Equality = function(a, b) {
                        return a.X === b.X && a.Y === b.Y;
                    };
                    ClipperLib.IntPoint.op_Inequality = function(a, b) {
                        return a.X !== b.X || a.Y !== b.Y;
                    };
                    ClipperLib.IntPoint0 = function() {
                        this.X = 0;
                        this.Y = 0;
                        if (ClipperLib.use_xyz) {
                            this.Z = 0;
                        }
                    };
                    ClipperLib.IntPoint0.prototype = ClipperLib.IntPoint.prototype;
                    ClipperLib.IntPoint1 = function(pt) {
                        this.X = pt.X;
                        this.Y = pt.Y;
                        if (ClipperLib.use_xyz) {
                            if (typeof pt.Z === "undefined") {
                                this.Z = 0;
                            } else {
                                this.Z = pt.Z;
                            }
                        }
                    };
                    ClipperLib.IntPoint1.prototype = ClipperLib.IntPoint.prototype;
                    ClipperLib.IntPoint1dp = function(dp) {
                        this.X = ClipperLib.Clipper.Round(dp.X);
                        this.Y = ClipperLib.Clipper.Round(dp.Y);
                        if (ClipperLib.use_xyz) {
                            this.Z = 0;
                        }
                    };
                    ClipperLib.IntPoint1dp.prototype = ClipperLib.IntPoint.prototype;
                    ClipperLib.IntPoint2 = function(x, y, z) {
                        this.X = x;
                        this.Y = y;
                        if (ClipperLib.use_xyz) {
                            if (typeof z === "undefined") {
                                this.Z = 0;
                            } else {
                                this.Z = z;
                            }
                        }
                    };
                    ClipperLib.IntPoint2.prototype = ClipperLib.IntPoint.prototype;
                    ClipperLib.IntRect = function() {
                        var a = arguments, alen = a.length;
                        if (alen === 4) {
                            this.left = a[0];
                            this.top = a[1];
                            this.right = a[2];
                            this.bottom = a[3];
                        } else if (alen === 1) {
                            var ir = a[0];
                            this.left = ir.left;
                            this.top = ir.top;
                            this.right = ir.right;
                            this.bottom = ir.bottom;
                        } else {
                            this.left = 0;
                            this.top = 0;
                            this.right = 0;
                            this.bottom = 0;
                        }
                    };
                    ClipperLib.IntRect0 = function() {
                        this.left = 0;
                        this.top = 0;
                        this.right = 0;
                        this.bottom = 0;
                    };
                    ClipperLib.IntRect0.prototype = ClipperLib.IntRect.prototype;
                    ClipperLib.IntRect1 = function(ir) {
                        this.left = ir.left;
                        this.top = ir.top;
                        this.right = ir.right;
                        this.bottom = ir.bottom;
                    };
                    ClipperLib.IntRect1.prototype = ClipperLib.IntRect.prototype;
                    ClipperLib.IntRect4 = function(l, t, r, b) {
                        this.left = l;
                        this.top = t;
                        this.right = r;
                        this.bottom = b;
                    };
                    ClipperLib.IntRect4.prototype = ClipperLib.IntRect.prototype;
                    ClipperLib.ClipType = {
                        ctIntersection: 0,
                        ctUnion: 1,
                        ctDifference: 2,
                        ctXor: 3
                    };
                    ClipperLib.PolyType = {
                        ptSubject: 0,
                        ptClip: 1
                    };
                    ClipperLib.PolyFillType = {
                        pftEvenOdd: 0,
                        pftNonZero: 1,
                        pftPositive: 2,
                        pftNegative: 3
                    };
                    ClipperLib.JoinType = {
                        jtSquare: 0,
                        jtRound: 1,
                        jtMiter: 2
                    };
                    ClipperLib.EndType = {
                        etOpenSquare: 0,
                        etOpenRound: 1,
                        etOpenButt: 2,
                        etClosedLine: 3,
                        etClosedPolygon: 4
                    };
                    ClipperLib.EdgeSide = {
                        esLeft: 0,
                        esRight: 1
                    };
                    ClipperLib.Direction = {
                        dRightToLeft: 0,
                        dLeftToRight: 1
                    };
                    ClipperLib.TEdge = function() {
                        this.Bot = new ClipperLib.IntPoint0();
                        this.Curr = new ClipperLib.IntPoint0();
                        this.Top = new ClipperLib.IntPoint0();
                        this.Delta = new ClipperLib.IntPoint0();
                        this.Dx = 0;
                        this.PolyTyp = ClipperLib.PolyType.ptSubject;
                        this.Side = ClipperLib.EdgeSide.esLeft;
                        this.WindDelta = 0;
                        this.WindCnt = 0;
                        this.WindCnt2 = 0;
                        this.OutIdx = 0;
                        this.Next = null;
                        this.Prev = null;
                        this.NextInLML = null;
                        this.NextInAEL = null;
                        this.PrevInAEL = null;
                        this.NextInSEL = null;
                        this.PrevInSEL = null;
                    };
                    ClipperLib.IntersectNode = function() {
                        this.Edge1 = null;
                        this.Edge2 = null;
                        this.Pt = new ClipperLib.IntPoint0();
                    };
                    ClipperLib.MyIntersectNodeSort = function() {
                    };
                    ClipperLib.MyIntersectNodeSort.Compare = function(node1, node2) {
                        var i = node2.Pt.Y - node1.Pt.Y;
                        if (i > 0) {
                            return 1;
                        } else if (i < 0) {
                            return -1;
                        } else {
                            return 0;
                        }
                    };
                    ClipperLib.LocalMinima = function() {
                        this.Y = 0;
                        this.LeftBound = null;
                        this.RightBound = null;
                        this.Next = null;
                    };
                    ClipperLib.Scanbeam = function() {
                        this.Y = 0;
                        this.Next = null;
                    };
                    ClipperLib.Maxima = function() {
                        this.X = 0;
                        this.Next = null;
                        this.Prev = null;
                    };
                    ClipperLib.OutRec = function() {
                        this.Idx = 0;
                        this.IsHole = false;
                        this.IsOpen = false;
                        this.FirstLeft = null;
                        this.Pts = null;
                        this.BottomPt = null;
                        this.PolyNode = null;
                    };
                    ClipperLib.OutPt = function() {
                        this.Idx = 0;
                        this.Pt = new ClipperLib.IntPoint0();
                        this.Next = null;
                        this.Prev = null;
                    };
                    ClipperLib.Join = function() {
                        this.OutPt1 = null;
                        this.OutPt2 = null;
                        this.OffPt = new ClipperLib.IntPoint0();
                    };
                    ClipperLib.ClipperBase = function() {
                        this.m_MinimaList = null;
                        this.m_CurrentLM = null;
                        this.m_edges = new Array();
                        this.m_UseFullRange = false;
                        this.m_HasOpenPaths = false;
                        this.PreserveCollinear = false;
                        this.m_Scanbeam = null;
                        this.m_PolyOuts = null;
                        this.m_ActiveEdges = null;
                    };
                    ClipperLib.ClipperBase.horizontal = -9007199254740992;
                    ClipperLib.ClipperBase.Skip = -2;
                    ClipperLib.ClipperBase.Unassigned = -1;
                    ClipperLib.ClipperBase.tolerance = 0.00000000000000000001;
                    ClipperLib.ClipperBase.loRange = 47453132;
                    ClipperLib.ClipperBase.hiRange = 4503599627370495;
                    ClipperLib.ClipperBase.near_zero = function(val) {
                        return val > -ClipperLib.ClipperBase.tolerance && val < ClipperLib.ClipperBase.tolerance;
                    };
                    ClipperLib.ClipperBase.IsHorizontal = function(e) {
                        return e.Delta.Y === 0;
                    };
                    ClipperLib.ClipperBase.prototype.PointIsVertex = function(pt, pp) {
                        var pp2 = pp;
                        do {
                            if (ClipperLib.IntPoint.op_Equality(pp2.Pt, pt)) {
                                return true;
                            }
                            pp2 = pp2.Next;
                        }while (pp2 !== pp)
                        return false;
                    };
                    ClipperLib.ClipperBase.prototype.PointOnLineSegment = function(pt, linePt1, linePt2, UseFullRange) {
                        if (UseFullRange) {
                            return pt.X === linePt1.X && pt.Y === linePt1.Y || pt.X === linePt2.X && pt.Y === linePt2.Y || pt.X > linePt1.X === pt.X < linePt2.X && pt.Y > linePt1.Y === pt.Y < linePt2.Y && Int128.op_Equality(Int128.Int128Mul(pt.X - linePt1.X, linePt2.Y - linePt1.Y), Int128.Int128Mul(linePt2.X - linePt1.X, pt.Y - linePt1.Y));
                        } else {
                            return pt.X === linePt1.X && pt.Y === linePt1.Y || pt.X === linePt2.X && pt.Y === linePt2.Y || pt.X > linePt1.X === pt.X < linePt2.X && pt.Y > linePt1.Y === pt.Y < linePt2.Y && (pt.X - linePt1.X) * (linePt2.Y - linePt1.Y) === (linePt2.X - linePt1.X) * (pt.Y - linePt1.Y);
                        }
                    };
                    ClipperLib.ClipperBase.prototype.PointOnPolygon = function(pt, pp, UseFullRange) {
                        var pp2 = pp;
                        while(true){
                            if (this.PointOnLineSegment(pt, pp2.Pt, pp2.Next.Pt, UseFullRange)) {
                                return true;
                            }
                            pp2 = pp2.Next;
                            if (pp2 === pp) {
                                break;
                            }
                        }
                        return false;
                    };
                    ClipperLib.ClipperBase.prototype.SlopesEqual = ClipperLib.ClipperBase.SlopesEqual = function() {
                        var a = arguments, alen = a.length;
                        var e1, e2, pt1, pt2, pt3, pt4, UseFullRange;
                        if (alen === 3) {
                            e1 = a[0];
                            e2 = a[1];
                            UseFullRange = a[2];
                            if (UseFullRange) {
                                return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
                            } else {
                                return ClipperLib.Cast_Int64(e1.Delta.Y * e2.Delta.X) === ClipperLib.Cast_Int64(e1.Delta.X * e2.Delta.Y);
                            }
                        } else if (alen === 4) {
                            pt1 = a[0];
                            pt2 = a[1];
                            pt3 = a[2];
                            UseFullRange = a[3];
                            if (UseFullRange) {
                                return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
                            } else {
                                return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
                            }
                        } else {
                            pt1 = a[0];
                            pt2 = a[1];
                            pt3 = a[2];
                            pt4 = a[3];
                            UseFullRange = a[4];
                            if (UseFullRange) {
                                return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
                            } else {
                                return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
                            }
                        }
                    };
                    ClipperLib.ClipperBase.SlopesEqual3 = function(e1, e2, UseFullRange) {
                        if (UseFullRange) {
                            return Int128.op_Equality(Int128.Int128Mul(e1.Delta.Y, e2.Delta.X), Int128.Int128Mul(e1.Delta.X, e2.Delta.Y));
                        } else {
                            return ClipperLib.Cast_Int64(e1.Delta.Y * e2.Delta.X) === ClipperLib.Cast_Int64(e1.Delta.X * e2.Delta.Y);
                        }
                    };
                    ClipperLib.ClipperBase.SlopesEqual4 = function(pt1, pt2, pt3, UseFullRange) {
                        if (UseFullRange) {
                            return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt2.X - pt3.X), Int128.Int128Mul(pt1.X - pt2.X, pt2.Y - pt3.Y));
                        } else {
                            return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt2.X - pt3.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt2.Y - pt3.Y)) === 0;
                        }
                    };
                    ClipperLib.ClipperBase.SlopesEqual5 = function(pt1, pt2, pt3, pt4, UseFullRange) {
                        if (UseFullRange) {
                            return Int128.op_Equality(Int128.Int128Mul(pt1.Y - pt2.Y, pt3.X - pt4.X), Int128.Int128Mul(pt1.X - pt2.X, pt3.Y - pt4.Y));
                        } else {
                            return ClipperLib.Cast_Int64((pt1.Y - pt2.Y) * (pt3.X - pt4.X)) - ClipperLib.Cast_Int64((pt1.X - pt2.X) * (pt3.Y - pt4.Y)) === 0;
                        }
                    };
                    ClipperLib.ClipperBase.prototype.Clear = function() {
                        this.DisposeLocalMinimaList();
                        for(var i = 0, ilen = this.m_edges.length; i < ilen; ++i){
                            for(var j = 0, jlen = this.m_edges[i].length; j < jlen; ++j){
                                this.m_edges[i][j] = null;
                            }
                            ClipperLib.Clear(this.m_edges[i]);
                        }
                        ClipperLib.Clear(this.m_edges);
                        this.m_UseFullRange = false;
                        this.m_HasOpenPaths = false;
                    };
                    ClipperLib.ClipperBase.prototype.DisposeLocalMinimaList = function() {
                        while(this.m_MinimaList !== null){
                            var tmpLm = this.m_MinimaList.Next;
                            this.m_MinimaList = null;
                            this.m_MinimaList = tmpLm;
                        }
                        this.m_CurrentLM = null;
                    };
                    ClipperLib.ClipperBase.prototype.RangeTest = function(Pt, useFullRange) {
                        if (useFullRange.Value) {
                            if (Pt.X > ClipperLib.ClipperBase.hiRange || Pt.Y > ClipperLib.ClipperBase.hiRange || -Pt.X > ClipperLib.ClipperBase.hiRange || -Pt.Y > ClipperLib.ClipperBase.hiRange) {
                                ClipperLib.Error("Coordinate outside allowed range in RangeTest().");
                            }
                        } else if (Pt.X > ClipperLib.ClipperBase.loRange || Pt.Y > ClipperLib.ClipperBase.loRange || -Pt.X > ClipperLib.ClipperBase.loRange || -Pt.Y > ClipperLib.ClipperBase.loRange) {
                            useFullRange.Value = true;
                            this.RangeTest(Pt, useFullRange);
                        }
                    };
                    ClipperLib.ClipperBase.prototype.InitEdge = function(e, eNext, ePrev, pt) {
                        e.Next = eNext;
                        e.Prev = ePrev;
                        e.Curr.X = pt.X;
                        e.Curr.Y = pt.Y;
                        if (ClipperLib.use_xyz) {
                            e.Curr.Z = pt.Z;
                        }
                        e.OutIdx = -1;
                    };
                    ClipperLib.ClipperBase.prototype.InitEdge2 = function(e, polyType) {
                        if (e.Curr.Y >= e.Next.Curr.Y) {
                            e.Bot.X = e.Curr.X;
                            e.Bot.Y = e.Curr.Y;
                            if (ClipperLib.use_xyz) {
                                e.Bot.Z = e.Curr.Z;
                            }
                            e.Top.X = e.Next.Curr.X;
                            e.Top.Y = e.Next.Curr.Y;
                            if (ClipperLib.use_xyz) {
                                e.Top.Z = e.Next.Curr.Z;
                            }
                        } else {
                            e.Top.X = e.Curr.X;
                            e.Top.Y = e.Curr.Y;
                            if (ClipperLib.use_xyz) {
                                e.Top.Z = e.Curr.Z;
                            }
                            e.Bot.X = e.Next.Curr.X;
                            e.Bot.Y = e.Next.Curr.Y;
                            if (ClipperLib.use_xyz) {
                                e.Bot.Z = e.Next.Curr.Z;
                            }
                        }
                        this.SetDx(e);
                        e.PolyTyp = polyType;
                    };
                    ClipperLib.ClipperBase.prototype.FindNextLocMin = function(E) {
                        var E2;
                        for(;;){
                            while(ClipperLib.IntPoint.op_Inequality(E.Bot, E.Prev.Bot) || ClipperLib.IntPoint.op_Equality(E.Curr, E.Top)){
                                E = E.Next;
                            }
                            if (E.Dx !== ClipperLib.ClipperBase.horizontal && E.Prev.Dx !== ClipperLib.ClipperBase.horizontal) {
                                break;
                            }
                            while(E.Prev.Dx === ClipperLib.ClipperBase.horizontal){
                                E = E.Prev;
                            }
                            E2 = E;
                            while(E.Dx === ClipperLib.ClipperBase.horizontal){
                                E = E.Next;
                            }
                            if (E.Top.Y === E.Prev.Bot.Y) {
                                continue;
                            }
                            if (E2.Prev.Bot.X < E.Bot.X) {
                                E = E2;
                            }
                            break;
                        }
                        return E;
                    };
                    ClipperLib.ClipperBase.prototype.ProcessBound = function(E, LeftBoundIsForward) {
                        var EStart;
                        var Result = E;
                        var Horz;
                        if (Result.OutIdx === ClipperLib.ClipperBase.Skip) {
                            E = Result;
                            if (LeftBoundIsForward) {
                                while(E.Top.Y === E.Next.Bot.Y){
                                    E = E.Next;
                                }
                                while(E !== Result && E.Dx === ClipperLib.ClipperBase.horizontal){
                                    E = E.Prev;
                                }
                            } else {
                                while(E.Top.Y === E.Prev.Bot.Y){
                                    E = E.Prev;
                                }
                                while(E !== Result && E.Dx === ClipperLib.ClipperBase.horizontal){
                                    E = E.Next;
                                }
                            }
                            if (E === Result) {
                                if (LeftBoundIsForward) {
                                    Result = E.Next;
                                } else {
                                    Result = E.Prev;
                                }
                            } else {
                                if (LeftBoundIsForward) {
                                    E = Result.Next;
                                } else {
                                    E = Result.Prev;
                                }
                                var locMin = new ClipperLib.LocalMinima();
                                locMin.Next = null;
                                locMin.Y = E.Bot.Y;
                                locMin.LeftBound = null;
                                locMin.RightBound = E;
                                E.WindDelta = 0;
                                Result = this.ProcessBound(E, LeftBoundIsForward);
                                this.InsertLocalMinima(locMin);
                            }
                            return Result;
                        }
                        if (E.Dx === ClipperLib.ClipperBase.horizontal) {
                            if (LeftBoundIsForward) {
                                EStart = E.Prev;
                            } else {
                                EStart = E.Next;
                            }
                            if (EStart.Dx === ClipperLib.ClipperBase.horizontal) {
                                if (EStart.Bot.X !== E.Bot.X && EStart.Top.X !== E.Bot.X) {
                                    this.ReverseHorizontal(E);
                                }
                            } else if (EStart.Bot.X !== E.Bot.X) {
                                this.ReverseHorizontal(E);
                            }
                        }
                        EStart = E;
                        if (LeftBoundIsForward) {
                            while(Result.Top.Y === Result.Next.Bot.Y && Result.Next.OutIdx !== ClipperLib.ClipperBase.Skip){
                                Result = Result.Next;
                            }
                            if (Result.Dx === ClipperLib.ClipperBase.horizontal && Result.Next.OutIdx !== ClipperLib.ClipperBase.Skip) {
                                Horz = Result;
                                while(Horz.Prev.Dx === ClipperLib.ClipperBase.horizontal){
                                    Horz = Horz.Prev;
                                }
                                if (Horz.Prev.Top.X > Result.Next.Top.X) {
                                    Result = Horz.Prev;
                                }
                            }
                            while(E !== Result){
                                E.NextInLML = E.Next;
                                if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Prev.Top.X) {
                                    this.ReverseHorizontal(E);
                                }
                                E = E.Next;
                            }
                            if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Prev.Top.X) {
                                this.ReverseHorizontal(E);
                            }
                            Result = Result.Next;
                        } else {
                            while(Result.Top.Y === Result.Prev.Bot.Y && Result.Prev.OutIdx !== ClipperLib.ClipperBase.Skip){
                                Result = Result.Prev;
                            }
                            if (Result.Dx === ClipperLib.ClipperBase.horizontal && Result.Prev.OutIdx !== ClipperLib.ClipperBase.Skip) {
                                Horz = Result;
                                while(Horz.Next.Dx === ClipperLib.ClipperBase.horizontal){
                                    Horz = Horz.Next;
                                }
                                if (Horz.Next.Top.X === Result.Prev.Top.X || Horz.Next.Top.X > Result.Prev.Top.X) {
                                    Result = Horz.Next;
                                }
                            }
                            while(E !== Result){
                                E.NextInLML = E.Prev;
                                if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Next.Top.X) {
                                    this.ReverseHorizontal(E);
                                }
                                E = E.Prev;
                            }
                            if (E.Dx === ClipperLib.ClipperBase.horizontal && E !== EStart && E.Bot.X !== E.Next.Top.X) {
                                this.ReverseHorizontal(E);
                            }
                            Result = Result.Prev;
                        }
                        return Result;
                    };
                    ClipperLib.ClipperBase.prototype.AddPath = function(pg, polyType, Closed) {
                        if (ClipperLib.use_lines) {
                            if (!Closed && polyType === ClipperLib.PolyType.ptClip) {
                                ClipperLib.Error("AddPath: Open paths must be subject.");
                            }
                        } else {
                            if (!Closed) {
                                ClipperLib.Error("AddPath: Open paths have been disabled.");
                            }
                        }
                        var highI = pg.length - 1;
                        if (Closed) {
                            while(highI > 0 && ClipperLib.IntPoint.op_Equality(pg[highI], pg[0])){
                                --highI;
                            }
                        }
                        while(highI > 0 && ClipperLib.IntPoint.op_Equality(pg[highI], pg[highI - 1])){
                            --highI;
                        }
                        if (Closed && highI < 2 || !Closed && highI < 1) {
                            return false;
                        }
                        var edges = new Array();
                        for(var i = 0; i <= highI; i++){
                            edges.push(new ClipperLib.TEdge());
                        }
                        var IsFlat = true;
                        edges[1].Curr.X = pg[1].X;
                        edges[1].Curr.Y = pg[1].Y;
                        if (ClipperLib.use_xyz) {
                            edges[1].Curr.Z = pg[1].Z;
                        }
                        var $1 = {
                            Value: this.m_UseFullRange
                        };
                        this.RangeTest(pg[0], $1);
                        this.m_UseFullRange = $1.Value;
                        $1.Value = this.m_UseFullRange;
                        this.RangeTest(pg[highI], $1);
                        this.m_UseFullRange = $1.Value;
                        this.InitEdge(edges[0], edges[1], edges[highI], pg[0]);
                        this.InitEdge(edges[highI], edges[0], edges[highI - 1], pg[highI]);
                        for(var i = highI - 1; i >= 1; --i){
                            $1.Value = this.m_UseFullRange;
                            this.RangeTest(pg[i], $1);
                            this.m_UseFullRange = $1.Value;
                            this.InitEdge(edges[i], edges[i + 1], edges[i - 1], pg[i]);
                        }
                        var eStart = edges[0];
                        var E = eStart, eLoopStop = eStart;
                        for(;;){
                            if (E.Curr === E.Next.Curr && (Closed || E.Next !== eStart)) {
                                if (E === E.Next) {
                                    break;
                                }
                                if (E === eStart) {
                                    eStart = E.Next;
                                }
                                E = this.RemoveEdge(E);
                                eLoopStop = E;
                                continue;
                            }
                            if (E.Prev === E.Next) {
                                break;
                            } else if (Closed && ClipperLib.ClipperBase.SlopesEqual4(E.Prev.Curr, E.Curr, E.Next.Curr, this.m_UseFullRange) && (!this.PreserveCollinear || !this.Pt2IsBetweenPt1AndPt3(E.Prev.Curr, E.Curr, E.Next.Curr))) {
                                if (E === eStart) {
                                    eStart = E.Next;
                                }
                                E = this.RemoveEdge(E);
                                E = E.Prev;
                                eLoopStop = E;
                                continue;
                            }
                            E = E.Next;
                            if (E === eLoopStop || !Closed && E.Next === eStart) {
                                break;
                            }
                        }
                        if (!Closed && E === E.Next || Closed && E.Prev === E.Next) {
                            return false;
                        }
                        if (!Closed) {
                            this.m_HasOpenPaths = true;
                            eStart.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
                        }
                        E = eStart;
                        do {
                            this.InitEdge2(E, polyType);
                            E = E.Next;
                            if (IsFlat && E.Curr.Y !== eStart.Curr.Y) {
                                IsFlat = false;
                            }
                        }while (E !== eStart)
                        if (IsFlat) {
                            if (Closed) {
                                return false;
                            }
                            E.Prev.OutIdx = ClipperLib.ClipperBase.Skip;
                            var locMin = new ClipperLib.LocalMinima();
                            locMin.Next = null;
                            locMin.Y = E.Bot.Y;
                            locMin.LeftBound = null;
                            locMin.RightBound = E;
                            locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
                            locMin.RightBound.WindDelta = 0;
                            for(;;){
                                if (E.Bot.X !== E.Prev.Top.X) {
                                    this.ReverseHorizontal(E);
                                }
                                if (E.Next.OutIdx === ClipperLib.ClipperBase.Skip) {
                                    break;
                                }
                                E.NextInLML = E.Next;
                                E = E.Next;
                            }
                            this.InsertLocalMinima(locMin);
                            this.m_edges.push(edges);
                            return true;
                        }
                        this.m_edges.push(edges);
                        var leftBoundIsForward;
                        var EMin = null;
                        if (ClipperLib.IntPoint.op_Equality(E.Prev.Bot, E.Prev.Top)) {
                            E = E.Next;
                        }
                        for(;;){
                            E = this.FindNextLocMin(E);
                            if (E === EMin) {
                                break;
                            } else if (EMin === null) {
                                EMin = E;
                            }
                            var locMin = new ClipperLib.LocalMinima();
                            locMin.Next = null;
                            locMin.Y = E.Bot.Y;
                            if (E.Dx < E.Prev.Dx) {
                                locMin.LeftBound = E.Prev;
                                locMin.RightBound = E;
                                leftBoundIsForward = false;
                            } else {
                                locMin.LeftBound = E;
                                locMin.RightBound = E.Prev;
                                leftBoundIsForward = true;
                            }
                            locMin.LeftBound.Side = ClipperLib.EdgeSide.esLeft;
                            locMin.RightBound.Side = ClipperLib.EdgeSide.esRight;
                            if (!Closed) {
                                locMin.LeftBound.WindDelta = 0;
                            } else if (locMin.LeftBound.Next === locMin.RightBound) {
                                locMin.LeftBound.WindDelta = -1;
                            } else {
                                locMin.LeftBound.WindDelta = 1;
                            }
                            locMin.RightBound.WindDelta = -locMin.LeftBound.WindDelta;
                            E = this.ProcessBound(locMin.LeftBound, leftBoundIsForward);
                            if (E.OutIdx === ClipperLib.ClipperBase.Skip) {
                                E = this.ProcessBound(E, leftBoundIsForward);
                            }
                            var E2 = this.ProcessBound(locMin.RightBound, !leftBoundIsForward);
                            if (E2.OutIdx === ClipperLib.ClipperBase.Skip) {
                                E2 = this.ProcessBound(E2, !leftBoundIsForward);
                            }
                            if (locMin.LeftBound.OutIdx === ClipperLib.ClipperBase.Skip) {
                                locMin.LeftBound = null;
                            } else if (locMin.RightBound.OutIdx === ClipperLib.ClipperBase.Skip) {
                                locMin.RightBound = null;
                            }
                            this.InsertLocalMinima(locMin);
                            if (!leftBoundIsForward) {
                                E = E2;
                            }
                        }
                        return true;
                    };
                    ClipperLib.ClipperBase.prototype.AddPaths = function(ppg, polyType, closed) {
                        var result = false;
                        for(var i = 0, ilen = ppg.length; i < ilen; ++i){
                            if (this.AddPath(ppg[i], polyType, closed)) {
                                result = true;
                            }
                        }
                        return result;
                    };
                    ClipperLib.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3 = function(pt1, pt2, pt3) {
                        if (ClipperLib.IntPoint.op_Equality(pt1, pt3) || ClipperLib.IntPoint.op_Equality(pt1, pt2) || ClipperLib.IntPoint.op_Equality(pt3, pt2)) {
                            return false;
                        } else if (pt1.X !== pt3.X) {
                            return pt2.X > pt1.X === pt2.X < pt3.X;
                        } else {
                            return pt2.Y > pt1.Y === pt2.Y < pt3.Y;
                        }
                    };
                    ClipperLib.ClipperBase.prototype.RemoveEdge = function(e) {
                        e.Prev.Next = e.Next;
                        e.Next.Prev = e.Prev;
                        var result = e.Next;
                        e.Prev = null;
                        return result;
                    };
                    ClipperLib.ClipperBase.prototype.SetDx = function(e) {
                        e.Delta.X = e.Top.X - e.Bot.X;
                        e.Delta.Y = e.Top.Y - e.Bot.Y;
                        if (e.Delta.Y === 0) {
                            e.Dx = ClipperLib.ClipperBase.horizontal;
                        } else {
                            e.Dx = e.Delta.X / e.Delta.Y;
                        }
                    };
                    ClipperLib.ClipperBase.prototype.InsertLocalMinima = function(newLm) {
                        if (this.m_MinimaList === null) {
                            this.m_MinimaList = newLm;
                        } else if (newLm.Y >= this.m_MinimaList.Y) {
                            newLm.Next = this.m_MinimaList;
                            this.m_MinimaList = newLm;
                        } else {
                            var tmpLm = this.m_MinimaList;
                            while(tmpLm.Next !== null && newLm.Y < tmpLm.Next.Y){
                                tmpLm = tmpLm.Next;
                            }
                            newLm.Next = tmpLm.Next;
                            tmpLm.Next = newLm;
                        }
                    };
                    ClipperLib.ClipperBase.prototype.PopLocalMinima = function(Y, current) {
                        current.v = this.m_CurrentLM;
                        if (this.m_CurrentLM !== null && this.m_CurrentLM.Y === Y) {
                            this.m_CurrentLM = this.m_CurrentLM.Next;
                            return true;
                        }
                        return false;
                    };
                    ClipperLib.ClipperBase.prototype.ReverseHorizontal = function(e) {
                        var tmp = e.Top.X;
                        e.Top.X = e.Bot.X;
                        e.Bot.X = tmp;
                        if (ClipperLib.use_xyz) {
                            tmp = e.Top.Z;
                            e.Top.Z = e.Bot.Z;
                            e.Bot.Z = tmp;
                        }
                    };
                    ClipperLib.ClipperBase.prototype.Reset = function() {
                        this.m_CurrentLM = this.m_MinimaList;
                        if (this.m_CurrentLM === null) {
                            return;
                        }
                        this.m_Scanbeam = null;
                        var lm = this.m_MinimaList;
                        while(lm !== null){
                            this.InsertScanbeam(lm.Y);
                            var e = lm.LeftBound;
                            if (e !== null) {
                                e.Curr.X = e.Bot.X;
                                e.Curr.Y = e.Bot.Y;
                                if (ClipperLib.use_xyz) {
                                    e.Curr.Z = e.Bot.Z;
                                }
                                e.OutIdx = ClipperLib.ClipperBase.Unassigned;
                            }
                            e = lm.RightBound;
                            if (e !== null) {
                                e.Curr.X = e.Bot.X;
                                e.Curr.Y = e.Bot.Y;
                                if (ClipperLib.use_xyz) {
                                    e.Curr.Z = e.Bot.Z;
                                }
                                e.OutIdx = ClipperLib.ClipperBase.Unassigned;
                            }
                            lm = lm.Next;
                        }
                        this.m_ActiveEdges = null;
                    };
                    ClipperLib.ClipperBase.prototype.InsertScanbeam = function(Y) {
                        if (this.m_Scanbeam === null) {
                            this.m_Scanbeam = new ClipperLib.Scanbeam();
                            this.m_Scanbeam.Next = null;
                            this.m_Scanbeam.Y = Y;
                        } else if (Y > this.m_Scanbeam.Y) {
                            var newSb = new ClipperLib.Scanbeam();
                            newSb.Y = Y;
                            newSb.Next = this.m_Scanbeam;
                            this.m_Scanbeam = newSb;
                        } else {
                            var sb2 = this.m_Scanbeam;
                            while(sb2.Next !== null && Y <= sb2.Next.Y){
                                sb2 = sb2.Next;
                            }
                            if (Y === sb2.Y) {
                                return;
                            }
                            var newSb1 = new ClipperLib.Scanbeam();
                            newSb1.Y = Y;
                            newSb1.Next = sb2.Next;
                            sb2.Next = newSb1;
                        }
                    };
                    ClipperLib.ClipperBase.prototype.PopScanbeam = function(Y) {
                        if (this.m_Scanbeam === null) {
                            Y.v = 0;
                            return false;
                        }
                        Y.v = this.m_Scanbeam.Y;
                        this.m_Scanbeam = this.m_Scanbeam.Next;
                        return true;
                    };
                    ClipperLib.ClipperBase.prototype.LocalMinimaPending = function() {
                        return this.m_CurrentLM !== null;
                    };
                    ClipperLib.ClipperBase.prototype.CreateOutRec = function() {
                        var result = new ClipperLib.OutRec();
                        result.Idx = ClipperLib.ClipperBase.Unassigned;
                        result.IsHole = false;
                        result.IsOpen = false;
                        result.FirstLeft = null;
                        result.Pts = null;
                        result.BottomPt = null;
                        result.PolyNode = null;
                        this.m_PolyOuts.push(result);
                        result.Idx = this.m_PolyOuts.length - 1;
                        return result;
                    };
                    ClipperLib.ClipperBase.prototype.DisposeOutRec = function(index1) {
                        var outRec = this.m_PolyOuts[index1];
                        outRec.Pts = null;
                        outRec = null;
                        this.m_PolyOuts[index1] = null;
                    };
                    ClipperLib.ClipperBase.prototype.UpdateEdgeIntoAEL = function(e) {
                        if (e.NextInLML === null) {
                            ClipperLib.Error("UpdateEdgeIntoAEL: invalid call");
                        }
                        var AelPrev = e.PrevInAEL;
                        var AelNext = e.NextInAEL;
                        e.NextInLML.OutIdx = e.OutIdx;
                        if (AelPrev !== null) {
                            AelPrev.NextInAEL = e.NextInLML;
                        } else {
                            this.m_ActiveEdges = e.NextInLML;
                        }
                        if (AelNext !== null) {
                            AelNext.PrevInAEL = e.NextInLML;
                        }
                        e.NextInLML.Side = e.Side;
                        e.NextInLML.WindDelta = e.WindDelta;
                        e.NextInLML.WindCnt = e.WindCnt;
                        e.NextInLML.WindCnt2 = e.WindCnt2;
                        e = e.NextInLML;
                        e.Curr.X = e.Bot.X;
                        e.Curr.Y = e.Bot.Y;
                        e.PrevInAEL = AelPrev;
                        e.NextInAEL = AelNext;
                        if (!ClipperLib.ClipperBase.IsHorizontal(e)) {
                            this.InsertScanbeam(e.Top.Y);
                        }
                        return e;
                    };
                    ClipperLib.ClipperBase.prototype.SwapPositionsInAEL = function(edge1, edge2) {
                        if (edge1.NextInAEL === edge1.PrevInAEL || edge2.NextInAEL === edge2.PrevInAEL) {
                            return;
                        }
                        if (edge1.NextInAEL === edge2) {
                            var next = edge2.NextInAEL;
                            if (next !== null) {
                                next.PrevInAEL = edge1;
                            }
                            var prev = edge1.PrevInAEL;
                            if (prev !== null) {
                                prev.NextInAEL = edge2;
                            }
                            edge2.PrevInAEL = prev;
                            edge2.NextInAEL = edge1;
                            edge1.PrevInAEL = edge2;
                            edge1.NextInAEL = next;
                        } else if (edge2.NextInAEL === edge1) {
                            var next1 = edge1.NextInAEL;
                            if (next1 !== null) {
                                next1.PrevInAEL = edge2;
                            }
                            var prev1 = edge2.PrevInAEL;
                            if (prev1 !== null) {
                                prev1.NextInAEL = edge1;
                            }
                            edge1.PrevInAEL = prev1;
                            edge1.NextInAEL = edge2;
                            edge2.PrevInAEL = edge1;
                            edge2.NextInAEL = next1;
                        } else {
                            var next2 = edge1.NextInAEL;
                            var prev2 = edge1.PrevInAEL;
                            edge1.NextInAEL = edge2.NextInAEL;
                            if (edge1.NextInAEL !== null) {
                                edge1.NextInAEL.PrevInAEL = edge1;
                            }
                            edge1.PrevInAEL = edge2.PrevInAEL;
                            if (edge1.PrevInAEL !== null) {
                                edge1.PrevInAEL.NextInAEL = edge1;
                            }
                            edge2.NextInAEL = next2;
                            if (edge2.NextInAEL !== null) {
                                edge2.NextInAEL.PrevInAEL = edge2;
                            }
                            edge2.PrevInAEL = prev2;
                            if (edge2.PrevInAEL !== null) {
                                edge2.PrevInAEL.NextInAEL = edge2;
                            }
                        }
                        if (edge1.PrevInAEL === null) {
                            this.m_ActiveEdges = edge1;
                        } else {
                            if (edge2.PrevInAEL === null) {
                                this.m_ActiveEdges = edge2;
                            }
                        }
                    };
                    ClipperLib.ClipperBase.prototype.DeleteFromAEL = function(e) {
                        var AelPrev = e.PrevInAEL;
                        var AelNext = e.NextInAEL;
                        if (AelPrev === null && AelNext === null && e !== this.m_ActiveEdges) {
                            return;
                        }
                        if (AelPrev !== null) {
                            AelPrev.NextInAEL = AelNext;
                        } else {
                            this.m_ActiveEdges = AelNext;
                        }
                        if (AelNext !== null) {
                            AelNext.PrevInAEL = AelPrev;
                        }
                        e.NextInAEL = null;
                        e.PrevInAEL = null;
                    };
                    ClipperLib.Clipper = function(InitOptions) {
                        if (typeof InitOptions === "undefined") {
                            InitOptions = 0;
                        }
                        this.m_PolyOuts = null;
                        this.m_ClipType = ClipperLib.ClipType.ctIntersection;
                        this.m_Scanbeam = null;
                        this.m_Maxima = null;
                        this.m_ActiveEdges = null;
                        this.m_SortedEdges = null;
                        this.m_IntersectList = null;
                        this.m_IntersectNodeComparer = null;
                        this.m_ExecuteLocked = false;
                        this.m_ClipFillType = ClipperLib.PolyFillType.pftEvenOdd;
                        this.m_SubjFillType = ClipperLib.PolyFillType.pftEvenOdd;
                        this.m_Joins = null;
                        this.m_GhostJoins = null;
                        this.m_UsingPolyTree = false;
                        this.ReverseSolution = false;
                        this.StrictlySimple = false;
                        ClipperLib.ClipperBase.call(this);
                        this.m_Scanbeam = null;
                        this.m_Maxima = null;
                        this.m_ActiveEdges = null;
                        this.m_SortedEdges = null;
                        this.m_IntersectList = new Array();
                        this.m_IntersectNodeComparer = ClipperLib.MyIntersectNodeSort.Compare;
                        this.m_ExecuteLocked = false;
                        this.m_UsingPolyTree = false;
                        this.m_PolyOuts = new Array();
                        this.m_Joins = new Array();
                        this.m_GhostJoins = new Array();
                        this.ReverseSolution = (1 & InitOptions) !== 0;
                        this.StrictlySimple = (2 & InitOptions) !== 0;
                        this.PreserveCollinear = (4 & InitOptions) !== 0;
                        if (ClipperLib.use_xyz) {
                            this.ZFillFunction = null;
                        }
                    };
                    ClipperLib.Clipper.ioReverseSolution = 1;
                    ClipperLib.Clipper.ioStrictlySimple = 2;
                    ClipperLib.Clipper.ioPreserveCollinear = 4;
                    ClipperLib.Clipper.prototype.Clear = function() {
                        if (this.m_edges.length === 0) {
                            return;
                        }
                        this.DisposeAllPolyPts();
                        ClipperLib.ClipperBase.prototype.Clear.call(this);
                    };
                    ClipperLib.Clipper.prototype.InsertMaxima = function(X) {
                        var newMax = new ClipperLib.Maxima();
                        newMax.X = X;
                        if (this.m_Maxima === null) {
                            this.m_Maxima = newMax;
                            this.m_Maxima.Next = null;
                            this.m_Maxima.Prev = null;
                        } else if (X < this.m_Maxima.X) {
                            newMax.Next = this.m_Maxima;
                            newMax.Prev = null;
                            this.m_Maxima = newMax;
                        } else {
                            var m = this.m_Maxima;
                            while(m.Next !== null && X >= m.Next.X){
                                m = m.Next;
                            }
                            if (X === m.X) {
                                return;
                            }
                            newMax.Next = m.Next;
                            newMax.Prev = m;
                            if (m.Next !== null) {
                                m.Next.Prev = newMax;
                            }
                            m.Next = newMax;
                        }
                    };
                    ClipperLib.Clipper.prototype.Execute = function() {
                        var a = arguments, alen = a.length, ispolytree = a[1] instanceof ClipperLib.PolyTree;
                        if (alen === 4 && !ispolytree) {
                            var clipType = a[0], solution = a[1], subjFillType = a[2], clipFillType = a[3];
                            if (this.m_ExecuteLocked) {
                                return false;
                            }
                            if (this.m_HasOpenPaths) {
                                ClipperLib.Error("Error: PolyTree struct is needed for open path clipping.");
                            }
                            this.m_ExecuteLocked = true;
                            ClipperLib.Clear(solution);
                            this.m_SubjFillType = subjFillType;
                            this.m_ClipFillType = clipFillType;
                            this.m_ClipType = clipType;
                            this.m_UsingPolyTree = false;
                            try {
                                var succeeded = this.ExecuteInternal();
                                if (succeeded) {
                                    this.BuildResult(solution);
                                }
                            } finally{
                                this.DisposeAllPolyPts();
                                this.m_ExecuteLocked = false;
                            }
                            return succeeded;
                        } else if (alen === 4 && ispolytree) {
                            var clipType = a[0], polytree = a[1], subjFillType = a[2], clipFillType = a[3];
                            if (this.m_ExecuteLocked) {
                                return false;
                            }
                            this.m_ExecuteLocked = true;
                            this.m_SubjFillType = subjFillType;
                            this.m_ClipFillType = clipFillType;
                            this.m_ClipType = clipType;
                            this.m_UsingPolyTree = true;
                            try {
                                var succeeded = this.ExecuteInternal();
                                if (succeeded) {
                                    this.BuildResult2(polytree);
                                }
                            } finally{
                                this.DisposeAllPolyPts();
                                this.m_ExecuteLocked = false;
                            }
                            return succeeded;
                        } else if (alen === 2 && !ispolytree) {
                            var clipType = a[0], solution = a[1];
                            return this.Execute(clipType, solution, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
                        } else if (alen === 2 && ispolytree) {
                            var clipType = a[0], polytree = a[1];
                            return this.Execute(clipType, polytree, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);
                        }
                    };
                    ClipperLib.Clipper.prototype.FixHoleLinkage = function(outRec) {
                        if (outRec.FirstLeft === null || outRec.IsHole !== outRec.FirstLeft.IsHole && outRec.FirstLeft.Pts !== null) {
                            return;
                        }
                        var orfl = outRec.FirstLeft;
                        while(orfl !== null && (orfl.IsHole === outRec.IsHole || orfl.Pts === null)){
                            orfl = orfl.FirstLeft;
                        }
                        outRec.FirstLeft = orfl;
                    };
                    ClipperLib.Clipper.prototype.ExecuteInternal = function() {
                        try {
                            this.Reset();
                            this.m_SortedEdges = null;
                            this.m_Maxima = null;
                            var botY = {
                            }, topY = {
                            };
                            if (!this.PopScanbeam(botY)) {
                                return false;
                            }
                            this.InsertLocalMinimaIntoAEL(botY.v);
                            while(this.PopScanbeam(topY) || this.LocalMinimaPending()){
                                this.ProcessHorizontals();
                                this.m_GhostJoins.length = 0;
                                if (!this.ProcessIntersections(topY.v)) {
                                    return false;
                                }
                                this.ProcessEdgesAtTopOfScanbeam(topY.v);
                                botY.v = topY.v;
                                this.InsertLocalMinimaIntoAEL(botY.v);
                            }
                            var outRec, i, ilen;
                            for(i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                                outRec = this.m_PolyOuts[i];
                                if (outRec.Pts === null || outRec.IsOpen) {
                                    continue;
                                }
                                if ((outRec.IsHole ^ this.ReverseSolution) == this.Area$1(outRec) > 0) {
                                    this.ReversePolyPtLinks(outRec.Pts);
                                }
                            }
                            this.JoinCommonEdges();
                            for(i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                                outRec = this.m_PolyOuts[i];
                                if (outRec.Pts === null) {
                                    continue;
                                } else if (outRec.IsOpen) {
                                    this.FixupOutPolyline(outRec);
                                } else {
                                    this.FixupOutPolygon(outRec);
                                }
                            }
                            if (this.StrictlySimple) {
                                this.DoSimplePolygons();
                            }
                            return true;
                        } finally{
                            this.m_Joins.length = 0;
                            this.m_GhostJoins.length = 0;
                        }
                    };
                    ClipperLib.Clipper.prototype.DisposeAllPolyPts = function() {
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; ++i){
                            this.DisposeOutRec(i);
                        }
                        ClipperLib.Clear(this.m_PolyOuts);
                    };
                    ClipperLib.Clipper.prototype.AddJoin = function(Op1, Op2, OffPt) {
                        var j = new ClipperLib.Join();
                        j.OutPt1 = Op1;
                        j.OutPt2 = Op2;
                        j.OffPt.X = OffPt.X;
                        j.OffPt.Y = OffPt.Y;
                        if (ClipperLib.use_xyz) {
                            j.OffPt.Z = OffPt.Z;
                        }
                        this.m_Joins.push(j);
                    };
                    ClipperLib.Clipper.prototype.AddGhostJoin = function(Op, OffPt) {
                        var j = new ClipperLib.Join();
                        j.OutPt1 = Op;
                        j.OffPt.X = OffPt.X;
                        j.OffPt.Y = OffPt.Y;
                        if (ClipperLib.use_xyz) {
                            j.OffPt.Z = OffPt.Z;
                        }
                        this.m_GhostJoins.push(j);
                    };
                    ClipperLib.Clipper.prototype.SetZ = function(pt, e1, e2) {
                        if (this.ZFillFunction !== null) {
                            if (pt.Z !== 0 || this.ZFillFunction === null) {
                                return;
                            } else if (ClipperLib.IntPoint.op_Equality(pt, e1.Bot)) {
                                pt.Z = e1.Bot.Z;
                            } else if (ClipperLib.IntPoint.op_Equality(pt, e1.Top)) {
                                pt.Z = e1.Top.Z;
                            } else if (ClipperLib.IntPoint.op_Equality(pt, e2.Bot)) {
                                pt.Z = e2.Bot.Z;
                            } else if (ClipperLib.IntPoint.op_Equality(pt, e2.Top)) {
                                pt.Z = e2.Top.Z;
                            } else {
                                this.ZFillFunction(e1.Bot, e1.Top, e2.Bot, e2.Top, pt);
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.InsertLocalMinimaIntoAEL = function(botY) {
                        var lm = {
                        };
                        var lb;
                        var rb;
                        while(this.PopLocalMinima(botY, lm)){
                            lb = lm.v.LeftBound;
                            rb = lm.v.RightBound;
                            var Op1 = null;
                            if (lb === null) {
                                this.InsertEdgeIntoAEL(rb, null);
                                this.SetWindingCount(rb);
                                if (this.IsContributing(rb)) {
                                    Op1 = this.AddOutPt(rb, rb.Bot);
                                }
                            } else if (rb === null) {
                                this.InsertEdgeIntoAEL(lb, null);
                                this.SetWindingCount(lb);
                                if (this.IsContributing(lb)) {
                                    Op1 = this.AddOutPt(lb, lb.Bot);
                                }
                                this.InsertScanbeam(lb.Top.Y);
                            } else {
                                this.InsertEdgeIntoAEL(lb, null);
                                this.InsertEdgeIntoAEL(rb, lb);
                                this.SetWindingCount(lb);
                                rb.WindCnt = lb.WindCnt;
                                rb.WindCnt2 = lb.WindCnt2;
                                if (this.IsContributing(lb)) {
                                    Op1 = this.AddLocalMinPoly(lb, rb, lb.Bot);
                                }
                                this.InsertScanbeam(lb.Top.Y);
                            }
                            if (rb !== null) {
                                if (ClipperLib.ClipperBase.IsHorizontal(rb)) {
                                    if (rb.NextInLML !== null) {
                                        this.InsertScanbeam(rb.NextInLML.Top.Y);
                                    }
                                    this.AddEdgeToSEL(rb);
                                } else {
                                    this.InsertScanbeam(rb.Top.Y);
                                }
                            }
                            if (lb === null || rb === null) {
                                continue;
                            }
                            if (Op1 !== null && ClipperLib.ClipperBase.IsHorizontal(rb) && this.m_GhostJoins.length > 0 && rb.WindDelta !== 0) {
                                for(var i = 0, ilen = this.m_GhostJoins.length; i < ilen; i++){
                                    var j = this.m_GhostJoins[i];
                                    if (this.HorzSegmentsOverlap(j.OutPt1.Pt.X, j.OffPt.X, rb.Bot.X, rb.Top.X)) {
                                        this.AddJoin(j.OutPt1, Op1, j.OffPt);
                                    }
                                }
                            }
                            if (lb.OutIdx >= 0 && lb.PrevInAEL !== null && lb.PrevInAEL.Curr.X === lb.Bot.X && lb.PrevInAEL.OutIdx >= 0 && ClipperLib.ClipperBase.SlopesEqual5(lb.PrevInAEL.Curr, lb.PrevInAEL.Top, lb.Curr, lb.Top, this.m_UseFullRange) && lb.WindDelta !== 0 && lb.PrevInAEL.WindDelta !== 0) {
                                var Op2 = this.AddOutPt(lb.PrevInAEL, lb.Bot);
                                this.AddJoin(Op1, Op2, lb.Top);
                            }
                            if (lb.NextInAEL !== rb) {
                                if (rb.OutIdx >= 0 && rb.PrevInAEL.OutIdx >= 0 && ClipperLib.ClipperBase.SlopesEqual5(rb.PrevInAEL.Curr, rb.PrevInAEL.Top, rb.Curr, rb.Top, this.m_UseFullRange) && rb.WindDelta !== 0 && rb.PrevInAEL.WindDelta !== 0) {
                                    var Op2 = this.AddOutPt(rb.PrevInAEL, rb.Bot);
                                    this.AddJoin(Op1, Op2, rb.Top);
                                }
                                var e = lb.NextInAEL;
                                if (e !== null) {
                                    while(e !== rb){
                                        this.IntersectEdges(rb, e, lb.Curr);
                                        e = e.NextInAEL;
                                    }
                                }
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.InsertEdgeIntoAEL = function(edge, startEdge) {
                        if (this.m_ActiveEdges === null) {
                            edge.PrevInAEL = null;
                            edge.NextInAEL = null;
                            this.m_ActiveEdges = edge;
                        } else if (startEdge === null && this.E2InsertsBeforeE1(this.m_ActiveEdges, edge)) {
                            edge.PrevInAEL = null;
                            edge.NextInAEL = this.m_ActiveEdges;
                            this.m_ActiveEdges.PrevInAEL = edge;
                            this.m_ActiveEdges = edge;
                        } else {
                            if (startEdge === null) {
                                startEdge = this.m_ActiveEdges;
                            }
                            while(startEdge.NextInAEL !== null && !this.E2InsertsBeforeE1(startEdge.NextInAEL, edge)){
                                startEdge = startEdge.NextInAEL;
                            }
                            edge.NextInAEL = startEdge.NextInAEL;
                            if (startEdge.NextInAEL !== null) {
                                startEdge.NextInAEL.PrevInAEL = edge;
                            }
                            edge.PrevInAEL = startEdge;
                            startEdge.NextInAEL = edge;
                        }
                    };
                    ClipperLib.Clipper.prototype.E2InsertsBeforeE1 = function(e1, e2) {
                        if (e2.Curr.X === e1.Curr.X) {
                            if (e2.Top.Y > e1.Top.Y) {
                                return e2.Top.X < ClipperLib.Clipper.TopX(e1, e2.Top.Y);
                            } else {
                                return e1.Top.X > ClipperLib.Clipper.TopX(e2, e1.Top.Y);
                            }
                        } else {
                            return e2.Curr.X < e1.Curr.X;
                        }
                    };
                    ClipperLib.Clipper.prototype.IsEvenOddFillType = function(edge) {
                        if (edge.PolyTyp === ClipperLib.PolyType.ptSubject) {
                            return this.m_SubjFillType === ClipperLib.PolyFillType.pftEvenOdd;
                        } else {
                            return this.m_ClipFillType === ClipperLib.PolyFillType.pftEvenOdd;
                        }
                    };
                    ClipperLib.Clipper.prototype.IsEvenOddAltFillType = function(edge) {
                        if (edge.PolyTyp === ClipperLib.PolyType.ptSubject) {
                            return this.m_ClipFillType === ClipperLib.PolyFillType.pftEvenOdd;
                        } else {
                            return this.m_SubjFillType === ClipperLib.PolyFillType.pftEvenOdd;
                        }
                    };
                    ClipperLib.Clipper.prototype.IsContributing = function(edge) {
                        var pft, pft2;
                        if (edge.PolyTyp === ClipperLib.PolyType.ptSubject) {
                            pft = this.m_SubjFillType;
                            pft2 = this.m_ClipFillType;
                        } else {
                            pft = this.m_ClipFillType;
                            pft2 = this.m_SubjFillType;
                        }
                        switch(pft){
                            case ClipperLib.PolyFillType.pftEvenOdd:
                                if (edge.WindDelta === 0 && edge.WindCnt !== 1) {
                                    return false;
                                }
                                break;
                            case ClipperLib.PolyFillType.pftNonZero:
                                if (Math.abs(edge.WindCnt) !== 1) {
                                    return false;
                                }
                                break;
                            case ClipperLib.PolyFillType.pftPositive:
                                if (edge.WindCnt !== 1) {
                                    return false;
                                }
                                break;
                            default:
                                if (edge.WindCnt !== -1) {
                                    return false;
                                }
                                break;
                        }
                        switch(this.m_ClipType){
                            case ClipperLib.ClipType.ctIntersection:
                                switch(pft2){
                                    case ClipperLib.PolyFillType.pftEvenOdd:
                                    case ClipperLib.PolyFillType.pftNonZero:
                                        return edge.WindCnt2 !== 0;
                                    case ClipperLib.PolyFillType.pftPositive:
                                        return edge.WindCnt2 > 0;
                                    default:
                                        return edge.WindCnt2 < 0;
                                }
                            case ClipperLib.ClipType.ctUnion:
                                switch(pft2){
                                    case ClipperLib.PolyFillType.pftEvenOdd:
                                    case ClipperLib.PolyFillType.pftNonZero:
                                        return edge.WindCnt2 === 0;
                                    case ClipperLib.PolyFillType.pftPositive:
                                        return edge.WindCnt2 <= 0;
                                    default:
                                        return edge.WindCnt2 >= 0;
                                }
                            case ClipperLib.ClipType.ctDifference:
                                if (edge.PolyTyp === ClipperLib.PolyType.ptSubject) {
                                    switch(pft2){
                                        case ClipperLib.PolyFillType.pftEvenOdd:
                                        case ClipperLib.PolyFillType.pftNonZero:
                                            return edge.WindCnt2 === 0;
                                        case ClipperLib.PolyFillType.pftPositive:
                                            return edge.WindCnt2 <= 0;
                                        default:
                                            return edge.WindCnt2 >= 0;
                                    }
                                } else {
                                    switch(pft2){
                                        case ClipperLib.PolyFillType.pftEvenOdd:
                                        case ClipperLib.PolyFillType.pftNonZero:
                                            return edge.WindCnt2 !== 0;
                                        case ClipperLib.PolyFillType.pftPositive:
                                            return edge.WindCnt2 > 0;
                                        default:
                                            return edge.WindCnt2 < 0;
                                    }
                                }
                            case ClipperLib.ClipType.ctXor:
                                if (edge.WindDelta === 0) {
                                    switch(pft2){
                                        case ClipperLib.PolyFillType.pftEvenOdd:
                                        case ClipperLib.PolyFillType.pftNonZero:
                                            return edge.WindCnt2 === 0;
                                        case ClipperLib.PolyFillType.pftPositive:
                                            return edge.WindCnt2 <= 0;
                                        default:
                                            return edge.WindCnt2 >= 0;
                                    }
                                } else {
                                    return true;
                                }
                        }
                        return true;
                    };
                    ClipperLib.Clipper.prototype.SetWindingCount = function(edge) {
                        var e = edge.PrevInAEL;
                        while(e !== null && (e.PolyTyp !== edge.PolyTyp || e.WindDelta === 0)){
                            e = e.PrevInAEL;
                        }
                        if (e === null) {
                            var pft = edge.PolyTyp === ClipperLib.PolyType.ptSubject ? this.m_SubjFillType : this.m_ClipFillType;
                            if (edge.WindDelta === 0) {
                                edge.WindCnt = pft === ClipperLib.PolyFillType.pftNegative ? -1 : 1;
                            } else {
                                edge.WindCnt = edge.WindDelta;
                            }
                            edge.WindCnt2 = 0;
                            e = this.m_ActiveEdges;
                        } else if (edge.WindDelta === 0 && this.m_ClipType !== ClipperLib.ClipType.ctUnion) {
                            edge.WindCnt = 1;
                            edge.WindCnt2 = e.WindCnt2;
                            e = e.NextInAEL;
                        } else if (this.IsEvenOddFillType(edge)) {
                            if (edge.WindDelta === 0) {
                                var Inside = true;
                                var e2 = e.PrevInAEL;
                                while(e2 !== null){
                                    if (e2.PolyTyp === e.PolyTyp && e2.WindDelta !== 0) {
                                        Inside = !Inside;
                                    }
                                    e2 = e2.PrevInAEL;
                                }
                                edge.WindCnt = Inside ? 0 : 1;
                            } else {
                                edge.WindCnt = edge.WindDelta;
                            }
                            edge.WindCnt2 = e.WindCnt2;
                            e = e.NextInAEL;
                        } else {
                            if (e.WindCnt * e.WindDelta < 0) {
                                if (Math.abs(e.WindCnt) > 1) {
                                    if (e.WindDelta * edge.WindDelta < 0) {
                                        edge.WindCnt = e.WindCnt;
                                    } else {
                                        edge.WindCnt = e.WindCnt + edge.WindDelta;
                                    }
                                } else {
                                    edge.WindCnt = edge.WindDelta === 0 ? 1 : edge.WindDelta;
                                }
                            } else {
                                if (edge.WindDelta === 0) {
                                    edge.WindCnt = e.WindCnt < 0 ? e.WindCnt - 1 : e.WindCnt + 1;
                                } else if (e.WindDelta * edge.WindDelta < 0) {
                                    edge.WindCnt = e.WindCnt;
                                } else {
                                    edge.WindCnt = e.WindCnt + edge.WindDelta;
                                }
                            }
                            edge.WindCnt2 = e.WindCnt2;
                            e = e.NextInAEL;
                        }
                        if (this.IsEvenOddAltFillType(edge)) {
                            while(e !== edge){
                                if (e.WindDelta !== 0) {
                                    edge.WindCnt2 = edge.WindCnt2 === 0 ? 1 : 0;
                                }
                                e = e.NextInAEL;
                            }
                        } else {
                            while(e !== edge){
                                edge.WindCnt2 += e.WindDelta;
                                e = e.NextInAEL;
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.AddEdgeToSEL = function(edge) {
                        if (this.m_SortedEdges === null) {
                            this.m_SortedEdges = edge;
                            edge.PrevInSEL = null;
                            edge.NextInSEL = null;
                        } else {
                            edge.NextInSEL = this.m_SortedEdges;
                            edge.PrevInSEL = null;
                            this.m_SortedEdges.PrevInSEL = edge;
                            this.m_SortedEdges = edge;
                        }
                    };
                    ClipperLib.Clipper.prototype.PopEdgeFromSEL = function(e) {
                        e.v = this.m_SortedEdges;
                        if (e.v === null) {
                            return false;
                        }
                        var oldE = e.v;
                        this.m_SortedEdges = e.v.NextInSEL;
                        if (this.m_SortedEdges !== null) {
                            this.m_SortedEdges.PrevInSEL = null;
                        }
                        oldE.NextInSEL = null;
                        oldE.PrevInSEL = null;
                        return true;
                    };
                    ClipperLib.Clipper.prototype.CopyAELToSEL = function() {
                        var e = this.m_ActiveEdges;
                        this.m_SortedEdges = e;
                        while(e !== null){
                            e.PrevInSEL = e.PrevInAEL;
                            e.NextInSEL = e.NextInAEL;
                            e = e.NextInAEL;
                        }
                    };
                    ClipperLib.Clipper.prototype.SwapPositionsInSEL = function(edge1, edge2) {
                        if (edge1.NextInSEL === null && edge1.PrevInSEL === null) {
                            return;
                        }
                        if (edge2.NextInSEL === null && edge2.PrevInSEL === null) {
                            return;
                        }
                        if (edge1.NextInSEL === edge2) {
                            var next = edge2.NextInSEL;
                            if (next !== null) {
                                next.PrevInSEL = edge1;
                            }
                            var prev = edge1.PrevInSEL;
                            if (prev !== null) {
                                prev.NextInSEL = edge2;
                            }
                            edge2.PrevInSEL = prev;
                            edge2.NextInSEL = edge1;
                            edge1.PrevInSEL = edge2;
                            edge1.NextInSEL = next;
                        } else if (edge2.NextInSEL === edge1) {
                            var next = edge1.NextInSEL;
                            if (next !== null) {
                                next.PrevInSEL = edge2;
                            }
                            var prev = edge2.PrevInSEL;
                            if (prev !== null) {
                                prev.NextInSEL = edge1;
                            }
                            edge1.PrevInSEL = prev;
                            edge1.NextInSEL = edge2;
                            edge2.PrevInSEL = edge1;
                            edge2.NextInSEL = next;
                        } else {
                            var next = edge1.NextInSEL;
                            var prev = edge1.PrevInSEL;
                            edge1.NextInSEL = edge2.NextInSEL;
                            if (edge1.NextInSEL !== null) {
                                edge1.NextInSEL.PrevInSEL = edge1;
                            }
                            edge1.PrevInSEL = edge2.PrevInSEL;
                            if (edge1.PrevInSEL !== null) {
                                edge1.PrevInSEL.NextInSEL = edge1;
                            }
                            edge2.NextInSEL = next;
                            if (edge2.NextInSEL !== null) {
                                edge2.NextInSEL.PrevInSEL = edge2;
                            }
                            edge2.PrevInSEL = prev;
                            if (edge2.PrevInSEL !== null) {
                                edge2.PrevInSEL.NextInSEL = edge2;
                            }
                        }
                        if (edge1.PrevInSEL === null) {
                            this.m_SortedEdges = edge1;
                        } else if (edge2.PrevInSEL === null) {
                            this.m_SortedEdges = edge2;
                        }
                    };
                    ClipperLib.Clipper.prototype.AddLocalMaxPoly = function(e1, e2, pt) {
                        this.AddOutPt(e1, pt);
                        if (e2.WindDelta === 0) {
                            this.AddOutPt(e2, pt);
                        }
                        if (e1.OutIdx === e2.OutIdx) {
                            e1.OutIdx = -1;
                            e2.OutIdx = -1;
                        } else if (e1.OutIdx < e2.OutIdx) {
                            this.AppendPolygon(e1, e2);
                        } else {
                            this.AppendPolygon(e2, e1);
                        }
                    };
                    ClipperLib.Clipper.prototype.AddLocalMinPoly = function(e1, e2, pt) {
                        var result;
                        var e, prevE;
                        if (ClipperLib.ClipperBase.IsHorizontal(e2) || e1.Dx > e2.Dx) {
                            result = this.AddOutPt(e1, pt);
                            e2.OutIdx = e1.OutIdx;
                            e1.Side = ClipperLib.EdgeSide.esLeft;
                            e2.Side = ClipperLib.EdgeSide.esRight;
                            e = e1;
                            if (e.PrevInAEL === e2) {
                                prevE = e2.PrevInAEL;
                            } else {
                                prevE = e.PrevInAEL;
                            }
                        } else {
                            result = this.AddOutPt(e2, pt);
                            e1.OutIdx = e2.OutIdx;
                            e1.Side = ClipperLib.EdgeSide.esRight;
                            e2.Side = ClipperLib.EdgeSide.esLeft;
                            e = e2;
                            if (e.PrevInAEL === e1) {
                                prevE = e1.PrevInAEL;
                            } else {
                                prevE = e.PrevInAEL;
                            }
                        }
                        if (prevE !== null && prevE.OutIdx >= 0 && prevE.Top.Y < pt.Y && e.Top.Y < pt.Y) {
                            var xPrev = ClipperLib.Clipper.TopX(prevE, pt.Y);
                            var xE = ClipperLib.Clipper.TopX(e, pt.Y);
                            if (xPrev === xE && e.WindDelta !== 0 && prevE.WindDelta !== 0 && ClipperLib.ClipperBase.SlopesEqual5(new ClipperLib.IntPoint2(xPrev, pt.Y), prevE.Top, new ClipperLib.IntPoint2(xE, pt.Y), e.Top, this.m_UseFullRange)) {
                                var outPt = this.AddOutPt(prevE, pt);
                                this.AddJoin(result, outPt, e.Top);
                            }
                        }
                        return result;
                    };
                    ClipperLib.Clipper.prototype.AddOutPt = function(e, pt) {
                        if (e.OutIdx < 0) {
                            var outRec = this.CreateOutRec();
                            outRec.IsOpen = e.WindDelta === 0;
                            var newOp = new ClipperLib.OutPt();
                            outRec.Pts = newOp;
                            newOp.Idx = outRec.Idx;
                            newOp.Pt.X = pt.X;
                            newOp.Pt.Y = pt.Y;
                            if (ClipperLib.use_xyz) {
                                newOp.Pt.Z = pt.Z;
                            }
                            newOp.Next = newOp;
                            newOp.Prev = newOp;
                            if (!outRec.IsOpen) {
                                this.SetHoleState(e, outRec);
                            }
                            e.OutIdx = outRec.Idx;
                            return newOp;
                        } else {
                            var outRec = this.m_PolyOuts[e.OutIdx];
                            var op = outRec.Pts;
                            var ToFront = e.Side === ClipperLib.EdgeSide.esLeft;
                            if (ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Pt)) {
                                return op;
                            } else if (!ToFront && ClipperLib.IntPoint.op_Equality(pt, op.Prev.Pt)) {
                                return op.Prev;
                            }
                            var newOp = new ClipperLib.OutPt();
                            newOp.Idx = outRec.Idx;
                            newOp.Pt.X = pt.X;
                            newOp.Pt.Y = pt.Y;
                            if (ClipperLib.use_xyz) {
                                newOp.Pt.Z = pt.Z;
                            }
                            newOp.Next = op;
                            newOp.Prev = op.Prev;
                            newOp.Prev.Next = newOp;
                            op.Prev = newOp;
                            if (ToFront) {
                                outRec.Pts = newOp;
                            }
                            return newOp;
                        }
                    };
                    ClipperLib.Clipper.prototype.GetLastOutPt = function(e) {
                        var outRec = this.m_PolyOuts[e.OutIdx];
                        if (e.Side === ClipperLib.EdgeSide.esLeft) {
                            return outRec.Pts;
                        } else {
                            return outRec.Pts.Prev;
                        }
                    };
                    ClipperLib.Clipper.prototype.SwapPoints = function(pt1, pt2) {
                        var tmp = new ClipperLib.IntPoint1(pt1.Value);
                        pt1.Value.X = pt2.Value.X;
                        pt1.Value.Y = pt2.Value.Y;
                        if (ClipperLib.use_xyz) {
                            pt1.Value.Z = pt2.Value.Z;
                        }
                        pt2.Value.X = tmp.X;
                        pt2.Value.Y = tmp.Y;
                        if (ClipperLib.use_xyz) {
                            pt2.Value.Z = tmp.Z;
                        }
                    };
                    ClipperLib.Clipper.prototype.HorzSegmentsOverlap = function(seg1a, seg1b, seg2a, seg2b) {
                        var tmp;
                        if (seg1a > seg1b) {
                            tmp = seg1a;
                            seg1a = seg1b;
                            seg1b = tmp;
                        }
                        if (seg2a > seg2b) {
                            tmp = seg2a;
                            seg2a = seg2b;
                            seg2b = tmp;
                        }
                        return seg1a < seg2b && seg2a < seg1b;
                    };
                    ClipperLib.Clipper.prototype.SetHoleState = function(e, outRec) {
                        var e2 = e.PrevInAEL;
                        var eTmp = null;
                        while(e2 !== null){
                            if (e2.OutIdx >= 0 && e2.WindDelta !== 0) {
                                if (eTmp === null) {
                                    eTmp = e2;
                                } else if (eTmp.OutIdx === e2.OutIdx) {
                                    eTmp = null;
                                }
                            }
                            e2 = e2.PrevInAEL;
                        }
                        if (eTmp === null) {
                            outRec.FirstLeft = null;
                            outRec.IsHole = false;
                        } else {
                            outRec.FirstLeft = this.m_PolyOuts[eTmp.OutIdx];
                            outRec.IsHole = !outRec.FirstLeft.IsHole;
                        }
                    };
                    ClipperLib.Clipper.prototype.GetDx = function(pt1, pt2) {
                        if (pt1.Y === pt2.Y) {
                            return ClipperLib.ClipperBase.horizontal;
                        } else {
                            return (pt2.X - pt1.X) / (pt2.Y - pt1.Y);
                        }
                    };
                    ClipperLib.Clipper.prototype.FirstIsBottomPt = function(btmPt1, btmPt2) {
                        var p = btmPt1.Prev;
                        while(ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt) && p !== btmPt1){
                            p = p.Prev;
                        }
                        var dx1p = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
                        p = btmPt1.Next;
                        while(ClipperLib.IntPoint.op_Equality(p.Pt, btmPt1.Pt) && p !== btmPt1){
                            p = p.Next;
                        }
                        var dx1n = Math.abs(this.GetDx(btmPt1.Pt, p.Pt));
                        p = btmPt2.Prev;
                        while(ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt) && p !== btmPt2){
                            p = p.Prev;
                        }
                        var dx2p = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
                        p = btmPt2.Next;
                        while(ClipperLib.IntPoint.op_Equality(p.Pt, btmPt2.Pt) && p !== btmPt2){
                            p = p.Next;
                        }
                        var dx2n = Math.abs(this.GetDx(btmPt2.Pt, p.Pt));
                        if (Math.max(dx1p, dx1n) === Math.max(dx2p, dx2n) && Math.min(dx1p, dx1n) === Math.min(dx2p, dx2n)) {
                            return this.Area(btmPt1) > 0;
                        } else {
                            return dx1p >= dx2p && dx1p >= dx2n || dx1n >= dx2p && dx1n >= dx2n;
                        }
                    };
                    ClipperLib.Clipper.prototype.GetBottomPt = function(pp) {
                        var dups = null;
                        var p = pp.Next;
                        while(p !== pp){
                            if (p.Pt.Y > pp.Pt.Y) {
                                pp = p;
                                dups = null;
                            } else if (p.Pt.Y === pp.Pt.Y && p.Pt.X <= pp.Pt.X) {
                                if (p.Pt.X < pp.Pt.X) {
                                    dups = null;
                                    pp = p;
                                } else {
                                    if (p.Next !== pp && p.Prev !== pp) {
                                        dups = p;
                                    }
                                }
                            }
                            p = p.Next;
                        }
                        if (dups !== null) {
                            while(dups !== p){
                                if (!this.FirstIsBottomPt(p, dups)) {
                                    pp = dups;
                                }
                                dups = dups.Next;
                                while(ClipperLib.IntPoint.op_Inequality(dups.Pt, pp.Pt)){
                                    dups = dups.Next;
                                }
                            }
                        }
                        return pp;
                    };
                    ClipperLib.Clipper.prototype.GetLowermostRec = function(outRec1, outRec2) {
                        if (outRec1.BottomPt === null) {
                            outRec1.BottomPt = this.GetBottomPt(outRec1.Pts);
                        }
                        if (outRec2.BottomPt === null) {
                            outRec2.BottomPt = this.GetBottomPt(outRec2.Pts);
                        }
                        var bPt1 = outRec1.BottomPt;
                        var bPt2 = outRec2.BottomPt;
                        if (bPt1.Pt.Y > bPt2.Pt.Y) {
                            return outRec1;
                        } else if (bPt1.Pt.Y < bPt2.Pt.Y) {
                            return outRec2;
                        } else if (bPt1.Pt.X < bPt2.Pt.X) {
                            return outRec1;
                        } else if (bPt1.Pt.X > bPt2.Pt.X) {
                            return outRec2;
                        } else if (bPt1.Next === bPt1) {
                            return outRec2;
                        } else if (bPt2.Next === bPt2) {
                            return outRec1;
                        } else if (this.FirstIsBottomPt(bPt1, bPt2)) {
                            return outRec1;
                        } else {
                            return outRec2;
                        }
                    };
                    ClipperLib.Clipper.prototype.OutRec1RightOfOutRec2 = function(outRec1, outRec2) {
                        do {
                            outRec1 = outRec1.FirstLeft;
                            if (outRec1 === outRec2) {
                                return true;
                            }
                        }while (outRec1 !== null)
                        return false;
                    };
                    ClipperLib.Clipper.prototype.GetOutRec = function(idx) {
                        var outrec = this.m_PolyOuts[idx];
                        while(outrec !== this.m_PolyOuts[outrec.Idx]){
                            outrec = this.m_PolyOuts[outrec.Idx];
                        }
                        return outrec;
                    };
                    ClipperLib.Clipper.prototype.AppendPolygon = function(e1, e2) {
                        var outRec1 = this.m_PolyOuts[e1.OutIdx];
                        var outRec2 = this.m_PolyOuts[e2.OutIdx];
                        var holeStateRec;
                        if (this.OutRec1RightOfOutRec2(outRec1, outRec2)) {
                            holeStateRec = outRec2;
                        } else if (this.OutRec1RightOfOutRec2(outRec2, outRec1)) {
                            holeStateRec = outRec1;
                        } else {
                            holeStateRec = this.GetLowermostRec(outRec1, outRec2);
                        }
                        var p1_lft = outRec1.Pts;
                        var p1_rt = p1_lft.Prev;
                        var p2_lft = outRec2.Pts;
                        var p2_rt = p2_lft.Prev;
                        if (e1.Side === ClipperLib.EdgeSide.esLeft) {
                            if (e2.Side === ClipperLib.EdgeSide.esLeft) {
                                this.ReversePolyPtLinks(p2_lft);
                                p2_lft.Next = p1_lft;
                                p1_lft.Prev = p2_lft;
                                p1_rt.Next = p2_rt;
                                p2_rt.Prev = p1_rt;
                                outRec1.Pts = p2_rt;
                            } else {
                                p2_rt.Next = p1_lft;
                                p1_lft.Prev = p2_rt;
                                p2_lft.Prev = p1_rt;
                                p1_rt.Next = p2_lft;
                                outRec1.Pts = p2_lft;
                            }
                        } else {
                            if (e2.Side === ClipperLib.EdgeSide.esRight) {
                                this.ReversePolyPtLinks(p2_lft);
                                p1_rt.Next = p2_rt;
                                p2_rt.Prev = p1_rt;
                                p2_lft.Next = p1_lft;
                                p1_lft.Prev = p2_lft;
                            } else {
                                p1_rt.Next = p2_lft;
                                p2_lft.Prev = p1_rt;
                                p1_lft.Prev = p2_rt;
                                p2_rt.Next = p1_lft;
                            }
                        }
                        outRec1.BottomPt = null;
                        if (holeStateRec === outRec2) {
                            if (outRec2.FirstLeft !== outRec1) {
                                outRec1.FirstLeft = outRec2.FirstLeft;
                            }
                            outRec1.IsHole = outRec2.IsHole;
                        }
                        outRec2.Pts = null;
                        outRec2.BottomPt = null;
                        outRec2.FirstLeft = outRec1;
                        var OKIdx = e1.OutIdx;
                        var ObsoleteIdx = e2.OutIdx;
                        e1.OutIdx = -1;
                        e2.OutIdx = -1;
                        var e = this.m_ActiveEdges;
                        while(e !== null){
                            if (e.OutIdx === ObsoleteIdx) {
                                e.OutIdx = OKIdx;
                                e.Side = e1.Side;
                                break;
                            }
                            e = e.NextInAEL;
                        }
                        outRec2.Idx = outRec1.Idx;
                    };
                    ClipperLib.Clipper.prototype.ReversePolyPtLinks = function(pp) {
                        if (pp === null) {
                            return;
                        }
                        var pp1;
                        var pp2;
                        pp1 = pp;
                        do {
                            pp2 = pp1.Next;
                            pp1.Next = pp1.Prev;
                            pp1.Prev = pp2;
                            pp1 = pp2;
                        }while (pp1 !== pp)
                    };
                    ClipperLib.Clipper.SwapSides = function(edge1, edge2) {
                        var side = edge1.Side;
                        edge1.Side = edge2.Side;
                        edge2.Side = side;
                    };
                    ClipperLib.Clipper.SwapPolyIndexes = function(edge1, edge2) {
                        var outIdx = edge1.OutIdx;
                        edge1.OutIdx = edge2.OutIdx;
                        edge2.OutIdx = outIdx;
                    };
                    ClipperLib.Clipper.prototype.IntersectEdges = function(e1, e2, pt) {
                        var e1Contributing = e1.OutIdx >= 0;
                        var e2Contributing = e2.OutIdx >= 0;
                        if (ClipperLib.use_xyz) {
                            this.SetZ(pt, e1, e2);
                        }
                        if (ClipperLib.use_lines) {
                            if (e1.WindDelta === 0 || e2.WindDelta === 0) {
                                if (e1.WindDelta === 0 && e2.WindDelta === 0) {
                                    return;
                                } else if (e1.PolyTyp === e2.PolyTyp && e1.WindDelta !== e2.WindDelta && this.m_ClipType === ClipperLib.ClipType.ctUnion) {
                                    if (e1.WindDelta === 0) {
                                        if (e2Contributing) {
                                            this.AddOutPt(e1, pt);
                                            if (e1Contributing) {
                                                e1.OutIdx = -1;
                                            }
                                        }
                                    } else {
                                        if (e1Contributing) {
                                            this.AddOutPt(e2, pt);
                                            if (e2Contributing) {
                                                e2.OutIdx = -1;
                                            }
                                        }
                                    }
                                } else if (e1.PolyTyp !== e2.PolyTyp) {
                                    if (e1.WindDelta === 0 && Math.abs(e2.WindCnt) === 1 && (this.m_ClipType !== ClipperLib.ClipType.ctUnion || e2.WindCnt2 === 0)) {
                                        this.AddOutPt(e1, pt);
                                        if (e1Contributing) {
                                            e1.OutIdx = -1;
                                        }
                                    } else if (e2.WindDelta === 0 && Math.abs(e1.WindCnt) === 1 && (this.m_ClipType !== ClipperLib.ClipType.ctUnion || e1.WindCnt2 === 0)) {
                                        this.AddOutPt(e2, pt);
                                        if (e2Contributing) {
                                            e2.OutIdx = -1;
                                        }
                                    }
                                }
                                return;
                            }
                        }
                        if (e1.PolyTyp === e2.PolyTyp) {
                            if (this.IsEvenOddFillType(e1)) {
                                var oldE1WindCnt = e1.WindCnt;
                                e1.WindCnt = e2.WindCnt;
                                e2.WindCnt = oldE1WindCnt;
                            } else {
                                if (e1.WindCnt + e2.WindDelta === 0) {
                                    e1.WindCnt = -e1.WindCnt;
                                } else {
                                    e1.WindCnt += e2.WindDelta;
                                }
                                if (e2.WindCnt - e1.WindDelta === 0) {
                                    e2.WindCnt = -e2.WindCnt;
                                } else {
                                    e2.WindCnt -= e1.WindDelta;
                                }
                            }
                        } else {
                            if (!this.IsEvenOddFillType(e2)) {
                                e1.WindCnt2 += e2.WindDelta;
                            } else {
                                e1.WindCnt2 = e1.WindCnt2 === 0 ? 1 : 0;
                            }
                            if (!this.IsEvenOddFillType(e1)) {
                                e2.WindCnt2 -= e1.WindDelta;
                            } else {
                                e2.WindCnt2 = e2.WindCnt2 === 0 ? 1 : 0;
                            }
                        }
                        var e1FillType, e2FillType, e1FillType2, e2FillType2;
                        if (e1.PolyTyp === ClipperLib.PolyType.ptSubject) {
                            e1FillType = this.m_SubjFillType;
                            e1FillType2 = this.m_ClipFillType;
                        } else {
                            e1FillType = this.m_ClipFillType;
                            e1FillType2 = this.m_SubjFillType;
                        }
                        if (e2.PolyTyp === ClipperLib.PolyType.ptSubject) {
                            e2FillType = this.m_SubjFillType;
                            e2FillType2 = this.m_ClipFillType;
                        } else {
                            e2FillType = this.m_ClipFillType;
                            e2FillType2 = this.m_SubjFillType;
                        }
                        var e1Wc, e2Wc;
                        switch(e1FillType){
                            case ClipperLib.PolyFillType.pftPositive:
                                e1Wc = e1.WindCnt;
                                break;
                            case ClipperLib.PolyFillType.pftNegative:
                                e1Wc = -e1.WindCnt;
                                break;
                            default:
                                e1Wc = Math.abs(e1.WindCnt);
                                break;
                        }
                        switch(e2FillType){
                            case ClipperLib.PolyFillType.pftPositive:
                                e2Wc = e2.WindCnt;
                                break;
                            case ClipperLib.PolyFillType.pftNegative:
                                e2Wc = -e2.WindCnt;
                                break;
                            default:
                                e2Wc = Math.abs(e2.WindCnt);
                                break;
                        }
                        if (e1Contributing && e2Contributing) {
                            if (e1Wc !== 0 && e1Wc !== 1 || e2Wc !== 0 && e2Wc !== 1 || e1.PolyTyp !== e2.PolyTyp && this.m_ClipType !== ClipperLib.ClipType.ctXor) {
                                this.AddLocalMaxPoly(e1, e2, pt);
                            } else {
                                this.AddOutPt(e1, pt);
                                this.AddOutPt(e2, pt);
                                ClipperLib.Clipper.SwapSides(e1, e2);
                                ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
                            }
                        } else if (e1Contributing) {
                            if (e2Wc === 0 || e2Wc === 1) {
                                this.AddOutPt(e1, pt);
                                ClipperLib.Clipper.SwapSides(e1, e2);
                                ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
                            }
                        } else if (e2Contributing) {
                            if (e1Wc === 0 || e1Wc === 1) {
                                this.AddOutPt(e2, pt);
                                ClipperLib.Clipper.SwapSides(e1, e2);
                                ClipperLib.Clipper.SwapPolyIndexes(e1, e2);
                            }
                        } else if ((e1Wc === 0 || e1Wc === 1) && (e2Wc === 0 || e2Wc === 1)) {
                            var e1Wc2, e2Wc2;
                            switch(e1FillType2){
                                case ClipperLib.PolyFillType.pftPositive:
                                    e1Wc2 = e1.WindCnt2;
                                    break;
                                case ClipperLib.PolyFillType.pftNegative:
                                    e1Wc2 = -e1.WindCnt2;
                                    break;
                                default:
                                    e1Wc2 = Math.abs(e1.WindCnt2);
                                    break;
                            }
                            switch(e2FillType2){
                                case ClipperLib.PolyFillType.pftPositive:
                                    e2Wc2 = e2.WindCnt2;
                                    break;
                                case ClipperLib.PolyFillType.pftNegative:
                                    e2Wc2 = -e2.WindCnt2;
                                    break;
                                default:
                                    e2Wc2 = Math.abs(e2.WindCnt2);
                                    break;
                            }
                            if (e1.PolyTyp !== e2.PolyTyp) {
                                this.AddLocalMinPoly(e1, e2, pt);
                            } else if (e1Wc === 1 && e2Wc === 1) {
                                switch(this.m_ClipType){
                                    case ClipperLib.ClipType.ctIntersection:
                                        if (e1Wc2 > 0 && e2Wc2 > 0) {
                                            this.AddLocalMinPoly(e1, e2, pt);
                                        }
                                        break;
                                    case ClipperLib.ClipType.ctUnion:
                                        if (e1Wc2 <= 0 && e2Wc2 <= 0) {
                                            this.AddLocalMinPoly(e1, e2, pt);
                                        }
                                        break;
                                    case ClipperLib.ClipType.ctDifference:
                                        if (e1.PolyTyp === ClipperLib.PolyType.ptClip && e1Wc2 > 0 && e2Wc2 > 0 || e1.PolyTyp === ClipperLib.PolyType.ptSubject && e1Wc2 <= 0 && e2Wc2 <= 0) {
                                            this.AddLocalMinPoly(e1, e2, pt);
                                        }
                                        break;
                                    case ClipperLib.ClipType.ctXor:
                                        this.AddLocalMinPoly(e1, e2, pt);
                                        break;
                                }
                            } else {
                                ClipperLib.Clipper.SwapSides(e1, e2);
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.DeleteFromSEL = function(e) {
                        var SelPrev = e.PrevInSEL;
                        var SelNext = e.NextInSEL;
                        if (SelPrev === null && SelNext === null && e !== this.m_SortedEdges) {
                            return;
                        }
                        if (SelPrev !== null) {
                            SelPrev.NextInSEL = SelNext;
                        } else {
                            this.m_SortedEdges = SelNext;
                        }
                        if (SelNext !== null) {
                            SelNext.PrevInSEL = SelPrev;
                        }
                        e.NextInSEL = null;
                        e.PrevInSEL = null;
                    };
                    ClipperLib.Clipper.prototype.ProcessHorizontals = function() {
                        var horzEdge = {
                        };
                        while(this.PopEdgeFromSEL(horzEdge)){
                            this.ProcessHorizontal(horzEdge.v);
                        }
                    };
                    ClipperLib.Clipper.prototype.GetHorzDirection = function(HorzEdge, $var) {
                        if (HorzEdge.Bot.X < HorzEdge.Top.X) {
                            $var.Left = HorzEdge.Bot.X;
                            $var.Right = HorzEdge.Top.X;
                            $var.Dir = ClipperLib.Direction.dLeftToRight;
                        } else {
                            $var.Left = HorzEdge.Top.X;
                            $var.Right = HorzEdge.Bot.X;
                            $var.Dir = ClipperLib.Direction.dRightToLeft;
                        }
                    };
                    ClipperLib.Clipper.prototype.ProcessHorizontal = function(horzEdge) {
                        var $var = {
                            Dir: null,
                            Left: null,
                            Right: null
                        };
                        this.GetHorzDirection(horzEdge, $var);
                        var dir = $var.Dir;
                        var horzLeft = $var.Left;
                        var horzRight = $var.Right;
                        var IsOpen = horzEdge.WindDelta === 0;
                        var eLastHorz = horzEdge, eMaxPair = null;
                        while(eLastHorz.NextInLML !== null && ClipperLib.ClipperBase.IsHorizontal(eLastHorz.NextInLML)){
                            eLastHorz = eLastHorz.NextInLML;
                        }
                        if (eLastHorz.NextInLML === null) {
                            eMaxPair = this.GetMaximaPair(eLastHorz);
                        }
                        var currMax = this.m_Maxima;
                        if (currMax !== null) {
                            if (dir === ClipperLib.Direction.dLeftToRight) {
                                while(currMax !== null && currMax.X <= horzEdge.Bot.X){
                                    currMax = currMax.Next;
                                }
                                if (currMax !== null && currMax.X >= eLastHorz.Top.X) {
                                    currMax = null;
                                }
                            } else {
                                while(currMax.Next !== null && currMax.Next.X < horzEdge.Bot.X){
                                    currMax = currMax.Next;
                                }
                                if (currMax.X <= eLastHorz.Top.X) {
                                    currMax = null;
                                }
                            }
                        }
                        var op1 = null;
                        for(;;){
                            var IsLastHorz = horzEdge === eLastHorz;
                            var e = this.GetNextInAEL(horzEdge, dir);
                            while(e !== null){
                                if (currMax !== null) {
                                    if (dir === ClipperLib.Direction.dLeftToRight) {
                                        while(currMax !== null && currMax.X < e.Curr.X){
                                            if (horzEdge.OutIdx >= 0 && !IsOpen) {
                                                this.AddOutPt(horzEdge, new ClipperLib.IntPoint2(currMax.X, horzEdge.Bot.Y));
                                            }
                                            currMax = currMax.Next;
                                        }
                                    } else {
                                        while(currMax !== null && currMax.X > e.Curr.X){
                                            if (horzEdge.OutIdx >= 0 && !IsOpen) {
                                                this.AddOutPt(horzEdge, new ClipperLib.IntPoint2(currMax.X, horzEdge.Bot.Y));
                                            }
                                            currMax = currMax.Prev;
                                        }
                                    }
                                }
                                if (dir === ClipperLib.Direction.dLeftToRight && e.Curr.X > horzRight || dir === ClipperLib.Direction.dRightToLeft && e.Curr.X < horzLeft) {
                                    break;
                                }
                                if (e.Curr.X === horzEdge.Top.X && horzEdge.NextInLML !== null && e.Dx < horzEdge.NextInLML.Dx) {
                                    break;
                                }
                                if (horzEdge.OutIdx >= 0 && !IsOpen) {
                                    if (ClipperLib.use_xyz) {
                                        if (dir === ClipperLib.Direction.dLeftToRight) {
                                            this.SetZ(e.Curr, horzEdge, e);
                                        } else {
                                            this.SetZ(e.Curr, e, horzEdge);
                                        }
                                    }
                                    op1 = this.AddOutPt(horzEdge, e.Curr);
                                    var eNextHorz = this.m_SortedEdges;
                                    while(eNextHorz !== null){
                                        if (eNextHorz.OutIdx >= 0 && this.HorzSegmentsOverlap(horzEdge.Bot.X, horzEdge.Top.X, eNextHorz.Bot.X, eNextHorz.Top.X)) {
                                            var op2 = this.GetLastOutPt(eNextHorz);
                                            this.AddJoin(op2, op1, eNextHorz.Top);
                                        }
                                        eNextHorz = eNextHorz.NextInSEL;
                                    }
                                    this.AddGhostJoin(op1, horzEdge.Bot);
                                }
                                if (e === eMaxPair && IsLastHorz) {
                                    if (horzEdge.OutIdx >= 0) {
                                        this.AddLocalMaxPoly(horzEdge, eMaxPair, horzEdge.Top);
                                    }
                                    this.DeleteFromAEL(horzEdge);
                                    this.DeleteFromAEL(eMaxPair);
                                    return;
                                }
                                if (dir === ClipperLib.Direction.dLeftToRight) {
                                    var Pt = new ClipperLib.IntPoint2(e.Curr.X, horzEdge.Curr.Y);
                                    this.IntersectEdges(horzEdge, e, Pt);
                                } else {
                                    var Pt = new ClipperLib.IntPoint2(e.Curr.X, horzEdge.Curr.Y);
                                    this.IntersectEdges(e, horzEdge, Pt);
                                }
                                var eNext = this.GetNextInAEL(e, dir);
                                this.SwapPositionsInAEL(horzEdge, e);
                                e = eNext;
                            }
                            if (horzEdge.NextInLML === null || !ClipperLib.ClipperBase.IsHorizontal(horzEdge.NextInLML)) {
                                break;
                            }
                            horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
                            if (horzEdge.OutIdx >= 0) {
                                this.AddOutPt(horzEdge, horzEdge.Bot);
                            }
                            $var = {
                                Dir: dir,
                                Left: horzLeft,
                                Right: horzRight
                            };
                            this.GetHorzDirection(horzEdge, $var);
                            dir = $var.Dir;
                            horzLeft = $var.Left;
                            horzRight = $var.Right;
                        }
                        if (horzEdge.OutIdx >= 0 && op1 === null) {
                            op1 = this.GetLastOutPt(horzEdge);
                            var eNextHorz = this.m_SortedEdges;
                            while(eNextHorz !== null){
                                if (eNextHorz.OutIdx >= 0 && this.HorzSegmentsOverlap(horzEdge.Bot.X, horzEdge.Top.X, eNextHorz.Bot.X, eNextHorz.Top.X)) {
                                    var op2 = this.GetLastOutPt(eNextHorz);
                                    this.AddJoin(op2, op1, eNextHorz.Top);
                                }
                                eNextHorz = eNextHorz.NextInSEL;
                            }
                            this.AddGhostJoin(op1, horzEdge.Top);
                        }
                        if (horzEdge.NextInLML !== null) {
                            if (horzEdge.OutIdx >= 0) {
                                op1 = this.AddOutPt(horzEdge, horzEdge.Top);
                                horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
                                if (horzEdge.WindDelta === 0) {
                                    return;
                                }
                                var ePrev = horzEdge.PrevInAEL;
                                var eNext = horzEdge.NextInAEL;
                                if (ePrev !== null && ePrev.Curr.X === horzEdge.Bot.X && ePrev.Curr.Y === horzEdge.Bot.Y && ePrev.WindDelta === 0 && ePrev.OutIdx >= 0 && ePrev.Curr.Y > ePrev.Top.Y && ClipperLib.ClipperBase.SlopesEqual3(horzEdge, ePrev, this.m_UseFullRange)) {
                                    var op2 = this.AddOutPt(ePrev, horzEdge.Bot);
                                    this.AddJoin(op1, op2, horzEdge.Top);
                                } else if (eNext !== null && eNext.Curr.X === horzEdge.Bot.X && eNext.Curr.Y === horzEdge.Bot.Y && eNext.WindDelta !== 0 && eNext.OutIdx >= 0 && eNext.Curr.Y > eNext.Top.Y && ClipperLib.ClipperBase.SlopesEqual3(horzEdge, eNext, this.m_UseFullRange)) {
                                    var op2 = this.AddOutPt(eNext, horzEdge.Bot);
                                    this.AddJoin(op1, op2, horzEdge.Top);
                                }
                            } else {
                                horzEdge = this.UpdateEdgeIntoAEL(horzEdge);
                            }
                        } else {
                            if (horzEdge.OutIdx >= 0) {
                                this.AddOutPt(horzEdge, horzEdge.Top);
                            }
                            this.DeleteFromAEL(horzEdge);
                        }
                    };
                    ClipperLib.Clipper.prototype.GetNextInAEL = function(e, Direction) {
                        return Direction === ClipperLib.Direction.dLeftToRight ? e.NextInAEL : e.PrevInAEL;
                    };
                    ClipperLib.Clipper.prototype.IsMinima = function(e) {
                        return e !== null && e.Prev.NextInLML !== e && e.Next.NextInLML !== e;
                    };
                    ClipperLib.Clipper.prototype.IsMaxima = function(e, Y) {
                        return e !== null && e.Top.Y === Y && e.NextInLML === null;
                    };
                    ClipperLib.Clipper.prototype.IsIntermediate = function(e, Y) {
                        return e.Top.Y === Y && e.NextInLML !== null;
                    };
                    ClipperLib.Clipper.prototype.GetMaximaPair = function(e) {
                        if (ClipperLib.IntPoint.op_Equality(e.Next.Top, e.Top) && e.Next.NextInLML === null) {
                            return e.Next;
                        } else {
                            if (ClipperLib.IntPoint.op_Equality(e.Prev.Top, e.Top) && e.Prev.NextInLML === null) {
                                return e.Prev;
                            } else {
                                return null;
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.GetMaximaPairEx = function(e) {
                        var result = this.GetMaximaPair(e);
                        if (result === null || result.OutIdx === ClipperLib.ClipperBase.Skip || result.NextInAEL === result.PrevInAEL && !ClipperLib.ClipperBase.IsHorizontal(result)) {
                            return null;
                        }
                        return result;
                    };
                    ClipperLib.Clipper.prototype.ProcessIntersections = function(topY) {
                        if (this.m_ActiveEdges === null) {
                            return true;
                        }
                        try {
                            this.BuildIntersectList(topY);
                            if (this.m_IntersectList.length === 0) {
                                return true;
                            }
                            if (this.m_IntersectList.length === 1 || this.FixupIntersectionOrder()) {
                                this.ProcessIntersectList();
                            } else {
                                return false;
                            }
                        } catch ($$e2) {
                            this.m_SortedEdges = null;
                            this.m_IntersectList.length = 0;
                            ClipperLib.Error("ProcessIntersections error");
                        }
                        this.m_SortedEdges = null;
                        return true;
                    };
                    ClipperLib.Clipper.prototype.BuildIntersectList = function(topY) {
                        if (this.m_ActiveEdges === null) {
                            return;
                        }
                        var e = this.m_ActiveEdges;
                        this.m_SortedEdges = e;
                        while(e !== null){
                            e.PrevInSEL = e.PrevInAEL;
                            e.NextInSEL = e.NextInAEL;
                            e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
                            e = e.NextInAEL;
                        }
                        var isModified = true;
                        while(isModified && this.m_SortedEdges !== null){
                            isModified = false;
                            e = this.m_SortedEdges;
                            while(e.NextInSEL !== null){
                                var eNext = e.NextInSEL;
                                var pt = new ClipperLib.IntPoint0();
                                if (e.Curr.X > eNext.Curr.X) {
                                    this.IntersectPoint(e, eNext, pt);
                                    if (pt.Y < topY) {
                                        pt = new ClipperLib.IntPoint2(ClipperLib.Clipper.TopX(e, topY), topY);
                                    }
                                    var newNode = new ClipperLib.IntersectNode();
                                    newNode.Edge1 = e;
                                    newNode.Edge2 = eNext;
                                    newNode.Pt.X = pt.X;
                                    newNode.Pt.Y = pt.Y;
                                    if (ClipperLib.use_xyz) {
                                        newNode.Pt.Z = pt.Z;
                                    }
                                    this.m_IntersectList.push(newNode);
                                    this.SwapPositionsInSEL(e, eNext);
                                    isModified = true;
                                } else {
                                    e = eNext;
                                }
                            }
                            if (e.PrevInSEL !== null) {
                                e.PrevInSEL.NextInSEL = null;
                            } else {
                                break;
                            }
                        }
                        this.m_SortedEdges = null;
                    };
                    ClipperLib.Clipper.prototype.EdgesAdjacent = function(inode) {
                        return inode.Edge1.NextInSEL === inode.Edge2 || inode.Edge1.PrevInSEL === inode.Edge2;
                    };
                    ClipperLib.Clipper.IntersectNodeSort = function(node1, node2) {
                        return node2.Pt.Y - node1.Pt.Y;
                    };
                    ClipperLib.Clipper.prototype.FixupIntersectionOrder = function() {
                        this.m_IntersectList.sort(this.m_IntersectNodeComparer);
                        this.CopyAELToSEL();
                        var cnt = this.m_IntersectList.length;
                        for(var i = 0; i < cnt; i++){
                            if (!this.EdgesAdjacent(this.m_IntersectList[i])) {
                                var j = i + 1;
                                while(j < cnt && !this.EdgesAdjacent(this.m_IntersectList[j])){
                                    j++;
                                }
                                if (j === cnt) {
                                    return false;
                                }
                                var tmp = this.m_IntersectList[i];
                                this.m_IntersectList[i] = this.m_IntersectList[j];
                                this.m_IntersectList[j] = tmp;
                            }
                            this.SwapPositionsInSEL(this.m_IntersectList[i].Edge1, this.m_IntersectList[i].Edge2);
                        }
                        return true;
                    };
                    ClipperLib.Clipper.prototype.ProcessIntersectList = function() {
                        for(var i = 0, ilen = this.m_IntersectList.length; i < ilen; i++){
                            var iNode = this.m_IntersectList[i];
                            this.IntersectEdges(iNode.Edge1, iNode.Edge2, iNode.Pt);
                            this.SwapPositionsInAEL(iNode.Edge1, iNode.Edge2);
                        }
                        this.m_IntersectList.length = 0;
                    };
                    var R1 = function(a) {
                        return a < 0 ? Math.ceil(a - 0.5) : Math.round(a);
                    };
                    var R2 = function(a) {
                        return a < 0 ? Math.ceil(a - 0.5) : Math.floor(a + 0.5);
                    };
                    var R3 = function(a) {
                        return a < 0 ? -Math.round(Math.abs(a)) : Math.round(a);
                    };
                    var R4 = function(a) {
                        if (a < 0) {
                            a -= 0.5;
                            return a < -2147483648 ? Math.ceil(a) : a | 0;
                        } else {
                            a += 0.5;
                            return a > 2147483647 ? Math.floor(a) : a | 0;
                        }
                    };
                    if (browser1.msie) {
                        ClipperLib.Clipper.Round = R1;
                    } else if (browser1.chromium) {
                        ClipperLib.Clipper.Round = R3;
                    } else if (browser1.safari) {
                        ClipperLib.Clipper.Round = R4;
                    } else {
                        ClipperLib.Clipper.Round = R2;
                    }
                    ClipperLib.Clipper.TopX = function(edge, currentY) {
                        if (currentY === edge.Top.Y) {
                            return edge.Top.X;
                        }
                        return edge.Bot.X + ClipperLib.Clipper.Round(edge.Dx * (currentY - edge.Bot.Y));
                    };
                    ClipperLib.Clipper.prototype.IntersectPoint = function(edge1, edge2, ip) {
                        ip.X = 0;
                        ip.Y = 0;
                        var b1, b2;
                        if (edge1.Dx === edge2.Dx) {
                            ip.Y = edge1.Curr.Y;
                            ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
                            return;
                        }
                        if (edge1.Delta.X === 0) {
                            ip.X = edge1.Bot.X;
                            if (ClipperLib.ClipperBase.IsHorizontal(edge2)) {
                                ip.Y = edge2.Bot.Y;
                            } else {
                                b2 = edge2.Bot.Y - edge2.Bot.X / edge2.Dx;
                                ip.Y = ClipperLib.Clipper.Round(ip.X / edge2.Dx + b2);
                            }
                        } else if (edge2.Delta.X === 0) {
                            ip.X = edge2.Bot.X;
                            if (ClipperLib.ClipperBase.IsHorizontal(edge1)) {
                                ip.Y = edge1.Bot.Y;
                            } else {
                                b1 = edge1.Bot.Y - edge1.Bot.X / edge1.Dx;
                                ip.Y = ClipperLib.Clipper.Round(ip.X / edge1.Dx + b1);
                            }
                        } else {
                            b1 = edge1.Bot.X - edge1.Bot.Y * edge1.Dx;
                            b2 = edge2.Bot.X - edge2.Bot.Y * edge2.Dx;
                            var q = (b2 - b1) / (edge1.Dx - edge2.Dx);
                            ip.Y = ClipperLib.Clipper.Round(q);
                            if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx)) {
                                ip.X = ClipperLib.Clipper.Round(edge1.Dx * q + b1);
                            } else {
                                ip.X = ClipperLib.Clipper.Round(edge2.Dx * q + b2);
                            }
                        }
                        if (ip.Y < edge1.Top.Y || ip.Y < edge2.Top.Y) {
                            if (edge1.Top.Y > edge2.Top.Y) {
                                ip.Y = edge1.Top.Y;
                                ip.X = ClipperLib.Clipper.TopX(edge2, edge1.Top.Y);
                                return ip.X < edge1.Top.X;
                            } else {
                                ip.Y = edge2.Top.Y;
                            }
                            if (Math.abs(edge1.Dx) < Math.abs(edge2.Dx)) {
                                ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
                            } else {
                                ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
                            }
                        }
                        if (ip.Y > edge1.Curr.Y) {
                            ip.Y = edge1.Curr.Y;
                            if (Math.abs(edge1.Dx) > Math.abs(edge2.Dx)) {
                                ip.X = ClipperLib.Clipper.TopX(edge2, ip.Y);
                            } else {
                                ip.X = ClipperLib.Clipper.TopX(edge1, ip.Y);
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.ProcessEdgesAtTopOfScanbeam = function(topY) {
                        var e = this.m_ActiveEdges;
                        while(e !== null){
                            var IsMaximaEdge = this.IsMaxima(e, topY);
                            if (IsMaximaEdge) {
                                var eMaxPair = this.GetMaximaPairEx(e);
                                IsMaximaEdge = eMaxPair === null || !ClipperLib.ClipperBase.IsHorizontal(eMaxPair);
                            }
                            if (IsMaximaEdge) {
                                if (this.StrictlySimple) {
                                    this.InsertMaxima(e.Top.X);
                                }
                                var ePrev = e.PrevInAEL;
                                this.DoMaxima(e);
                                if (ePrev === null) {
                                    e = this.m_ActiveEdges;
                                } else {
                                    e = ePrev.NextInAEL;
                                }
                            } else {
                                if (this.IsIntermediate(e, topY) && ClipperLib.ClipperBase.IsHorizontal(e.NextInLML)) {
                                    e = this.UpdateEdgeIntoAEL(e);
                                    if (e.OutIdx >= 0) {
                                        this.AddOutPt(e, e.Bot);
                                    }
                                    this.AddEdgeToSEL(e);
                                } else {
                                    e.Curr.X = ClipperLib.Clipper.TopX(e, topY);
                                    e.Curr.Y = topY;
                                }
                                if (ClipperLib.use_xyz) {
                                    if (e.Top.Y === topY) {
                                        e.Curr.Z = e.Top.Z;
                                    } else if (e.Bot.Y === topY) {
                                        e.Curr.Z = e.Bot.Z;
                                    } else {
                                        e.Curr.Z = 0;
                                    }
                                }
                                if (this.StrictlySimple) {
                                    var ePrev = e.PrevInAEL;
                                    if (e.OutIdx >= 0 && e.WindDelta !== 0 && ePrev !== null && ePrev.OutIdx >= 0 && ePrev.Curr.X === e.Curr.X && ePrev.WindDelta !== 0) {
                                        var ip = new ClipperLib.IntPoint1(e.Curr);
                                        if (ClipperLib.use_xyz) {
                                            this.SetZ(ip, ePrev, e);
                                        }
                                        var op = this.AddOutPt(ePrev, ip);
                                        var op2 = this.AddOutPt(e, ip);
                                        this.AddJoin(op, op2, ip);
                                    }
                                }
                                e = e.NextInAEL;
                            }
                        }
                        this.ProcessHorizontals();
                        this.m_Maxima = null;
                        e = this.m_ActiveEdges;
                        while(e !== null){
                            if (this.IsIntermediate(e, topY)) {
                                var op = null;
                                if (e.OutIdx >= 0) {
                                    op = this.AddOutPt(e, e.Top);
                                }
                                e = this.UpdateEdgeIntoAEL(e);
                                var ePrev = e.PrevInAEL;
                                var eNext = e.NextInAEL;
                                if (ePrev !== null && ePrev.Curr.X === e.Bot.X && ePrev.Curr.Y === e.Bot.Y && op !== null && ePrev.OutIdx >= 0 && ePrev.Curr.Y === ePrev.Top.Y && ClipperLib.ClipperBase.SlopesEqual5(e.Curr, e.Top, ePrev.Curr, ePrev.Top, this.m_UseFullRange) && e.WindDelta !== 0 && ePrev.WindDelta !== 0) {
                                    var op2 = this.AddOutPt(ePrev2, e.Bot);
                                    this.AddJoin(op, op2, e.Top);
                                } else if (eNext !== null && eNext.Curr.X === e.Bot.X && eNext.Curr.Y === e.Bot.Y && op !== null && eNext.OutIdx >= 0 && eNext.Curr.Y === eNext.Top.Y && ClipperLib.ClipperBase.SlopesEqual5(e.Curr, e.Top, eNext.Curr, eNext.Top, this.m_UseFullRange) && e.WindDelta !== 0 && eNext.WindDelta !== 0) {
                                    var op2 = this.AddOutPt(eNext, e.Bot);
                                    this.AddJoin(op, op2, e.Top);
                                }
                            }
                            e = e.NextInAEL;
                        }
                    };
                    ClipperLib.Clipper.prototype.DoMaxima = function(e) {
                        var eMaxPair = this.GetMaximaPairEx(e);
                        if (eMaxPair === null) {
                            if (e.OutIdx >= 0) {
                                this.AddOutPt(e, e.Top);
                            }
                            this.DeleteFromAEL(e);
                            return;
                        }
                        var eNext = e.NextInAEL;
                        while(eNext !== null && eNext !== eMaxPair){
                            this.IntersectEdges(e, eNext, e.Top);
                            this.SwapPositionsInAEL(e, eNext);
                            eNext = e.NextInAEL;
                        }
                        if (e.OutIdx === -1 && eMaxPair.OutIdx === -1) {
                            this.DeleteFromAEL(e);
                            this.DeleteFromAEL(eMaxPair);
                        } else if (e.OutIdx >= 0 && eMaxPair.OutIdx >= 0) {
                            if (e.OutIdx >= 0) {
                                this.AddLocalMaxPoly(e, eMaxPair, e.Top);
                            }
                            this.DeleteFromAEL(e);
                            this.DeleteFromAEL(eMaxPair);
                        } else if (ClipperLib.use_lines && e.WindDelta === 0) {
                            if (e.OutIdx >= 0) {
                                this.AddOutPt(e, e.Top);
                                e.OutIdx = ClipperLib.ClipperBase.Unassigned;
                            }
                            this.DeleteFromAEL(e);
                            if (eMaxPair.OutIdx >= 0) {
                                this.AddOutPt(eMaxPair, e.Top);
                                eMaxPair.OutIdx = ClipperLib.ClipperBase.Unassigned;
                            }
                            this.DeleteFromAEL(eMaxPair);
                        } else {
                            ClipperLib.Error("DoMaxima error");
                        }
                    };
                    ClipperLib.Clipper.ReversePaths = function(polys) {
                        for(var i = 0, len = polys.length; i < len; i++){
                            polys[i].reverse();
                        }
                    };
                    ClipperLib.Clipper.Orientation = function(poly) {
                        return ClipperLib.Clipper.Area(poly) >= 0;
                    };
                    ClipperLib.Clipper.prototype.PointCount = function(pts) {
                        if (pts === null) {
                            return 0;
                        }
                        var result = 0;
                        var p = pts;
                        do {
                            result++;
                            p = p.Next;
                        }while (p !== pts)
                        return result;
                    };
                    ClipperLib.Clipper.prototype.BuildResult = function(polyg) {
                        ClipperLib.Clear(polyg);
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                            var outRec = this.m_PolyOuts[i];
                            if (outRec.Pts === null) {
                                continue;
                            }
                            var p = outRec.Pts.Prev;
                            var cnt = this.PointCount(p);
                            if (cnt < 2) {
                                continue;
                            }
                            var pg = new Array(cnt);
                            for(var j = 0; j < cnt; j++){
                                pg[j] = p.Pt;
                                p = p.Prev;
                            }
                            polyg.push(pg);
                        }
                    };
                    ClipperLib.Clipper.prototype.BuildResult2 = function(polytree) {
                        polytree.Clear();
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                            var outRec = this.m_PolyOuts[i];
                            var cnt = this.PointCount(outRec.Pts);
                            if (outRec.IsOpen && cnt < 2 || !outRec.IsOpen && cnt < 3) {
                                continue;
                            }
                            this.FixHoleLinkage(outRec);
                            var pn = new ClipperLib.PolyNode();
                            polytree.m_AllPolys.push(pn);
                            outRec.PolyNode = pn;
                            pn.m_polygon.length = cnt;
                            var op = outRec.Pts.Prev;
                            for(var j = 0; j < cnt; j++){
                                pn.m_polygon[j] = op.Pt;
                                op = op.Prev;
                            }
                        }
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                            var outRec = this.m_PolyOuts[i];
                            if (outRec.PolyNode === null) {
                                continue;
                            } else if (outRec.IsOpen) {
                                outRec.PolyNode.IsOpen = true;
                                polytree.AddChild(outRec.PolyNode);
                            } else if (outRec.FirstLeft !== null && outRec.FirstLeft.PolyNode !== null) {
                                outRec.FirstLeft.PolyNode.AddChild(outRec.PolyNode);
                            } else {
                                polytree.AddChild(outRec.PolyNode);
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.FixupOutPolyline = function(outRec) {
                        var pp = outRec.Pts;
                        var lastPP = pp.Prev;
                        while(pp !== lastPP){
                            pp = pp.Next;
                            if (ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Prev.Pt)) {
                                if (pp === lastPP) {
                                    lastPP = pp.Prev;
                                }
                                var tmpPP = pp.Prev;
                                tmpPP.Next = pp.Next;
                                pp.Next.Prev = tmpPP;
                                pp = tmpPP;
                            }
                        }
                        if (pp === pp.Prev) {
                            outRec.Pts = null;
                        }
                    };
                    ClipperLib.Clipper.prototype.FixupOutPolygon = function(outRec) {
                        var lastOK = null;
                        outRec.BottomPt = null;
                        var pp = outRec.Pts;
                        var preserveCol = this.PreserveCollinear || this.StrictlySimple;
                        for(;;){
                            if (pp.Prev === pp || pp.Prev === pp.Next) {
                                outRec.Pts = null;
                                return;
                            }
                            if (ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Next.Pt) || ClipperLib.IntPoint.op_Equality(pp.Pt, pp.Prev.Pt) || ClipperLib.ClipperBase.SlopesEqual4(pp.Prev.Pt, pp.Pt, pp.Next.Pt, this.m_UseFullRange) && (!preserveCol || !this.Pt2IsBetweenPt1AndPt3(pp.Prev.Pt, pp.Pt, pp.Next.Pt))) {
                                lastOK = null;
                                pp.Prev.Next = pp.Next;
                                pp.Next.Prev = pp.Prev;
                                pp = pp.Prev;
                            } else if (pp === lastOK) {
                                break;
                            } else {
                                if (lastOK === null) {
                                    lastOK = pp;
                                }
                                pp = pp.Next;
                            }
                        }
                        outRec.Pts = pp;
                    };
                    ClipperLib.Clipper.prototype.DupOutPt = function(outPt, InsertAfter) {
                        var result = new ClipperLib.OutPt();
                        result.Pt.X = outPt.Pt.X;
                        result.Pt.Y = outPt.Pt.Y;
                        if (ClipperLib.use_xyz) {
                            result.Pt.Z = outPt.Pt.Z;
                        }
                        result.Idx = outPt.Idx;
                        if (InsertAfter) {
                            result.Next = outPt.Next;
                            result.Prev = outPt;
                            outPt.Next.Prev = result;
                            outPt.Next = result;
                        } else {
                            result.Prev = outPt.Prev;
                            result.Next = outPt;
                            outPt.Prev.Next = result;
                            outPt.Prev = result;
                        }
                        return result;
                    };
                    ClipperLib.Clipper.prototype.GetOverlap = function(a1, a2, b1, b2, $val) {
                        if (a1 < a2) {
                            if (b1 < b2) {
                                $val.Left = Math.max(a1, b1);
                                $val.Right = Math.min(a2, b2);
                            } else {
                                $val.Left = Math.max(a1, b2);
                                $val.Right = Math.min(a2, b1);
                            }
                        } else {
                            if (b1 < b2) {
                                $val.Left = Math.max(a2, b1);
                                $val.Right = Math.min(a1, b2);
                            } else {
                                $val.Left = Math.max(a2, b2);
                                $val.Right = Math.min(a1, b1);
                            }
                        }
                        return $val.Left < $val.Right;
                    };
                    ClipperLib.Clipper.prototype.JoinHorz = function(op1, op1b, op2, op2b, Pt, DiscardLeft) {
                        var Dir1 = op1.Pt.X > op1b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight;
                        var Dir2 = op2.Pt.X > op2b.Pt.X ? ClipperLib.Direction.dRightToLeft : ClipperLib.Direction.dLeftToRight;
                        if (Dir1 === Dir2) {
                            return false;
                        }
                        if (Dir1 === ClipperLib.Direction.dLeftToRight) {
                            while(op1.Next.Pt.X <= Pt.X && op1.Next.Pt.X >= op1.Pt.X && op1.Next.Pt.Y === Pt.Y){
                                op1 = op1.Next;
                            }
                            if (DiscardLeft && op1.Pt.X !== Pt.X) {
                                op1 = op1.Next;
                            }
                            op1b = this.DupOutPt(op1, !DiscardLeft);
                            if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt)) {
                                op1 = op1b;
                                op1.Pt.X = Pt.X;
                                op1.Pt.Y = Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    op1.Pt.Z = Pt.Z;
                                }
                                op1b = this.DupOutPt(op1, !DiscardLeft);
                            }
                        } else {
                            while(op1.Next.Pt.X >= Pt.X && op1.Next.Pt.X <= op1.Pt.X && op1.Next.Pt.Y === Pt.Y){
                                op1 = op1.Next;
                            }
                            if (!DiscardLeft && op1.Pt.X !== Pt.X) {
                                op1 = op1.Next;
                            }
                            op1b = this.DupOutPt(op1, DiscardLeft);
                            if (ClipperLib.IntPoint.op_Inequality(op1b.Pt, Pt)) {
                                op1 = op1b;
                                op1.Pt.X = Pt.X;
                                op1.Pt.Y = Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    op1.Pt.Z = Pt.Z;
                                }
                                op1b = this.DupOutPt(op1, DiscardLeft);
                            }
                        }
                        if (Dir2 === ClipperLib.Direction.dLeftToRight) {
                            while(op2.Next.Pt.X <= Pt.X && op2.Next.Pt.X >= op2.Pt.X && op2.Next.Pt.Y === Pt.Y){
                                op2 = op2.Next;
                            }
                            if (DiscardLeft && op2.Pt.X !== Pt.X) {
                                op2 = op2.Next;
                            }
                            op2b = this.DupOutPt(op2, !DiscardLeft);
                            if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt)) {
                                op2 = op2b;
                                op2.Pt.X = Pt.X;
                                op2.Pt.Y = Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    op2.Pt.Z = Pt.Z;
                                }
                                op2b = this.DupOutPt(op2, !DiscardLeft);
                            }
                        } else {
                            while(op2.Next.Pt.X >= Pt.X && op2.Next.Pt.X <= op2.Pt.X && op2.Next.Pt.Y === Pt.Y){
                                op2 = op2.Next;
                            }
                            if (!DiscardLeft && op2.Pt.X !== Pt.X) {
                                op2 = op2.Next;
                            }
                            op2b = this.DupOutPt(op2, DiscardLeft);
                            if (ClipperLib.IntPoint.op_Inequality(op2b.Pt, Pt)) {
                                op2 = op2b;
                                op2.Pt.X = Pt.X;
                                op2.Pt.Y = Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    op2.Pt.Z = Pt.Z;
                                }
                                op2b = this.DupOutPt(op2, DiscardLeft);
                            }
                        }
                        if (Dir1 === ClipperLib.Direction.dLeftToRight === DiscardLeft) {
                            op1.Prev = op2;
                            op2.Next = op1;
                            op1b.Next = op2b;
                            op2b.Prev = op1b;
                        } else {
                            op1.Next = op2;
                            op2.Prev = op1;
                            op1b.Prev = op2b;
                            op2b.Next = op1b;
                        }
                        return true;
                    };
                    ClipperLib.Clipper.prototype.JoinPoints = function(j, outRec1, outRec2) {
                        var op1 = j.OutPt1, op1b = new ClipperLib.OutPt();
                        var op2 = j.OutPt2, op2b = new ClipperLib.OutPt();
                        var isHorizontal = j.OutPt1.Pt.Y === j.OffPt.Y;
                        if (isHorizontal && ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt1.Pt) && ClipperLib.IntPoint.op_Equality(j.OffPt, j.OutPt2.Pt)) {
                            if (outRec1 !== outRec2) {
                                return false;
                            }
                            op1b = j.OutPt1.Next;
                            while(op1b !== op1 && ClipperLib.IntPoint.op_Equality(op1b.Pt, j.OffPt)){
                                op1b = op1b.Next;
                            }
                            var reverse1 = op1b.Pt.Y > j.OffPt.Y;
                            op2b = j.OutPt2.Next;
                            while(op2b !== op2 && ClipperLib.IntPoint.op_Equality(op2b.Pt, j.OffPt)){
                                op2b = op2b.Next;
                            }
                            var reverse2 = op2b.Pt.Y > j.OffPt.Y;
                            if (reverse1 === reverse2) {
                                return false;
                            }
                            if (reverse1) {
                                op1b = this.DupOutPt(op1, false);
                                op2b = this.DupOutPt(op2, true);
                                op1.Prev = op2;
                                op2.Next = op1;
                                op1b.Next = op2b;
                                op2b.Prev = op1b;
                                j.OutPt1 = op1;
                                j.OutPt2 = op1b;
                                return true;
                            } else {
                                op1b = this.DupOutPt(op1, true);
                                op2b = this.DupOutPt(op2, false);
                                op1.Next = op2;
                                op2.Prev = op1;
                                op1b.Prev = op2b;
                                op2b.Next = op1b;
                                j.OutPt1 = op1;
                                j.OutPt2 = op1b;
                                return true;
                            }
                        } else if (isHorizontal) {
                            op1b = op1;
                            while(op1.Prev.Pt.Y === op1.Pt.Y && op1.Prev !== op1b && op1.Prev !== op2){
                                op1 = op1.Prev;
                            }
                            while(op1b.Next.Pt.Y === op1b.Pt.Y && op1b.Next !== op1 && op1b.Next !== op2){
                                op1b = op1b.Next;
                            }
                            if (op1b.Next === op1 || op1b.Next === op2) {
                                return false;
                            }
                            op2b = op2;
                            while(op2.Prev.Pt.Y === op2.Pt.Y && op2.Prev !== op2b && op2.Prev !== op1b){
                                op2 = op2.Prev;
                            }
                            while(op2b.Next.Pt.Y === op2b.Pt.Y && op2b.Next !== op2 && op2b.Next !== op1){
                                op2b = op2b.Next;
                            }
                            if (op2b.Next === op2 || op2b.Next === op1) {
                                return false;
                            }
                            var $val = {
                                Left: null,
                                Right: null
                            };
                            if (!this.GetOverlap(op1.Pt.X, op1b.Pt.X, op2.Pt.X, op2b.Pt.X, $val)) {
                                return false;
                            }
                            var Left = $val.Left;
                            var Right = $val.Right;
                            var Pt = new ClipperLib.IntPoint0();
                            var DiscardLeftSide;
                            if (op1.Pt.X >= Left && op1.Pt.X <= Right) {
                                Pt.X = op1.Pt.X;
                                Pt.Y = op1.Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    Pt.Z = op1.Pt.Z;
                                }
                                DiscardLeftSide = op1.Pt.X > op1b.Pt.X;
                            } else if (op2.Pt.X >= Left && op2.Pt.X <= Right) {
                                Pt.X = op2.Pt.X;
                                Pt.Y = op2.Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    Pt.Z = op2.Pt.Z;
                                }
                                DiscardLeftSide = op2.Pt.X > op2b.Pt.X;
                            } else if (op1b.Pt.X >= Left && op1b.Pt.X <= Right) {
                                Pt.X = op1b.Pt.X;
                                Pt.Y = op1b.Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    Pt.Z = op1b.Pt.Z;
                                }
                                DiscardLeftSide = op1b.Pt.X > op1.Pt.X;
                            } else {
                                Pt.X = op2b.Pt.X;
                                Pt.Y = op2b.Pt.Y;
                                if (ClipperLib.use_xyz) {
                                    Pt.Z = op2b.Pt.Z;
                                }
                                DiscardLeftSide = op2b.Pt.X > op2.Pt.X;
                            }
                            j.OutPt1 = op1;
                            j.OutPt2 = op2;
                            return this.JoinHorz(op1, op1b, op2, op2b, Pt, DiscardLeftSide);
                        } else {
                            op1b = op1.Next;
                            while(ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt) && op1b !== op1){
                                op1b = op1b.Next;
                            }
                            var Reverse1 = op1b.Pt.Y > op1.Pt.Y || !ClipperLib.ClipperBase.SlopesEqual4(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange);
                            if (Reverse1) {
                                op1b = op1.Prev;
                                while(ClipperLib.IntPoint.op_Equality(op1b.Pt, op1.Pt) && op1b !== op1){
                                    op1b = op1b.Prev;
                                }
                                if (op1b.Pt.Y > op1.Pt.Y || !ClipperLib.ClipperBase.SlopesEqual4(op1.Pt, op1b.Pt, j.OffPt, this.m_UseFullRange)) {
                                    return false;
                                }
                            }
                            op2b = op2.Next;
                            while(ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt) && op2b !== op2){
                                op2b = op2b.Next;
                            }
                            var Reverse2 = op2b.Pt.Y > op2.Pt.Y || !ClipperLib.ClipperBase.SlopesEqual4(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange);
                            if (Reverse2) {
                                op2b = op2.Prev;
                                while(ClipperLib.IntPoint.op_Equality(op2b.Pt, op2.Pt) && op2b !== op2){
                                    op2b = op2b.Prev;
                                }
                                if (op2b.Pt.Y > op2.Pt.Y || !ClipperLib.ClipperBase.SlopesEqual4(op2.Pt, op2b.Pt, j.OffPt, this.m_UseFullRange)) {
                                    return false;
                                }
                            }
                            if (op1b === op1 || op2b === op2 || op1b === op2b || outRec1 === outRec2 && Reverse1 === Reverse2) {
                                return false;
                            }
                            if (Reverse1) {
                                op1b = this.DupOutPt(op1, false);
                                op2b = this.DupOutPt(op2, true);
                                op1.Prev = op2;
                                op2.Next = op1;
                                op1b.Next = op2b;
                                op2b.Prev = op1b;
                                j.OutPt1 = op1;
                                j.OutPt2 = op1b;
                                return true;
                            } else {
                                op1b = this.DupOutPt(op1, true);
                                op2b = this.DupOutPt(op2, false);
                                op1.Next = op2;
                                op2.Prev = op1;
                                op1b.Prev = op2b;
                                op2b.Next = op1b;
                                j.OutPt1 = op1;
                                j.OutPt2 = op1b;
                                return true;
                            }
                        }
                    };
                    ClipperLib.Clipper.GetBounds = function(paths) {
                        var i = 0, cnt = paths.length;
                        while(i < cnt && paths[i].length === 0){
                            i++;
                        }
                        if (i === cnt) {
                            return new ClipperLib.IntRect(0, 0, 0, 0);
                        }
                        var result = new ClipperLib.IntRect();
                        result.left = paths[i][0].X;
                        result.right = result.left;
                        result.top = paths[i][0].Y;
                        result.bottom = result.top;
                        for(; i < cnt; i++){
                            for(var j = 0, jlen = paths[i].length; j < jlen; j++){
                                if (paths[i][j].X < result.left) {
                                    result.left = paths[i][j].X;
                                } else if (paths[i][j].X > result.right) {
                                    result.right = paths[i][j].X;
                                }
                                if (paths[i][j].Y < result.top) {
                                    result.top = paths[i][j].Y;
                                } else if (paths[i][j].Y > result.bottom) {
                                    result.bottom = paths[i][j].Y;
                                }
                            }
                        }
                        return result;
                    };
                    ClipperLib.Clipper.prototype.GetBounds2 = function(ops) {
                        var opStart = ops;
                        var result = new ClipperLib.IntRect();
                        result.left = ops.Pt.X;
                        result.right = ops.Pt.X;
                        result.top = ops.Pt.Y;
                        result.bottom = ops.Pt.Y;
                        ops = ops.Next;
                        while(ops !== opStart){
                            if (ops.Pt.X < result.left) {
                                result.left = ops.Pt.X;
                            }
                            if (ops.Pt.X > result.right) {
                                result.right = ops.Pt.X;
                            }
                            if (ops.Pt.Y < result.top) {
                                result.top = ops.Pt.Y;
                            }
                            if (ops.Pt.Y > result.bottom) {
                                result.bottom = ops.Pt.Y;
                            }
                            ops = ops.Next;
                        }
                        return result;
                    };
                    ClipperLib.Clipper.PointInPolygon = function(pt, path) {
                        var result = 0, cnt = path.length;
                        if (cnt < 3) {
                            return 0;
                        }
                        var ip = path[0];
                        for(var i = 1; i <= cnt; ++i){
                            var ipNext = i === cnt ? path[0] : path[i];
                            if (ipNext.Y === pt.Y) {
                                if (ipNext.X === pt.X || ip.Y === pt.Y && ipNext.X > pt.X === ip.X < pt.X) {
                                    return -1;
                                }
                            }
                            if (ip.Y < pt.Y !== ipNext.Y < pt.Y) {
                                if (ip.X >= pt.X) {
                                    if (ipNext.X > pt.X) {
                                        result = 1 - result;
                                    } else {
                                        var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
                                        if (d === 0) {
                                            return -1;
                                        } else if (d > 0 === ipNext.Y > ip.Y) {
                                            result = 1 - result;
                                        }
                                    }
                                } else {
                                    if (ipNext.X > pt.X) {
                                        var d = (ip.X - pt.X) * (ipNext.Y - pt.Y) - (ipNext.X - pt.X) * (ip.Y - pt.Y);
                                        if (d === 0) {
                                            return -1;
                                        } else if (d > 0 === ipNext.Y > ip.Y) {
                                            result = 1 - result;
                                        }
                                    }
                                }
                            }
                            ip = ipNext;
                        }
                        return result;
                    };
                    ClipperLib.Clipper.prototype.PointInPolygon = function(pt, op) {
                        var result = 0;
                        var startOp = op;
                        var ptx = pt.X, pty = pt.Y;
                        var poly0x = op.Pt.X, poly0y = op.Pt.Y;
                        do {
                            op = op.Next;
                            var poly1x = op.Pt.X, poly1y = op.Pt.Y;
                            if (poly1y === pty) {
                                if (poly1x === ptx || poly0y === pty && poly1x > ptx === poly0x < ptx) {
                                    return -1;
                                }
                            }
                            if (poly0y < pty !== poly1y < pty) {
                                if (poly0x >= ptx) {
                                    if (poly1x > ptx) {
                                        result = 1 - result;
                                    } else {
                                        var d = (poly0x - ptx) * (poly1y - pty) - (poly1x - ptx) * (poly0y - pty);
                                        if (d === 0) {
                                            return -1;
                                        }
                                        if (d > 0 === poly1y > poly0y) {
                                            result = 1 - result;
                                        }
                                    }
                                } else {
                                    if (poly1x > ptx) {
                                        var d = (poly0x - ptx) * (poly1y - pty) - (poly1x - ptx) * (poly0y - pty);
                                        if (d === 0) {
                                            return -1;
                                        }
                                        if (d > 0 === poly1y > poly0y) {
                                            result = 1 - result;
                                        }
                                    }
                                }
                            }
                            poly0x = poly1x;
                            poly0y = poly1y;
                        }while (startOp !== op)
                        return result;
                    };
                    ClipperLib.Clipper.prototype.Poly2ContainsPoly1 = function(outPt1, outPt2) {
                        var op = outPt1;
                        do {
                            var res = this.PointInPolygon(op.Pt, outPt2);
                            if (res >= 0) {
                                return res > 0;
                            }
                            op = op.Next;
                        }while (op !== outPt1)
                        return true;
                    };
                    ClipperLib.Clipper.prototype.FixupFirstLefts1 = function(OldOutRec, NewOutRec) {
                        var outRec, firstLeft;
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                            outRec = this.m_PolyOuts[i];
                            firstLeft = ClipperLib.Clipper.ParseFirstLeft(outRec.FirstLeft);
                            if (outRec.Pts !== null && firstLeft === OldOutRec) {
                                if (this.Poly2ContainsPoly1(outRec.Pts, NewOutRec.Pts)) {
                                    outRec.FirstLeft = NewOutRec;
                                }
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.FixupFirstLefts2 = function(innerOutRec, outerOutRec) {
                        var orfl = outerOutRec.FirstLeft;
                        var outRec, firstLeft;
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                            outRec = this.m_PolyOuts[i];
                            if (outRec.Pts === null || outRec === outerOutRec || outRec === innerOutRec) {
                                continue;
                            }
                            firstLeft = ClipperLib.Clipper.ParseFirstLeft(outRec.FirstLeft);
                            if (firstLeft !== orfl && firstLeft !== innerOutRec && firstLeft !== outerOutRec) {
                                continue;
                            }
                            if (this.Poly2ContainsPoly1(outRec.Pts, innerOutRec.Pts)) {
                                outRec.FirstLeft = innerOutRec;
                            } else if (this.Poly2ContainsPoly1(outRec.Pts, outerOutRec.Pts)) {
                                outRec.FirstLeft = outerOutRec;
                            } else if (outRec.FirstLeft === innerOutRec || outRec.FirstLeft === outerOutRec) {
                                outRec.FirstLeft = orfl;
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.FixupFirstLefts3 = function(OldOutRec, NewOutRec) {
                        var outRec;
                        var firstLeft;
                        for(var i = 0, ilen = this.m_PolyOuts.length; i < ilen; i++){
                            outRec = this.m_PolyOuts[i];
                            firstLeft = ClipperLib.Clipper.ParseFirstLeft(outRec.FirstLeft);
                            if (outRec.Pts !== null && firstLeft === OldOutRec) {
                                outRec.FirstLeft = NewOutRec;
                            }
                        }
                    };
                    ClipperLib.Clipper.ParseFirstLeft = function(FirstLeft) {
                        while(FirstLeft !== null && FirstLeft.Pts === null){
                            FirstLeft = FirstLeft.FirstLeft;
                        }
                        return FirstLeft;
                    };
                    ClipperLib.Clipper.prototype.JoinCommonEdges = function() {
                        for(var i = 0, ilen = this.m_Joins.length; i < ilen; i++){
                            var join = this.m_Joins[i];
                            var outRec1 = this.GetOutRec(join.OutPt1.Idx);
                            var outRec2 = this.GetOutRec(join.OutPt2.Idx);
                            if (outRec1.Pts === null || outRec2.Pts === null) {
                                continue;
                            }
                            if (outRec1.IsOpen || outRec2.IsOpen) {
                                continue;
                            }
                            var holeStateRec;
                            if (outRec1 === outRec2) {
                                holeStateRec = outRec1;
                            } else if (this.OutRec1RightOfOutRec2(outRec1, outRec2)) {
                                holeStateRec = outRec2;
                            } else if (this.OutRec1RightOfOutRec2(outRec2, outRec1)) {
                                holeStateRec = outRec1;
                            } else {
                                holeStateRec = this.GetLowermostRec(outRec1, outRec2);
                            }
                            if (!this.JoinPoints(join, outRec1, outRec2)) {
                                continue;
                            }
                            if (outRec1 === outRec2) {
                                outRec1.Pts = join.OutPt1;
                                outRec1.BottomPt = null;
                                outRec2 = this.CreateOutRec();
                                outRec2.Pts = join.OutPt2;
                                this.UpdateOutPtIdxs(outRec2);
                                if (this.Poly2ContainsPoly1(outRec2.Pts, outRec1.Pts)) {
                                    outRec2.IsHole = !outRec1.IsHole;
                                    outRec2.FirstLeft = outRec1;
                                    if (this.m_UsingPolyTree) {
                                        this.FixupFirstLefts2(outRec2, outRec1);
                                    }
                                    if ((outRec2.IsHole ^ this.ReverseSolution) == this.Area$1(outRec2) > 0) {
                                        this.ReversePolyPtLinks(outRec2.Pts);
                                    }
                                } else if (this.Poly2ContainsPoly1(outRec1.Pts, outRec2.Pts)) {
                                    outRec2.IsHole = outRec1.IsHole;
                                    outRec1.IsHole = !outRec2.IsHole;
                                    outRec2.FirstLeft = outRec1.FirstLeft;
                                    outRec1.FirstLeft = outRec2;
                                    if (this.m_UsingPolyTree) {
                                        this.FixupFirstLefts2(outRec1, outRec2);
                                    }
                                    if ((outRec1.IsHole ^ this.ReverseSolution) == this.Area$1(outRec1) > 0) {
                                        this.ReversePolyPtLinks(outRec1.Pts);
                                    }
                                } else {
                                    outRec2.IsHole = outRec1.IsHole;
                                    outRec2.FirstLeft = outRec1.FirstLeft;
                                    if (this.m_UsingPolyTree) {
                                        this.FixupFirstLefts1(outRec1, outRec2);
                                    }
                                }
                            } else {
                                outRec2.Pts = null;
                                outRec2.BottomPt = null;
                                outRec2.Idx = outRec1.Idx;
                                outRec1.IsHole = holeStateRec.IsHole;
                                if (holeStateRec === outRec2) {
                                    outRec1.FirstLeft = outRec2.FirstLeft;
                                }
                                outRec2.FirstLeft = outRec1;
                                if (this.m_UsingPolyTree) {
                                    this.FixupFirstLefts3(outRec2, outRec1);
                                }
                            }
                        }
                    };
                    ClipperLib.Clipper.prototype.UpdateOutPtIdxs = function(outrec) {
                        var op = outrec.Pts;
                        do {
                            op.Idx = outrec.Idx;
                            op = op.Prev;
                        }while (op !== outrec.Pts)
                    };
                    ClipperLib.Clipper.prototype.DoSimplePolygons = function() {
                        var i = 0;
                        while(i < this.m_PolyOuts.length){
                            var outrec = this.m_PolyOuts[i++];
                            var op = outrec.Pts;
                            if (op === null || outrec.IsOpen) {
                                continue;
                            }
                            do {
                                var op2 = op.Next;
                                while(op2 !== outrec.Pts){
                                    if (ClipperLib.IntPoint.op_Equality(op.Pt, op2.Pt) && op2.Next !== op && op2.Prev !== op) {
                                        var op3 = op.Prev;
                                        var op4 = op2.Prev;
                                        op.Prev = op4;
                                        op4.Next = op;
                                        op2.Prev = op3;
                                        op3.Next = op2;
                                        outrec.Pts = op;
                                        var outrec2 = this.CreateOutRec();
                                        outrec2.Pts = op2;
                                        this.UpdateOutPtIdxs(outrec2);
                                        if (this.Poly2ContainsPoly1(outrec2.Pts, outrec.Pts)) {
                                            outrec2.IsHole = !outrec.IsHole;
                                            outrec2.FirstLeft = outrec;
                                            if (this.m_UsingPolyTree) {
                                                this.FixupFirstLefts2(outrec2, outrec);
                                            }
                                        } else if (this.Poly2ContainsPoly1(outrec.Pts, outrec2.Pts)) {
                                            outrec2.IsHole = outrec.IsHole;
                                            outrec.IsHole = !outrec2.IsHole;
                                            outrec2.FirstLeft = outrec.FirstLeft;
                                            outrec.FirstLeft = outrec2;
                                            if (this.m_UsingPolyTree) {
                                                this.FixupFirstLefts2(outrec, outrec2);
                                            }
                                        } else {
                                            outrec2.IsHole = outrec.IsHole;
                                            outrec2.FirstLeft = outrec.FirstLeft;
                                            if (this.m_UsingPolyTree) {
                                                this.FixupFirstLefts1(outrec, outrec2);
                                            }
                                        }
                                        op2 = op;
                                    }
                                    op2 = op2.Next;
                                }
                                op = op.Next;
                            }while (op !== outrec.Pts)
                        }
                    };
                    ClipperLib.Clipper.Area = function(poly) {
                        if (!Array.isArray(poly)) {
                            return 0;
                        }
                        var cnt = poly.length;
                        if (cnt < 3) {
                            return 0;
                        }
                        var a = 0;
                        for(var i = 0, j = cnt - 1; i < cnt; ++i){
                            a += (poly[j].X + poly[i].X) * (poly[j].Y - poly[i].Y);
                            j = i;
                        }
                        return -a * 0.5;
                    };
                    ClipperLib.Clipper.prototype.Area = function(op) {
                        var opFirst = op;
                        if (op === null) {
                            return 0;
                        }
                        var a = 0;
                        do {
                            a = a + (op.Prev.Pt.X + op.Pt.X) * (op.Prev.Pt.Y - op.Pt.Y);
                            op = op.Next;
                        }while (op !== opFirst)
                        return a * 0.5;
                    };
                    ClipperLib.Clipper.prototype.Area$1 = function(outRec) {
                        return this.Area(outRec.Pts);
                    };
                    ClipperLib.Clipper.SimplifyPolygon = function(poly, fillType) {
                        var result = new Array();
                        var c = new ClipperLib.Clipper(0);
                        c.StrictlySimple = true;
                        c.AddPath(poly, ClipperLib.PolyType.ptSubject, true);
                        c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
                        return result;
                    };
                    ClipperLib.Clipper.SimplifyPolygons = function(polys, fillType) {
                        if (typeof fillType === "undefined") {
                            fillType = ClipperLib.PolyFillType.pftEvenOdd;
                        }
                        var result = new Array();
                        var c = new ClipperLib.Clipper(0);
                        c.StrictlySimple = true;
                        c.AddPaths(polys, ClipperLib.PolyType.ptSubject, true);
                        c.Execute(ClipperLib.ClipType.ctUnion, result, fillType, fillType);
                        return result;
                    };
                    ClipperLib.Clipper.DistanceSqrd = function(pt1, pt2) {
                        var dx = pt1.X - pt2.X;
                        var dy = pt1.Y - pt2.Y;
                        return dx * dx + dy * dy;
                    };
                    ClipperLib.Clipper.DistanceFromLineSqrd = function(pt, ln1, ln2) {
                        var A = ln1.Y - ln2.Y;
                        var B = ln2.X - ln1.X;
                        var C = A * ln1.X + B * ln1.Y;
                        C = A * pt.X + B * pt.Y - C;
                        return C * C / (A * A + B * B);
                    };
                    ClipperLib.Clipper.SlopesNearCollinear = function(pt1, pt2, pt3, distSqrd) {
                        if (Math.abs(pt1.X - pt2.X) > Math.abs(pt1.Y - pt2.Y)) {
                            if (pt1.X > pt2.X === pt1.X < pt3.X) {
                                return ClipperLib.Clipper.DistanceFromLineSqrd(pt1, pt2, pt3) < distSqrd;
                            } else if (pt2.X > pt1.X === pt2.X < pt3.X) {
                                return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
                            } else {
                                return ClipperLib.Clipper.DistanceFromLineSqrd(pt3, pt1, pt2) < distSqrd;
                            }
                        } else {
                            if (pt1.Y > pt2.Y === pt1.Y < pt3.Y) {
                                return ClipperLib.Clipper.DistanceFromLineSqrd(pt1, pt2, pt3) < distSqrd;
                            } else if (pt2.Y > pt1.Y === pt2.Y < pt3.Y) {
                                return ClipperLib.Clipper.DistanceFromLineSqrd(pt2, pt1, pt3) < distSqrd;
                            } else {
                                return ClipperLib.Clipper.DistanceFromLineSqrd(pt3, pt1, pt2) < distSqrd;
                            }
                        }
                    };
                    ClipperLib.Clipper.PointsAreClose = function(pt1, pt2, distSqrd) {
                        var dx = pt1.X - pt2.X;
                        var dy = pt1.Y - pt2.Y;
                        return dx * dx + dy * dy <= distSqrd;
                    };
                    ClipperLib.Clipper.ExcludeOp = function(op) {
                        var result = op.Prev;
                        result.Next = op.Next;
                        op.Next.Prev = result;
                        result.Idx = 0;
                        return result;
                    };
                    ClipperLib.Clipper.CleanPolygon = function(path, distance) {
                        if (typeof distance === "undefined") {
                            distance = 1.415;
                        }
                        var cnt = path.length;
                        if (cnt === 0) {
                            return new Array();
                        }
                        var outPts = new Array(cnt);
                        for(var i = 0; i < cnt; ++i){
                            outPts[i] = new ClipperLib.OutPt();
                        }
                        for(var i = 0; i < cnt; ++i){
                            outPts[i].Pt = path[i];
                            outPts[i].Next = outPts[(i + 1) % cnt];
                            outPts[i].Next.Prev = outPts[i];
                            outPts[i].Idx = 0;
                        }
                        var distSqrd = distance * distance;
                        var op = outPts[0];
                        while(op.Idx === 0 && op.Next !== op.Prev){
                            if (ClipperLib.Clipper.PointsAreClose(op.Pt, op.Prev.Pt, distSqrd)) {
                                op = ClipperLib.Clipper.ExcludeOp(op);
                                cnt--;
                            } else if (ClipperLib.Clipper.PointsAreClose(op.Prev.Pt, op.Next.Pt, distSqrd)) {
                                ClipperLib.Clipper.ExcludeOp(op.Next);
                                op = ClipperLib.Clipper.ExcludeOp(op);
                                cnt -= 2;
                            } else if (ClipperLib.Clipper.SlopesNearCollinear(op.Prev.Pt, op.Pt, op.Next.Pt, distSqrd)) {
                                op = ClipperLib.Clipper.ExcludeOp(op);
                                cnt--;
                            } else {
                                op.Idx = 1;
                                op = op.Next;
                            }
                        }
                        if (cnt < 3) {
                            cnt = 0;
                        }
                        var result = new Array(cnt);
                        for(var i = 0; i < cnt; ++i){
                            result[i] = new ClipperLib.IntPoint1(op.Pt);
                            op = op.Next;
                        }
                        outPts = null;
                        return result;
                    };
                    ClipperLib.Clipper.CleanPolygons = function(polys, distance) {
                        var result = new Array(polys.length);
                        for(var i = 0, ilen = polys.length; i < ilen; i++){
                            result[i] = ClipperLib.Clipper.CleanPolygon(polys[i], distance);
                        }
                        return result;
                    };
                    ClipperLib.Clipper.Minkowski = function(pattern, path, IsSum, IsClosed) {
                        var delta = IsClosed ? 1 : 0;
                        var polyCnt = pattern.length;
                        var pathCnt = path.length;
                        var result = new Array();
                        if (IsSum) {
                            for(var i = 0; i < pathCnt; i++){
                                var p = new Array(polyCnt);
                                for(var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j]){
                                    p[j] = new ClipperLib.IntPoint2(path[i].X + ip.X, path[i].Y + ip.Y);
                                }
                                result.push(p);
                            }
                        } else {
                            for(var i = 0; i < pathCnt; i++){
                                var p = new Array(polyCnt);
                                for(var j = 0, jlen = pattern.length, ip = pattern[j]; j < jlen; j++, ip = pattern[j]){
                                    p[j] = new ClipperLib.IntPoint2(path[i].X - ip.X, path[i].Y - ip.Y);
                                }
                                result.push(p);
                            }
                        }
                        var quads = new Array();
                        for(var i = 0; i < pathCnt - 1 + delta; i++){
                            for(var j = 0; j < polyCnt; j++){
                                var quad = new Array();
                                quad.push(result[i % pathCnt][j % polyCnt]);
                                quad.push(result[(i + 1) % pathCnt][j % polyCnt]);
                                quad.push(result[(i + 1) % pathCnt][(j + 1) % polyCnt]);
                                quad.push(result[i % pathCnt][(j + 1) % polyCnt]);
                                if (!ClipperLib.Clipper.Orientation(quad)) {
                                    quad.reverse();
                                }
                                quads.push(quad);
                            }
                        }
                        return quads;
                    };
                    ClipperLib.Clipper.MinkowskiSum = function(pattern, path_or_paths, pathIsClosed) {
                        if (!(path_or_paths[0] instanceof Array)) {
                            var path = path_or_paths;
                            var paths = ClipperLib.Clipper.Minkowski(pattern, path, true, pathIsClosed);
                            var c = new ClipperLib.Clipper();
                            c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
                            c.Execute(ClipperLib.ClipType.ctUnion, paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
                            return paths;
                        } else {
                            var paths = path_or_paths;
                            var solution = new ClipperLib.Paths();
                            var c = new ClipperLib.Clipper();
                            for(var i = 0; i < paths.length; ++i){
                                var tmp = ClipperLib.Clipper.Minkowski(pattern, paths[i], true, pathIsClosed);
                                c.AddPaths(tmp, ClipperLib.PolyType.ptSubject, true);
                                if (pathIsClosed) {
                                    var path = ClipperLib.Clipper.TranslatePath(paths[i], pattern[0]);
                                    c.AddPath(path, ClipperLib.PolyType.ptClip, true);
                                }
                            }
                            c.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
                            return solution;
                        }
                    };
                    ClipperLib.Clipper.TranslatePath = function(path, delta) {
                        var outPath = new ClipperLib.Path();
                        for(var i = 0; i < path.length; i++){
                            outPath.push(new ClipperLib.IntPoint2(path[i].X + delta.X, path[i].Y + delta.Y));
                        }
                        return outPath;
                    };
                    ClipperLib.Clipper.MinkowskiDiff = function(poly1, poly2) {
                        var paths = ClipperLib.Clipper.Minkowski(poly1, poly2, false, true);
                        var c = new ClipperLib.Clipper();
                        c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
                        c.Execute(ClipperLib.ClipType.ctUnion, paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);
                        return paths;
                    };
                    ClipperLib.Clipper.PolyTreeToPaths = function(polytree) {
                        var result = new Array();
                        ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntAny, result);
                        return result;
                    };
                    ClipperLib.Clipper.AddPolyNodeToPaths = function(polynode, nt, paths) {
                        var match = true;
                        switch(nt){
                            case ClipperLib.Clipper.NodeType.ntOpen:
                                return;
                            case ClipperLib.Clipper.NodeType.ntClosed:
                                match = !polynode.IsOpen;
                                break;
                        }
                        if (polynode.m_polygon.length > 0 && match) {
                            paths.push(polynode.m_polygon);
                        }
                        for(var $i3 = 0, $t3 = polynode.Childs(), $l3 = $t3.length, pn = $t3[$i3]; $i3 < $l3; $i3++, pn = $t3[$i3]){
                            ClipperLib.Clipper.AddPolyNodeToPaths(pn, nt, paths);
                        }
                    };
                    ClipperLib.Clipper.OpenPathsFromPolyTree = function(polytree) {
                        var result = new ClipperLib.Paths();
                        for(var i = 0, ilen = polytree.ChildCount(); i < ilen; i++){
                            if (polytree.Childs()[i].IsOpen) {
                                result.push(polytree.Childs()[i].m_polygon);
                            }
                        }
                        return result;
                    };
                    ClipperLib.Clipper.ClosedPathsFromPolyTree = function(polytree) {
                        var result = new ClipperLib.Paths();
                        ClipperLib.Clipper.AddPolyNodeToPaths(polytree, ClipperLib.Clipper.NodeType.ntClosed, result);
                        return result;
                    };
                    Inherit(ClipperLib.Clipper, ClipperLib.ClipperBase);
                    ClipperLib.Clipper.NodeType = {
                        ntAny: 0,
                        ntOpen: 1,
                        ntClosed: 2
                    };
                    ClipperLib.ClipperOffset = function(miterLimit, arcTolerance) {
                        if (typeof miterLimit === "undefined") {
                            miterLimit = 2;
                        }
                        if (typeof arcTolerance === "undefined") {
                            arcTolerance = ClipperLib.ClipperOffset.def_arc_tolerance;
                        }
                        this.m_destPolys = new ClipperLib.Paths();
                        this.m_srcPoly = new ClipperLib.Path();
                        this.m_destPoly = new ClipperLib.Path();
                        this.m_normals = new Array();
                        this.m_delta = 0;
                        this.m_sinA = 0;
                        this.m_sin = 0;
                        this.m_cos = 0;
                        this.m_miterLim = 0;
                        this.m_StepsPerRad = 0;
                        this.m_lowest = new ClipperLib.IntPoint0();
                        this.m_polyNodes = new ClipperLib.PolyNode();
                        this.MiterLimit = miterLimit;
                        this.ArcTolerance = arcTolerance;
                        this.m_lowest.X = -1;
                    };
                    ClipperLib.ClipperOffset.two_pi = 6.28318530717959;
                    ClipperLib.ClipperOffset.def_arc_tolerance = 0.25;
                    ClipperLib.ClipperOffset.prototype.Clear = function() {
                        ClipperLib.Clear(this.m_polyNodes.Childs());
                        this.m_lowest.X = -1;
                    };
                    ClipperLib.ClipperOffset.Round = ClipperLib.Clipper.Round;
                    ClipperLib.ClipperOffset.prototype.AddPath = function(path, joinType, endType) {
                        var highI = path.length - 1;
                        if (highI < 0) {
                            return;
                        }
                        var newNode = new ClipperLib.PolyNode();
                        newNode.m_jointype = joinType;
                        newNode.m_endtype = endType;
                        if (endType === ClipperLib.EndType.etClosedLine || endType === ClipperLib.EndType.etClosedPolygon) {
                            while(highI > 0 && ClipperLib.IntPoint.op_Equality(path[0], path[highI])){
                                highI--;
                            }
                        }
                        newNode.m_polygon.push(path[0]);
                        var j = 0, k = 0;
                        for(var i = 1; i <= highI; i++){
                            if (ClipperLib.IntPoint.op_Inequality(newNode.m_polygon[j], path[i])) {
                                j++;
                                newNode.m_polygon.push(path[i]);
                                if (path[i].Y > newNode.m_polygon[k].Y || path[i].Y === newNode.m_polygon[k].Y && path[i].X < newNode.m_polygon[k].X) {
                                    k = j;
                                }
                            }
                        }
                        if (endType === ClipperLib.EndType.etClosedPolygon && j < 2) {
                            return;
                        }
                        this.m_polyNodes.AddChild(newNode);
                        if (endType !== ClipperLib.EndType.etClosedPolygon) {
                            return;
                        }
                        if (this.m_lowest.X < 0) {
                            this.m_lowest = new ClipperLib.IntPoint2(this.m_polyNodes.ChildCount() - 1, k);
                        } else {
                            var ip = this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y];
                            if (newNode.m_polygon[k].Y > ip.Y || newNode.m_polygon[k].Y === ip.Y && newNode.m_polygon[k].X < ip.X) {
                                this.m_lowest = new ClipperLib.IntPoint2(this.m_polyNodes.ChildCount() - 1, k);
                            }
                        }
                    };
                    ClipperLib.ClipperOffset.prototype.AddPaths = function(paths, joinType, endType) {
                        for(var i = 0, ilen = paths.length; i < ilen; i++){
                            this.AddPath(paths[i], joinType, endType);
                        }
                    };
                    ClipperLib.ClipperOffset.prototype.FixOrientations = function() {
                        if (this.m_lowest.X >= 0 && !ClipperLib.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon)) {
                            for(var i = 0; i < this.m_polyNodes.ChildCount(); i++){
                                var node = this.m_polyNodes.Childs()[i];
                                if (node.m_endtype === ClipperLib.EndType.etClosedPolygon || node.m_endtype === ClipperLib.EndType.etClosedLine && ClipperLib.Clipper.Orientation(node.m_polygon)) {
                                    node.m_polygon.reverse();
                                }
                            }
                        } else {
                            for(var i = 0; i < this.m_polyNodes.ChildCount(); i++){
                                var node = this.m_polyNodes.Childs()[i];
                                if (node.m_endtype === ClipperLib.EndType.etClosedLine && !ClipperLib.Clipper.Orientation(node.m_polygon)) {
                                    node.m_polygon.reverse();
                                }
                            }
                        }
                    };
                    ClipperLib.ClipperOffset.GetUnitNormal = function(pt1, pt2) {
                        var dx = pt2.X - pt1.X;
                        var dy = pt2.Y - pt1.Y;
                        if (dx === 0 && dy === 0) {
                            return new ClipperLib.DoublePoint2(0, 0);
                        }
                        var f = 1 / Math.sqrt(dx * dx + dy * dy);
                        dx *= f;
                        dy *= f;
                        return new ClipperLib.DoublePoint2(dy, -dx);
                    };
                    ClipperLib.ClipperOffset.prototype.DoOffset = function(delta) {
                        this.m_destPolys = new Array();
                        this.m_delta = delta;
                        if (ClipperLib.ClipperBase.near_zero(delta)) {
                            for(var i = 0; i < this.m_polyNodes.ChildCount(); i++){
                                var node = this.m_polyNodes.Childs()[i];
                                if (node.m_endtype === ClipperLib.EndType.etClosedPolygon) {
                                    this.m_destPolys.push(node.m_polygon);
                                }
                            }
                            return;
                        }
                        if (this.MiterLimit > 2) {
                            this.m_miterLim = 2 / (this.MiterLimit * this.MiterLimit);
                        } else {
                            this.m_miterLim = 0.5;
                        }
                        var y;
                        if (this.ArcTolerance <= 0) {
                            y = ClipperLib.ClipperOffset.def_arc_tolerance;
                        } else if (this.ArcTolerance > Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance) {
                            y = Math.abs(delta) * ClipperLib.ClipperOffset.def_arc_tolerance;
                        } else {
                            y = this.ArcTolerance;
                        }
                        var steps = 3.14159265358979 / Math.acos(1 - y / Math.abs(delta));
                        this.m_sin = Math.sin(ClipperLib.ClipperOffset.two_pi / steps);
                        this.m_cos = Math.cos(ClipperLib.ClipperOffset.two_pi / steps);
                        this.m_StepsPerRad = steps / ClipperLib.ClipperOffset.two_pi;
                        if (delta < 0) {
                            this.m_sin = -this.m_sin;
                        }
                        for(var i = 0; i < this.m_polyNodes.ChildCount(); i++){
                            var node = this.m_polyNodes.Childs()[i];
                            this.m_srcPoly = node.m_polygon;
                            var len = this.m_srcPoly.length;
                            if (len === 0 || delta <= 0 && (len < 3 || node.m_endtype !== ClipperLib.EndType.etClosedPolygon)) {
                                continue;
                            }
                            this.m_destPoly = new Array();
                            if (len === 1) {
                                if (node.m_jointype === ClipperLib.JoinType.jtRound) {
                                    var X = 1, Y = 0;
                                    for(var j = 1; j <= steps; j++){
                                        this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
                                        var X2 = X;
                                        X = X * this.m_cos - this.m_sin * Y;
                                        Y = X2 * this.m_sin + Y * this.m_cos;
                                    }
                                } else {
                                    var X = -1, Y = -1;
                                    for(var j = 0; j < 4; ++j){
                                        this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + Y * delta)));
                                        if (X < 0) {
                                            X = 1;
                                        } else if (Y < 0) {
                                            Y = 1;
                                        } else {
                                            X = -1;
                                        }
                                    }
                                }
                                this.m_destPolys.push(this.m_destPoly);
                                continue;
                            }
                            this.m_normals.length = 0;
                            for(var j = 0; j < len - 1; j++){
                                this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[j], this.m_srcPoly[j + 1]));
                            }
                            if (node.m_endtype === ClipperLib.EndType.etClosedLine || node.m_endtype === ClipperLib.EndType.etClosedPolygon) {
                                this.m_normals.push(ClipperLib.ClipperOffset.GetUnitNormal(this.m_srcPoly[len - 1], this.m_srcPoly[0]));
                            } else {
                                this.m_normals.push(new ClipperLib.DoublePoint1(this.m_normals[len - 2]));
                            }
                            if (node.m_endtype === ClipperLib.EndType.etClosedPolygon) {
                                var k = len - 1;
                                for(var j = 0; j < len; j++){
                                    k = this.OffsetPoint(j, k, node.m_jointype);
                                }
                                this.m_destPolys.push(this.m_destPoly);
                            } else if (node.m_endtype === ClipperLib.EndType.etClosedLine) {
                                var k = len - 1;
                                for(var j = 0; j < len; j++){
                                    k = this.OffsetPoint(j, k, node.m_jointype);
                                }
                                this.m_destPolys.push(this.m_destPoly);
                                this.m_destPoly = new Array();
                                var n = this.m_normals[len - 1];
                                for(var j = len - 1; j > 0; j--){
                                    this.m_normals[j] = new ClipperLib.DoublePoint2(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
                                }
                                this.m_normals[0] = new ClipperLib.DoublePoint2(-n.X, -n.Y);
                                k = 0;
                                for(var j = len - 1; j >= 0; j--){
                                    k = this.OffsetPoint(j, k, node.m_jointype);
                                }
                                this.m_destPolys.push(this.m_destPoly);
                            } else {
                                var k = 0;
                                for(var j = 1; j < len - 1; ++j){
                                    k = this.OffsetPoint(j, k, node.m_jointype);
                                }
                                var pt1;
                                if (node.m_endtype === ClipperLib.EndType.etOpenButt) {
                                    var j = len - 1;
                                    pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * delta));
                                    this.m_destPoly.push(pt1);
                                    pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X - this.m_normals[j].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y - this.m_normals[j].Y * delta));
                                    this.m_destPoly.push(pt1);
                                } else {
                                    var j = len - 1;
                                    k = len - 2;
                                    this.m_sinA = 0;
                                    this.m_normals[j] = new ClipperLib.DoublePoint2(-this.m_normals[j].X, -this.m_normals[j].Y);
                                    if (node.m_endtype === ClipperLib.EndType.etOpenSquare) {
                                        this.DoSquare(j, k);
                                    } else {
                                        this.DoRound(j, k);
                                    }
                                }
                                for(var j = len - 1; j > 0; j--){
                                    this.m_normals[j] = new ClipperLib.DoublePoint2(-this.m_normals[j - 1].X, -this.m_normals[j - 1].Y);
                                }
                                this.m_normals[0] = new ClipperLib.DoublePoint2(-this.m_normals[1].X, -this.m_normals[1].Y);
                                k = len - 1;
                                for(var j = k - 1; j > 0; --j){
                                    k = this.OffsetPoint(j, k, node.m_jointype);
                                }
                                if (node.m_endtype === ClipperLib.EndType.etOpenButt) {
                                    pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X - this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y - this.m_normals[0].Y * delta));
                                    this.m_destPoly.push(pt1);
                                    pt1 = new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].X + this.m_normals[0].X * delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[0].Y + this.m_normals[0].Y * delta));
                                    this.m_destPoly.push(pt1);
                                } else {
                                    k = 1;
                                    this.m_sinA = 0;
                                    if (node.m_endtype === ClipperLib.EndType.etOpenSquare) {
                                        this.DoSquare(0, 1);
                                    } else {
                                        this.DoRound(0, 1);
                                    }
                                }
                                this.m_destPolys.push(this.m_destPoly);
                            }
                        }
                    };
                    ClipperLib.ClipperOffset.prototype.Execute = function() {
                        var a = arguments, ispolytree = a[0] instanceof ClipperLib.PolyTree;
                        if (!ispolytree) {
                            var solution = a[0], delta = a[1];
                            ClipperLib.Clear(solution);
                            this.FixOrientations();
                            this.DoOffset(delta);
                            var clpr = new ClipperLib.Clipper(0);
                            clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
                            if (delta > 0) {
                                clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
                            } else {
                                var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
                                var outer = new ClipperLib.Path();
                                outer.push(new ClipperLib.IntPoint2(r.left - 10, r.bottom + 10));
                                outer.push(new ClipperLib.IntPoint2(r.right + 10, r.bottom + 10));
                                outer.push(new ClipperLib.IntPoint2(r.right + 10, r.top - 10));
                                outer.push(new ClipperLib.IntPoint2(r.left - 10, r.top - 10));
                                clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
                                clpr.ReverseSolution = true;
                                clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
                                if (solution.length > 0) {
                                    solution.splice(0, 1);
                                }
                            }
                        } else {
                            var solution = a[0], delta = a[1];
                            solution.Clear();
                            this.FixOrientations();
                            this.DoOffset(delta);
                            var clpr = new ClipperLib.Clipper(0);
                            clpr.AddPaths(this.m_destPolys, ClipperLib.PolyType.ptSubject, true);
                            if (delta > 0) {
                                clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftPositive, ClipperLib.PolyFillType.pftPositive);
                            } else {
                                var r = ClipperLib.Clipper.GetBounds(this.m_destPolys);
                                var outer = new ClipperLib.Path();
                                outer.push(new ClipperLib.IntPoint2(r.left - 10, r.bottom + 10));
                                outer.push(new ClipperLib.IntPoint2(r.right + 10, r.bottom + 10));
                                outer.push(new ClipperLib.IntPoint2(r.right + 10, r.top - 10));
                                outer.push(new ClipperLib.IntPoint2(r.left - 10, r.top - 10));
                                clpr.AddPath(outer, ClipperLib.PolyType.ptSubject, true);
                                clpr.ReverseSolution = true;
                                clpr.Execute(ClipperLib.ClipType.ctUnion, solution, ClipperLib.PolyFillType.pftNegative, ClipperLib.PolyFillType.pftNegative);
                                if (solution.ChildCount() === 1 && solution.Childs()[0].ChildCount() > 0) {
                                    var outerNode = solution.Childs()[0];
                                    solution.Childs()[0] = outerNode.Childs()[0];
                                    solution.Childs()[0].m_Parent = solution;
                                    for(var i = 1; i < outerNode.ChildCount(); i++){
                                        solution.AddChild(outerNode.Childs()[i]);
                                    }
                                } else {
                                    solution.Clear();
                                }
                            }
                        }
                    };
                    ClipperLib.ClipperOffset.prototype.OffsetPoint = function(j, k, jointype) {
                        this.m_sinA = this.m_normals[k].X * this.m_normals[j].Y - this.m_normals[j].X * this.m_normals[k].Y;
                        if (Math.abs(this.m_sinA * this.m_delta) < 1) {
                            var cosA = this.m_normals[k].X * this.m_normals[j].X + this.m_normals[j].Y * this.m_normals[k].Y;
                            if (cosA > 0) {
                                this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
                                return k;
                            }
                        } else if (this.m_sinA > 1) {
                            this.m_sinA = 1;
                        } else if (this.m_sinA < -1) {
                            this.m_sinA = -1;
                        }
                        if (this.m_sinA * this.m_delta < 0) {
                            this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[k].X * this.m_delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[k].Y * this.m_delta)));
                            this.m_destPoly.push(new ClipperLib.IntPoint1(this.m_srcPoly[j]));
                            this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
                        } else {
                            switch(jointype){
                                case ClipperLib.JoinType.jtMiter:
                                    {
                                        var r = 1 + (this.m_normals[j].X * this.m_normals[k].X + this.m_normals[j].Y * this.m_normals[k].Y);
                                        if (r >= this.m_miterLim) {
                                            this.DoMiter(j, k, r);
                                        } else {
                                            this.DoSquare(j, k);
                                        }
                                        break;
                                    }
                                case ClipperLib.JoinType.jtSquare:
                                    this.DoSquare(j, k);
                                    break;
                                case ClipperLib.JoinType.jtRound:
                                    this.DoRound(j, k);
                                    break;
                            }
                        }
                        k = j;
                        return k;
                    };
                    ClipperLib.ClipperOffset.prototype.DoSquare = function(j, k) {
                        var dx = Math.tan(Math.atan2(this.m_sinA, this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y) / 4);
                        this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[k].X - this.m_normals[k].Y * dx)), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[k].Y + this.m_normals[k].X * dx))));
                        this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_delta * (this.m_normals[j].X + this.m_normals[j].Y * dx)), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_delta * (this.m_normals[j].Y - this.m_normals[j].X * dx))));
                    };
                    ClipperLib.ClipperOffset.prototype.DoMiter = function(j, k, r) {
                        var q = this.m_delta / r;
                        this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + (this.m_normals[k].X + this.m_normals[j].X) * q), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + (this.m_normals[k].Y + this.m_normals[j].Y) * q)));
                    };
                    ClipperLib.ClipperOffset.prototype.DoRound = function(j, k) {
                        var a = Math.atan2(this.m_sinA, this.m_normals[k].X * this.m_normals[j].X + this.m_normals[k].Y * this.m_normals[j].Y);
                        var steps = Math.max(ClipperLib.Cast_Int32(ClipperLib.ClipperOffset.Round(this.m_StepsPerRad * Math.abs(a))), 1);
                        var X = this.m_normals[k].X, Y = this.m_normals[k].Y, X2;
                        for(var i = 0; i < steps; ++i){
                            this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + X * this.m_delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + Y * this.m_delta)));
                            X2 = X;
                            X = X * this.m_cos - this.m_sin * Y;
                            Y = X2 * this.m_sin + Y * this.m_cos;
                        }
                        this.m_destPoly.push(new ClipperLib.IntPoint2(ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].X + this.m_normals[j].X * this.m_delta), ClipperLib.ClipperOffset.Round(this.m_srcPoly[j].Y + this.m_normals[j].Y * this.m_delta)));
                    };
                    ClipperLib.Error = function(message) {
                        try {
                            throw new Error(message);
                        } catch (err) {
                            alert(err.message);
                        }
                    };
                    ClipperLib.JS = {
                    };
                    ClipperLib.JS.AreaOfPolygon = function(poly, scale) {
                        if (!scale) {
                            scale = 1;
                        }
                        return ClipperLib.Clipper.Area(poly) / (scale * scale);
                    };
                    ClipperLib.JS.AreaOfPolygons = function(poly, scale) {
                        if (!scale) {
                            scale = 1;
                        }
                        var area = 0;
                        for(var i = 0; i < poly.length; i++){
                            area += ClipperLib.Clipper.Area(poly[i]);
                        }
                        return area / (scale * scale);
                    };
                    ClipperLib.JS.BoundsOfPath = function(path, scale) {
                        return ClipperLib.JS.BoundsOfPaths([
                            path
                        ], scale);
                    };
                    ClipperLib.JS.BoundsOfPaths = function(paths, scale) {
                        if (!scale) {
                            scale = 1;
                        }
                        var bounds = ClipperLib.Clipper.GetBounds(paths);
                        bounds.left /= scale;
                        bounds.bottom /= scale;
                        bounds.right /= scale;
                        bounds.top /= scale;
                        return bounds;
                    };
                    ClipperLib.JS.Clean = function(polygon, delta) {
                        if (!(polygon instanceof Array)) {
                            return [];
                        }
                        var isPolygons = polygon[0] instanceof Array;
                        var polygon = ClipperLib.JS.Clone(polygon);
                        if (typeof delta !== "number" || delta === null) {
                            ClipperLib.Error("Delta is not a number in Clean().");
                            return polygon;
                        }
                        if (polygon.length === 0 || polygon.length === 1 && polygon[0].length === 0 || delta < 0) {
                            return polygon;
                        }
                        if (!isPolygons) {
                            polygon = [
                                polygon
                            ];
                        }
                        var k_length = polygon.length;
                        var len, poly, result, d, p, j, i;
                        var results = [];
                        for(var k = 0; k < k_length; k++){
                            poly = polygon[k];
                            len = poly.length;
                            if (len === 0) {
                                continue;
                            } else if (len < 3) {
                                result = poly;
                                results.push(result);
                                continue;
                            }
                            result = poly;
                            d = delta * delta;
                            p = poly[0];
                            j = 1;
                            for(i = 1; i < len; i++){
                                if ((poly[i].X - p.X) * (poly[i].X - p.X) + (poly[i].Y - p.Y) * (poly[i].Y - p.Y) <= d) {
                                    continue;
                                }
                                result[j] = poly[i];
                                p = poly[i];
                                j++;
                            }
                            p = poly[j - 1];
                            if ((poly[0].X - p.X) * (poly[0].X - p.X) + (poly[0].Y - p.Y) * (poly[0].Y - p.Y) <= d) {
                                j--;
                            }
                            if (j < len) {
                                result.splice(j, len - j);
                            }
                            if (result.length) {
                                results.push(result);
                            }
                        }
                        if (!isPolygons && results.length) {
                            results = results[0];
                        } else if (!isPolygons && results.length === 0) {
                            results = [];
                        } else if (isPolygons && results.length === 0) {
                            results = [
                                [], 
                            ];
                        }
                        return results;
                    };
                    ClipperLib.JS.Clone = function(polygon) {
                        if (!(polygon instanceof Array)) {
                            return [];
                        }
                        if (polygon.length === 0) {
                            return [];
                        } else if (polygon.length === 1 && polygon[0].length === 0) {
                            return [
                                [], 
                            ];
                        }
                        var isPolygons = polygon[0] instanceof Array;
                        if (!isPolygons) {
                            polygon = [
                                polygon
                            ];
                        }
                        var len = polygon.length, plen, i, j, result;
                        var results = new Array(len);
                        for(i = 0; i < len; i++){
                            plen = polygon[i].length;
                            result = new Array(plen);
                            for(j = 0; j < plen; j++){
                                result[j] = {
                                    X: polygon[i][j].X,
                                    Y: polygon[i][j].Y
                                };
                            }
                            results[i] = result;
                        }
                        if (!isPolygons) {
                            results = results[0];
                        }
                        return results;
                    };
                    ClipperLib.JS.Lighten = function(polygon, tolerance) {
                        if (!(polygon instanceof Array)) {
                            return [];
                        }
                        if (typeof tolerance !== "number" || tolerance === null) {
                            ClipperLib.Error("Tolerance is not a number in Lighten().");
                            return ClipperLib.JS.Clone(polygon);
                        }
                        if (polygon.length === 0 || polygon.length === 1 && polygon[0].length === 0 || tolerance < 0) {
                            return ClipperLib.JS.Clone(polygon);
                        }
                        var isPolygons = polygon[0] instanceof Array;
                        if (!isPolygons) {
                            polygon = [
                                polygon
                            ];
                        }
                        var i, j, poly, k, poly2, plen, A, B, P, d, rem, addlast;
                        var bxax, byay, l, ax, ay;
                        var len = polygon.length;
                        var toleranceSq = tolerance * tolerance;
                        var results = [];
                        for(i = 0; i < len; i++){
                            poly = polygon[i];
                            plen = poly.length;
                            if (plen === 0) {
                                continue;
                            }
                            for(k = 0; k < 1000000; k++){
                                poly2 = [];
                                plen = poly.length;
                                if (poly[plen - 1].X !== poly[0].X || poly[plen - 1].Y !== poly[0].Y) {
                                    addlast = 1;
                                    poly.push({
                                        X: poly[0].X,
                                        Y: poly[0].Y
                                    });
                                    plen = poly.length;
                                } else {
                                    addlast = 0;
                                }
                                rem = [];
                                for(j = 0; j < plen - 2; j++){
                                    A = poly[j];
                                    P = poly[j + 1];
                                    B = poly[j + 2];
                                    ax = A.X;
                                    ay = A.Y;
                                    bxax = B.X - ax;
                                    byay = B.Y - ay;
                                    if (bxax !== 0 || byay !== 0) {
                                        l = ((P.X - ax) * bxax + (P.Y - ay) * byay) / (bxax * bxax + byay * byay);
                                        if (l > 1) {
                                            ax = B.X;
                                            ay = B.Y;
                                        } else if (l > 0) {
                                            ax += bxax * l;
                                            ay += byay * l;
                                        }
                                    }
                                    bxax = P.X - ax;
                                    byay = P.Y - ay;
                                    d = bxax * bxax + byay * byay;
                                    if (d <= toleranceSq) {
                                        rem[j + 1] = 1;
                                        j++;
                                    }
                                }
                                poly2.push({
                                    X: poly[0].X,
                                    Y: poly[0].Y
                                });
                                for(j = 1; j < plen - 1; j++){
                                    if (!rem[j]) {
                                        poly2.push({
                                            X: poly[j].X,
                                            Y: poly[j].Y
                                        });
                                    }
                                }
                                poly2.push({
                                    X: poly[plen - 1].X,
                                    Y: poly[plen - 1].Y
                                });
                                if (addlast) {
                                    poly.pop();
                                }
                                if (!rem.length) {
                                    break;
                                } else {
                                    poly = poly2;
                                }
                            }
                            plen = poly2.length;
                            if (poly2[plen - 1].X === poly2[0].X && poly2[plen - 1].Y === poly2[0].Y) {
                                poly2.pop();
                            }
                            if (poly2.length > 2) {
                                results.push(poly2);
                            }
                        }
                        if (!isPolygons) {
                            results = results[0];
                        }
                        if (typeof results === "undefined") {
                            results = [];
                        }
                        return results;
                    };
                    ClipperLib.JS.PerimeterOfPath = function(path, closed, scale) {
                        if (typeof path === "undefined") {
                            return 0;
                        }
                        var sqrt = Math.sqrt;
                        var perimeter = 0;
                        var p1, p2, p1x = 0, p1y = 0, p2x = 0, p2y = 0;
                        var j = path.length;
                        if (j < 2) {
                            return 0;
                        }
                        if (closed) {
                            path[j] = path[0];
                            j++;
                        }
                        while(--j){
                            p1 = path[j];
                            p1x = p1.X;
                            p1y = p1.Y;
                            p2 = path[j - 1];
                            p2x = p2.X;
                            p2y = p2.Y;
                            perimeter += sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
                        }
                        if (closed) {
                            path.pop();
                        }
                        return perimeter / scale;
                    };
                    ClipperLib.JS.PerimeterOfPaths = function(paths, closed, scale) {
                        if (!scale) {
                            scale = 1;
                        }
                        var perimeter = 0;
                        for(var i = 0; i < paths.length; i++){
                            perimeter += ClipperLib.JS.PerimeterOfPath(paths[i], closed, scale);
                        }
                        return perimeter;
                    };
                    ClipperLib.JS.ScaleDownPath = function(path, scale) {
                        var i, p;
                        if (!scale) {
                            scale = 1;
                        }
                        i = path.length;
                        while(i--){
                            p = path[i];
                            p.X = p.X / scale;
                            p.Y = p.Y / scale;
                        }
                    };
                    ClipperLib.JS.ScaleDownPaths = function(paths, scale) {
                        var i, j, p;
                        if (!scale) {
                            scale = 1;
                        }
                        i = paths.length;
                        while(i--){
                            j = paths[i].length;
                            while(j--){
                                p = paths[i][j];
                                p.X = p.X / scale;
                                p.Y = p.Y / scale;
                            }
                        }
                    };
                    ClipperLib.JS.ScaleUpPath = function(path, scale) {
                        var i, p, round = Math.round;
                        if (!scale) {
                            scale = 1;
                        }
                        i = path.length;
                        while(i--){
                            p = path[i];
                            p.X = round(p.X * scale);
                            p.Y = round(p.Y * scale);
                        }
                    };
                    ClipperLib.JS.ScaleUpPaths = function(paths, scale) {
                        var i, j, p, round = Math.round;
                        if (!scale) {
                            scale = 1;
                        }
                        i = paths.length;
                        while(i--){
                            j = paths[i].length;
                            while(j--){
                                p = paths[i][j];
                                p.X = round(p.X * scale);
                                p.Y = round(p.Y * scale);
                            }
                        }
                    };
                    ClipperLib.ExPolygons = function() {
                        return [];
                    };
                    ClipperLib.ExPolygon = function() {
                        this.outer = null;
                        this.holes = null;
                    };
                    ClipperLib.JS.AddOuterPolyNodeToExPolygons = function(polynode, expolygons) {
                        var ep = new ClipperLib.ExPolygon();
                        ep.outer = polynode.Contour();
                        var childs = polynode.Childs();
                        var ilen = childs.length;
                        ep.holes = new Array(ilen);
                        var node, n, i, j, childs2, jlen;
                        for(i = 0; i < ilen; i++){
                            node = childs[i];
                            ep.holes[i] = node.Contour();
                            for(j = 0, childs2 = node.Childs(), jlen = childs2.length; j < jlen; j++){
                                n = childs2[j];
                                ClipperLib.JS.AddOuterPolyNodeToExPolygons(n, expolygons);
                            }
                        }
                        expolygons.push(ep);
                    };
                    ClipperLib.JS.ExPolygonsToPaths = function(expolygons) {
                        var a, i, alen, ilen;
                        var paths = new ClipperLib.Paths();
                        for(a = 0, alen = expolygons.length; a < alen; a++){
                            paths.push(expolygons[a].outer);
                            for(i = 0, ilen = expolygons[a].holes.length; i < ilen; i++){
                                paths.push(expolygons[a].holes[i]);
                            }
                        }
                        return paths;
                    };
                    ClipperLib.JS.PolyTreeToExPolygons = function(polytree) {
                        var expolygons = new ClipperLib.ExPolygons();
                        var node, i, childs, ilen;
                        for(i = 0, childs = polytree.Childs(), ilen = childs.length; i < ilen; i++){
                            node = childs[i];
                            ClipperLib.JS.AddOuterPolyNodeToExPolygons(node, expolygons);
                        }
                        return expolygons;
                    };
                })();
            });
            exports_1("default", clipper);
            exports_1("__esModule", __esModule = true);
        }
    };
});
System.register("-/clipper-js@v1.0.2-Mou0diNPTgyilhisGDlW/dist=es2020/clipper-js", [
    "-/clipper-lib@v6.4.2-JisZmmhC7gDAFmHQLYDu/dist=es2020/clipper-lib"
], function(exports_2, context_2) {
    "use strict";
    var dist_es2020_from_clipper_js_1, lib, index1, __esModule;
    var __moduleName = context_2 && context_2.id;
    function unwrapExports(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
    }
    function createCommonjsModule(fn, basedir, module) {
        return module = {
            path: basedir,
            exports: {
            },
            require: function(path, base) {
                return commonjsRequire(path, base === undefined || base === null ? module.path : base);
            }
        }, fn(module, module.exports), module.exports;
    }
    function commonjsRequire() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }
    return {
        setters: [
            function(dist_es2020_from_clipper_js_1_1) {
                dist_es2020_from_clipper_js_1 = dist_es2020_from_clipper_js_1_1;
            }, 
        ],
        execute: function() {
            lib = createCommonjsModule(function(module, exports) {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.setErrorCallback = undefined;
                var _createClass1 = function() {
                    function defineProperties(target, props) {
                        for(var i = 0; i < props.length; i++){
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) {
                                descriptor.writable = true;
                            }
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }
                    return function(Constructor, protoProps, staticProps) {
                        if (protoProps) {
                            defineProperties(Constructor.prototype, protoProps);
                        }
                        if (staticProps) {
                            defineProperties(Constructor, staticProps);
                        }
                        return Constructor;
                    };
                }();
                var _clipperLib2 = _interopRequireDefault(dist_es2020_from_clipper_js_1.default);
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : {
                        default: obj
                    };
                }
                function _toConsumableArray(arr) {
                    if (Array.isArray(arr)) {
                        for(var i = 0, arr2 = Array(arr.length); i < arr.length; i++){
                            arr2[i] = arr[i];
                        }
                        return arr2;
                    } else {
                        return Array.from(arr);
                    }
                }
                function _classCallCheck1(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                var errorCallback = void 0;
                var setErrorCallback = exports.setErrorCallback = function setErrorCallback1(callback) {
                    errorCallback = callback;
                };
                _clipperLib2.default.Error = function(message) {
                    if (errorCallback) {
                        errorCallback(message);
                    }
                };
                var CLIPPER = new _clipperLib2.default.Clipper();
                var CLIPPER_OFFSET = new _clipperLib2.default.ClipperOffset();
                var Shape = function() {
                    function Shape1() {
                        var paths = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                        var closed = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                        var capitalConversion = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                        var integerConversion = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
                        var removeDuplicates = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];
                        _classCallCheck1(this, Shape1);
                        this.paths = paths;
                        if (capitalConversion) {
                            this.paths = this.paths.map(mapLowerToCapital);
                        }
                        if (integerConversion) {
                            this.paths = this.paths.map(mapToRound);
                        }
                        if (removeDuplicates) {
                            this.paths = this.paths.map(filterPathsDuplicates);
                        }
                        this.closed = closed;
                    }
                    _createClass1(Shape1, [
                        {
                            key: "_clip",
                            value: function _clip(clipShape, type) {
                                var solution = new _clipperLib2.default.PolyTree();
                                CLIPPER.Clear();
                                CLIPPER.AddPaths(this.paths, _clipperLib2.default.PolyType.ptSubject, this.closed);
                                CLIPPER.AddPaths(clipShape.paths, _clipperLib2.default.PolyType.ptClip, clipShape.closed);
                                CLIPPER.Execute(type, solution);
                                var newShape = _clipperLib2.default.Clipper.PolyTreeToPaths(solution);
                                return new Shape1(newShape, this.closed);
                            }
                        },
                        {
                            key: "union",
                            value: function union1(clipShape) {
                                return this._clip(clipShape, _clipperLib2.default.ClipType.ctUnion);
                            }
                        },
                        {
                            key: "difference",
                            value: function difference1(clipShape) {
                                return this._clip(clipShape, _clipperLib2.default.ClipType.ctDifference);
                            }
                        },
                        {
                            key: "intersect",
                            value: function intersect(clipShape) {
                                return this._clip(clipShape, _clipperLib2.default.ClipType.ctIntersection);
                            }
                        },
                        {
                            key: "xor",
                            value: function xor1(clipShape) {
                                return this._clip(clipShape, _clipperLib2.default.ClipType.ctXor);
                            }
                        },
                        {
                            key: "offset",
                            value: function offset(_offset) {
                                var options = arguments.length <= 1 || arguments[1] === undefined ? {
                                } : arguments[1];
                                var _options$jointType = options.jointType;
                                var jointType = _options$jointType === undefined ? "jtSquare" : _options$jointType;
                                var _options$endType = options.endType;
                                var endType = _options$endType === undefined ? "etClosedPolygon" : _options$endType;
                                var _options$miterLimit = options.miterLimit;
                                var miterLimit = _options$miterLimit === undefined ? 2 : _options$miterLimit;
                                var _options$roundPrecisi = options.roundPrecision;
                                var roundPrecision = _options$roundPrecisi === undefined ? 0.25 : _options$roundPrecisi;
                                CLIPPER_OFFSET.Clear();
                                CLIPPER_OFFSET.ArcTolerance = roundPrecision;
                                CLIPPER_OFFSET.MiterLimit = miterLimit;
                                var offsetPaths = new _clipperLib2.default.Paths();
                                CLIPPER_OFFSET.AddPaths(this.paths, _clipperLib2.default.JoinType[jointType], _clipperLib2.default.EndType[endType]);
                                CLIPPER_OFFSET.Execute(offsetPaths, _offset);
                                return new Shape1(offsetPaths, true);
                            }
                        },
                        {
                            key: "scaleUp",
                            value: function scaleUp(factor) {
                                _clipperLib2.default.JS.ScaleUpPaths(this.paths, factor);
                                return this;
                            }
                        },
                        {
                            key: "scaleDown",
                            value: function scaleDown(factor) {
                                _clipperLib2.default.JS.ScaleDownPaths(this.paths, factor);
                                return this;
                            }
                        },
                        {
                            key: "firstPoint",
                            value: function firstPoint() {
                                var toLower = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                                if (this.paths.length === 0) {
                                    return;
                                }
                                var firstPath = this.paths[0];
                                var firstPoint = firstPath[0];
                                if (toLower) {
                                    return vectorToLower(firstPoint);
                                } else {
                                    return firstPoint;
                                }
                            }
                        },
                        {
                            key: "lastPoint",
                            value: function lastPoint() {
                                var toLower = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                                if (this.paths.length === 0) {
                                    return;
                                }
                                var lastPath = this.paths[this.paths.length - 1];
                                var lastPoint = this.closed ? lastPath[0] : lastPath[lastPath.length - 1];
                                if (toLower) {
                                    return vectorToLower(lastPoint);
                                } else {
                                    return lastPoint;
                                }
                            }
                        },
                        {
                            key: "areas",
                            value: function areas() {
                                var _this = this;
                                var areas = this.paths.map(function(path, i) {
                                    return _this.area(i);
                                });
                                return areas;
                            }
                        },
                        {
                            key: "area",
                            value: function area(index2) {
                                var path = this.paths[index2];
                                var area = _clipperLib2.default.Clipper.Area(path);
                                return area;
                            }
                        },
                        {
                            key: "totalArea",
                            value: function totalArea() {
                                return this.areas().reduce(function(totalArea1, area) {
                                    return totalArea1 + area;
                                }, 0);
                            }
                        },
                        {
                            key: "perimeter",
                            value: function perimeter(index2) {
                                var path = this.paths[index2];
                                var perimeter = _clipperLib2.default.JS.PerimeterOfPath(path, this.closed, 1);
                                return perimeter;
                            }
                        },
                        {
                            key: "perimeters",
                            value: function perimeters() {
                                var _this2 = this;
                                return this.paths.map(function(path) {
                                    return _clipperLib2.default.JS.PerimeterOfPath(path, _this2.closed, 1);
                                });
                            }
                        },
                        {
                            key: "totalPerimeter",
                            value: function totalPerimeter() {
                                var perimeter = _clipperLib2.default.JS.PerimeterOfPaths(this.paths, this.closed);
                                return perimeter;
                            }
                        },
                        {
                            key: "reverse",
                            value: function reverse() {
                                _clipperLib2.default.Clipper.ReversePaths(this.paths);
                                return this;
                            }
                        },
                        {
                            key: "thresholdArea",
                            value: function thresholdArea(minArea) {
                                var _arr = [].concat(_toConsumableArray(this.paths));
                                for(var _i = 0; _i < _arr.length; _i++){
                                    var path = _arr[_i];
                                    var area = Math.abs(_clipperLib2.default.Clipper.Area(shape));
                                    if (area < minArea) {
                                        var index2 = this.paths.indexOf(path);
                                        this.splice(index2, 1);
                                    }
                                }
                            }
                        },
                        {
                            key: "join",
                            value: function join(shape) {
                                var _paths;
                                (_paths = this.paths).splice.apply(_paths, [
                                    this.paths.length,
                                    0
                                ].concat(_toConsumableArray(shape.paths)));
                                return this;
                            }
                        },
                        {
                            key: "clone",
                            value: function clone() {
                                return new Shape1(_clipperLib2.default.JS.Clone(this.paths), this.closed);
                            }
                        },
                        {
                            key: "shapeBounds",
                            value: function shapeBounds() {
                                var bounds = _clipperLib2.default.JS.BoundsOfPaths(this.paths);
                                bounds.width = bounds.right - bounds.left;
                                bounds.height = bounds.bottom - bounds.top;
                                bounds.size = bounds.width * bounds.height;
                                return bounds;
                            }
                        },
                        {
                            key: "pathBounds",
                            value: function pathBounds(index3) {
                                var path = this.paths[index3];
                                var bounds = _clipperLib2.default.JS.BoundsOfPath(path);
                                bounds.width = bounds.right - bounds.left;
                                bounds.height = bounds.bottom - bounds.top;
                                bounds.size = bounds.width * bounds.height;
                                return bounds;
                            }
                        },
                        {
                            key: "clean",
                            value: function clean(cleanDelta) {
                                return new Shape1(_clipperLib2.default.Clipper.CleanPolygons(this.paths, cleanDelta), this.closed);
                            }
                        },
                        {
                            key: "orientation",
                            value: function orientation(index3) {
                                var path = this.paths[index3];
                                return _clipperLib2.default.Clipper.Orientation(path);
                            }
                        },
                        {
                            key: "pointInShape",
                            value: function pointInShape(point) {
                                var capitalConversion = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                                var integerConversion = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                                if (capitalConversion) {
                                    point = vectorToCapital(point);
                                }
                                if (integerConversion) {
                                    point = roundVector(point);
                                }
                                for(var i = 0; i < this.paths.length; i++){
                                    var pointInPath = this.pointInPath(i, point);
                                    var orientation = this.orientation(i);
                                    if (!pointInPath && orientation || pointInPath && !orientation) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        },
                        {
                            key: "pointInPath",
                            value: function pointInPath(index3, point) {
                                var capitalConversion = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
                                var integerConversion = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
                                if (capitalConversion) {
                                    point = vectorToCapital(point);
                                }
                                if (integerConversion) {
                                    point = roundVector(point);
                                }
                                var path = this.paths[index3];
                                var intPoint = {
                                    X: Math.round(point.X),
                                    Y: Math.round(point.Y)
                                };
                                return _clipperLib2.default.Clipper.PointInPolygon(intPoint, path) > 0;
                            }
                        },
                        {
                            key: "fixOrientation",
                            value: function fixOrientation() {
                                if (!this.closed) {
                                    return this;
                                }
                                if (this.totalArea() < 0) {
                                    this.reverse();
                                }
                                return this;
                            }
                        },
                        {
                            key: "removeOverlap",
                            value: function removeOverlap() {
                                console.warn("Shape.removeOverlap is being depricated, use Shape.simplify('pftNonZero') instead");
                                this.simplify("pftNonZero");
                            }
                        },
                        {
                            key: "simplify",
                            value: function simplify(fillType) {
                                if (this.closed) {
                                    var _shape = _clipperLib2.default.Clipper.SimplifyPolygons(this.paths, _clipperLib2.default.PolyFillType[fillType]);
                                    return new Shape1(_shape, true);
                                } else {
                                    return this;
                                }
                            }
                        },
                        {
                            key: "seperateShapes",
                            value: function seperateShapes() {
                                var _this3 = this;
                                var shapes = [];
                                if (!this.closed) {
                                    var _iteratorNormalCompletion = true;
                                    var _didIteratorError = false;
                                    var _iteratorError = undefined;
                                    try {
                                        for(var _iterator = this.paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                            var path = _step.value;
                                            shapes.push(new Shape1([
                                                path
                                            ], false));
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }
                                        } finally{
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }
                                } else {
                                    (function() {
                                        var areas = new WeakMap();
                                        var outlines = [];
                                        var holes = [];
                                        for(var i = 0; i < _this3.paths.length; i++){
                                            var _path = _this3.paths[i];
                                            var orientation = _this3.orientation(i);
                                            if (orientation) {
                                                var area = _this3.area(i);
                                                areas.set(_path, area);
                                                outlines.push(_path);
                                            } else {
                                                holes.push(_path);
                                            }
                                        }
                                        outlines.sort(function(a, b) {
                                            return areas.get(a) - areas.get(b);
                                        });
                                        var _iteratorNormalCompletion2 = true;
                                        var _didIteratorError2 = false;
                                        var _iteratorError2 = undefined;
                                        try {
                                            for(var _iterator2 = outlines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                                                var outline = _step2.value;
                                                var _shape2 = [
                                                    outline
                                                ];
                                                var index3 = _this3.paths.indexOf(outline);
                                                var _arr2 = [].concat(holes);
                                                for(var _i2 = 0; _i2 < _arr2.length; _i2++){
                                                    var hole = _arr2[_i2];
                                                    var pointInHole = _this3.pointInPath(index3, hole[0]);
                                                    if (pointInHole) {
                                                        _shape2.push(hole);
                                                        var _index = holes.indexOf(hole);
                                                        holes.splice(_index, 1);
                                                    }
                                                }
                                                shapes.push(new Shape1(_shape2, true));
                                            }
                                        } catch (err) {
                                            _didIteratorError2 = true;
                                            _iteratorError2 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                    _iterator2.return();
                                                }
                                            } finally{
                                                if (_didIteratorError2) {
                                                    throw _iteratorError2;
                                                }
                                            }
                                        }
                                    })();
                                }
                                return shapes;
                            }
                        },
                        {
                            key: "round",
                            value: function round() {
                                return new Shape1(this.paths.map(mapToRound), this.closed);
                            }
                        },
                        {
                            key: "removeDuplicates",
                            value: function removeDuplicates() {
                                return new Shape1(this.paths.map(filterPathsDuplicates), this.closed);
                            }
                        },
                        {
                            key: "mapToLower",
                            value: function mapToLower() {
                                return this.paths.map(mapCapitalToLower);
                            }
                        }
                    ]);
                    return Shape1;
                }();
                exports.default = Shape;
                function mapCapitalToLower(path) {
                    return path.map(vectorToLower);
                }
                function vectorToLower(_ref) {
                    var X = _ref.X;
                    var Y = _ref.Y;
                    return {
                        x: X,
                        y: Y
                    };
                }
                function mapLowerToCapital(path) {
                    return path.map(vectorToCapital);
                }
                function vectorToCapital(_ref2) {
                    var x = _ref2.x;
                    var y = _ref2.y;
                    return {
                        X: x,
                        Y: y
                    };
                }
                function mapToRound(path) {
                    return path.map(roundVector);
                }
                function roundVector(_ref3) {
                    var X = _ref3.X;
                    var Y = _ref3.Y;
                    return {
                        X: Math.round(X),
                        Y: Math.round(Y)
                    };
                }
                function filterPathsDuplicates(path) {
                    return path.filter(filterPathDuplicates);
                }
                function filterPathDuplicates(point, i, array) {
                    if (i === 0) {
                        return true;
                    }
                    var prevPoint = array[i - 1];
                    return !(point.X === prevPoint.X && point.Y === prevPoint.Y);
                }
            });
            index1 = unwrapExports(lib);
            exports_2("default", index1);
            exports_2("__esModule", __esModule = true);
        }
    };
});
System.register("clipper-js", [
    "-/clipper-js@v1.0.2-Mou0diNPTgyilhisGDlW/dist=es2020/clipper-js"
], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var exportedNames_1 = {
        "default": true
    };
    function exportStar_1(m) {
        var exports = {
        };
        for(var n in m){
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) {
                exports[n] = m[n];
            }
        }
        exports_3(exports);
    }
    return {
        setters: [
            function(dist_es2020_1_1) {
                exportStar_1(dist_es2020_1_1);
                exports_3({
                    "default": dist_es2020_1_1["default"]
                });
            }, 
        ],
        execute: function() {
        }
    };
});
const __exp = __instantiate("clipper-js");
const __default = __exp["default"];
const commandsMap = {
    "Z": "Z",
    "M": "M",
    "L": "L",
    "C": "C",
    "Q": "Q",
    "A": "A",
    "H": "H",
    "V": "V",
    "S": "S",
    "T": "T",
    "z": "Z",
    "m": "m",
    "l": "l",
    "c": "c",
    "q": "q",
    "a": "a",
    "h": "h",
    "v": "v",
    "s": "s",
    "t": "t"
};
const Source = function(string) {
    this._string = string;
    this._currentIndex = 0;
    this._endIndex = this._string.length;
    this._prevCommand = null;
    this._skipOptionalSpaces();
};
Source.prototype = {
    parseSegment: function() {
        var __char = this._string[this._currentIndex];
        var command = commandsMap[__char] ? commandsMap[__char] : null;
        if (command === null) {
            if (this._prevCommand === null) {
                return null;
            }
            if ((__char === "+" || __char === "-" || __char === "." || __char >= "0" && __char <= "9") && this._prevCommand !== "Z") {
                if (this._prevCommand === "M") {
                    command = "L";
                } else if (this._prevCommand === "m") {
                    command = "l";
                } else {
                    command = this._prevCommand;
                }
            } else {
                command = null;
            }
            if (command === null) {
                return null;
            }
        } else {
            this._currentIndex += 1;
        }
        this._prevCommand = command;
        var values = null;
        var cmd = command.toUpperCase();
        if (cmd === "H" || cmd === "V") {
            values = [
                this._parseNumber()
            ];
        } else if (cmd === "M" || cmd === "L" || cmd === "T") {
            values = [
                this._parseNumber(),
                this._parseNumber()
            ];
        } else if (cmd === "S" || cmd === "Q") {
            values = [
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber()
            ];
        } else if (cmd === "C") {
            values = [
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber()
            ];
        } else if (cmd === "A") {
            values = [
                this._parseNumber(),
                this._parseNumber(),
                this._parseNumber(),
                this._parseArcFlag(),
                this._parseArcFlag(),
                this._parseNumber(),
                this._parseNumber()
            ];
        } else if (cmd === "Z") {
            this._skipOptionalSpaces();
            values = [];
        }
        if (values === null || values.indexOf(null) >= 0) {
            return null;
        } else {
            return {
                type: command,
                values: values
            };
        }
    },
    hasMoreData: function() {
        return this._currentIndex < this._endIndex;
    },
    peekSegmentType: function() {
        var __char = this._string[this._currentIndex];
        return commandsMap[__char] ? commandsMap[__char] : null;
    },
    initialCommandIsMoveTo: function() {
        if (!this.hasMoreData()) {
            return true;
        }
        var command = this.peekSegmentType();
        return command === "M" || command === "m";
    },
    _isCurrentSpace: function() {
        var __char = this._string[this._currentIndex];
        return __char <= " " && (__char === " " || __char === "\n" || __char === "\t" || __char === "\r" || __char === "\f");
    },
    _skipOptionalSpaces: function() {
        while(this._currentIndex < this._endIndex && this._isCurrentSpace()){
            this._currentIndex += 1;
        }
        return this._currentIndex < this._endIndex;
    },
    _skipOptionalSpacesOrDelimiter: function() {
        if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string[this._currentIndex] !== ",") {
            return false;
        }
        if (this._skipOptionalSpaces()) {
            if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ",") {
                this._currentIndex += 1;
                this._skipOptionalSpaces();
            }
        }
        return this._currentIndex < this._endIndex;
    },
    _parseNumber: function() {
        var exponent = 0;
        var integer = 0;
        var frac = 1;
        var decimal = 0;
        var sign = 1;
        var expsign = 1;
        var startIndex = this._currentIndex;
        this._skipOptionalSpaces();
        if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "+") {
            this._currentIndex += 1;
        } else if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "-") {
            this._currentIndex += 1;
            sign = -1;
        }
        if (this._currentIndex === this._endIndex || (this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") && this._string[this._currentIndex] !== ".") {
            return null;
        }
        var startIntPartIndex = this._currentIndex;
        while(this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9"){
            this._currentIndex += 1;
        }
        if (this._currentIndex !== startIntPartIndex) {
            var scanIntPartIndex = this._currentIndex - 1;
            var multiplier = 1;
            while(scanIntPartIndex >= startIntPartIndex){
                integer += multiplier * (this._string[scanIntPartIndex] - "0");
                scanIntPartIndex -= 1;
                multiplier *= 10;
            }
        }
        if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ".") {
            this._currentIndex += 1;
            if (this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") {
                return null;
            }
            while(this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9"){
                frac *= 10;
                decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
                this._currentIndex += 1;
            }
        }
        if (this._currentIndex !== startIndex && this._currentIndex + 1 < this._endIndex && (this._string[this._currentIndex] === "e" || this._string[this._currentIndex] === "E") && this._string[this._currentIndex + 1] !== "x" && this._string[this._currentIndex + 1] !== "m") {
            this._currentIndex += 1;
            if (this._string[this._currentIndex] === "+") {
                this._currentIndex += 1;
            } else if (this._string[this._currentIndex] === "-") {
                this._currentIndex += 1;
                expsign = -1;
            }
            if (this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") {
                return null;
            }
            while(this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9"){
                exponent *= 10;
                exponent += this._string[this._currentIndex] - "0";
                this._currentIndex += 1;
            }
        }
        var number = integer + decimal;
        number *= sign;
        if (exponent) {
            number *= Math.pow(10, expsign * exponent);
        }
        if (startIndex === this._currentIndex) {
            return null;
        }
        this._skipOptionalSpacesOrDelimiter();
        return number;
    },
    _parseArcFlag: function() {
        if (this._currentIndex >= this._endIndex) {
            return null;
        }
        var flag = null;
        var flagChar = this._string[this._currentIndex];
        this._currentIndex += 1;
        if (flagChar === "0") {
            flag = 0;
        } else if (flagChar === "1") {
            flag = 1;
        } else {
            return null;
        }
        this._skipOptionalSpacesOrDelimiter();
        return flag;
    }
};
const parsePathDataString = function(string) {
    if (!string || string.length === 0) return [];
    var source = new Source(string);
    var pathData = [];
    if (source.initialCommandIsMoveTo()) {
        while(source.hasMoreData()){
            var pathSeg = source.parseSegment();
            if (pathSeg === null) {
                break;
            } else {
                pathData.push(pathSeg);
            }
        }
    }
    return pathData;
};
const $cachedPathData = typeof Symbol !== 'undefined' ? Symbol() : "__cachedPathData";
const $cachedNormalizedPathData = typeof Symbol !== 'undefined' ? Symbol() : "__cachedNormalizedPathData";
var arcToCubicCurves = function(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, _recursive) {
    var degToRad = function(degrees) {
        return Math.PI * degrees / 180;
    };
    var rotate = function(x, y, angleRad) {
        var X = x * Math.cos(angleRad) - y * Math.sin(angleRad);
        var Y = x * Math.sin(angleRad) + y * Math.cos(angleRad);
        return {
            x: X,
            y: Y
        };
    };
    var angleRad = degToRad(angle);
    var params = [];
    var f1, f2, cx, cy;
    if (_recursive) {
        f1 = _recursive[0];
        f2 = _recursive[1];
        cx = _recursive[2];
        cy = _recursive[3];
    } else {
        var p1 = rotate(x1, y1, -angleRad);
        x1 = p1.x;
        y1 = p1.y;
        var p2 = rotate(x2, y2, -angleRad);
        x2 = p2.x;
        y2 = p2.y;
        var x = (x1 - x2) / 2;
        var y = (y1 - y2) / 2;
        var h = x * x / (r1 * r1) + y * y / (r2 * r2);
        if (h > 1) {
            h = Math.sqrt(h);
            r1 = h * r1;
            r2 = h * r2;
        }
        var sign;
        if (largeArcFlag === sweepFlag) {
            sign = -1;
        } else {
            sign = 1;
        }
        var r1Pow = r1 * r1;
        var r2Pow = r2 * r2;
        var left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
        var right = r1Pow * y * y + r2Pow * x * x;
        var k = sign * Math.sqrt(Math.abs(left / right));
        cx = k * r1 * y / r2 + (x1 + x2) / 2;
        cy = k * -r2 * x / r1 + (y1 + y2) / 2;
        f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
        f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));
        if (x1 < cx) {
            f1 = Math.PI - f1;
        }
        if (x2 < cx) {
            f2 = Math.PI - f2;
        }
        if (f1 < 0) {
            f1 = Math.PI * 2 + f1;
        }
        if (f2 < 0) {
            f2 = Math.PI * 2 + f2;
        }
        if (sweepFlag && f1 > f2) {
            f1 = f1 - Math.PI * 2;
        }
        if (!sweepFlag && f2 > f1) {
            f2 = f2 - Math.PI * 2;
        }
    }
    var df = f2 - f1;
    if (Math.abs(df) > Math.PI * 120 / 180) {
        var f2old = f2;
        var x2old = x2;
        var y2old = y2;
        if (sweepFlag && f2 > f1) {
            f2 = f1 + Math.PI * 120 / 180 * 1;
        } else {
            f2 = f1 + Math.PI * 120 / 180 * -1;
        }
        x2 = cx + r1 * Math.cos(f2);
        y2 = cy + r2 * Math.sin(f2);
        params = arcToCubicCurves(x2, y2, x2old, y2old, r1, r2, angle, 0, sweepFlag, [
            f2,
            f2old,
            cx,
            cy
        ]);
    }
    df = f2 - f1;
    var c1 = Math.cos(f1);
    var s1 = Math.sin(f1);
    var c2 = Math.cos(f2);
    var s2 = Math.sin(f2);
    var t = Math.tan(df / 4);
    var hx = 4 / 3 * r1 * t;
    var hy = 4 / 3 * r2 * t;
    var m1 = [
        x1,
        y1
    ];
    var m2 = [
        x1 + hx * s1,
        y1 - hy * c1
    ];
    var m3 = [
        x2 + hx * s2,
        y2 - hy * c2
    ];
    var m4 = [
        x2,
        y2
    ];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];
    if (_recursive) {
        return [
            m2,
            m3,
            m4
        ].concat(params);
    } else {
        params = [
            m2,
            m3,
            m4
        ].concat(params);
        var curves = [];
        for(var i = 0; i < params.length; i += 3){
            var r1 = rotate(params[i][0], params[i][1], angleRad);
            var r2 = rotate(params[i + 1][0], params[i + 1][1], angleRad);
            var r3 = rotate(params[i + 2][0], params[i + 2][1], angleRad);
            curves.push([
                r1.x,
                r1.y,
                r2.x,
                r2.y,
                r3.x,
                r3.y
            ]);
        }
        return curves;
    }
};
var clonePathData = function(pathData) {
    return pathData.map(function(seg) {
        return {
            type: seg.type,
            values: Array.prototype.slice.call(seg.values)
        };
    });
};
var absolutizePathData = function(pathData) {
    var absolutizedPathData = [];
    var currentX = null;
    var currentY = null;
    var subpathX = null;
    var subpathY = null;
    pathData.forEach(function(seg) {
        var type = seg.type;
        if (type === "M") {
            var x = seg.values[0];
            var y = seg.values[1];
            absolutizedPathData.push({
                type: "M",
                values: [
                    x,
                    y
                ]
            });
            subpathX = x;
            subpathY = y;
            currentX = x;
            currentY = y;
        } else if (type === "m") {
            var x = currentX + seg.values[0];
            var y = currentY + seg.values[1];
            absolutizedPathData.push({
                type: "M",
                values: [
                    x,
                    y
                ]
            });
            subpathX = x;
            subpathY = y;
            currentX = x;
            currentY = y;
        } else if (type === "L") {
            var x = seg.values[0];
            var y = seg.values[1];
            absolutizedPathData.push({
                type: "L",
                values: [
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "l") {
            var x = currentX + seg.values[0];
            var y = currentY + seg.values[1];
            absolutizedPathData.push({
                type: "L",
                values: [
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "C") {
            var x1 = seg.values[0];
            var y1 = seg.values[1];
            var x2 = seg.values[2];
            var y2 = seg.values[3];
            var x = seg.values[4];
            var y = seg.values[5];
            absolutizedPathData.push({
                type: "C",
                values: [
                    x1,
                    y1,
                    x2,
                    y2,
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "c") {
            var x1 = currentX + seg.values[0];
            var y1 = currentY + seg.values[1];
            var x2 = currentX + seg.values[2];
            var y2 = currentY + seg.values[3];
            var x = currentX + seg.values[4];
            var y = currentY + seg.values[5];
            absolutizedPathData.push({
                type: "C",
                values: [
                    x1,
                    y1,
                    x2,
                    y2,
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "Q") {
            var x1 = seg.values[0];
            var y1 = seg.values[1];
            var x = seg.values[2];
            var y = seg.values[3];
            absolutizedPathData.push({
                type: "Q",
                values: [
                    x1,
                    y1,
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "q") {
            var x1 = currentX + seg.values[0];
            var y1 = currentY + seg.values[1];
            var x = currentX + seg.values[2];
            var y = currentY + seg.values[3];
            absolutizedPathData.push({
                type: "Q",
                values: [
                    x1,
                    y1,
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "A") {
            var x = seg.values[5];
            var y = seg.values[6];
            absolutizedPathData.push({
                type: "A",
                values: [
                    seg.values[0],
                    seg.values[1],
                    seg.values[2],
                    seg.values[3],
                    seg.values[4],
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "a") {
            var x = currentX + seg.values[5];
            var y = currentY + seg.values[6];
            absolutizedPathData.push({
                type: "A",
                values: [
                    seg.values[0],
                    seg.values[1],
                    seg.values[2],
                    seg.values[3],
                    seg.values[4],
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "H") {
            var x = seg.values[0];
            absolutizedPathData.push({
                type: "H",
                values: [
                    x
                ]
            });
            currentX = x;
        } else if (type === "h") {
            var x = currentX + seg.values[0];
            absolutizedPathData.push({
                type: "H",
                values: [
                    x
                ]
            });
            currentX = x;
        } else if (type === "V") {
            var y = seg.values[0];
            absolutizedPathData.push({
                type: "V",
                values: [
                    y
                ]
            });
            currentY = y;
        } else if (type === "v") {
            var y = currentY + seg.values[0];
            absolutizedPathData.push({
                type: "V",
                values: [
                    y
                ]
            });
            currentY = y;
        } else if (type === "S") {
            var x2 = seg.values[0];
            var y2 = seg.values[1];
            var x = seg.values[2];
            var y = seg.values[3];
            absolutizedPathData.push({
                type: "S",
                values: [
                    x2,
                    y2,
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "s") {
            var x2 = currentX + seg.values[0];
            var y2 = currentY + seg.values[1];
            var x = currentX + seg.values[2];
            var y = currentY + seg.values[3];
            absolutizedPathData.push({
                type: "S",
                values: [
                    x2,
                    y2,
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "T") {
            var x = seg.values[0];
            var y = seg.values[1];
            absolutizedPathData.push({
                type: "T",
                values: [
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "t") {
            var x = currentX + seg.values[0];
            var y = currentY + seg.values[1];
            absolutizedPathData.push({
                type: "T",
                values: [
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (type === "Z" || type === "z") {
            absolutizedPathData.push({
                type: "Z",
                values: []
            });
            currentX = subpathX;
            currentY = subpathY;
        }
    });
    return absolutizedPathData;
};
var reducePathData = function(pathData) {
    var reducedPathData = [];
    var lastType = null;
    var lastControlX = null;
    var lastControlY = null;
    var currentX = null;
    var currentY = null;
    var subpathX = null;
    var subpathY = null;
    pathData.forEach(function(seg) {
        if (seg.type === "M") {
            var x = seg.values[0];
            var y = seg.values[1];
            reducedPathData.push({
                type: "M",
                values: [
                    x,
                    y
                ]
            });
            subpathX = x;
            subpathY = y;
            currentX = x;
            currentY = y;
        } else if (seg.type === "C") {
            var x1 = seg.values[0];
            var y1 = seg.values[1];
            var x2 = seg.values[2];
            var y2 = seg.values[3];
            var x = seg.values[4];
            var y = seg.values[5];
            reducedPathData.push({
                type: "C",
                values: [
                    x1,
                    y1,
                    x2,
                    y2,
                    x,
                    y
                ]
            });
            lastControlX = x2;
            lastControlY = y2;
            currentX = x;
            currentY = y;
        } else if (seg.type === "L") {
            var x = seg.values[0];
            var y = seg.values[1];
            reducedPathData.push({
                type: "L",
                values: [
                    x,
                    y
                ]
            });
            currentX = x;
            currentY = y;
        } else if (seg.type === "H") {
            var x = seg.values[0];
            reducedPathData.push({
                type: "L",
                values: [
                    x,
                    currentY
                ]
            });
            currentX = x;
        } else if (seg.type === "V") {
            var y = seg.values[0];
            reducedPathData.push({
                type: "L",
                values: [
                    currentX,
                    y
                ]
            });
            currentY = y;
        } else if (seg.type === "S") {
            var x2 = seg.values[0];
            var y2 = seg.values[1];
            var x = seg.values[2];
            var y = seg.values[3];
            var cx1, cy1;
            if (lastType === "C" || lastType === "S") {
                cx1 = currentX + (currentX - lastControlX);
                cy1 = currentY + (currentY - lastControlY);
            } else {
                cx1 = currentX;
                cy1 = currentY;
            }
            reducedPathData.push({
                type: "C",
                values: [
                    cx1,
                    cy1,
                    x2,
                    y2,
                    x,
                    y
                ]
            });
            lastControlX = x2;
            lastControlY = y2;
            currentX = x;
            currentY = y;
        } else if (seg.type === "T") {
            var x = seg.values[0];
            var y = seg.values[1];
            var x1, y1;
            if (lastType === "Q" || lastType === "T") {
                x1 = currentX + (currentX - lastControlX);
                y1 = currentY + (currentY - lastControlY);
            } else {
                x1 = currentX;
                y1 = currentY;
            }
            var cx1 = currentX + 2 * (x1 - currentX) / 3;
            var cy1 = currentY + 2 * (y1 - currentY) / 3;
            var cx2 = x + 2 * (x1 - x) / 3;
            var cy2 = y + 2 * (y1 - y) / 3;
            reducedPathData.push({
                type: "C",
                values: [
                    cx1,
                    cy1,
                    cx2,
                    cy2,
                    x,
                    y
                ]
            });
            lastControlX = x1;
            lastControlY = y1;
            currentX = x;
            currentY = y;
        } else if (seg.type === "Q") {
            var x1 = seg.values[0];
            var y1 = seg.values[1];
            var x = seg.values[2];
            var y = seg.values[3];
            var cx1 = currentX + 2 * (x1 - currentX) / 3;
            var cy1 = currentY + 2 * (y1 - currentY) / 3;
            var cx2 = x + 2 * (x1 - x) / 3;
            var cy2 = y + 2 * (y1 - y) / 3;
            reducedPathData.push({
                type: "C",
                values: [
                    cx1,
                    cy1,
                    cx2,
                    cy2,
                    x,
                    y
                ]
            });
            lastControlX = x1;
            lastControlY = y1;
            currentX = x;
            currentY = y;
        } else if (seg.type === "A") {
            var r1 = Math.abs(seg.values[0]);
            var r2 = Math.abs(seg.values[1]);
            var angle = seg.values[2];
            var largeArcFlag = seg.values[3];
            var sweepFlag = seg.values[4];
            var x = seg.values[5];
            var y = seg.values[6];
            if (r1 === 0 || r2 === 0) {
                reducedPathData.push({
                    type: "C",
                    values: [
                        currentX,
                        currentY,
                        x,
                        y,
                        x,
                        y
                    ]
                });
                currentX = x;
                currentY = y;
            } else {
                if (currentX !== x || currentY !== y) {
                    var curves = arcToCubicCurves(currentX, currentY, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
                    curves.forEach(function(curve) {
                        reducedPathData.push({
                            type: "C",
                            values: curve
                        });
                    });
                    currentX = x;
                    currentY = y;
                }
            }
        } else if (seg.type === "Z") {
            reducedPathData.push(seg);
            currentX = subpathX;
            currentY = subpathY;
        }
        lastType = seg.type;
    });
    return reducedPathData;
};
const getLength = (el, key)=>{
    if (key in el && "baseVal" in el[key]) {
        return el[key].baseVal.value;
    } else {
        return +el.getAttribute(key);
    }
};
const path = function(options) {
    if (options && options.normalize) {
        if (this[$cachedNormalizedPathData]) {
            return clonePathData(this[$cachedNormalizedPathData]);
        } else {
            var pathData;
            if (this[$cachedPathData]) {
                pathData = clonePathData(this[$cachedPathData]);
            } else {
                pathData = parsePathDataString(this.getAttribute("d") || "");
                this[$cachedPathData] = clonePathData(pathData);
            }
            var normalizedPathData = reducePathData(absolutizePathData(pathData));
            this[$cachedNormalizedPathData] = clonePathData(normalizedPathData);
            return normalizedPathData;
        }
    } else {
        if (this[$cachedPathData]) {
            return clonePathData(this[$cachedPathData]);
        } else {
            var pathData = parsePathDataString(this.getAttribute("d") || "");
            this[$cachedPathData] = clonePathData(pathData);
            return pathData;
        }
    }
};
const rect = function(options) {
    var x = getLength(this, "x");
    var y = getLength(this, "y");
    var width = getLength(this, "width");
    var height = getLength(this, "height");
    var rx = this.hasAttribute("rx") ? getLength(this, "rx") : getLength(this, "ry");
    var ry = this.hasAttribute("ry") ? getLength(this, "ry") : getLength(this, "rx");
    if (rx > width / 2) {
        rx = width / 2;
    }
    if (ry > height / 2) {
        ry = height / 2;
    }
    var pathData = [
        {
            type: "M",
            values: [
                x + rx,
                y
            ]
        },
        {
            type: "H",
            values: [
                x + width - rx
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                x + width,
                y + ry
            ]
        },
        {
            type: "V",
            values: [
                y + height - ry
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                x + width - rx,
                y + height
            ]
        },
        {
            type: "H",
            values: [
                x + rx
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                x,
                y + height - ry
            ]
        },
        {
            type: "V",
            values: [
                y + ry
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                x + rx,
                y
            ]
        },
        {
            type: "Z",
            values: []
        }
    ];
    pathData = pathData.filter(function(s) {
        return s.type === "A" && (s.values[0] === 0 || s.values[1] === 0) ? false : true;
    });
    if (options && options.normalize === true) {
        pathData = reducePathData(pathData);
    }
    return pathData;
};
const circle = function(options) {
    var cx = getLength(this, "cx");
    var cy = getLength(this, "cy");
    var r = getLength(this, "r");
    var pathData = [
        {
            type: "M",
            values: [
                cx + r,
                cy
            ]
        },
        {
            type: "A",
            values: [
                r,
                r,
                0,
                0,
                1,
                cx,
                cy + r
            ]
        },
        {
            type: "A",
            values: [
                r,
                r,
                0,
                0,
                1,
                cx - r,
                cy
            ]
        },
        {
            type: "A",
            values: [
                r,
                r,
                0,
                0,
                1,
                cx,
                cy - r
            ]
        },
        {
            type: "A",
            values: [
                r,
                r,
                0,
                0,
                1,
                cx + r,
                cy
            ]
        },
        {
            type: "Z",
            values: []
        }
    ];
    if (options && options.normalize === true) {
        pathData = reducePathData(pathData);
    }
    return pathData;
};
const ellipse = function(options) {
    var cx = getLength(this, "cx");
    var cy = getLength(this, "cy");
    var rx = getLength(this, "rx");
    var ry = getLength(this, "ry");
    var pathData = [
        {
            type: "M",
            values: [
                cx + rx,
                cy
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                cx,
                cy + ry
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                cx - rx,
                cy
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                cx,
                cy - ry
            ]
        },
        {
            type: "A",
            values: [
                rx,
                ry,
                0,
                0,
                1,
                cx + rx,
                cy
            ]
        },
        {
            type: "Z",
            values: []
        }
    ];
    if (options && options.normalize === true) {
        pathData = reducePathData(pathData);
    }
    return pathData;
};
const line = function() {
    const x1 = getLength(this, "x1");
    const x2 = getLength(this, "x2");
    const y1 = getLength(this, "y1");
    const y2 = getLength(this, "y2");
    return [
        {
            type: "M",
            values: [
                x1,
                y1
            ]
        },
        {
            type: "L",
            values: [
                x2,
                y2
            ]
        }
    ];
};
const polyline = function() {
    var pathData = [];
    for(var i = 0; i < this.points.numberOfItems; i += 1){
        var point = this.points.getItem(i);
        pathData.push({
            type: i === 0 ? "M" : "L",
            values: [
                point.x,
                point.y
            ]
        });
    }
    return pathData;
};
const polygon = function() {
    var pathData = [];
    for(var i = 0; i < this.points.numberOfItems; i += 1){
        var point = this.points.getItem(i);
        pathData.push({
            type: i === 0 ? "M" : "L",
            values: [
                point.x,
                point.y
            ]
        });
    }
    pathData.push({
        type: "Z",
        values: []
    });
    return pathData;
};
const pathDataGetters = {
    circle,
    ellipse,
    path,
    polygon,
    polyline,
    line,
    rect
};
function getPathData(svgElement, options) {
    const type = svgElement.nodeName.toLowerCase();
    if (type in pathDataGetters) {
        return pathDataGetters[type].call(svgElement, options);
    } else {
        throw new Error(`Unsupported SVG element type: '${type}'`);
    }
}
function isFlatEnough([x0, y0, x1, y1, x2, y2, x3, y3], flatness) {
    const ux = 3 * x1 - 2 * x0 - x3, uy = 3 * y1 - 2 * y0 - y3, vx = 3 * x2 - 2 * x3 - x0, vy = 3 * y2 - 2 * y3 - y0;
    return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy) <= 16 * flatness * flatness;
}
function subdivide([x0, y0, x1, y1, x2, y2, x3, y3], t) {
    if (t === undefined) t = 0.5;
    let u = 1 - t, x4 = u * x0 + t * x1, y4 = u * y0 + t * y1, x5 = u * x1 + t * x2, y5 = u * y1 + t * y2, x6 = u * x2 + t * x3, y6 = u * y2 + t * y3, x7 = u * x4 + t * x5, y7 = u * y4 + t * y5, x8 = u * x5 + t * x6, y8 = u * y5 + t * y6, x9 = u * x7 + t * x8, y9 = u * y7 + t * y8;
    return [
        [
            x0,
            y0,
            x4,
            y4,
            x7,
            y7,
            x9,
            y9
        ],
        [
            x9,
            y9,
            x8,
            y8,
            x6,
            y6,
            x3,
            y3
        ]
    ];
}
function flatten(v, flatness, maxRecursion = 32) {
    const minSpan = 1 / maxRecursion;
    const parts = [];
    function computeParts(curve, t1, t2) {
        if (t2 - t1 > minSpan && !isFlatEnough(curve, flatness)) {
            const halves = subdivide(curve, 0.5);
            const tMid = (t1 + t2) / 2;
            computeParts(halves[0], t1, tMid);
            computeParts(halves[1], tMid, t2);
        } else {
            const dx = curve[6] - curve[0];
            const dy = curve[7] - curve[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                parts.push(curve);
            }
        }
    }
    computeParts(v, 0, 1);
    return parts;
}
function flattenPath(d, options = {
}) {
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    pathEl.setAttribute("d", d);
    const { maxError =0.1  } = options;
    const paths = [];
    const xf = ([x, y])=>[
            x,
            y
        ]
    ;
    const pathData = getPathData(pathEl, {
        normalize: true
    });
    let cur = null;
    let closePoint = null;
    for (const cmd of pathData){
        if (cmd.type === 'M') {
            cur = xf(cmd.values);
            closePoint = cur;
            paths.push({
                points: [
                    cur
                ]
            });
        } else if (cmd.type === 'L') {
            cur = xf(cmd.values);
            paths[paths.length - 1].points.push(cur);
        } else if (cmd.type === 'C') {
            const [x1, y1, x2, y2, x3, y3] = cmd.values;
            const [x0, y0] = cur;
            const [tx1, ty1] = xf([
                x1,
                y1
            ]);
            const [tx2, ty2] = xf([
                x2,
                y2
            ]);
            const [tx3, ty3] = xf([
                x3,
                y3
            ]);
            const parts = flatten([
                x0,
                y0,
                tx1,
                ty1,
                tx2,
                ty2,
                tx3,
                ty3
            ], maxError);
            for (const part of parts){
                paths[paths.length - 1].points.push([
                    part[6],
                    part[7]
                ]);
            }
            cur = [
                tx3,
                ty3
            ];
        } else if (cmd.type === 'A') {
            const [rx_, ry_, xAxisRotation, largeArc, sweep, x, y] = cmd.values;
            const phi = xAxisRotation;
            const fS = sweep;
            const fA = largeArc;
            const { cos , sin , atan2 , sqrt , sign , acos , abs , ceil  } = Math;
            const mpx = (cur[0] - x) / 2, mpy = (cur[1] - y) / 2;
            const x1_ = cos(phi) * mpx + sin(phi) * mpy, y1_ = -sin(phi) * mpx + cos(phi) * mpy;
            const x1_2 = x1_ * x1_, y1_2 = y1_ * y1_;
            const L = x1_2 / (rx_ * rx_) + y1_2 / (ry_ * ry_);
            const rx = L <= 1 ? sqrt(L) * rx_ : rx_;
            const ry = L <= 1 ? sqrt(L) * ry_ : ry_;
            const rx2 = rx * rx, ry2 = ry * ry;
            let factor = (rx2 * ry2 - rx2 * y1_2 - ry2 * x1_2) / (rx2 * y1_2 + ry2 * x1_2);
            if (abs(factor) < 0.0001) factor = 0;
            if (factor < 0) throw new Error(`bad arc args ${factor}`);
            const k = (fA === fS ? -1 : 1) * sqrt(factor);
            const cx_ = k * rx * y1_ / ry, cy_ = k * -ry * x1_ / rx;
            const cx = cos(phi) * cx_ - sin(phi) * cy_ + (cur[0] + x) / 2, cy = sin(phi) * cx_ + cos(phi) * cy_ + (cur[1] + y) / 2;
            const ang = (ux, uy, vx, vy)=>{
                return atan2(ux * vy - uy * vx, ux * vx + uy * vy);
            };
            const t1 = ang(1, 0, (x1_ - cx_) / rx, (y1_ - cy_) / ry);
            const dt_ = ang((x1_ - cx_) / rx, (y1_ - cy_) / ry, (-x1_ - cx_) / rx, (-y1_ - cy_) / ry) % (Math.PI * 2);
            const dt = fS === 0 && dt_ > 0 ? dt_ - Math.PI * 2 : fS === 1 && dt_ < 0 ? dt_ + Math.PI * 2 : dt_;
            const e0 = maxError;
            const n = ceil(abs(dt) / acos(1 - e0 / rx));
            for(let i = 1; i <= n; i++){
                const theta = t1 + dt * i / n;
                const tx = cos(phi) * rx * cos(theta) - sin(phi) * ry * sin(theta) + cx;
                const ty = sin(phi) * rx * cos(theta) + cos(phi) * ry * sin(theta) + cy;
                paths[paths.length - 1].points.push([
                    tx,
                    ty
                ]);
            }
            cur = [
                x,
                y
            ];
        } else if (cmd.type === 'Z') {
            if (closePoint && (cur[0] !== closePoint[0] || cur[1] !== closePoint[1])) {
                paths[paths.length - 1].points.push(closePoint);
            }
        } else {
            throw Error(`Unexpected path command: "${cmd}"`);
        }
    }
    return paths;
}
const pointConversion = (point)=>{
    if (Array.isArray(point)) return {
        x: point[0],
        y: point[1]
    };
    else return point;
};
function copy(turtle) {
    return new Turtle1(JSON.parse(JSON.stringify({
        angle: turtle.angle,
        path: turtle.path
    })));
}
function createPath() {
    return [
        {
            points: [
                {
                    x: 0,
                    y: 0
                }
            ],
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false,
            dashed: 0,
            linecap: "butt",
            linejoin: "mitre"
        }
    ];
}
function translate(toPoint, fromPoint, turtle) {
    const { x: x0 , y: y0  } = fromPoint;
    const { x: x1 , y: y1  } = toPoint;
    const x = x1 - x0;
    const y = y1 - y0;
    turtle.path = turtle.pointMap((point)=>({
            x: point.x + x,
            y: point.y + y
        })
    );
    return turtle;
}
function rotate(angle, point, turtle) {
    if (!point) point = turtle.centroid;
    turtle.path = turtle.pointMap((p)=>{
        let delta = angle * 2 * Math.PI / 360;
        let hereX = p.x - point.x;
        let hereY = p.y - point.y;
        let newPoint = {
            x: hereX * Math.cos(delta) - hereY * Math.sin(delta) + point.x,
            y: hereY * Math.cos(delta) + hereX * Math.sin(delta) + point.y
        };
        return newPoint;
    });
    turtle.angle = turtle.angle + angle;
    return turtle;
}
function scale([xScale, yScale], point, turtle) {
    const { x , y  } = point;
    turtle.path = turtle.pointMap((p)=>{
        let newPoint = {
            x: (p.x - x) * xScale + x,
            y: (p.y - y) * yScale + y
        };
        return newPoint;
    });
    turtle.alignHead();
    return turtle;
}
function goTo(point, down, turtle) {
    const end = turtle.end;
    const { x , y  } = point;
    turtle.addPoint({
        x,
        y
    }, down);
    turtle.angle = Math.atan2(end.y - y, end.x - x) * 180 / Math.PI + 180;
    return turtle;
}
function setAngle(angle, turtle) {
    turtle.angle = angle;
    return turtle;
}
function reverse(turtle) {
    turtle.path = turtle.path.map((x)=>({
            ...x,
            points: x.points.reverse()
        })
    );
    turtle.alignHead();
    return turtle;
}
function setBooleanForm(clippedPaths, turtle) {
    let newPaths = Object.values(clippedPaths.paths).map((p)=>{
        p = p.map(({ X , Y  })=>({
                x: X / turtle.booleanScale,
                y: Y / turtle.booleanScale
            })
        );
        const points = [
            ...p,
            p[0]
        ];
        return {
            points,
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false
        };
    });
    turtle.path = newPaths;
    return turtle;
}
function flatten1(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten1(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
function construction(turtle) {
    turtle.pathMap((p)=>p.construction = true
    );
    return turtle;
}
function lastPath(turtle) {
    let last = turtle.path;
    while(Array.isArray(last)){
        last = last[last.length - 1];
    }
    return last;
}
function firstPath(turtle) {
    return firstPathHelper(turtle.path);
}
function pointsFromLast(i, turtle) {
    return turtle.lastPath().points.slice(-1 - i)[0];
}
function pointsFromFirst(i, turtle) {
    return turtle.firstPath().points[i];
}
function flatten2(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten2(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
function addPoint(point, down, turtle) {
    const lastPath1 = turtle.lastPath();
    const lastPathPoints = lastPath1.points;
    if (down) lastPathPoints.push(point);
    else if (lastPathPoints.length === 1) lastPath1.points = [
        point
    ];
    else {
        turtle.path.push({
            points: [
                point
            ],
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false,
            linecap: "butt",
            linejoin: "mitre"
        });
    }
    return turtle;
}
function pathMap(f, turtle) {
    return turtle.path.map((path1)=>pathMapHelper(path1, f)
    );
}
function pointMap(f, turtle) {
    return turtle.pathMap((path1)=>({
            ...path1,
            points: path1.points.map(f)
        })
    );
}
function pointFilter(f, turtle) {
    return turtle.pathMap((shape)=>({
            ...shape,
            points: shape.points.filter(f)
        })
    );
}
function lastAngle(turtle) {
    let angle;
    if (turtle.points.length > 1) {
        let lastPoint = turtle.pointsFromLast(0);
        let secondLastPoint = turtle.pointsFromLast(1);
        let x = lastPoint.x - secondLastPoint.x;
        let y = lastPoint.y - secondLastPoint.y;
        angle = Math.atan2(y, x) * 180 / Math.PI;
    } else {
        angle = 0;
    }
    return angle;
}
function alignHead(turtle) {
    turtle.angle = turtle.lastAngle();
    return turtle;
}
function extrema(turtle) {
    let xMin = Number.POSITIVE_INFINITY;
    let xMax = Number.NEGATIVE_INFINITY;
    let yMin = Number.POSITIVE_INFINITY;
    let yMax = Number.NEGATIVE_INFINITY;
    turtle.points.forEach((p)=>{
        if (xMin > p.x) xMin = p.x;
        if (xMax < p.x) xMax = p.x;
        if (yMin > p.y) yMin = p.y;
        if (yMax < p.y) yMax = p.y;
    });
    return {
        xMin,
        xMax,
        yMin,
        yMax
    };
}
function width(turtle) {
    const { xMin , xMax  } = turtle.extrema();
    return Math.abs(xMin - xMax);
}
function height(turtle) {
    const { yMin , yMax  } = turtle.extrema();
    return Math.abs(yMin - yMax);
}
function fillColor(color, turtle) {
    turtle.pathMap((p)=>p.fillColor = color
    );
    return turtle;
}
function polygonArea(vertices) {
    var area = 0;
    for(var i = 0; i < vertices.length; i++){
        let j = (i + 1) % vertices.length;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[j].x * vertices[i].y;
    }
    return area / 2;
}
function strokeWidth(width1, turtle) {
    turtle.pathMap((p)=>p.strokeWidth = width1
    );
    return turtle;
}
function strokeColor(color, turtle) {
    turtle.pathMap((p)=>p.strokeColor = color
    );
    return turtle;
}
function strokeLinecap(type, turtle) {
    const TYPES = [
        "round",
        "butt",
        "square"
    ];
    if (!TYPES.includes(type)) throw "Unrecognized type: " + type;
    turtle.pathMap((p)=>p.linecap = type
    );
    return turtle;
}
function strokeLinejoin(type, turtle) {
    const TYPES = [
        "round",
        "mitre",
        "bevel"
    ];
    if (!TYPES.includes(type)) throw "Unrecognized type: " + type;
    turtle.pathMap((p)=>p.linejoin = type
    );
    return turtle;
}
function turn(turn1, turtle) {
    const angle = turtle.angle + turn1 % 360;
    turtle.angle = angle;
    return turtle;
}
const degreesToRad = (deg)=>deg / 360 * 2 * Math.PI
;
function turnForward(turn1, distance, turtle) {
    turtle.turn(turn1);
    turtle.forward(distance);
    return turtle;
}
function closePath(turtle) {
    turtle.addPoint({
        ...turtle.start
    });
    turtle.alignHead();
    return turtle;
}
function point1(target, turtle) {
    if (target === "start") return turtle.pointsFromFirst(0);
    else if (target === "end") return turtle.pointsFromLast(0);
    let { xMax , xMin , yMax , yMin  } = turtle.extrema();
    let middX = (xMax + xMin) / 2;
    let middY = (yMax + yMin) / 2;
    if (target === "center" || target === "center center" || target === "cc") return {
        x: middX,
        y: middY
    };
    else if (target === "min" || target === "left bottom" || target === "lb") return {
        x: xMin,
        y: yMin
    };
    else if (target === "max" || target === "right top" || target === "rt") return {
        x: xMax,
        y: yMax
    };
    else if (target === "min center" || target === "left center" || target === "lc") return {
        x: xMin,
        y: middY
    };
    else if (target === "min max" || target === "left top" || target === "lt") return {
        x: xMin,
        y: yMax
    };
    else if (target === "center min" || target === "center bottom" || target === "cb") return {
        x: middX,
        y: yMin
    };
    else if (target === "center max" || target === "center top" || target === "ct") return {
        x: middX,
        y: yMax
    };
    else if (target === "max min" || target === "right bottom" || target === "rb") return {
        x: xMax,
        y: yMin
    };
    else if (target === "max center" || target === "right center" || target === "rc") return {
        x: xMax,
        y: middY
    };
    else throw "\"" + target + "\"" + ` is not an origin point. "right" or "left" come first then "bottom" or "top"`;
}
function arc(angle, radius, down, turtle) {
    const chord = (r, theta)=>2 * r * Math.sin(theta * Math.PI / 360)
    ;
    const newPoint = (curAngle, curPoint, distance)=>{
        const xCos = Math.cos(curAngle * Math.PI / 180);
        const ySin = Math.sin(curAngle * Math.PI / 180);
        const x = curPoint.x + distance * xCos;
        const y = curPoint.y + distance * ySin;
        return {
            x,
            y
        };
    };
    if (angle < 0) radius = -radius;
    const endPoint = turtle.end;
    const ogAngle = turtle.angle;
    const res = Math.abs(Math.floor(angle / 2));
    [
        ...Array(res).keys()
    ].forEach((step)=>{
        const ang = 180 - (360 - angle / res * (step + 1)) / 2 + ogAngle;
        const { x , y  } = newPoint(ang, endPoint, chord(radius, angle / res * (step + 1)));
        turtle.goTo({
            x,
            y
        }, down);
    });
    turtle.setAngle(angle + ogAngle);
    return turtle;
}
function flip(direction, turtle) {
    const center = turtle.point("cc");
    let xDist, yDist;
    turtle.path = turtle.pointMap((p)=>{
        xDist = Math.abs(center.x - p.x);
        yDist = Math.abs(center.y - p.y);
        if (direction.includes("y")) {
            p.x = p.x < center.x ? p.x + 2 * xDist : p.x - 2 * xDist;
        }
        if (direction.includes("x")) {
            p.y = p.y < center.y ? p.y + 2 * yDist : p.y - 2 * yDist;
        }
        return p;
    });
    return turtle;
}
function repeat(num, turtle) {
    let ogTurtle = turtle.copy();
    let start = ogTurtle.start;
    let startAngle = turtle.angle;
    let newTurtle, end;
    for(let i = 0; i < num; i++){
        newTurtle = ogTurtle.copy();
        end = turtle.end;
        newTurtle.translate([
            end.x - start.x,
            end.y - start.y
        ]);
        newTurtle.rotate(startAngle * (i + 1), newTurtle.start);
        newTurtle.points.forEach((p, i1)=>{
            if (i1 !== 0) turtle.addPoint(p);
        });
    }
    turtle.angle = startAngle * (num + 1);
    return turtle;
}
function mirror(turtle) {
    let newTurtle = turtle.copy();
    newTurtle.reverse();
    newTurtle.flip("y");
    const { x , y  } = turtle.end;
    newTurtle.translate({
        x,
        y
    }, newTurtle.start);
    newTurtle.rotate(turtle.angle * 2, newTurtle.start);
    newTurtle.points.forEach((p, i)=>{
        if (i > 0) turtle.addPoint(p);
    });
    turtle.alignHead();
    return turtle;
}
const getDistance = (p1, p2)=>Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
;
function flatGoTo(point1, axis, turtle) {
    const { x , y  } = point1;
    const angle = turtle.angle;
    const end = turtle.end;
    const m = Math.tan(angle * Math.PI / 180);
    const b = end.y - m * end.x;
    if (axis === "x") {
        const nextX = (y - b) / m;
        turtle.goTo({
            x: nextX,
            y
        });
    } else if (axis === "y") {
        const nextY = m * x + b;
        turtle.goTo({
            x,
            y: nextY
        });
    }
    turtle.goTo({
        x,
        y
    });
    return turtle;
}
function originate(turtle) {
    return turtle.translate({
        x: 0,
        y: 0
    }, turtle.cc);
}
const overlap = (p0, p1)=>0.00000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y)
;
function copyPaste(num, transformations, turtle) {
    let newTurtles = [];
    let lastTurtle = turtle.copy();
    let angle;
    for(let i = 0; i < num; i++){
        transformations(lastTurtle);
        newTurtles.push(lastTurtle);
        lastTurtle = lastTurtle.copy();
        angle = lastTurtle.angle;
    }
    let path1 = [
        ...turtle.path
    ];
    for (const newTurtle of newTurtles){
        path1 = [
            ...path1,
            ...newTurtle.path
        ];
    }
    turtle.path = path1;
    turtle.angle = angle;
    return turtle;
}
function newStroke(start, type, turtle) {
    const { x , y  } = turtle.end;
    if (Math.abs(start.x - x) < 0.00001 && Math.abs(start.y - y) < 0.00001) return turtle;
    const ps = turtle.points;
    if (ps.length === 1) {
        turtle.lastPath().points[0] = start;
    } else {
        turtle.path.push({
            points: [
                start
            ],
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false,
            linecap: "butt",
            linejoin: "mitre"
        });
        turtle.angle = 0;
    }
    return turtle;
}
function getSqDist(p1, p2) {
    var dx = p1[0] - p2[0], dy = p1[1] - p2[1];
    return dx * dx + dy * dy;
}
const getDistance1 = (p1, p2)=>Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
;
function placeAlong(turtle, ogTurtle) {
    const fp = turtle.start;
    const lp = turtle.end;
    const newTurtles = turtle.points.reduce((acc, cur, i)=>{
        const newTurtle = ogTurtle.copy().translate(ogTurtle.cc, cur);
        return acc.concat(newTurtle);
    }, []);
    const grouped = group1(...newTurtles);
    ogTurtle.path = grouped.path;
    return ogTurtle;
}
function trim(start, end, turtle) {
    const newTurtle = new Turtle1();
    let count = 0;
    turtle.pathMap((path1)=>{
        let started = false;
        path1.points.forEach((p)=>{
            if (count >= start && count <= end) {
                if (!started) {
                    newTurtle.newStroke(p);
                    started = true;
                } else {
                    newTurtle.addPoint(p);
                }
            }
            count++;
        });
    });
    turtle.path = newTurtle.path;
    turtle.alignHead();
    return turtle;
}
function dashed(num, turtle) {
    turtle.pathMap((p)=>p.dashed = num
    );
    return turtle;
}
function centroid(turtle) {
    const pts = turtle.points;
    if (pts.length === 1) return pts[0];
    else if (pts.length === 2) return {
        x: (pts[0].x + pts[1].x) / 2,
        y: (pts[0].y + pts[1].y) / 2
    };
    var first = pts[0], last = pts[pts.length - 1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea = 0, x = 0, y = 0, nPts = pts.length, p1, p2, f;
    for(var i = 0, j = nPts - 1; i < nPts; j = i++){
        p1 = pts[i];
        p2 = pts[j];
        f = p1.x * p2.y - p2.x * p1.y;
        twicearea += f;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }
    f = twicearea * 3;
    return {
        x: x / f,
        y: y / f
    };
}
function vec([x, y], down, turtle) {
    if (x === 0 && y === 0) return turtle;
    const { x: lx , y: ly  } = turtle.end;
    turtle.addPoint({
        x: lx + x,
        y: ly + y
    }, down);
    turtle.angle = Math.atan2(y, x) * 180 / Math.PI;
    return turtle;
}
function bezier(string, turtle) {
    const polylines = flattenPath(string, {
        maxError: 0.001
    }).map((x)=>x.points
    );
    polylines.forEach((pl)=>{
        pl.forEach((point1, i)=>i === 0 ? turtle.newStroke(point1) : turtle.goTo(point1)
        );
    });
    return turtle;
}
function slide(angle, distance, turtle) {
    turtle.path = turtle.pointMap((point1)=>({
            x: point1.x + distance * Math.cos(angle / 180 * Math.PI),
            y: point1.y + distance * Math.sin(angle / 180 * Math.PI)
        })
    );
    return turtle;
}
function lSystem({ axiom , rules , instructions , steps , max ,  }, turtle) {
    let state = typeof axiom === "string" ? axiom.split("") : axiom;
    for(let i = 0; i < steps; i++){
        let newState = [];
        state.forEach((symbol)=>{
            let replacement = rules[symbol] ?? [
                symbol
            ];
            if (typeof replacement === "string") replacement = replacement.split("");
            newState.push(...replacement);
        });
        state = newState;
    }
    const t = turtle;
    t.l_system_tape = state;
    state.forEach((c, i1)=>{
        if ((max === undefined || i1 < max) && instructions[c]) return instructions[c](t);
    });
    return t;
}
function transform(matrix, turtle) {
    turtle.path = turtle.pointMap((p)=>({
            x: matrix[0][0] * p.x + matrix[0][1] * p.y + matrix[0][2],
            y: matrix[1][0] * p.x + matrix[1][1] * p.y + matrix[1][2]
        })
    );
    return turtle;
}
const pointAdjust = (p, scale1)=>{
    const temp = {
    };
    temp["X"] = Math.round(p.x * scale1);
    temp["Y"] = Math.round(p.y * scale1);
    return temp;
};
function group1() {
    const turtles = arguments;
    let path1 = [];
    for (const turtle of turtles){
        if (turtle.points.length === 1) continue;
        path1 = turtle.path.length === 1 ? [
            ...path1,
            ...turtle.path
        ] : [
            ...path1,
            turtle.path
        ];
    }
    const __final = new Turtle1();
    if (path1.length > 0) __final.path = path1;
    __final.angle = turtles[turtles.length - 1].angle;
    return __final;
}
function flatten3(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten3(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
function flatten4(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten4(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
function flatten5(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten5(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
function flatten6(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten6(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
const pointAdjust1 = (p, scale1)=>{
    const temp = {
    };
    temp["X"] = Math.round(p.x * scale1);
    temp["Y"] = Math.round(p.y * scale1);
    return temp;
};
function getBooleanForm(turtle) {
    let [tool, ...body] = turtle.path.reverse();
    tool = Array.isArray(tool) ? flatten1(tool) : [
        tool
    ];
    body = Array.isArray(body) ? flatten1(body) : [
        body
    ];
    tool = tool.map((p)=>p.points.map((p1)=>pointAdjust1(p1, turtle.booleanScale)
        )
    );
    body = body.map((p)=>p.points.map((p1)=>pointAdjust1(p1, turtle.booleanScale)
        )
    );
    return body && tool ? [
        body,
        tool
    ] : tool;
}
function forward(distance, down, turtle) {
    if (distance === 0) return turtle;
    const lastPoint = turtle.end;
    const angle = turtle.angle;
    const xCos = Math.cos(degreesToRad(angle));
    const ySin = Math.sin(degreesToRad(angle));
    const x = lastPoint.x + distance * xCos;
    const y = lastPoint.y + distance * ySin;
    turtle.addPoint({
        x,
        y
    }, down);
    return turtle;
}
const getAngle = (p1, p2)=>180 / Math.PI * Math.atan2(p2.y - p1.y, p2.x - p1.x)
;
const getIntraDist = (turtle, i0, i1)=>getDistance(turtle.pointsFromLast(i0), turtle.pointsFromLast(i1))
;
const getIntraAngle = (turtle, i0, i1)=>getAngle(turtle.pointsFromLast(i0), turtle.pointsFromLast(i1))
;
const isClosed = ({ points  })=>{
    const path1 = points;
    const EPSILON = 0.00000001;
    const firstPoint = path1[0];
    const lastPoint = path1[path1.length - 1];
    const xDelta = Math.abs(firstPoint.x - lastPoint.x);
    const yDelta = Math.abs(firstPoint.y - lastPoint.y);
    const closed = xDelta < 0.00000001 && yDelta < 0.00000001;
    return closed;
};
function fillet(radius, turtle) {
    const lastPath1 = turtle.lastPath();
    const l = lastPath1.points.length;
    if (l < 3) return turtle;
    const dist1 = getIntraDist(turtle, 0, 1);
    const dist0 = getIntraDist(turtle, 1, 2);
    const ang0 = getIntraAngle(turtle, 1, 0);
    const ang1 = getIntraAngle(turtle, 2, 1);
    const ang = ang0 - ang1;
    const lose = Math.abs(Math.tan(ang / 360 * Math.PI) * radius);
    lastPath1.points = lastPath1.points.slice(0, -2);
    turtle.setAngle(ang1);
    turtle.forward(dist0 - lose);
    let circleAng = ang;
    if (circleAng > 180) {
        circleAng = ang - 360;
    } else if (circleAng < -180) {
        circleAng = 360 + ang;
    }
    arc(circleAng, radius, true, turtle);
    turtle.forward(dist1 - lose);
    return turtle;
}
function offset(distance, ops, turtle) {
    let { endType , jointType ="jtRound" , miterLimit =2 , roundPrecision =0.25  } = ops;
    if (!endType) {
        const closed = overlap(turtle.start, turtle.end);
        endType = closed ? 'etClosedRound' : "etOpenRound";
    }
    const paths = turtle.getBooleanForm().flat();
    const subject = new __default(paths, true);
    const result = subject.offset(distance * turtle.booleanScale, {
        jointType,
        endType,
        miterLimit,
        roundPrecision
    });
    turtle.setBooleanForm(result);
    return turtle;
}
function getSqSegDist(p, p1, p2) {
    var x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
    if (dx !== 0 || dy !== 0) {
        var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x = p2[0];
            y = p2[1];
        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
}
function simplifyRadialDist(points, sqTolerance) {
    var prevPoint = points[0], newPoints = [
        prevPoint
    ], point1;
    for(var i = 1, len = points.length; i < len; i++){
        point1 = points[i];
        if (getSqDist(point1, prevPoint) > sqTolerance) {
            newPoints.push(point1);
            prevPoint = point1;
        }
    }
    if (prevPoint !== point1) newPoints.push(point1);
    return newPoints;
}
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance, index1;
    for(var i = first + 1; i < last; i++){
        var sqDist = getSqSegDist(points[i], points[first], points[last]);
        if (sqDist > maxSqDist) {
            index1 = i;
            maxSqDist = sqDist;
        }
    }
    if (maxSqDist > sqTolerance) {
        if (index1 - first > 1) simplifyDPStep(points, first, index1, sqTolerance, simplified);
        simplified.push(points[index1]);
        if (last - index1 > 1) simplifyDPStep(points, index1, last, sqTolerance, simplified);
    }
}
function simplifyDouglasPeucker(points, sqTolerance) {
    var last = points.length - 1;
    var simplified = [
        points[0]
    ];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);
    return simplified;
}
function simplify(points, tolerance, highestQuality) {
    if (points.length <= 2) return points;
    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);
    return points;
}
function resize(canvas) {
    const { width: w , height: h  } = canvas.getBoundingClientRect();
    canvas.width = w;
    canvas.height = h;
    return {
        w,
        h
    };
}
const getImgData = (canvas)=>canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height)
;
function draw(textString, canvas, resizeIt = true) {
    const { w , h  } = resize(canvas);
    var ctx = canvas.getContext("2d");
    const padding = 0;
    ctx.font = "100pt helvetica";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    const mT = ctx.measureText(textString);
    const tw = mT.width + 0;
    const textHeight = mT.fontBoundingBoxAscent + mT.fontBoundingBoxDescent;
    if (resizeIt) {
        canvas.style.height = `${textHeight}px`;
        canvas.style.width = `${tw}px`;
    }
    ctx.fillText(textString, tw / 2, h / 2);
    if (resizeIt) draw(textString, canvas, false);
}
function interpolate(side, neighbors, step) {
    let y0, y1;
    if (side === 0) {
        y0 = neighbors[0];
        y1 = neighbors[1];
    } else if (side === 1) {
        y0 = neighbors[1];
        y1 = neighbors[2];
    } else if (side === 2) {
        y0 = neighbors[3];
        y1 = neighbors[2];
    } else if (side === 3) {
        y0 = neighbors[3];
        y1 = neighbors[0];
    }
    let x0 = -1;
    let x1 = 1;
    let m = (y1 - y0) / (x1 - x0);
    let b = y1 - m * x1;
    let pointFiveX = (0.5 - b) / m;
    return step * pointFiveX;
}
const RULES_INTERPOLATED = {
    "0000": ([x, y], step, neighbors)=>[]
    ,
    "0001": ([x, y], step, neighbors)=>[
            [
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ],
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ]
            ]
        ]
    ,
    "0010": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ],
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ]
            ]
        ]
    ,
    "0100": ([x, y], step, neighbors)=>[
            [
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ],
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ]
            ]
        ]
    ,
    "1000": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ],
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ]
            ]
        ]
    ,
    "0011": ([x, y], step, neighbors)=>[
            [
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ],
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ]
            ]
        ]
    ,
    "0101": ([x, y], step, neighbors)=>[
            [
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ],
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ]
            ],
            [
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ],
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ]
            ]
        ]
    ,
    "1001": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ],
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ]
            ]
        ]
    ,
    "0110": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ],
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ]
            ]
        ]
    ,
    "1010": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ],
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ]
            ],
            [
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ],
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ]
            ]
        ]
    ,
    "1100": ([x, y], step, neighbors)=>[
            [
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ],
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ]
            ]
        ]
    ,
    "0111": ([x, y], step, neighbors)=>[
            [
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ],
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ]
            ]
        ]
    ,
    "1011": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(0, neighbors, step),
                    y - step
                ],
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ]
            ]
        ]
    ,
    "1110": ([x, y], step, neighbors)=>[
            [
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ],
                [
                    x - step,
                    y - interpolate(3, neighbors, step)
                ]
            ]
        ]
    ,
    "1101": ([x, y], step, neighbors)=>[
            [
                [
                    x + step,
                    y + interpolate(1, neighbors, step)
                ],
                [
                    x + interpolate(2, neighbors, step),
                    y + step
                ]
            ]
        ]
    ,
    "1111": ([x, y], step, neighbors)=>[]
};
const DIRECTION = {
    "0000": undefined,
    "0001": "down",
    "0010": "right",
    "0100": "up",
    "1000": "left",
    "0011": "right",
    "0101": undefined,
    "1001": "down",
    "0110": "up",
    "1010": undefined,
    "1100": "left",
    "0111": "up",
    "1011": "right",
    "1110": "left",
    "1101": "down",
    "1111": undefined
};
function marchImage(imgData) {
    let { data: og , width: w , height: h  } = imgData;
    const getGrey = (row, col)=>og[(row * w + col) * 4 + 3] / 255
    ;
    const getNeighbors = (row, col)=>[
            getGrey(row - 1, col - 1),
            getGrey(row - 1, col),
            getGrey(row, col),
            getGrey(row, col - 1), 
        ]
    ;
    const getCode = (neighbors)=>neighbors.map((x)=>x >= 0.5 ? 1 : 0
        ).join("")
    ;
    const allLines = [];
    const seen = {
    };
    let last = [];
    for(let y = 1; y < h; y++){
        for(let x = 1; x < w; x++){
            if (seen[`${x},${y}`]) continue;
            let neighbors = getNeighbors(y, x);
            let string = getCode(neighbors);
            let rule = RULES_INTERPOLATED[string];
            let direction = DIRECTION[string];
            const lines = rule([
                x,
                y
            ], 0.5, neighbors);
            seen[`${x},${y}`] = true;
            let newPoints = lines.flat();
            if (newPoints.length > 0) allLines.push(lines.flat());
            if (direction) {
                let last1 = [
                    x,
                    y
                ];
                while(direction){
                    if (direction === "up") y -= 1;
                    else if (direction === "down") y += 1;
                    else if (direction === "right") x += 1;
                    else if (direction === "left") x -= 1;
                    if (seen[`${x},${y}`] === true) break;
                    neighbors = getNeighbors(y, x);
                    string = getCode(neighbors);
                    rule = RULES_INTERPOLATED[string];
                    direction = DIRECTION[string];
                    seen[`${x},${y}`] = true;
                    let lines1 = rule([
                        x,
                        y
                    ], 0.5, neighbors);
                    let lastPolyLine = allLines[allLines.length - 1];
                    lines1.forEach((l)=>{
                        lastPolyLine.push(l[1]);
                    });
                }
                [x, y] = last1;
            }
        }
    }
    return allLines;
}
function textToPolylines(str) {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    draw(str, canvas);
    const imgData = getImgData(canvas);
    let lines = marchImage(imgData);
    lines = lines.map((line1)=>{
        line1 = simplify(line1, 0.1);
        return line1.reverse();
    });
    document.body.removeChild(canvas);
    return lines;
}
const cache = {
};
function text(string, turtle) {
    const polylines = cache[string] || textToPolylines(string);
    cache[string] = polylines;
    polylines.forEach((pl)=>{
        pl.forEach((point1, i)=>{
            if (i === 0) turtle.newStroke(point1);
            turtle.goTo(point1);
        });
    });
    turtle.flip("x");
    return turtle;
}
const convert = (turtle)=>flatten3(turtle.path).map((x)=>x.points.map(({ x: x1 , y  })=>[
                x1,
                y
            ]
        )
    )
;
function newUnion(turtle, args) {
    const target = convert(turtle);
    const tools = [
        ...args
    ].map(convert);
    const result = index.union(target, tools);
    let newPaths = result.flat().map((points)=>{
        return {
            points: points.map((p)=>({
                    x: p[0],
                    y: p[1]
                })
            ),
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false
        };
    });
    turtle.path = newPaths;
    return turtle;
}
const convert1 = (turtle)=>flatten4(turtle.path).map((x)=>x.points.map(({ x: x1 , y  })=>[
                x1,
                y
            ]
        )
    )
;
function newIntersection(turtle, args) {
    const target = convert1(turtle);
    const tools = [
        ...args
    ].map(convert1);
    const result = index.intersection(target, tools);
    let newPaths = result.flat().map((points)=>{
        return {
            points: points.map((p)=>({
                    x: p[0],
                    y: p[1]
                })
            ),
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false
        };
    });
    turtle.path = newPaths;
    return turtle;
}
const convert2 = (turtle)=>flatten5(turtle.path).map((x)=>x.points.map(({ x: x1 , y  })=>[
                x1,
                y
            ]
        )
    )
;
function newDifference(turtle, args) {
    const target = convert2(turtle);
    const tools = [
        ...args
    ].map(convert2);
    const result = index.difference(target, tools);
    let newPaths = result.flat().map((points)=>{
        return {
            points: points.map((p)=>({
                    x: p[0],
                    y: p[1]
                })
            ),
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false
        };
    });
    turtle.path = newPaths;
    return turtle;
}
const convert3 = (turtle)=>flatten6(turtle.path).map((x)=>x.points.map(({ x: x1 , y  })=>[
                x1,
                y
            ]
        )
    )
;
function newXor(turtle, args) {
    const target = convert3(turtle);
    const tools = [
        ...args
    ].map(convert3);
    const result = index.xor(target, tools);
    let newPaths = result.flat().map((points)=>{
        return {
            points: points.map((p)=>({
                    x: p[0],
                    y: p[1]
                })
            ),
            fillColor: "none",
            strokeWidth: 1,
            strokeColor: "black",
            construction: false
        };
    });
    turtle.path = newPaths;
    return turtle;
}
function flatten7(items) {
    const flat = [];
    items.forEach((item)=>{
        if (Array.isArray(item)) {
            flat.push(...flatten7(item));
        } else {
            flat.push(item);
        }
    });
    return flat;
}
function polylines(asArray, prec, turtle) {
    const roundPathPts = (path1)=>({
            inside: path1.fillColor === "white",
            pts: path1.points.map(({ x , y  })=>asArray ? [
                    x,
                    y
                ] : {
                    x,
                    y
                }
            )
        })
    ;
    const pls = flatten7(turtle.path).map(roundPathPts);
    return pls;
}
function crossProduct1(a, b) {
    return a.x * b.y - b.x * a.y;
}
function doBoundingBoxesIntersect(a, b) {
    return a.xMin <= b.xMax && a.xMax >= b.xMin && a.yMin <= b.yMax && a.yMax >= b.yMin;
}
function isPointRightOfLine(line1, point1) {
    let aTmp = [
        {
            x: 0,
            y: 0
        },
        {
            x: line1[1].x - line1[0].x,
            y: line1[1].y - line1[0].y
        }
    ];
    let bTmp = {
        x: point1.x - line1[0].x,
        y: point1.y - line1[0].y
    };
    let r = crossProduct1(aTmp[1], bTmp);
    return r < 0;
}
function lineSegmentCrossesLine(a, b) {
    return isPointRightOfLine(a, b[0]) ^ isPointRightOfLine(a, b[1]);
}
function getBoundingBox(line1) {
    let xMin = Math.min(line1[0].x, line1[1].x);
    let xMax = Math.max(line1[0].x, line1[1].x);
    let yMin = Math.min(line1[0].y, line1[1].y);
    let yMax = Math.max(line1[0].y, line1[1].y);
    return {
        xMin,
        xMax,
        yMin,
        yMax
    };
}
function doLinesIntersect(a, b) {
    let box1 = getBoundingBox(a);
    let box2 = getBoundingBox(b);
    return doBoundingBoxesIntersect(box1, box2) && lineSegmentCrossesLine(a, b) && lineSegmentCrossesLine(b, a);
}
function isRectangle({ x: x0 , y: y0  }, { x: x1 , y: y1  }, { x: x2 , y: y2  }, { x: x3 , y: y3  }) {
    let cx, cy, dd0, dd1, dd2, dd3;
    cx = (x0 + x1 + x2 + x3) / 4;
    cy = (y0 + y1 + y2 + y3) / 4;
    dd0 = (cx - x0) ** 2 + (cy - y0) ** 2;
    dd1 = (cx - x1) ** 2 + (cy - y1) ** 2;
    dd2 = (cx - x2) ** 2 + (cy - y2) ** 2;
    dd3 = (cx - x3) ** 2 + (cy - y3) ** 2;
    return approxEq(dd0, dd1) && approxEq(dd0, dd2) && approxEq(dd0, dd3);
}
const approxEq = (x, y)=>Math.abs(x - y) < 1
;
const samePt = (pt0, pt1)=>approxEq(pt0.x, pt1.x) && approxEq(pt0.y, pt1.y)
;
const dist2 = (pt0, pt1)=>(pt1.x - pt0.x) ** 2 + (pt1.y - pt0.y) ** 2
;
function getMidpoint(p0, p1) {
    return {
        x: (p0.x + p1.x) / 2,
        y: (p0.y + p1.y) / 2
    };
}
function ptContained(pt, pts) {
    let numPoints = pts.length;
    let intersections = 0;
    for(let i = 0, j = 1; j < numPoints; j++, i++){
        let seg = [
            pts[i],
            pts[j]
        ];
        let ray = [
            pt,
            {
                x: pt.x,
                y: -999999999999
            }
        ];
        if (doLinesIntersect(seg, ray)) intersections++;
    }
    return intersections % 2 !== 0;
}
function ptsAreRight(p0, p1, p2) {
    const midPt = getMidpoint(p0, p2);
    const a = dist2(p0, p1);
    const b = dist2(p1, p2);
    const c = dist2(p0, p2);
    const isRight = approxEq(a + b, c);
    return {
        isRight,
        midPt
    };
}
function getTabsPls(pls) {
    let tabs = [];
    for(let i = 0; i < pls.length; i++){
        let pl = pls[i];
        const n = pl.pts.length;
        for(let i1 = 0; i1 < n - 2; i1++){
            const [p0, p1, p2] = pl.pts.slice(i1);
            const { isRight , midPt  } = ptsAreRight(p0, p1, p2);
            if (isRight) {
                let contained = ptContained(midPt, pl.pts);
                tabs.push({
                    contained: contained && !pl.inside,
                    midPt,
                    pts: [
                        p0,
                        p1,
                        p2
                    ]
                });
                const fivePts = pl.pts.length === 5;
                if (fivePts) {
                    const [p01, p11, p21, p3] = pl.pts;
                    let isRect = isRectangle(p01, p11, p21, p3);
                    if (isRect) i1 += 1;
                }
            }
            if (i1 === n - 3) {
                const p21 = pl.pts[1];
                const [p01, p11] = pl.pts.slice(i1 + 1);
                const { isRight: isRight1 , midPt: midPt1  } = ptsAreRight(p01, p11, p21);
                if (true) {
                    let contained = ptContained(midPt1, pl.pts);
                    tabs.push({
                        contained: contained && !pl.inside,
                        midPt: midPt1,
                        pts: [
                            p01,
                            p11,
                            p21
                        ],
                        last: true
                    });
                    const fivePts = pl.pts.length === 5;
                    if (fivePts) {
                        const [p02, p12, p22, p3] = pl.pts;
                        let isRect = isRectangle(p02, p12, p22, p3);
                        if (isRect) i1 += 1;
                    }
                }
            }
        }
    }
    const fusedTabs = [];
    for(let i1 = 0; i1 < tabs.length; i1++){
        let tab0 = tabs[i1];
        for(let j = i1 + 1; j < tabs.length; j++){
            let tab1 = tabs[j];
            if (samePt(tab0.midPt, tab1.midPt)) {
                tab0.pts.push(tab1.pts[2]);
                fusedTabs.push(tab0);
            }
        }
    }
    return [
        tabs,
        fusedTabs
    ];
}
function getTabs(turtle) {
    return getTabsPls(turtle.copy().polylines());
}
function points(turtle) {
    return flatten2(turtle.pathMap((x)=>x.points
    ));
}
const clockwise = (ps)=>polygonArea(ps) > 0
;
function floodFill(color, turtle) {
    turtle.xor();
    turtle.pathMap((p, i)=>{
        let cw = clockwise(p.points);
        if (cw) p.fillColor = color;
        else p.fillColor = "white";
    });
    return turtle;
}
function flatten8(turtle) {
    const pls = turtle.polylines();
    const adjustedPls = pls.map((x)=>x.pts.map((p)=>pointAdjust(p, turtle.booleanScale)
        )
    );
    const [first, ...rest] = adjustedPls;
    let subject = new __default([
        first
    ], true);
    rest.forEach((pl)=>{
        const clip = new __default([
            pl
        ], true);
        subject = subject.union(clip);
    });
    return turtle.setBooleanForm(subject);
}
class Turtle1 {
    constructor(init){
        this.angle = 0;
        this.path = createPath();
        this.savedStates = [];
        this.booleanScale = 10000;
        if (init) {
            this.angle = init.angle;
            this.path = init.path;
        }
    }
    overwrite(turtle) {
        this.angle = turtle.angle;
        this.path = turtle.path;
        this.savedStates = turtle.savedStates;
        this.booleanScale = turtle.booleanScale;
        return this;
    }
    firstPath() {
        return firstPath(this);
    }
    lastPath() {
        return lastPath(this);
    }
    pointsFromLast(i) {
        return pointsFromLast(i, this);
    }
    pointsFromFirst(i) {
        return pointsFromFirst(i, this);
    }
    getPoint(i) {
        return i >= 0 ? pointsFromFirst(i, this) : pointsFromLast(-i, this);
    }
    addPoint(point, down = true) {
        return addPoint(point, down, this);
    }
    pathMap(func) {
        return pathMap(func, this);
    }
    pointMap(func) {
        return pointMap(func, this);
    }
    pointFilter(func) {
        return pointFilter(func, this);
    }
    extrema() {
        return extrema(this);
    }
    copy() {
        return copy(this);
    }
    setBooleanForm(paths) {
        return setBooleanForm(paths, this);
    }
    getBooleanForm() {
        return getBooleanForm(this);
    }
    point(target) {
        return point1(target, this);
    }
    store() {
        this.savedStates.push({
            pos: this.end,
            angle: this.angle
        });
        return this;
    }
    restore() {
        const state = this.savedStates.pop();
        this.goTo(state.pos, false);
        this.angle = state.angle;
        return this;
    }
    newStroke(start = [
        0,
        0
    ], type = "point") {
        return newStroke(pointConversion(start), type, this);
    }
    construction() {
        return construction(this);
    }
    lastAngle() {
        return lastAngle(this);
    }
    lastangle() {
        return lastAngle(this);
    }
    last_angle() {
        return lastAngle(this);
    }
    alignHead() {
        return alignHead(this);
    }
    alignhead() {
        return alignHead(this);
    }
    align_head() {
        return alignHead(this);
    }
    fillColor(color) {
        return fillColor(color, this);
    }
    fillcolor(color) {
        return fillColor(color, this);
    }
    fill_color(color) {
        return fillColor(color, this);
    }
    strokeWidth(thickness) {
        return strokeWidth(thickness, this);
    }
    strokewidth(thickness) {
        return strokeWidth(thickness, this);
    }
    stroke_width(thickness) {
        return strokeWidth(thickness, this);
    }
    strokeColor(color) {
        return strokeColor(color, this);
    }
    strokecolor(color) {
        return strokeColor(color, this);
    }
    stroke_color(color) {
        return strokeColor(color, this);
    }
    strokeLinecap(type) {
        return strokeLinecap(type, this);
    }
    strokelinecap(type) {
        return strokeLinecap(type, this);
    }
    stroke_linecap(type) {
        return strokeLinecap(type, this);
    }
    strokeLinejoin(type) {
        return strokeLinejoin(type, this);
    }
    strokelinejoin(type) {
        return strokeLinejoin(type, this);
    }
    stroke_linejoin(type) {
        return strokeLinejoin(type, this);
    }
    goTo(point, down = true) {
        return goTo(pointConversion(point), down, this);
    }
    goto(point, down = true) {
        return goTo(pointConversion(point), down, this);
    }
    go_to(point, down = true) {
        return goTo(pointConversion(point), down, this);
    }
    forward(distance, down = true) {
        return forward(distance, down, this);
    }
    vec(vector, down = true) {
        return vec(vector, down, this);
    }
    arc(angle, radius, down = true) {
        return arc(angle, radius, down, this);
    }
    turnForward(angle, distance) {
        return turnForward(angle, distance, this);
    }
    turnforward(angle, distance) {
        return turnForward(angle, distance, this);
    }
    turn_forward(angle, distance) {
        return turnForward(angle, distance, this);
    }
    turn(angle) {
        return turn(angle, this);
    }
    right(angle) {
        return turn(-angle, this);
    }
    left(angle) {
        return turn(angle, this);
    }
    setAngle(angle) {
        return setAngle(angle, this);
    }
    setangle(angle) {
        return setAngle(angle, this);
    }
    set_angle(angle) {
        return setAngle(angle, this);
    }
    flatGoTo(point, axis) {
        return flatGoTo(pointConversion(point), axis, this);
    }
    flatgoto(point, axis) {
        return flatGoTo(pointConversion(point), axis, this);
    }
    flat_goto(point, axis) {
        return flatGoTo(pointConversion(point), axis, this);
    }
    closePath() {
        return closePath(this);
    }
    closepath() {
        return closePath(this);
    }
    close_path() {
        return closePath(this);
    }
    translate(toPoint, fromPoint = [
        0,
        0
    ]) {
        return translate(pointConversion(toPoint), pointConversion(fromPoint), this);
    }
    rotate(angle, point) {
        return rotate(angle, point ? pointConversion(point) : this.centroid, this);
    }
    scale(factor, point) {
        point = point ? pointConversion(point) : this.centroid;
        if (typeof factor === "number") factor = [
            factor,
            factor
        ];
        return scale(factor, point, this);
    }
    originate() {
        return originate(this);
    }
    reverse() {
        return reverse(this);
    }
    flip(axis) {
        return flip(axis, this);
    }
    repeat(num) {
        return repeat(num, this);
    }
    mirror() {
        return mirror(this);
    }
    fillet(radius) {
        return fillet(radius, this);
    }
    roundCorners(radius, all = false) {
        return roundCorners(radius, all, this);
    }
    roundcorners(radius, all = false) {
        return roundCorners(radius, all, this);
    }
    round_corners(radius, all = false) {
        return roundCorners(radius, all, this);
    }
    thicken(thickness) {
        return thicken(thickness, this);
    }
    copyPaste(num, transformations) {
        return copyPaste(num, transformations, this);
    }
    copypaste(num, transformations) {
        return copyPaste(num, transformations, this);
    }
    copy_paste(num, transformations) {
        return copyPaste(num, transformations, this);
    }
    offset(distance, options = {
    }) {
        return offset(distance, options, this);
    }
    outline() {
        return offset(0, {
            endType: "etClosedPolygon"
        }, this);
    }
    expand(distance) {
        return offset(distance, {
            endType: "etClosedPolygon"
        }, this);
    }
    text(word) {
        return text(word, this);
    }
    dogbone(radius, all = false) {
        return dogbone(radius, all, this);
    }
    trim(start, end) {
        return trim(start, end, this);
    }
    union() {
        return this.overwrite(newUnion(this, arguments));
    }
    intersect() {
        return this.overwrite(newIntersection(this, arguments));
    }
    difference() {
        return this.overwrite(newDifference(this, arguments));
    }
    xor() {
        return this.overwrite(newXor(this, arguments));
    }
    placeAlong(turtle) {
        return placeAlong(turtle, this);
    }
    placealong(turtle) {
        return placeAlong(turtle, this);
    }
    place_along(turtle) {
        return placeAlong(turtle, this);
    }
    dashed(number) {
        return dashed(number, this);
    }
    bezier(string) {
        return bezier(string, this);
    }
    slide(angle, distance) {
        return slide(angle, distance, this);
    }
    polylines(asArray = false, prec = 0) {
        return polylines(asArray, prec, this);
    }
    getTabs() {
        return getTabs(this);
    }
    gettabs() {
        return getTabs(this);
    }
    get_tabs() {
        return getTabs(this);
    }
    lSystem(args) {
        return lSystem(args, this);
    }
    lsystem(args) {
        return lSystem(args, this);
    }
    l_system(args) {
        return lSystem(args, this);
    }
    transform(matrix) {
        return transform(matrix, this);
    }
    get start() {
        return point1("start", this);
    }
    get end() {
        return point1("end", this);
    }
    get lt() {
        return point1("lt", this);
    }
    get lc() {
        return point1("lc", this);
    }
    get lb() {
        return point1("lb", this);
    }
    get ct() {
        return point1("ct", this);
    }
    get cc() {
        return point1("cc", this);
    }
    get cb() {
        return point1("cb", this);
    }
    get rt() {
        return point1("rt", this);
    }
    get rc() {
        return point1("rc", this);
    }
    get rb() {
        return point1("rb", this);
    }
    get centroid() {
        return centroid(this);
    }
    get width() {
        return width(this);
    }
    get height() {
        return height(this);
    }
    get points() {
        return points(this);
    }
    floodFill(color) {
        return floodFill(color, this);
    }
    floodfill(color) {
        return floodFill(color, this);
    }
    flood_fill(color) {
        return floodFill(color, this);
    }
    group() {
        return this.overwrite(group1(this, ...arguments));
    }
    flatten() {
        return this.overwrite(flatten8(this));
    }
    getPathData(merge = true) {
        let result = [];
        const pls = this.polylines();
        for(let i = 0; i < pls.length; i++){
            for(let j = 0; j < pls[i].pts.length; j++){
                let pt = pls[i].pts[j];
                if (j === 0) result.push(`M ${pt.x} ${pt.y}`);
                else result[result.length - 1] += `L ${pt.x} ${pt.y}`;
            }
        }
        return merge ? result.join(" ") : result;
    }
}
function firstPathHelper(path1) {
    const first = path1[0];
    return Array.isArray(first) ? firstPathHelper(first) : first;
}
function pathMapHelper(path1, f) {
    return Array.isArray(path1) ? path1.map((p)=>pathMapHelper(p, f)
    ) : f(path1);
}
const getIntraDist2 = (path1, i0, i1)=>getDistance(path1[i0], path1[i1])
;
const getIntraAngle2 = (path1, i0, i1)=>getAngle(path1[i0], path1[i1])
;
function roundCornersPath(radius, all, path1) {
    const l = path1.points.length;
    if (l < 3) return path1;
    const newTurtle = new Turtle1();
    const numPoints = path1.points.length;
    const { x , y  } = path1.points[0];
    newTurtle.translate({
        x,
        y
    }, newTurtle.start);
    let remove = 0;
    let firstLose = 0;
    for(let i = 0; i < numPoints - 2; i++){
        const dist0 = getIntraDist2(path1.points, i, i + 1);
        const dist1 = getIntraDist2(path1.points, i + 1, i + 2);
        const ang0 = getIntraAngle2(path1.points, i, i + 1);
        const ang1 = getIntraAngle2(path1.points, i + 1, i + 2);
        let ang = ang1 - ang0;
        if (Math.abs(ang) < 3 && !all) {
            newTurtle.goTo(path1.points[i + 1]);
            if (i === path1.points.length - 3) {
                newTurtle.goTo(path1.points[i + 2]);
            }
            remove = 0;
            continue;
        }
        let lose = Math.abs(Math.tan(ang / 360 * Math.PI) * radius);
        if (i === 0) firstLose = lose;
        newTurtle.setAngle(ang0);
        newTurtle.forward(dist0 - lose - remove);
        if (ang > 180) ang -= 360;
        else if (ang < -180) ang += 360;
        arc(ang, radius, true, newTurtle);
        if (i === path1.points.length - 3) {
            if (isClosed(path1)) {
                const dist21 = getIntraDist2(path1.points, 0, 1);
                const ang2 = getIntraAngle2(path1.points, 0, 1);
                let ang3 = ang2 - ang1;
                const lose2 = Math.abs(Math.tan(ang3 / 360 * Math.PI) * radius);
                newTurtle.path = newTurtle.pointFilter((x1, i1)=>i1 !== 0
                );
                newTurtle.forward(dist1 - lose - lose2);
                if (ang3 > 180) ang3 -= 360;
                else if (ang3 < -180) ang3 += 360;
                arc(ang3, radius, true, newTurtle);
                newTurtle.forward(dist21 - lose2 - firstLose);
            } else {
                newTurtle.forward(dist1 - lose);
            }
        }
        remove = lose;
    }
    return newTurtle.path;
}
function roundCorners(radius, all, turtle) {
    turtle.path = turtle.pathMap((p)=>roundCornersPath(radius, all, p)
    );
    return turtle;
}
function overlap1(p0, p1) {
    return 0.0000001 > Math.abs(p0.x - p1.x) + Math.abs(p0.y - p1.y);
}
function deepFlatten(array) {
    var result = [];
    array.forEach(function(elem) {
        if (Array.isArray(elem)) {
            result = result.concat(deepFlatten(elem));
        } else {
            result.push(elem);
        }
    });
    return result;
}
function thicken(distance, turtle) {
    const turtles = deepFlatten(turtle.pathMap((p)=>new Turtle1({
            angle: 0,
            path: [
                p
            ]
        })
    ));
    turtles.forEach((t)=>{
        const endType = overlap1(t.start, t.end) ? "etClosedLine" : "etOpenButt";
        t.offset(distance / 2, {
            endType,
            jointType: "jtMiter"
        });
    });
    turtle.path = group1(...turtles).path;
    return turtle;
}
const getAngle1 = (p1, p2)=>180 / Math.PI * Math.atan2(p2.y - p1.y, p2.x - p1.x)
;
const getIntraDist1 = (path1, i0, i1)=>getDistance1(path1[i0], path1[i1])
;
const getIntraAngle1 = (path1, i0, i1)=>getAngle1(path1[i0], path1[i1])
;
const isClosed1 = ({ points: points1  })=>{
    const path1 = points1;
    const EPSILON = 0.00000001;
    const firstPoint = path1[0];
    const lastPoint = path1[path1.length - 1];
    const xDelta = Math.abs(firstPoint.x - lastPoint.x);
    const yDelta = Math.abs(firstPoint.y - lastPoint.y);
    const closed = xDelta < 0.00000001 && yDelta < 0.00000001;
    return closed;
};
function dogbonePath(radius, all, path1) {
    const l = path1.points.length;
    if (l < 3) return path1;
    const newTurtle = new Turtle1();
    const numPoints = path1.points.length;
    const { x , y  } = path1.points[0];
    newTurtle.translate({
        x,
        y
    }, newTurtle.start);
    let remove = 0;
    let firstLose = 0;
    for(let i = 0; i < numPoints - 2; i++){
        const dist0 = getIntraDist1(path1.points, i, i + 1);
        const ang0 = getIntraAngle1(path1.points, i, i + 1);
        const ang1 = getIntraAngle1(path1.points, i + 1, i + 2);
        let ang = ang1 - ang0;
        if (ang > 180) ang -= 360;
        else if (ang < -180) ang += ang;
        if (Math.abs(ang) < 3 && !all) {
            newTurtle.goTo(path1.points[i + 1]);
            if (i === path1.points.length - 3) {
                newTurtle.goTo(path1.points[i + 2]);
            }
            remove = 0;
            continue;
        }
        let lose = Math.abs(2 * radius * Math.sin(ang * Math.PI / 180 / 2));
        if (i === 0) firstLose = lose;
        newTurtle.forward(dist0 - lose - remove).left(-ang / 2).arc(2 * ang, radius).left(-ang / 2);
        remove = lose;
        if (i === path1.points.length - 3) {
            const dist1 = getIntraDist1(path1.points, i + 1, i + 2);
            if (isClosed1(path1)) {
                const dist21 = getIntraDist1(path1.points, 0, 1);
                const ang2 = getIntraAngle1(path1.points, 0, 1);
                let ang3 = ang2 - ang1;
                const lose2 = Math.abs(2 * radius * Math.sin(ang3 * Math.PI / 180 / 2));
                newTurtle.path = newTurtle.pointFilter((x1, i1)=>i1 !== 0
                );
                newTurtle.forward(dist1 - lose - lose2);
                newTurtle.left(-ang3 / 2).arc(2 * ang3, radius).left(-ang3 / 2).forward(dist21 - lose2 - firstLose);
            } else {
                newTurtle.forward(dist1 - lose);
            }
        }
    }
    return newTurtle.path;
}
function dogbone(radius, all, turtle) {
    turtle.path = turtle.pathMap((p)=>dogbonePath(radius, all, p)
    );
    return turtle;
}
const directives = new WeakMap();
const directive = (f)=>(...args)=>{
        const d = f(...args);
        directives.set(d, true);
        return d;
    }
;
const isDirective = (o)=>{
    return typeof o === "function" && directives.has(o);
};
const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
const reparentNodes = (container, start, end = null, before = null)=>{
    while(start !== end){
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
const removeNodes = (container, start, end = null)=>{
    while(start !== end){
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
const noChange = {
};
const nothing = {
};
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
const boundAttributeSuffix = "$lit$";
class Template {
    constructor(result, element5){
        this.parts = [];
        this.element = element5;
        const nodesToRemove = [];
        const stack = [];
        const walker = document.createTreeWalker(element5.content, 133, null, false);
        let lastPartIndex = 0;
        let index1 = -1;
        let partIndex = 0;
        const { strings: strings5 , values: { length: length1  }  } = result;
        while(partIndex < length1){
            const node = walker.nextNode();
            if (node === null) {
                walker.currentNode = stack.pop();
                continue;
            }
            index1++;
            if (node.nodeType === 1) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length: length21  } = attributes;
                    let count = 0;
                    for(let i = 0; i < length21; i++){
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while((count--) > 0){
                        const stringForPart = strings5[partIndex];
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({
                            type: "attribute",
                            index: index1,
                            name,
                            strings: statics
                        });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === "TEMPLATE") {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            } else if (node.nodeType === 3) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings2 = data.split(markerRegex);
                    const lastIndex = strings2.length - 1;
                    for(let i = 0; i < lastIndex; i++){
                        let insert1;
                        let s = strings2[i];
                        if (s === "") {
                            insert1 = createMarker();
                        } else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert1 = document.createTextNode(s);
                        }
                        parent.insertBefore(insert1, node);
                        this.parts.push({
                            type: "node",
                            index: ++index1
                        });
                    }
                    if (strings2[lastIndex] === "") {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    } else {
                        node.data = strings2[lastIndex];
                    }
                    partIndex += lastIndex;
                }
            } else if (node.nodeType === 8) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    if (node.previousSibling === null || index1 === lastPartIndex) {
                        index1++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index1;
                    this.parts.push({
                        type: "node",
                        index: index1
                    });
                    if (node.nextSibling === null) {
                        node.data = "";
                    } else {
                        nodesToRemove.push(node);
                        index1--;
                    }
                    partIndex++;
                } else {
                    let i = -1;
                    while((i = node.data.indexOf(marker, i + 1)) !== -1){
                        this.parts.push({
                            type: "node",
                            index: -1
                        });
                        partIndex++;
                    }
                }
            }
        }
        for (const n of nodesToRemove){
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix)=>{
    const index4 = str.length - suffix.length;
    return index4 >= 0 && str.slice(index4) === suffix;
};
const isTemplatePartActive = (part)=>part.index !== -1
;
const createMarker = ()=>document.createComment("")
;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
class TemplateInstance {
    constructor(template, processor, options2){
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options2;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts){
            if (part !== void 0) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part1 of this.__parts){
            if (part1 !== void 0) {
                part1.commit();
            }
        }
    }
    _clone() {
        const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
        const stack1 = [];
        const parts2 = this.template.parts;
        const walker1 = document.createTreeWalker(fragment, 133, null, false);
        let partIndex1 = 0;
        let nodeIndex = 0;
        let part;
        let node = walker1.nextNode();
        while(partIndex1 < parts2.length){
            part = parts2[partIndex1];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(void 0);
                partIndex1++;
                continue;
            }
            while(nodeIndex < part.index){
                nodeIndex++;
                if (node.nodeName === "TEMPLATE") {
                    stack1.push(node);
                    walker1.currentNode = node.content;
                }
                if ((node = walker1.nextNode()) === null) {
                    walker1.currentNode = stack1.pop();
                    node = walker1.nextNode();
                }
            }
            if (part.type === "node") {
                const part2 = this.processor.handleTextExpression(this.options);
                part2.insertAfterNode(node.previousSibling);
                this.__parts.push(part2);
            } else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex1++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", {
    createHTML: (s)=>s
});
const commentMarker = ` ${marker} `;
class TemplateResult {
    constructor(strings1, values, type, processor1){
        this.strings = strings1;
        this.values = values;
        this.type = type;
        this.processor = processor1;
    }
    getHTML() {
        const l = this.strings.length - 1;
        let html2 = "";
        let isCommentBinding = false;
        for(let i = 0; i < l; i++){
            const s = this.strings[i];
            const commentOpen = s.lastIndexOf("<!--");
            isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
            } else {
                html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
            }
        }
        html2 += this.strings[l];
        return html2;
    }
    getTemplateElement() {
        const template1 = document.createElement("template");
        let value = this.getHTML();
        if (policy !== void 0) {
            value = policy.createHTML(value);
        }
        template1.innerHTML = value;
        return template1;
    }
}
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template1 = super.getTemplateElement();
        const content = template1.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template1;
    }
}
const isPrimitive = (value)=>{
    return value === null || !(typeof value === "object" || typeof value === "function");
};
const isIterable = (value)=>{
    return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
    constructor(element1, name3, strings2){
        this.dirty = true;
        this.element = element1;
        this.name = name3;
        this.strings = strings2;
        this.parts = [];
        for(let i = 0; i < strings2.length - 1; i++){
            this.parts[i] = this._createPart();
        }
    }
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings3 = this.strings;
        const l = strings3.length - 1;
        const parts2 = this.parts;
        if (l === 1 && strings3[0] === "" && strings3[1] === "") {
            const v = parts2[0].value;
            if (typeof v === "symbol") {
                return String(v);
            }
            if (typeof v === "string" || !isIterable(v)) {
                return v;
            }
        }
        let text1 = "";
        for(let i1 = 0; i1 < l; i1++){
            text1 += strings3[i1];
            const part = parts2[i1];
            if (part !== void 0) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text1 += typeof v === "string" ? v : String(v);
                } else {
                    for (const t of v){
                        text1 += typeof t === "string" ? t : String(t);
                    }
                }
            }
        }
        text1 += strings3[l];
        return text1;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
class AttributePart {
    constructor(committer){
        this.value = void 0;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while(isDirective(this.value)){
            const directive2 = this.value;
            this.value = noChange;
            directive2(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
class NodePart {
    constructor(options1){
        this.value = void 0;
        this.__pendingValue = void 0;
        this.options = options1;
    }
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while(isDirective(this.__pendingValue)){
            const directive2 = this.__pendingValue;
            this.__pendingValue = noChange;
            directive2(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        } else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        } else if (value instanceof Node) {
            this.__commitNode(value);
        } else if (isIterable(value)) {
            this.__commitIterable(value);
        } else if (value === nothing) {
            this.value = nothing;
            this.clear();
        } else {
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? "" : value;
        const valueAsString = typeof value === "string" ? value : String(value);
        if (node === this.endNode.previousSibling && node.nodeType === 3) {
            node.data = valueAsString;
        } else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template1 = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance && this.value.template === template1) {
            this.value.update(value.values);
        } else {
            const instance = new TemplateInstance(template1, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        const itemParts = this.value;
        let partIndex1 = 0;
        let itemPart;
        for (const item of value){
            itemPart = itemParts[partIndex1];
            if (itemPart === void 0) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex1 === 0) {
                    itemPart.appendIntoPart(this);
                } else {
                    itemPart.insertAfterPart(itemParts[partIndex1 - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex1++;
        }
        if (partIndex1 < itemParts.length) {
            itemParts.length = partIndex1;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
class BooleanAttributePart {
    constructor(element2, name1, strings3){
        this.value = void 0;
        this.__pendingValue = void 0;
        if (strings3.length !== 2 || strings3[0] !== "" || strings3[1] !== "") {
            throw new Error("Boolean attributes can only contain a single expression");
        }
        this.element = element2;
        this.name = name1;
        this.strings = strings3;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while(isDirective(this.__pendingValue)){
            const directive2 = this.__pendingValue;
            this.__pendingValue = noChange;
            directive2(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, "");
            } else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
class PropertyCommitter extends AttributeCommitter {
    constructor(element3, name2, strings4){
        super(element3, name2, strings4);
        this.single = strings4.length === 2 && strings4[0] === "" && strings4[1] === "";
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(()=>{
    try {
        const options2 = {
            get capture () {
                eventOptionsSupported = true;
                return false;
            }
        };
        window.addEventListener("test", options2, options2);
        window.removeEventListener("test", options2, options2);
    } catch (_e) {
    }
})();
class EventPart {
    constructor(element4, eventName, eventContext){
        this.value = void 0;
        this.__pendingValue = void 0;
        this.element = element4;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e)=>this.handleEvent(e)
        ;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while(isDirective(this.__pendingValue)){
            const directive2 = this.__pendingValue;
            this.__pendingValue = noChange;
            directive2(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === "function") {
            this.value.call(this.eventContext || this.element, event);
        } else {
            this.value.handleEvent(event);
        }
    }
}
const getOptions = (o)=>o && (eventOptionsSupported ? {
        capture: o.capture,
        passive: o.passive,
        once: o.once
    } : o.capture)
;
class DefaultTemplateProcessor {
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === ".") {
            const committer2 = new PropertyCommitter(element, name.slice(1), strings);
            return committer2.parts;
        }
        if (prefix === "@") {
            return [
                new EventPart(element, name.slice(1), options.eventContext)
            ];
        }
        if (prefix === "?") {
            return [
                new BooleanAttributePart(element, name.slice(1), strings)
            ];
        }
        const committer1 = new AttributeCommitter(element, name, strings);
        return committer1.parts;
    }
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
function templateFactory(result1) {
    let templateCache = templateCaches.get(result1.type);
    if (templateCache === void 0) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result1.type, templateCache);
    }
    let template1 = templateCache.stringsArray.get(result1.strings);
    if (template1 !== void 0) {
        return template1;
    }
    const key = result1.strings.join(marker);
    template1 = templateCache.keyString.get(key);
    if (template1 === void 0) {
        template1 = new Template(result1, result1.getTemplateElement());
        templateCache.keyString.set(key, template1);
    }
    templateCache.stringsArray.set(result1.strings, template1);
    return template1;
}
const templateCaches = new Map();
const parts = new WeakMap();
const render = (result1, container, options3)=>{
    let part = parts.get(container);
    if (part === void 0) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({
            templateFactory
        }, options3)));
        part.appendInto(container);
    }
    part.setValue(result1);
    part.commit();
};
if (typeof window !== "undefined") {
    (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.3.0");
}
const html = (strings6, ...values1)=>new TemplateResult(strings6, values1, "html", defaultTemplateProcessor)
;
const svg = (strings6, ...values1)=>new SVGTemplateResult(strings6, values1, "svg", defaultTemplateProcessor)
;
const last = (arr)=>arr[arr.length - 1]
;
function drawTurtle1(turtle, { showTurtles =true , showPoints =false , filterConstruction =false  } = {
}) {
    const paths = turtle.pathMap((x, i1)=>drawPath(x, showPoints, filterConstruction)
    );
    return showTurtles ? [
        ...paths,
        drawTurtleHead(turtle)
    ] : paths;
}
function drawTurtleHead(turtle) {
    const points1 = turtle.points;
    const lastPoint = last(points1);
    const angle = turtle.angle;
    const drawingViews = document.getElementById("inner-svg-view");
    const w = Number(drawingViews.getAttribute("width").replace("px", ""));
    const viewBox = drawingViews.getAttribute("viewBox").split(" ");
    const vw = Number(viewBox[2]);
    const headScale = vw / w;
    const turtleSize = 12;
    return svg`\n    <g transform="scale(1, -1)">\n      <polyline\n          class="scale-with-viewer"\n          fill = "orange"\n          vector-effect="non-scaling-stroke"\n          points="\n            ${lastPoint.x - 12 / 2}, ${lastPoint.y - 12} \n            ${lastPoint.x}, ${lastPoint.y} \n            ${lastPoint.x + 12 / 2}, ${lastPoint.y - 12}\n          "\n          transform="\n            rotate(${angle - 90}) \n            scale(${headScale})\n          "\n          transform-origin="${lastPoint.x} ${lastPoint.y}"/>\n    </g>\n  `;
}
const drawPath = (path1, showPoints, filterConstruction)=>{
    if (path1.construction && filterConstruction) return "";
    let points1 = path1.points.reduce((acc, point2)=>acc + ` ${point2.x},${point2.y}`
    , " ");
    let polyline1 = svg`\n    <g transform="scale(1, -1)">\n      <polyline \n        points="${points1}" \n        fill=${path1.fillColor} \n        stroke=${path1.strokeColor}\n        stroke-width="${path1.strokeWidth}px"\n        stroke-dasharray="${path1.dashed ? path1.dashed : "none"}"\n        stroke-linejoin=${path1.linejoin}\n        stroke-linecap=${path1.linecap}\n        vector-effect="non-scaling-stroke"/>\n      ${showPoints ? path1.points.map((p)=>svg`\n            <circle \n              cx="${p.x}" \n              cy="${p.y}" \n              r="0.05" \n              stroke="black" \n              stroke-width="0" \n              fill="red"/>\n          `
    ) : ""}\n    </g>\n  `;
    return polyline1;
};
export { Turtle1 as Turtle, group1 as group, drawTurtle1 as drawTurtle };

