import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

const withLikeIndicator = (WrappedComponent) => {
  return function WithLikeIndicator(props) {
    const liked = useSelector((store) => store.movies.likes[props.movie.id]);

    return (
      <div className="relative">
        {liked && (
          <div className="absolute top-4 left-2 z-10">
            <FaHeart className="text-red-500 text-3xl drop-shadow-md" />
          </div>
        )}
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withLikeIndicator;
