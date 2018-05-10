import React from 'react';
import ReactDOM from 'react-dom';

import ExampleWork from './example-work';

const myWork = [
  {
    title: "CoolPal",
    href: "https:/example.com",
    desc: "CLICK ME",
    image: {
      desc: "coolpal a library for building bots for discord",
      src: "images/example1.png",
      comment: ""
    }
  },
  {
    title: "YourPal",
    href: "https:/example.com",
    desc: "CLICK ME",
    image: {
      desc: "yourpal hosted discord bot",
      src: "./images/example2.png",
      comment: ""
    }
  },
  {
    title: "Professional Portfolio",
    href: "https:/example.com",
    desc: "CLICK ME",
    image: {
      desc: "professional portfolio",
      src: "./images/example3.png",
      comment: ""
    }
  },
];
ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'));
