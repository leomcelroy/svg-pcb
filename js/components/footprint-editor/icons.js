import { svg } from "lit-html";

export const leftAlign = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="none"/>
    <path d="M7 4L7 28" stroke="black" stroke-width="2"/>
    <path d="M25 13L11 13" stroke="black" stroke-width="3"/>
    <path d="M21.7059 20L11 20" stroke="black" stroke-width="3"/>
</svg>`

export const centerAlignHorz = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="none"/>
  <path d="M16 4L16 28" stroke="black" stroke-width="2"/>
  <path d="M9 13L23 13" stroke="black" stroke-width="3"/>
  <path d="M11 20L21.7059 20" stroke="black" stroke-width="3"/>
</svg>`

export const rightAlign = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="none"/>
  <path d="M25 4L25 28" stroke="black" stroke-width="2"/>
  <path d="M7 13L21 13" stroke="black" stroke-width="3"/>
  <path d="M10.2941 20L21 20" stroke="black" stroke-width="3"/>
</svg>`

export const distributeHorz = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" transform="translate(32 32) rotate(-180)" fill="none"/>
  <path d="M6 28L6 4" stroke="black" stroke-width="2"/>
  <path d="M26 28L26 4" stroke="black" stroke-width="2"/>
  <path d="M16 9L16 23" stroke="black" stroke-width="3"/>
</svg>`

export const topAlign = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" transform="translate(0 32) rotate(-90)" fill="none"/>
  <path d="M4 7L28 7" stroke="black" stroke-width="2"/>
  <path d="M13 25L13 11" stroke="black" stroke-width="3"/>
  <path d="M20 21.7059L20 11" stroke="black" stroke-width="3"/>
</svg>`

export const centerAlignVert = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" transform="translate(0 32) rotate(-90)" fill="none"/>
  <path d="M4 16L28 16" stroke="black" stroke-width="2"/>
  <path d="M13 23L13 9" stroke="black" stroke-width="3"/>
  <path d="M20 21L20 10.2941" stroke="black" stroke-width="3"/>
</svg>`

export const bottomAlign = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" transform="translate(0 32) rotate(-90)" fill="none"/>
  <path d="M4 25H28" stroke="black" stroke-width="2"/>
  <path d="M13 7L13 21" stroke="black" stroke-width="3"/>
  <path d="M20 10.2941L20 21" stroke="black" stroke-width="3"/>
</svg>`

export const distributeVert = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" transform="translate(32 3.8147e-06) rotate(90)" fill="none"/>
  <path d="M28 26L4 26" stroke="black" stroke-width="2"/>
  <path d="M28 6L4 6.00001" stroke="black" stroke-width="2"/>
  <path d="M9 16L23 16" stroke="black" stroke-width="3"/>
</svg>`

export const flipHorz = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="none"/>
  <path d="M28.5 26.5L28.5 6.5L19.5 16.5L28.5 26.5Z" stroke="black" stroke-width="2"/>
  <path d="M3.5 26.5L3.5 6.5L12.5 16.5L3.5 26.5Z" stroke="black" stroke-width="2"/>
  <path d="M16 4.5L16 28.5" stroke="black" stroke-width="2" stroke-dasharray="2 2"/>
</svg>`

export const flipVert = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" transform="translate(0 32) rotate(-90)" fill="none"/>
  <path d="M26.5 3.5H6.5L16.5 12.5L26.5 3.5Z" stroke="black" stroke-width="2"/>
  <path d="M26.5 28.5H6.5L16.5 19.5L26.5 28.5Z" stroke="black" stroke-width="2"/>
  <path d="M4.5 16H28.5" stroke="black" stroke-width="2" stroke-dasharray="2 2"/>
</svg>`

export const rotate90cw = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/20noneg">
  <rect width="32" height="32" transform="translate(0 32) rotate(-90)" fill="none"/>
  <path d="M16.0204 4.75018C13.8448 4.73476 11.7136 5.3648 9.89611 6.56064C8.07864 7.75648 6.6566 9.46441 5.80981 11.4684C4.96301 13.4725 4.7295 15.6826 5.1388 17.8194C5.5481 19.9561 6.58182 21.9235 8.10925 23.4727C9.63668 25.022 11.5892 26.0835 13.7199 26.5231C15.8507 26.9626 18.0639 26.7605 20.0797 25.9422C22.0956 25.1239 23.8235 23.7262 25.045 21.9259C26.2665 20.1255 26.9267 18.0034 26.9421 15.8279" stroke="black" stroke-width="2"/>
  <path d="M13.5 2L20 4.5L14 8L13.5 2Z" fill="black"/>
</svg>`

export const rotate90ccw = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/20noneg">
  <rect width="32" height="32" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 32 32)" fill="none"/>
  <path d="M15.9796 4.75018C18.1552 4.73476 20.2864 5.3648 22.1039 6.56064C23.9214 7.75648 25.3434 9.46441 26.1902 11.4684C27.037 13.4725 27.2705 15.6826 26.8612 17.8194C26.4519 19.9561 25.4182 21.9235 23.8908 23.4727C22.3633 25.022 20.4108 26.0835 18.2801 26.5231C16.1493 26.9626 13.9361 26.7605 11.9203 25.9422C9.90443 25.1239 8.17651 23.7262 6.95502 21.9259C5.73353 20.1255 5.07333 18.0034 5.0579 15.8279" stroke="black" stroke-width="2"/>
  <path d="M18.5 2L12 4.5L18 8L18.5 2Z" fill="black"/>
</svg>
`

export const transformHandle = (x, y) => svg`
<g data-fixed-scale transform-origin="2 2" transform="translate(${x} ${y}) scale(1 -1)">
  <polyline points="14.519 16.184 11.918 12.285 9.319 16.184" style=""></polyline>
  <polyline points="15.818 17.483 19.718 20.082 15.818 22.682" style=""></polyline>
  <circle cx="11.918" cy="20.082" r="1.299" style=""></circle>
  <path stroke="black" fill="none" d="M 11.918 9.685 C 16.904 11.197 20.804 15.098 22.316 20.082" style=""></path>
  <g transform="matrix(0.259936, 0, 0, 0.259936, -74.250092, -33.529995)" style="">
    <circle cx="391.5" cy="206.25" r="5" style="stroke-linecap: round; stroke-width: 3.8471px; fill: none; stroke: rgb(0, 0, 0);"></circle>
    <path stroke="black" fill="none" d="M371.5,206.25 386.5,206.25" style="stroke-linecap: round; stroke-width: 3.8471px;"></path>
  </g>
  <g transform="matrix(0.259936, 0, 0, 0.259936, -74.250092, -33.529995)" style="">
    <circle cx="331.5" cy="146.25" r="5" style="stroke-width: 3.8471px; stroke-linecap: round; fill: none; stroke: rgb(0, 0, 0);"></circle>
    <path stroke="black" d="M331.5,166.25 331.5,151.25" style="stroke-width: 3.8471px; stroke-linecap: round;"></path>
  </g>
  <g transform="matrix(-0.183803, 0.183803, -0.183803, -0.183803, -377.597992, -180.652512)" style="transform-origin: 384px 206.25px;">
    <circle cx="391.5" cy="206.25" r="5" style="stroke-linecap: round; stroke-width: 3.8471px; stroke: rgb(0, 0, 0); fill: none;"></circle>
    <path stroke="black" fill="none" d="M371.5,206.25 386.5,206.25" style="stroke-linecap: round; stroke-width: 3.8471px;"></path>
  </g>
</g>
`