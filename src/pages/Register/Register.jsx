import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../store/reducers/user';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^[A-ZА-ЯЁ][a-zа-яё]{1,}$/, "Имя должно начинаться с заглавной буквы и содержать только буквы")
        .required("Введите имя"),
    lastName: yup
        .string()
        .matches(/^[A-ZА-ЯЁ][a-zа-яё]{1,}(-[A-ZА-ЯЁ][a-zа-яё]{1,})?$/, "Фамилия должна быть корректной")
        .required("Введите фамилию"),
    email: yup.string().email("Некорректный email").required("Введите email"),
    password: yup.string().min(6, "Пароль должен быть минимум 6 символов").required("Введите пароль"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
        .required("Подтвердите пароль"),
});

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            balance: 0
        };

        dispatch(registerUser(userData)).then((result) => {
            if (registerUser.fulfilled.match(result)) {
                alert("Регистрация успешна! 🚀");
                navigate("/");
            } else {
                alert("Ошибка при регистрации 😢");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <h2>Регистрация</h2>

            <label>Имя:</label>
            <input type="text" {...register("firstName")} />
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}

            <label>Фамилия:</label>
            <input type="text" {...register("lastName")} />
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}

            <label>Email:</label>
            <input type="email" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label>Пароль:</label>
            <input type="password" {...register("password")} />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <label>Подтвердите пароль:</label>
            <input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={!isValid || status === "loading"}>
                {status === "loading" ? "Регистрация..." : "Зарегистрироваться"}
            </button>
        </form>
    );
};

export default Register;
