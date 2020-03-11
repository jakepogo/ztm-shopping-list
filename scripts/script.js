/*jslint maxerr: 50, browser: true, devel: true, for: true */
/*global window */
var button,
    input,
    ul;

function inputLength() {
    'use strict';
    return input.value.length;
}

function removeItem(event) {
    'use strict';
    var lis = document.querySelectorAll('li'),
        myItem = event.target.id.toString();

    myItem = myItem.replace('button', '');
    lis[myItem].classList.toggle('done');
}

function createListButtons() {
    'use strict';
    var lis = document.querySelectorAll('li'),
        i = 0,
        b = {};

    for (i = 0; i < lis.length; i += 1) {
        lis[i].id = 'item' + i;
        if (document.querySelector('#button' + i) == null) {
            b = document.createElement('button');
            b.id = 'button' + i;
            b.appendChild(document.createTextNode('Delete'));
            lis[i].appendChild(b);
            b.addEventListener("click", removeItem);
            b = {};
        }
    }
}

function createListElement() {
    'use strict';
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";

    // this function that was called on page load is also called after adding new elements to
    // add the new delete buttons and events for list items that were just added
    createListButtons();
}

function addListAfterClick() {
    'use strict';
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeypress(event) {
    'use strict';
    if (inputLength() > 0 && event.keyCode === 13) {
        createListElement();
    }
}

window.onload = function () {
    'use strict';

    // I set the global variables here inside onload on purpose, if we try to get an element before it
    // exists this will cause an error, not a big deal on teeny little things like this but it will
    // eventually bite you if you bind events or try to "get" elements before they exist
    button = document.getElementById("enter");
    input = document.getElementById("userinput");
    ul = document.querySelector("ul");

    // Now bind the events
    button.addEventListener("click", addListAfterClick);
    input.addEventListener("keypress", addListAfterKeypress);

    // Finally initialize the "delete" buttons This function will create delete buttons for each list item
    // and auto id both the buttons and the related list items so we can use the numeric part to identify
    // which item click has triggered and add classes appropriately
    createListButtons();
};