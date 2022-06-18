// Implementation of the Greiner-Hormann polygon clipping algorithm
//

var segseg = require('segseg');
var preprocessPolygon = require("point-in-big-polygon");
var area = require('2d-polygon-area');
var sign = require('signum');
var abs = Math.abs;

function copy(a) {
  var l = a.length;
  var out = new Array(l);
  for (var i = 0; i<l; i++) {
    out[i] = a[i].slice();
  }
  return out;
}

function Node(vec, alpha, intersection) {
  this.vec = vec;
  this.alpha = alpha || 0;
  this.intersect = !!intersection;
}

Node.prototype = {
  vec: null,
  next: null,
  next: null,
  prev: null,
  nextPoly: null,
  neighbor: null,
  intersect: null,
  entry: null,
  visited : false,
  alpha : 0,

  nextNonIntersection : function nodeNextNonIntersection() {
    var a = this;
    while(a && a.intersect) {
      a = a.next;
    }
    return a;
  },

  last : function nodeLast() {
    var a = this;
    while (a.next && a.next !== this) {
      a = a.next;
    }
    return a;
  },

  createLoop : function nodeCreateLoop() {
    var last = this.last();
    last.prev.next = this;
    this.prev = last.prev;
  },

  firstNodeOfInterest : function nodeFirstNodeOfInterest() {
    var a = this;

    if (a) {
      do {
        a=a.next;
      } while(a!==this && (!a.intersect || a.intersect && a.visited));
    }

    return a;
  },

  insertBetween : function nodeInsertBetween(first, last) {
    var a = first;
    while(a !== last && a.alpha < this.alpha) {
      a = a.next;
    }

    this.next = a;
    this.prev = a.prev;
    if (this.prev) {
      this.prev.next = this;
    }

    this.next.prev = this;
  }
};


function createLinkedList(vecs) {
  var l = vecs.length;
  var ret, where;
  for (var i=0; i<l; i++) {
    var current = vecs[i];
    if (!ret) {
      where = ret = new Node(current);
    } else {
      where.next = new Node(current);
      where.next.prev = where;
      where = where.next;
    }
  }

  return ret;
}

function distance(v1, v2) {
  var x = v1[0] - v2[0];
  var y = v1[1] - v2[1];
  return Math.sqrt(x*x + y*y);
}

function clean(array) {
  var seen = {};
  var cur = array.length - 1;
  while (cur--) {
    var c = array[cur];
    var p = array[cur+1];
    if (c[0] === p[0] && c[1] === p[1]) {
      array.splice(cur, 1);
    }
  }
  return array;
}


function identifyIntersections(subjectList, clipList) {
  var subject, clip;
  var auxs = subjectList.last();
  auxs.next = new Node(subjectList.vec, auxs);
  auxs.next.prev = auxs;

  var auxc = clipList.last();
  auxc.next = new Node(clipList.vec, auxc);
  auxc.next.prev = auxc;

  var found = false;
  for(subject = subjectList; subject.next; subject = subject.next) {
    if(!subject.intersect) {
      for(clip = clipList; clip.next; clip = clip.next) {
        if(!clip.intersect) {

          var a = subject.vec,
              b = subject.next.nextNonIntersection().vec,
              c = clip.vec,
              d = clip.next.nextNonIntersection().vec;

          var i = segseg(a, b, c, d);

          if(i && i !== true) {
            found = true;
            var intersectionSubject = new Node(i, distance(a, i) / distance(a, b), true);
            var intersectionClip = new Node(i, distance(c, i) / distance(c, d), true);
            intersectionSubject.neighbor = intersectionClip;
            intersectionClip.neighbor = intersectionSubject;
            intersectionSubject.insertBetween(subject, subject.next.nextNonIntersection());
            intersectionClip.insertBetween(clip, clip.next.nextNonIntersection());
          }
        }
      }
    }
  }

  return found;
};

function identifyIntersectionType(subjectList, clipList, clipTest, subjectTest, type) {
  var subject, clip;
  var se = clipTest(subjectList.vec) < 0;
  if (type === 'and') {
    se = !se;
  }

  for(subject = subjectList; subject.next; subject = subject.next) {
    if(subject.intersect) {
      subject.entry = se;
      se = !se;
    }
  }

  var ce = subjectTest(clipList.vec) > 0;
  if (type === 'or') {
    ce = !ce;
  }

  for(clip = clipList; clip.next; clip = clip.next) {
    if(clip.intersect) {
      clip.entry = ce;
      ce = !ce;
    }
  }
};

function collectClipResults(subjectList, clipList) {
  subjectList.createLoop();
  clipList.createLoop();

  var crt, results = [], result;

  while ((crt = subjectList.firstNodeOfInterest()) !== subjectList) {
    result = [];
    for (; !crt.visited; crt = crt.neighbor) {

      result.push(crt.vec);
      var forward = crt.entry
      while(true) {
        crt.visited = true;
        crt = forward ? crt.next : crt.prev;

        if(crt.intersect) {
          crt.visited = true;
          break;
        } else {
          result.push(crt.vec);
        }
      }
    }

    results.push(clean(result));
  }

  return results;
};

function polygonBoolean(subjectPoly, clipPoly, operation) {

  var subjectList = createLinkedList(subjectPoly);
  var clipList = createLinkedList(clipPoly);
  var clipContains = preprocessPolygon([clipPoly]);
  var subjectContains = preprocessPolygon([subjectPoly]);

  var subject, clip, res;

  // Phase 1: Identify and store intersections between the subject
  //          and clip polygons
  var isects = identifyIntersections(subjectList, clipList);

  if (isects) {
    // Phase 2: walk the resulting linked list and mark each intersection
    //          as entering or exiting
    identifyIntersectionType(
      subjectList,
      clipList,
      clipContains,
      subjectContains,
      operation
    );

    // Phase 3: collect resulting polygons
    res = collectClipResults(subjectList, clipList);
  } else {
    // No intersections

    var inner = clipContains(subjectPoly[0]) < 0;
    var outer = subjectContains(clipPoly[0]) < 0;

    // TODO: slice will not copy the vecs

    res = [];
    switch (operation) {
      case 'or':
        if (!inner && !outer) {
          res.push(copy(subjectPoly));
          res.push(copy(clipPoly));
        } else if (inner) {
          res.push(copy(clipPoly));
        } else if (outer) {
          res.push(copy(subjectPoly));
        }
      break;

      case 'and':
        if (inner) {
          res.push(copy(subjectPoly))
        } else if (outer) {
          res.push(copy(clipPoly));
        } else {
          throw new Error('woops')
        }
      break;

      case 'not':
        var sclone = copy(subjectPoly);
        var cclone = copy(clipPoly);

        var sarea = area(sclone);
        var carea = area(cclone);
        if (sign(sarea) === sign(carea)) {
          if (outer) {
            cclone.reverse();
          } else if (inner) {
            sclone.reverse();
          }
        }

        res.push(sclone);

        if (abs(sarea) > abs(carea)) {
          res.push(cclone);
        } else {
          res.unshift(cclone);
        }

      break
    }
  }

  return res;
};

export { polygonBoolean }