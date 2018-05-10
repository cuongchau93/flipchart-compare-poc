import React from 'react';
import InputForm from '../components/InputForm';
import { shallow,configure } from 'enzyme'
import renderer from 'react-test-renderer';
import ComparisonTable from '../components/ComparisonTable';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const sampleSpec = {
    "Specifications": {
        "RAM": "32G"
    },
    "Highlights": {
        "Camera": "16MP"
    }
};

describe("ComparisonTable " , () => {
    const component = shallow(
        <ComparisonTable features={sampleSpec}/>
    );

    it('renders and matches our snapshot', () => {
        const component = renderer.create(
            <ComparisonTable />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});