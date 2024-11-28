import { User } from "@/app/types/definitions";
import { getUserWithId } from "@/services/user.services";

export const fetchUserWithId = async (assignedIds: string[]) => {
  if (assignedIds?.length === 0) return;
  try {
    const response = await getUserWithId(assignedIds)
    if (response.success) {
      const usersMap = response.data.reduce((acc: { [key: string]: string }, user: User) => {
        acc[user._id] = user.username;
        return acc;
      }, {});
      return usersMap
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred');
  }
}