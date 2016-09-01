import React from 'react';
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import Root from './root';
import 'regenerator-runtime/runtime';

const history =
  (process.env.NODE_ENV === 'dev') ?
    createHashHistory() : createBrowserHistory();

ReactDom.render(
  <Root {...{history}} />,
  document.getElementById('react-container')
);