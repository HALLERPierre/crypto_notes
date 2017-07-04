import { connect } from "react-redux";
import { login } from "../actions";
import { ConnectBox } from "../components";

const mapStateToProps = state => {
    return {
        disabled: state.user.fetching
    };
};

const mapDispatchToProps = dispatch => {
    return {
        connect: (username, password) => {
            dispatch(login(username, password));
        }
    };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectBox);

export default Login;
