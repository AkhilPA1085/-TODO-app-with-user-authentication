import axios from "axios"

// Creating a task
export async function createTask(createData:unknown) {
    try {
        const response = await axios.post('/api/posts/create', createData)
        return response.data
    } catch (error) {
        return `An unknown error occurred.${error}`
    }
}

// Deleting a task
export async function deleteTask(id: string) {
    try {
        const response = await axios.delete(`/api/posts/delete?id=${id}`)
        return response.data
    } catch (error) {
        return 'An error occurred while deleting the task.' + error
    }
}

// Updating a task
export async function updateTask(editData: unknown) {
    try {
        const response = await axios.post(`/api/posts/edit`, { editData })
        return response.data
    } catch (error) {
        return 'An error occurred while updating the task.' + error
    }
}

// Fetching a single task
export async function getSingleTask(id: string) {
    try {
        const response = await axios.get(`/api/posts/get_task?id=${id}`)
        return response.data
    } catch (error) {
        return 'An error occurred while fetching the task.' + error
    }
}

// Fetching tasks assigned to the user
export async function getMyTaskList(userId: string) {
    try {
        const response = await axios.get(`/api/posts/get_user_todo?id=${userId}`)
        return response.data
    } catch (error) {
        return 'An error occurred while fetching your tasks.' + error
    }
}

// Fetching tasks created by the user
export async function getCreatedTaskByMe(userId: string) {
    try {
        const response = await axios.get(`/api/posts/get_created_tasks?id=${userId}`)
        return response.data
    } catch (error) {
        return 'An error occurred while fetching created tasks.' + error
    }
}

// Deleting a comment
export async function deleteComment(postId: string, commentId: string) {
    try {
        const response = await axios.delete(`/api/posts/delete/comments?postId=${postId}&commentId=${commentId}`)
        return response.data
    } catch (error) {
        return 'An error occurred while deleting the comment.' + error
    }
}
