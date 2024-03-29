//#region vars
let header;
let nav;
let heroText;
let heroBtn;
let scrollTopBtn;
let mainTitle;
let introSection;
let cvSection;
let certSection;
let expSection;
let visionSection;
let navLoadingBtn;
let dialog;
let menuItems;
let bottomPage;
let currentScroll = 0;
let scrollOffset = 590;
const offsets = {
  hero: 80,
  intro: 490,
  cv: 1490,
  cert: 2190,
  exp: 3380,
  vision: 4500,
};
//#endregion

//#region event handlers
function onScroll() {
  computeOffsets();
  scrollAnimateElement();
}
//#endregion

//#region functions
function computeOffsets() {
  let computedOffset = window.innerWidth > 425 ? -100 : 150;
  let current = 0;
  let midsection = 0;
  const sections = document.querySelectorAll("section");

  const arrSections = Array.from(sections);
  arrSections.unshift(document.querySelector("#hero"));
  arrSections.splice(1, 2);

  let i = 0;
  for (const key of Object.keys(offsets)) {
    midsection = arrSections[i].clientHeight / 2;
    computedOffset += midsection + current;
    offsets[`${key}`] = computedOffset;
    if (i == 4) offsets[`${key}`] += 100;
    current = midsection;
    i++;
  }
}
function scrollAnimateElement() {
  let scroll = window.scrollY;

  if (scrollTopBtn && scroll >= scrollOffset) scrollTopBtn.style.right = "10px";
  else scrollTopBtn.style.right = "-100px";

  if (scroll <= offsets.hero) {
    appear(heroText);
    growUp(heroBtn);
  } else {
    appearReverse(heroText, "0");
    growUpReverse(heroBtn, "0");
  }

  if (scroll > offsets.intro && scroll <= offsets.cv) slideLeft(cvSection);
  else slideLeftReverse(cvSection, "-100vw");

  if (scroll > offsets.cv && scroll <= offsets.cert) growUp(certSection);
  else growUpReverse(certSection, "0");

  if (scroll > offsets.cert && scroll <= offsets.exp) slideRight(expSection);
  else slideRightReverse(expSection, "-100vw");

  if (scroll > offsets.exp && scroll <= offsets.vision + 1000)
    growUp(visionSection);
  else growUpReverse(visionSection, "0");

  if (scroll > offsets.vision - 300) appear(bottomPage);
  else appearReverse(bottomPage, 0);

  currentScroll = scroll;
}
function toogleMenu() {
  if (window.innerWidth < 1315) {
    let opacityDelay;
    if (nav.style.top == "-360px" || nav.style.top == "") {
      /* nav bar appearing */
      nav.style.position = "relative";
      nav.style.top = "0";
      header.style.height = "360px";
      opacityDelay = 1.6;
      menuItems.forEach((navItem) => {
        navItem.style.transition = `opacity 1s ${opacityDelay}s`;
        navItem.style.opacity = "1";
        opacityDelay -= 0.2;
      });
    } else {
      /* nav bar disappearing*/
      opacityDelay = 0.5;
      menuItems.forEach((navItem) => {
        navItem.style.transition = `opacity 1s ${opacityDelay}s`;
        navItem.style.opacity = "0";
        opacityDelay -= 0.1;
      });
      setTimeout(() => {
        nav.style.position = "absolute";
        nav.style.top = "-360px";
        header.style.height = "75px";
      }, 1300);
    }
  }
}
function wipeMenu() {
  if (window.innerWidth < 1315) {
    menuItems.forEach((navItem) => {
      navItem.style.transition = `none`;
      navItem.style.opacity = "0";
    });
    nav.style.position = "absolute";
    nav.style.top = "-360px";
    header.style.height = "75px";
  }
}
function openDialog() {
  dialog.showModal();
}
function closeDialog() {
  dialog.close();
}
function goTop() {
  window.scroll({ behavior: "smooth", top: 0 });
}

function slideTop(element) {
  element.style.top = "0";
}
function slideLeft(element) {
  element.style.left = "0";
}
function slideRight(element) {
  element.style.right = "0";
}
function growUp(element) {
  element.style.transform = "scale(1)";
}
function appear(element) {
  element.style.opacity = "1";
}

function slideTopReverse(element, reverse) {
  element.style.top = reverse;
}
function slideLeftReverse(element, reverse) {
  element.style.left = reverse;
}
function slideRightReverse(element, reverse) {
  element.style.right = reverse;
}
function growUpReverse(element, reverse) {
  element.style.transform = `scale(${reverse})`;
}
function appearReverse(element, reverse) {
  element.style.opacity = reverse;
}
//#endregion

// entry point
window.onload = () => {
  // init vars
  header = document.querySelector("header");
  nav = document.querySelector("nav");
  headerBtnLoading = document.querySelector(".header_btn_loading");
  heroText = document.querySelector(".hero_text");
  heroBtn = document.querySelector(".hero_btn");
  scrollTopBtn = document.querySelector(".scroll-top-btn");
  mainTitle = document.querySelector(".main-title");
  introSection = document.querySelector("#intro");
  cvSection = document.querySelector("#cv");
  certSection = document.querySelector("#cert");
  expSection = document.querySelector("#exp");
  visionSection = document.querySelector("#vision");
  visionTitle = document.querySelector(".vision_title");
  visionContent = document.querySelector(".vision_content");
  dialog = document.querySelector("dialog");
  bottomPage = document.querySelector(".bottom-page");
  menuItems = document.querySelectorAll("[class~='item']");
  let timeout = 500;

  setTimeout(() => {
    slideTop(header);
    setTimeout(() => {
      appear(heroText);
      growUp(heroBtn);
      setTimeout(() => {
        slideLeft(mainTitle);
        setTimeout(() => {
          slideRight(introSection);
        }, timeout);
      }, timeout);
    }, timeout);
  }, timeout);

  window.onscroll = onScroll;
  window.onresize = wipeMenu;
};
