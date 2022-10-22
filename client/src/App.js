import {
    loadUserAsync,
    loginAsync,
    logoutAsync,
} from "./store/UserSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const App = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, error } = useSelector((state) => state.user);
    const signin = () => {
        dispatch(loginAsync({ username: "john", password: "123456" }));
    };

    const logout = () => {
        dispatch(logoutAsync());
    };

    useEffect(() => {
        dispatch(loadUserAsync());
    }, []);

    const SubmitHandler = (e) => {
        e.preventDefault();
        const [username, password, avatar] = e.target;
        const myForm = new FormData();
        myForm.set("username", username.value);
        myForm.set("password", password.value);
        myForm.set("avatar", avatar.files[0]);
        // myForm.set("avatar", );
        // for (const pair of myForm.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        dispatch(loginAsync(myForm));
    };

    return (
        <div>
            <button onClick={signin}>Sign In User</button>
            <h1>{error}</h1>
            <p>{user && JSON.stringify(user)}</p>
            <button onClick={logout}>Logout</button>
            <hr />
            <form onSubmit={SubmitHandler}>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <input type="file" name="avatar" />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default App;
