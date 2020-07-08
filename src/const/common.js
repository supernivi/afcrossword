import ReactGA from "react-ga";

function generateUser() {
  return Math.floor(Math.random() * 10000000000);
}

function linkHandle(link) {
  window.open(link, "_blank", "noopener");
  ReactGA.event({
    category: "Button Click",
    action: "user navigated to " + link,
  });
}

function linkHandleSameWindow(link) {
  window.open(link, "_self", "noopener");
  ReactGA.event({
    category: "Button Click",
    action: "user navigated to " + link,
  });
}

function gaLog(event, action) {
  ReactGA.event({
    category: event,
    action: action,
  });
}

function pageView(page) {
  console.log(page);
  ReactGA.set({ page }); // Update the user's current page
  ReactGA.pageview(page);
}

export { generateUser, linkHandle, linkHandleSameWindow, gaLog, pageView };
