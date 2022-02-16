"use strict";

let userValue = document.querySelector("#color_value").value;
let input = document.querySelector("#color_value");
let rgb;

window.addEventListener("load", start);
input.addEventListener("input", showColor);

function start() {
  showColor();
}

function showColor() {
  userValue = document.querySelector("#color_value").value;
  displayColor();
  hexToRGB(userValue);
  renderHexValue();
}

//convert input value to RGB
function hexToRGB(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  rgb = `${r}, ${g}, ${b}`;
  displayRgbValue();
  rgbToHsl(r, g, b);
}

//convert input value to HSL
function rgbToHsl(r, g, b) {
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
  displayHslValue(hsl);
}

//display color
function displayColor() {
  document.querySelector(".color_box").style.backgroundColor = userValue;
}

//udskrive input værdien i hex felt
function renderHexValue() {
  document.querySelector(".hex_code").textContent = userValue;
}

// display rgb value funktion
function displayRgbValue() {
  document.querySelector(".rgb_code").textContent = rgb;
}

// display hsl value funktion
function displayHslValue(hsl) {
  document.querySelector(".hsl_code").textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}
