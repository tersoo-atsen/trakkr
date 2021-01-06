import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from '../__mocks__/localStorageMock';

configure({ adapter: new Adapter() });
window.localStorage = localStorageMock;
