import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

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
    const [results, setResults] = useState<BookDatum[]>([]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;
        console.log({ query });
        if (query && query.length > 1) {
            setSearchTem(query);
        }
    }

    useEffect(() => {
        axios
            .get<{ docs: BookDatum[] }>(
                `https://openlibrary.org/search.json?q=${searchTerm}`
            )
            .then(({ data }) => setResults(data.docs));
    }, [searchTerm]);

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <label htmlFor="search">search</label>
            <input id="search" onChange={handleChange} type="text"></input>
            <ul>
                {results.map((result) => {
                    return <li>{result.title}</li>;
                })}
            </ul>
        </div>
    );
}

export default App;
