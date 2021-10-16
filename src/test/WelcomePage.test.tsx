import WelcomePage from '../pages/WelcomePage'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it("renders Welcome Page", () => {
    const div = shallow(<WelcomePage />);
    expect(div.find('Login').length).toEqual(1);  
})


