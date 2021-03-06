/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

const canvasSize = 650;
const maxIterations = 50;

function setup() {
  angleMode(DEGREES);
  createCanvas(canvasSize, canvasSize, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(1);
  drawMandelbrot();
}

//Draws the Mandelbrot Set
function drawMandelbrot() {

  //Create an Image
  let finalImage = createImage(canvasSize, canvasSize);

  for (let i = 0; i <= canvasSize; i++) {
    for (let j = 0; j <= canvasSize; j++) {

      //Map the entire canvas between -2 and 2
      //[The limits of the Mandelbrot-Set]
      let realNumberPart = map(j, 0, canvasSize, -2, 2);
      let imagNumberPart = map(i, 0, canvasSize, -2, 2);

      /*
      While iterating over each pixel, we'll overwrite
      "realNumberPart" and "imagNumberPart" - [The "z" in f(z) = z² + c ] every iteration.
      But we have to add the original "c" (the c-value as it was before iterating)
      at the end of the formula f(z) = z² + c
      We therefor save it into the constants "realNumberPartOrig" and "imagNumberPartOrig"
      NOTE: c changes too, but only every pixel, not every iteration (of the while-loop)
      If c doesn't change (stays constant over ALL pixels), you'll get Julia Sets! :)
      */
      const realNumberPartOrig = realNumberPart;
      const imagNumberPartOrig = imagNumberPart;

      //Iterate maxIteration-Times over f(z) = z² + c
      let iteration = 0;
      while (iteration < maxIterations) {

        //Calculate new values (real and imaginary part) of c
        let realNumberPartNew = ((realNumberPart * realNumberPart) - (imagNumberPart * imagNumberPart)) + realNumberPartOrig;
        let imagNumberPartNew = (2 * realNumberPart * imagNumberPart) + imagNumberPartOrig;

        //Assigning the new values to "z" for the next iteration.
        //"c" is still unchanged: [the constants "realNumberPartOrig" and "imagNumberPartOrig"]
        realNumberPart = realNumberPartNew;
        imagNumberPart = imagNumberPartNew;

        iteration++

        if (abs(realNumberPart + imagNumberPart) >= 2.5) {
          finalImage.set(j, i, color(0, map(iteration, 0, maxIterations, 25, 255), 0))
          break;
        }
        if (iteration === maxIterations) finalImage.set(j, i, color(0, 30, 80));
      }
    }
    //Update the image with the calculated pixels
    finalImage.updatePixels();
    //Display the image
    image(finalImage, 0, 0);
  }
}


function draw() {
}