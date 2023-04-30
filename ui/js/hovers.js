"use strict";
let held = false;
const likeButton = document.querySelector("#likeButton");
const dislikeButton = document.querySelector("#dislikeButton");

// mouse
likeButton.addEventListener("mousedown", () => {
  held = true;
  document.querySelector(".card1").classList.add("moveCardRight");
});
likeButton.addEventListener("mouseleave", () => {
  if (held) {
    held = false;
    document.querySelector(".card1").classList.remove("moveCardRight");
  }
});

dislikeButton.addEventListener("mousedown", () => {
  held = true;
  document.querySelector(".card1").classList.add("moveCardLeft");
});
dislikeButton.addEventListener("mouseleave", () => {
  held = false;
  document.querySelector(".card1").classList.remove("moveCardLeft");
});

//touch
likeButton.addEventListener("touchstart", () => {
  held = true;
  document.querySelector(".card1").classList.add("moveCardRight");
});
likeButton.addEventListener("touchmove", () => {
  if (held) {
    held = false;
    document.querySelector(".card1").classList.remove("moveCardRight");
  }
});
likeButton.addEventListener("touchend", () => {
  if (held) {
    held = false;
    document.querySelector(".card1").classList.remove("moveCardRight");
  }
});

dislikeButton.addEventListener("touchstart", () => {
  held = true;
  document.querySelector(".card1").classList.add("moveCardLeft");
});
dislikeButton.addEventListener("touchmove", () => {
  if (held) {
    held = false;
    document.querySelector(".card1").classList.remove("moveCardLeft");
  }
});
dislikeButton.addEventListener("touchend", () => {
  if (held) {
    held = false;
    document.querySelector(".card1").classList.remove("moveCardLeft");
  }
});

// const hover = document.querySelector(".hovers");
// const leftHover = document.querySelector(".left-hover");
// const rightHover = document.querySelector(".right-hover");
// leftHover.addEventListener("mouseover", () => {
//   leftHover.classList.add("left-hovering");
// });
// leftHover.addEventListener("mouseleave", () => {
//   leftHover.classList.remove("left-hovering");
// });
// rightHover.addEventListener("mouseover", () => {
//   rightHover.classList.add("right-hovering");
// });
// rightHover.addEventListener("mouseleave", () => {
//   rightHover.classList.remove("right-hovering");
// });
