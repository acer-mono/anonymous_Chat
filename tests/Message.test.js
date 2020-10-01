import React from 'react';
import {shallow} from 'enzyme';
import Message from '../js/Message';

describe('Message', () => {
    test('Message shows nick and message', () => {
        const nick = 'test';
        const message = 'test';

        const component = shallow(<Message user={nick}
                                           message={message}/>);
        expect(component.text()).toContain(nick);
        expect(component.text()).toContain(message);
    });
});
















