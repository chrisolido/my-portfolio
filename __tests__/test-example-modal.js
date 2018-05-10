import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const example = {
  title: "CoolPal",
  href: "https://example.com",
  desc: "Some example text.",
  image: {
    desc: "coolpal a library for building bots for discord",
    src: "images/example1.png",
    comment: ""
  }
};

describe("ExampleWorkModal component", () => {
  let component = shallow(<ExampleWorkModal
                          example={ example }
                          open={ false }/>);
  let openComponent = shallow(<ExampleWorkModal
                                example={ example }
                                open={ true }/>);
  let anchors = component.find('a');

  it("Should contain a single 'a' element", () => {
    expect(anchors.length).toEqual(1);
  });

  it("Should link to a project", () => {
    expect(anchors.prop('href')).toEqual(example.href);
  });

  it("Should have the modal class set correctly", () => {
    expect(component.find('modal--closed')).toBeDefined();
    expect(openComponent.find('modal--open')).toBeDefined();
  });

  it("Should have the modal class set correctly", () => {
  });
});

