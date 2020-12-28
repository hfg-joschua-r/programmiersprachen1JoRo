// JQuery Helper - runs when everything is fully loaded
$(document).ready(() => {
  // Let's make a snowflake out ouf one Y character
  // Change the character for different snowflakes (symmetric ones work best)

  $(document).on("mousemove", (event) => {
    console.log(event.pageX);
    $("#drawing_canvas").empty();
    makeASnowFlake("X", event.pageX).appendTo("#drawing_canvas");
  });
});

function makeASnowFlake(char, mousePos, single = true) {
  // Make a snowflake div container for one flake
  const flake = $("<div class='snowflake'></div>");

  // If we are only going to make one flake, make it big (by adding a class)!
  if (single) flake.addClass("single");

  let arm = $("<div class='arm'></div>");
  // TODO: Append our character multiple times to the arm, scaled and with position offset
  // Parameters:
  // * What scale? => via CSS transform / scale
  // * What position offset?  => via CSS margin-bottom
  const numberOfChars = 8;
  const scaleFactor = mousePos * 0.004;
  const offsetFactor = -25;

  // TODO: Make a div container for one "arm" of our snowflake, including an "arm" class
  for (let i = 0; i < numberOfChars; i++) {
    $("<div>" + char + "</div>")
      .css("transform", "scale(" + scaleFactor / (i + 1) + ")")
      .css("margin-bottom", offsetFactor * i + "px")
      .appendTo(arm);
  }
  // let arm = $("<div class='arm'>"+char.repeat(numberOfChars)+"</div>")
  const numberOfArms = 8;

  let anglePerArm = 360 / numberOfArms;
  // * How many characters? (= how often to loop)
  for (let i = 0; i < numberOfArms; i++) {
    arm
      .clone()
      .appendTo(flake)
      .css("transform", "rotate(" + anglePerArm * i + "deg)");
  }
  // TODO: After we have one arm, put many of them in the flake container, each rotated by some degrees
  // (Actual snow flakes have 6 arms ;))

  //We might need that snowflake later, so return it
  return flake;
}
