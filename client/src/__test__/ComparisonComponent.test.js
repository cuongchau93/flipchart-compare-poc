import React from 'react';
import ComparisonComponent from '../components/ComparisonComponent';
import InputForm from '../components/InputForm';
import { mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComparisonTable from '../components/ComparisonTable';

configure({ adapter: new Adapter() });

describe("ComparisonComponent " , () => {
    const component = shallow(
        <ComparisonComponent />
    );

    it('renders and matches our snapshot', () => {
        const component = renderer.create(
            <ComparisonComponent />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contains an InputForm subcomponent with no table', () => {
        expect(component.find(InputForm)).toHaveLength(1);
        expect(component.find(ComparisonTable)).toHaveLength(0);
    });
});