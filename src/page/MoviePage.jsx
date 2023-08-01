import { useParams } from "react-router-dom";
import MovieDetailsPage from "./MovieDetailsPage";
import MovieSearchPage from "./MovieSearchPage";

const MoviePage = () => {
    const { slug } = useParams();
    const isSlugString = isNaN(parseInt(slug));
    return (
        <>
            {isSlugString ? (
                <MovieSearchPage></MovieSearchPage>
            ) : (
                <MovieDetailsPage></MovieDetailsPage>
            )}
        </>
    );
};

export default MoviePage;
