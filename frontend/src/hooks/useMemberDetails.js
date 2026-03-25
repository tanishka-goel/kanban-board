import { useUsers } from "@/queries/users.query"
import { useVisibleWorkspace } from "./useVisibleWorkspaces"

export const useMemberDetails = () => {
    const { data: usersResponse } = useUsers();
    const { visibleWorkspaces, user: oneUser } = useVisibleWorkspace();
    const allUsersArray = usersResponse?.[0]?.data;

    console.log("AUA", usersResponse)

    
    return { allUsersArray, visibleWorkspaces }
}