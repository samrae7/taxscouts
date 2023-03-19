import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styled-components/default-theme';
import { Title } from './styled-components/Title';

type BookDatum = {
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
    const [searchTerm, setSearchTem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<BookDatum[]>([]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;
        console.log({ query });
        if (query && query.length > 1) {
            setSearchTem(query);
        }
    }

    const debouncedChangeHandler = useCallback(debounce(handleChange, 300), []);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get<{ docs: BookDatum[] }>(
                `https://openlibrary.org/search.json?q=${searchTerm}`
            )
            .then(({ data }) => {
                setResults(data.docs);
                setIsLoading(false);
            });
    }, [searchTerm]);

    return (
        <ThemeProvider theme={myTheme}>
            <div className="App">
                <Title>Vite + React</Title>
                <label htmlFor="search">search</label>
                <input
                    id="search"
                    onChange={debouncedChangeHandler}
                    type="text"
                ></input>
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
