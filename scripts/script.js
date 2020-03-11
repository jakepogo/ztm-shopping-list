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

    myItem = myItem.replace('button', '')
    lis[myItem].classList.toggle('done');
}

function createListButtons() {
    'use strict';
    var lis = document.querySelectorAll('li'),
        i = 0,
        b = {};
    
    for (i = 0; i < lis.length; i++) {
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
    button = document.getElementById("enter"),
    input = document.getElementById("userinput"),
    ul = document.querySelector("ul");

    button.addEventListener("click", addListAfterClick);
    input.addEventListener("keypress", addListAfterKeypress);

    createListButtons(); 
};