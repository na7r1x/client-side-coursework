"use strict";
QUnit.module("Basics");

QUnit.test("Change the id method in index.js to return your student ID.",
    function(assert) {
        assert.notEqual(
            id(),
            "UP000000",
            "The ID function should return your student ID."
        );
    }
);

QUnit.module("Coursework");

QUnit.test(

  "The game has a leaderboard which is initialized with various names.  During a game it will be necessary to update this leaderboard regularly.  Create a function called `updateLeaderBoard` which accepts two parameters, the first is an array of player names, the first ten of which should be inserted into the leaderboard as list items. The second parameter `me` is an optional string that represents the current player's name.  If any string in the array exactly matches the second parameter, then set its list item class to be `me`",

  function (assert) {
    assert.ok(
      typeof updateLeaderBoard === "function",
      "Create a `updateLeaderBoard` function."
    );

    updateLeaderBoard([]);
    assert.equal(
      window.top10.children.length,
      0,
      "updateLeaderBoard handles an empty list well."
    );

    updateLeaderBoard(["Neo"]);
    assert.equal(
      window.top10.children.length,
      1,
      "updateLeaderBoard handles a single entry well."
    );

    updateLeaderBoard(["aaaaaaaaaa", "bbbbbbbbbb", "ccccccccccc"]);
    assert.equal(
      window.top10.children.length,
      3,
      "updateLeaderBoard handles a three entry well."
    );

    updateLeaderBoard([
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven"
    ]);
    assert.equal(
      window.top10.children.length,
      10,
      "updateLeaderBoard must only update ten entries, not eleven."
    );


    updateLeaderBoard(["Neo"], "Neo");
    assert.equal(
      window.top10.firstChild.className,
      "me",
      "Player name highlighting works for one player."
    );

    updateLeaderBoard([
      "R2-D2",
      "C3-P0",
      "BB-8",
      "Gonk",
    ], "BB-8");
    assert.equal(
      window.top10.children[0].className,
      "",
      "R2-D2 should have no classes in this test."
    );
    assert.equal(
      window.top10.children[1].className,
      "",
      "C3-P0 should have no classes in this test."
    );
    assert.equal(
      window.top10.children[2].className,
      "me",
      "BB-8 should have the class `me` in this test."
    );

    // Remember to clean up and format your code,

    window.leaderboardTest.classList.add("done");
  }
);



QUnit.test(

  "When the game is in play, the player's nickname will appear at the top of the screen.  Create a function `nickChanged` which updates the content of the `playername` field to match the content of the 'nick' input field.  Attach an appropriate event listener to the `nick` field such that `playername` is updated for all input.  When attaching the event listener, place that code with the other similar lines in the `init` function.",

  function (assert) {
    assert.ok(
      typeof nickChanged === "function",
      "Create a `nickChanged` function."
    );

    assert.equal(
        window.playername.textContent,
        "Player 1",
        "Before the first change, it says Player 1."
    );

    window.nick.value = "Obi-Wan";
    window.nick.dispatchEvent( new Event("input") );
    assert.equal(
        window.playername.textContent,
        "Obi-Wan",
        "After the first change, Obi-Wan is playing (don't forget to attach the eventListener)."
    );

    window.nick.value = "Qui-Gon";
    window.nick.dispatchEvent( new Event("input") );
    assert.equal(
        window.playername.textContent,
        "Qui-Gon",
        "After the first change, Qui-Gon is playing."
    );

    window.nick.value = "‽🇬🇧❤️🇪🇺‽";
    window.nick.dispatchEvent( new Event("input") );
    assert.equal(
        window.playername.textContent,
        "‽🇬🇧❤️🇪🇺‽",
        "UTF-8 Emoji work too."
    );


    window.namechangetest.classList.add("done");
  }
);




QUnit.test(

  "Create a function updateStep which updates the value of the `step` global variable so that it is in sync with the `scalerange` element.  Beware that step must be a number or you may see some strange and difficult-to-debug behaviour.",

  function (assert) {

    assert.ok(
      typeof updateStep === "function",
      "Create a `updateStep` function."
    );

    window.scalerange.value = 20;
    updateStep();
    assert.equal( step, 20, "Value is 20." );

    window.scalerange.value = 80;
    updateStep();
    assert.equal( step, 80, "Value is 80." );

    window.scalerange.value = "55";
    updateStep();
    assert.equal( step, 55, "Value is 55 - if it's a string, convert it to a number." );

    window.scalerange.value = "88";
    updateStep();
    assert.equal( step, 88, "Value is 88 - if it's a string, convert it to a number." );

    window.scalerange.value = 64;
    updateStep();
    assert.equal( step, 64, "Value is 64." );

    window.stepupdatertest.classList.add("done");
  }
);




QUnit.test(

  "Create a function `leaders` that takes one parameter which is the maximum number of results to return.  Leaders should return an array of the names currently on the leaderboard.",

  function (assert) {
    assert.ok(
      typeof updateLeaderBoard === "function",
      "This task requires that you have already correctly created an `updateLeaderBoard` function."
    );

    updateLeaderBoard(["one", "two", "three"]);
    assert.equal(
      window.top10.children.length,
      3,
      "updateLeaderBoard has three entries."
    );

    assert.ok(
      typeof leaders === "function",
      "Create a `leaders` function."
    );

    var single = leaders(1);
    assert.equal(
      single[0],
      "one",
      "one correctly returned as it is at the top of the leaderboard."
    );

    var double = leaders(2);
    assert.equal(
      double[1],
      "two",
      "two correctly returned as it is second on the leaderboard."
    );


    var all = leaders(4);
    assert.equal(
      all.length,
      3,
      "Asked for 4 and 3 available."
    );

    updateLeaderBoard([]);
    var none = leaders(7);
    assert.equal(
      none.length,
      0,
      "Asked for 7 and zero available."
    );

    updateLeaderBoard(["Me"]);
    var noneAgain = leaders(0);
    assert.equal(
      noneAgain.length,
      0,
      "Asked for 0 and one available."
    );

    updateLeaderBoard(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "a", "b", "c"]);
    assert.equal(
      window.top10.children.length,
      10,
      "updateLeaderBoard has three entries."
    );

    var onlyTen = leaders(12);
    assert.deepEqual(
      onlyTen,
      ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "a"],
      "Asked for 12 but the DOM doesn't contain so many so should only get 10."
    );

    window.leaderstest.classList.add("done");
  }
);




QUnit.test(

  "The `pointer` object has a `degrees` property that is currently not maintained.  It is intended as a conveience variable that will be used for debugging the `pointer.angle` property.  Find where `pointer.angle` is set and next to it, write the necessary code to update `pointer.degrees` so that it gives an integer value (i.e. no decimal places) between 0 and 360.  The formula is `angle * 180 / Math.PI`",

  function (assert) {

    mouseMoved({pageX: canvas.offsetLeft, pageY: canvas.offsetTop});
    assert.notEqual(
        window.degrees.textContent,
        "todo",
        "the degrees should not be 'todo'"
    );

    var num = window.degrees.textContent;

    assert.ok(
        !isNaN(num) && Number.isInteger(+num),
        "the degrees should be an integer number"
    );

    mouseMoved({pageX: canvas.offsetLeft+600, pageY: canvas.offsetTop});
    var newNum = window.degrees.textContent;

    assert.ok(
        newNum != num,
        "after moving the cursor, the degrees should change"
    );

    assert.ok(
        true,
        "Manually check your result in the debug panel (accessible by pressing D)."
    );
  }
);




QUnit.test(

  "The crosshair cursor works fine when using a mouse, however, when playing the game on a tablet we may want to manually show the cursor position.  At present a line is drawn from the center of the screen to the pointer position.  Replace this so that there is a circle whose centre is at the pointer's xy position, and whose radius is the same as step.  Each time the mouse is clicked the circle should change colour, cycling through the `colours` array.",

  function (assert) {

    assert.ok(
        true,
        "Manually check your result."
    );

  }
);
