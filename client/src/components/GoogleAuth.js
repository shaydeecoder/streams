import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // state = { isSignedIn: null };

  componentDidMount() {
    // console.log(this.props);

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "92912742687-go8v7104upvkd2aqfh9lgujq7knk28ut.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Without Redux
  // onAuthChnage = () => {
  //   this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  // };

  // With Redux
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    // if (this.state.isSignedIn === null) {
    if (this.props.isSignedIn === null) {
      return null;
      // } else if (this.state.isSignedIn) {
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
