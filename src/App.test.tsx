import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './redux/store';

jest.mock('axios');

describe('App', () => {
    beforeEach(() => {
        (axios.get as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                data: {
                    docs: [
                        { title: 'LOTR1', key: 'key1' },
                        { title: 'LOTR2', key: 'key2' },
                    ],
                },
            })
        );
    });

    test('App fetches a list of books when the user types', async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const input = screen.getByRole('textbox', { name: 'search' });
        fireEvent.change(input, { target: { value: 'Lord of the Rings' } });
        const LOTRListItems = await screen.findAllByRole('listitem');
        expect(LOTRListItems).toHaveLength(2);
        expect(LOTRListItems[0]).toHaveTextContent('LOTR1');
        expect(LOTRListItems[1]).toHaveTextContent('LOTR2');
    });
});
