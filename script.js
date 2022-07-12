"use strict";

const container = document.getElementById('container'),
      circle_wrap = document.getElementById('circles-wrap'),
      square_wrap = document.getElementById('square-wrap'),
      colors = ['red', 'green', 'blue', 'orange', 'yellow'];

// Let's create our figures
function createElements(id){
  let counter;
  for (counter = 0; counter <= 4; ++counter) {
    let el = document.createElement('div'), p = document.createElement('p');
    el.className = 'item';
    if(id == 'circles-wrap') {
      p.textContent = colors[counter];
      el.style.backgroundColor = colors[counter];
      el.append(p);
      el.addEventListener('click', moveElementCircle, true);
    } else {
      el.addEventListener('click', moveElementSquare, true);
    }
    document.getElementById(id).append(el);
  }
}
// Init for circle items
createElements('circles-wrap');

// move circle to another row and copy the properties
function moveElementCircle(event){
  const div = event.target,
        index = [...div.parentElement.children].indexOf(div),
        color = div.innerText;
  if(!square_wrap.children.length){
    // Init for square items
    createElements('square-wrap');
  }
  let el = square_wrap.children[index];
  let p = document.createElement('p');
  el.style.backgroundColor = color;
  p.textContent = color;
  el.append(p);
  div.removeAttribute('style');
  div.innerHTML = '';
}

// move square to another row and copy the properties
function moveElementSquare(event) {
  const div = event.target,
        color = div.innerText,
        children = [].slice.call(circle_wrap.children);
  let el = document.createElement('div'), p = document.createElement('p');
  div.removeAttribute('style');
  div.innerHTML = '';
  children.forEach((item, i) => {
    // select child node if empty & move to the first position
    if (item.childNodes.length === 0) {
      let p = document.createElement('p');
      p.textContent = color;
      item.append(p);
      item.style.backgroundColor = color;
      circle_wrap.insertBefore(item, circle_wrap.firstChild);
    }
  });

}
