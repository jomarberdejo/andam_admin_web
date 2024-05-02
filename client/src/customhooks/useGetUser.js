import { useAuth } from "@/context/AuthContext";

export const useGetUser = () => {
    const {userData} = useAuth();
    const {id, name, username, email, agency} = userData;

    return {id, name, username, email, agency}
}