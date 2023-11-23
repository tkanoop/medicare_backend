import { useAuthContext } from "../admin/useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        localStorage.removeItem('doctor')
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}