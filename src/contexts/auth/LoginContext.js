import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/AuthRequest";
import { setLocalUser } from "../../utils";

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onLogin = async () => {
        await loginRequest({ body: { username: controller.username, password: controller.password } }).then((res) => {
            res?.list_data?.errors && setErrors(res?.list_data?.errors);
            !res?.list_data?.errors && setErrors(res);
            if (res?.user?.id) {
                setLocalUser({ auth: res });
                navigation('/dashboard');
            };
        });
    }

    return (
        <LoginContext.Provider value={{ navigation, controller, errors, onSetController, onLogin }}>
            {children}
        </LoginContext.Provider>
    );
}

export const UseLoginContext = () => {
    return useContext(LoginContext);
}