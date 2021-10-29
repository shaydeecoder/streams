import { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream } from "../../actions";

const StreamDelete = (props) => {
  const { fetchStream, match } = props;

  useEffect(() => {
    fetchStream(match.params.id);
  }, [fetchStream, match]);

  const actions = (
    <>
      <button className="ui button negative">Delete</button>
      <button className="ui button">Cancel</button>
    </>
  );

  const renderContent = () => {
    if (!props.stream) return "Are you sure you want to delete this stream?";

    return `Are you sure you want to delete the stream with title: ${props.stream.title}`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push("/")}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamDelete);
