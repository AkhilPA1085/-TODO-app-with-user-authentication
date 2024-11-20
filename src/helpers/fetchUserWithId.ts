import { getUserWithId } from "@/services/user.services";

export const fetchUserWithId = async (assignedIds: string[]) => {
    if (assignedIds?.length === 0) return;
    try {
      const response = await getUserWithId(assignedIds)
      if (response.success) {
        const usersMap = response.data.reduce((acc: { [key: string]: string }, user: any) => {
          acc[user._id] = user.username;
          return acc;
        }, {});
        return usersMap
      }
    } catch (error) {

    }
  }