"use strict";

const container = document.getElementById('container'),
  circle_wrap = document.getElementById('circles-wrap'),
  square_wrap = document.getElementById('square-wrap'),
  colors = ['red', 'green', 'blue', 'orange', 'yellow'];

// Let's create our figures
function createElements(id) {
  let counter;
  for (counter = 0; counter <= 4; ++counter) {
    let el = document.createElement('div'),
      p = document.createElement('p');

    if (id == 'circles-wrap') {
      el.className = 'item';
      p.textContent = colors[counter];
      el.style.backgroundColor = colors[counter];
      el.append(p);
      el.addEventListener('click', moveElementCircle, true);
    } else {
      el.className = 'item empty';
      el.addEventListener('click', moveElementSquare, true);
    }
    document.getElementById(id).append(el);
  }
}
// Init for circle items
createElements('circles-wrap');

// switch elements
function switcher(element, color, p, el) {
  const new_el = element;
  new_el.style.backgroundColor = color;
  new_el.append(p);
  square_wrap.insertBefore(new_el, el);
  const last = Array.from(
    square_wrap.getElementsByClassName('empty')
  ).pop();
  last.remove();
  new_el.addEventListener('click', moveElementSquare, true);
}

// move circle to another row and copy the properties
function moveElementCircle(event) {
  const div = event.target,
    index = [...div.parentElement.children].indexOf(div),
    color = div.innerText;
  if (div.classList.contains('empty')) {
    return;
  }
  if (!square_wrap.children.length) {
    // Init for square items
    createElements('square-wrap');
  }
  let el = square_wrap.children[index],
    p = document.createElement('p');
  el.classList.remove('empty');
  p.textContent = color;
  // check if the element is not empty, then run a loop to find an empty element
  if (el.childNodes.length !== 0) {
    let prev = el.previousElementSibling;
    if (prev) {
      while (prev) {
        if (prev.classList.contains('empty')) {
          let empty_item = document.createElement('div');
          empty_item.classList.add('item', 'empty');
          prev.classList.remove('empty');
          switcher(prev, color, p, el);
          square_wrap.insertBefore(empty_item, prev);
          empty_item.addEventListener('click', moveElementSquare, true);
          break;
        } else {
          let new_el = document.createElement('div');
          switcher(new_el, color, p, el);
          new_el.classList.add('item');
          break;
        }
        prev = prev.previousElementSibling;
      }

    } else {
      let new_el = document.createElement('div');
      switcher(new_el, color, p, square_wrap.firstChild);
      new_el.classList.add('item');
    }
  } else {
    el.style.backgroundColor = color;
    el.append(p);
  }
  // clear clicked element
  div.removeAttribute('style');
  div.innerHTML = '';
  div.classList.add('empty');
}

// move square to another row and copy the properties
function moveElementSquare(event) {
  const div = event.target,
    color = div.innerText,
    children = [].slice.call(circle_wrap.children);
  let el = document.createElement('div'),
    p = document.createElement('p'),
    item = circle_wrap.getElementsByClassName('empty')[0];

  if (div.classList.contains('empty')) {
    return;
  }
  div.removeAttribute('style');
  div.classList.add('empty');
  div.innerHTML = '';
  item.classList.remove('empty');
  p.textContent = color;
  item.append(p);
  item.style.backgroundColor = color;
  circle_wrap.insertBefore(item, circle_wrap.firstChild);

}
