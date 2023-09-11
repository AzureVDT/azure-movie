import PropTypes from "prop-types";
const EmbedVideoMovie = ({ id }) => {
    return (
        <div className="aspect-video">
            <iframe
                width="100%"
                height={"500px"}
                src={`https://www.2embed.cc/embed/${id}`}
                title="Movie player"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
};
EmbedVideoMovie.propTypes = {
    id: PropTypes.string,
};

export default EmbedVideoMovie;
