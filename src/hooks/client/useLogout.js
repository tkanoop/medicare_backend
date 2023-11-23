import { useAuthContext } from "../admin/useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        localStorage.removeItem('client')
        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}