import flv from "flv.js";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const videoRef = useRef();

  const { fetchStream, match } = props;
  const { id } = match.params;

  useEffect(() => {
    fetchStream(id);
  }, [fetchStream, id]);

  let player;
  useEffect(() => {
    if (player || !props.stream) return;

    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
  });

  if (!props.stream) return <div>Loading...</div>;

  const { title, description } = props.stream;

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
