import { Box } from "grommet";
import { useAppSelector } from "../redux/hooks";

export function SearchResults() {
    const isLoading = useAppSelector((state) => state.books.isLoading);
    const results = useAppSelector((state) => state.books.list);
    return (
        <Box pad="small">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {results.map(({ title, key }) => {
                        return <li key={key}>{title}</li>;
                    })}
                </ul>
            )}
        </Box>
    );
}
