import { dispatch } from "../dispatch.js";
import { makePhantom } from "../makePhantom.js";

export function addLayerReordering(state, bodyListener) {
  
  let draggedLayerEl = null;
  let dropEl = null;

  bodyListener("mousedown", ".layer-grabber", e => {
    draggedLayerEl = e.target.parentNode;
    makePhantom(e, draggedLayerEl, () => {        
        const fromIndex = draggedLayerEl.data.index;
        const toIndex = dropEl.data.index;

        moveItemBack(state.layers, fromIndex, toIndex);
        draggedLayerEl.data.updateCode();

    });
  });

  bodyListener("mousemove", ".layer-item, .layer-item *", e => {
    if (draggedLayerEl === null) return;

    dropEl = e.target.closest(".layer-item"); 

  });
}

function moveItemBack(arr, fromIndex, toIndex) {
    if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
        throw new Error('Invalid index');
    }

    const elementToMove = arr.splice(fromIndex, 1)[0];

    // Adjust the toIndex in case the element being moved is before it.
    if (fromIndex < toIndex) {
        toIndex--;
    }

    // Insert the element right behind the target position
    arr.splice(toIndex + 1, 0, elementToMove);
    return arr;
}


function moveItem(arr, fromIndex, toIndex) {
    if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
        throw new Error('Invalid index');
    }

    const elementToMove = arr.splice(fromIndex, 1)[0];

    // Adjust the toIndex in case the element being moved is before it.
    if (fromIndex < toIndex) {
        toIndex--;
    }

    arr.splice(toIndex, 0, elementToMove);
    return arr;
}