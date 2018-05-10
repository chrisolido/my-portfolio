import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


const work = [
  {
    title: "CoolPal",
    image: {
      desc: "coolpal a library for building bots for discord",
      src: "images/example1.png",
      comment: ""
    }
  },
  {
    title: "YourPal",
    image: {
      desc: "yourpal hosted discord bot",
      src: "./images/example2.png",
      comment: ""
    }
  }
];


describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={ work }/>);
  it("Should be a 'section' element", () => {
    expect(component.type()).toEqual('section');
  });

  it("Should contain as many children as there are work examples", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(work.length);
  });
});

describe("ExampleWorkBubble component", () => {
  let component = shallow(<ExampleWorkBubble example={ work[1] }/>);
  let images = component.find("img");

  it("Should contain a single 'img'  element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have the image source set correctly", () => {
    expect(images.prop('src')).toEqual(work[1].image.src);
  });
});
