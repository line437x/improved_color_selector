"use strict";

let userValue;
let input = document.querySelector("#color_value");

window.addEventListener("load", setup);
input.addEventListener("input", getColor);

function setup() {
  getColor();
}
// --------------- Getting a selected color from the user ---------------
function getColor() {
  userValue = document.querySelector("#color_value").value;
  let rgbValue = hexToRGB(userValue);
  let hslValue = rgbToHsl(rgbValue);
  let hexValue = rgbToHex(rgbValue);
  let cssValue = rgbToCss(rgbValue);

  showColorValues(rgbValue, hslValue, hexValue, cssValue);
}

// --------------- Showing a selected color ---------------
function showColorValues(rgbV, hslV, hexV, cssV) {
  displayHexValue(hexV);
  displayRgbValue(rgbV);
  displayHslValue(hslV);
  displayCssValue(cssV);
  displayColorBox();
}

// --------------- Converting RGB to CSS usable string, like rgb(100, 123, 192) ---------------
function rgbToCss(rgb) {
  let css = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  console.log(css);
  return css;
}
// --------------- Converting RGB to hex ---------------
function rgbToHex(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  let hex = ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);

  return hex;
}

// --------------- Converting hex to RGB ---------------
function hexToRGB(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  let rgb = { r, g, b };
  return rgb;
}

// --------------- Converting RGB to HSL ---------------
function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  let hsl = { h: Math.floor(h), s: Math.floor(s), l: Math.floor(l) };
  return hsl;
}

// --------------- Showing the color as a colored box in CSS ---------------
function displayColorBox() {
  document.querySelector(".color_box").style.backgroundColor = userValue;
}
// --------------- Showing the color as hex ---------------
function displayHexValue() {
  document.querySelector(".hex_code").textContent = userValue;
}
// --------------- Showing the color as RGB ---------------
function displayRgbValue(rgb) {
  document.querySelector(".rgb_code").textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}
// --------------- Showing the color as HSL ---------------
function displayHslValue(hsl) {
  document.querySelector(".hsl_code").textContent = `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
}
// --------------- Showing the color as CSS ---------------
function displayCssValue(css) {
  document.querySelector(".css_code").textContent = css;
}
