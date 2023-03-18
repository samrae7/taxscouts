import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

describe('App', () => {
    beforeEach(() => {
        (axios.get as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                data: {
                    docs: [{ title: 'LOTR1' }, { title: 'LOTR2' }],
                },
            })
        );
    });

    test('App fetches a list of books when the user types', async () => {
        render(<App />);
        const input = screen.getByRole('textbox', { name: 'search' });
        fireEvent.change(input, { target: { value: 'Lord of the Rings' } });
        const LOTRListItems = await screen.findAllByRole('listitem');
        expect(LOTRListItems).toHaveLength(2);
        expect(LOTRListItems[0]).toHaveTextContent('LOTR1');
        expect(LOTRListItems[1]).toHaveTextContent('LOTR2');
    });
});
