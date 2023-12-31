/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import LoadingIframe from "react-loading-iframe";
import { withErrorBoundary } from "react-error-boundary";
import { handleFallbackComponent } from "../../config";
const EmbedVideoMovie = ({ id }) => {
    return (
        <div className="aspect-video lg:h-[500px] h-[300px] w-full mb-5 p-3">
            <LoadingIframe
                skeleton={<EmbedVideoMovieSkeleton />}
                src={`https://www.2embed.cc/embed/${id}`}
                frameBorder="0"
                title="Movie player"
                allowFullScreen
            />
        </div>
    );
};

const EmbedVideoMovieSkeleton = () => {
    return (
        <div className="aspect-video">
            <LoadingSkeleton className="w-full lg:h-[500px] h-[300px] mb-5 p-3"></LoadingSkeleton>
        </div>
    );
};

EmbedVideoMovie.propTypes = {
    id: PropTypes.string,
};

export default withErrorBoundary(EmbedVideoMovie, {
    FallbackComponent: handleFallbackComponent,
});
