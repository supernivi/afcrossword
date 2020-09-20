import ReactGA from 'react-ga';

function generateUser() {
  return Math.floor(Math.random() * 10000000000);
}

function linkHandle(link: string | undefined) {
  window.open(link, '_blank', 'noopener');
  ReactGA.event({
    category: 'Button Click',
    action: 'user navigated to ' + link,
  });
}

function linkHandleSameWindow(link: string | undefined) {
  window.open(link, '_self', 'noopener');
  ReactGA.event({
    category: 'Button Click',
    action: 'user navigated to ' + link,
  });
}

function gaLog(event: string, action: string) {
  ReactGA.event({
    category: event,
    action: action,
  });
}

async function gaInitialize() {
  return ReactGA.initialize('UA-131255348-11');
}

function pageView(page: string) {
  console.log(page);
  ReactGA.set({ page }); // Update the user's current page
  ReactGA.pageview(page);
}

export {
  generateUser,
  linkHandle,
  linkHandleSameWindow,
  gaLog,
  pageView,
  gaInitialize,
};
