import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { useAppDispatch } from './redux/hooks';
import { fetchBooks } from './redux/bookSlice';
import { TextInput } from './styled-components/TextInput';
import { Nav } from './styled-components/Nav';
import { Drop, Grommet } from 'grommet';
import { SearchResults } from './styled-components/SearchResults';
import { grommetTheme } from './styled-components/grommet-theme';

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

    const inputRef = useRef(null);

    return (
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
    );
}

export default App;
