import _ from "lodash";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  // console.log(props);
  const { fetchStream, match } = props;

  useEffect(() => {
    fetchStream(match.params.id);
  }, [fetchStream, match]);

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  // Gaurd clause
  if (!props.stream) return <div>Loading...</div>;

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        // initialValues={{
        //   title: props.stream.title,
        //   description: props.stream.description,
        // }}
        initialValues={_.pick(props.stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
