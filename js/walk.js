export function walk( ast, fn ) {
  var stack = [ ast ], i, j, key, len, node, child, subchild
  for ( i = 0; i < stack.length; i += 1 ) {
    node = stack[ i ]
    if (typeof node == 'number')
      continue
    fn( node )
    for ( key in node ) {
      if ( key !== 'parent' ) {
        child = node[ key ]
        if ( child instanceof Array ) {
          for ( j = 0, len = child.length; j < len; j += 1 ) {
            subchild = child[ j ]
            if( subchild instanceof Object ) {
              subchild.parent = node
            }
            stack.push( subchild )
          }
        } else if ( child != void 0 && typeof child.type === 'string' ) {
          child.parent = node
          stack.push( child )
        }
      }
    }
  }
}
