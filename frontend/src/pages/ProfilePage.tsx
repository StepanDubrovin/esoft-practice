import RequireAuth from "../components/RequireAuth";
import UserProfile from "../components/UserProfile";
import useCheckAuth from "../hooks/useCheckAuth";



const ProfilePage = () => {
    const store = useCheckAuth();

    if (!store.isAuth) {
        return (
            <RequireAuth text="Пожалуйста, авторизируйтесь, чтобы получить доступ к профилю"/>
        );
    }

    return (
        <UserProfile /> 
    )
}

export default ProfilePage;