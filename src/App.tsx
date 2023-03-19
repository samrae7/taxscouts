import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styled-components/default-theme';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { fetchBooks } from './redux/bookSlice';
import { TextInput } from './styled-components/TextInput';
import { Nav } from './styled-components/Nav';

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

    const [searchTerm, setSearchTem] = useState('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;
        if (query) {
            setSearchTem(query);
        }
    }

    // TODO use pagination?

    // TODO useMemo instead ?
    const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

    useEffect(() => {
        dispatch(fetchBooks(searchTerm));
    }, [searchTerm, dispatch]);

    const results = useAppSelector((state) => state.books.list);
    const isLoading = useAppSelector((state) => state.books.isLoading);

    return (
        <ThemeProvider theme={myTheme}>
            <div className="App">
                <header>
                    <Nav>
                        <label hidden htmlFor="search">
                            search
                        </label>
                        <TextInput
                            id="search"
                            onChange={debouncedChangeHandler}
                            type="text"
                            placeholder="Quick search..."
                        />
                    </Nav>
                </header>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {results.map(({ title, key }) => {
                            return <li key={key}>{title}</li>;
                        })}
                    </ul>
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
