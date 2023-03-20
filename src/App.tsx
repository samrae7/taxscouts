import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styled-components/default-theme';

import { useAppDispatch } from './redux/hooks';
import { fetchBooks } from './redux/bookSlice';
import { TextInput } from './styled-components/TextInput';
import { Nav } from './styled-components/Nav';
import { Drop, Grommet } from 'grommet';
import { SearchResults } from './styled-components/SearchResults';

export type BookDatum = {
    cover_i: number;
    has_fulltext: boolean;
    edition_count: number;
    title: string;
    author_name: string[];
    first_publish_year: 1955;
    key: string;
    ia: string[];
    author_key: string[];
    public_scan_b: boolean;
};

function App() {
    const dispatch = useAppDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;
        setSearchTerm(query);
    }

    const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

    useEffect(() => {
        dispatch(fetchBooks(searchTerm));
    }, [searchTerm, dispatch]);

    const grommetTheme = {
        global: {
            margin: 0,
            font: {
                family: 'Roboto',
                size: '14px',
                height: '20px',
            },
        },
        colors: {
            main: 'black',
            secondary: 'grey',
        },
    };

    const inputRef = useRef(null);

    return (
        <ThemeProvider theme={myTheme}>
            <Grommet theme={grommetTheme}>
                <div className="App">
                    <header>
                        <Nav>
                            <TextInput
                                onChange={debouncedChangeHandler}
                                type="text"
                                placeholder="Quick search..."
                                ref={inputRef}
                                name="search"
                            />
                            {searchTerm.length > 1 && (
                                <Drop
                                    align={{ top: 'bottom' }}
                                    target={inputRef}
                                    overflow="visible"
                                >
                                    <SearchResults />
                                </Drop>
                            )}
                        </Nav>
                    </header>
                </div>
            </Grommet>
        </ThemeProvider>
    );
}

export default App;
