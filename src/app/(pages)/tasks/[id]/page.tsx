'use client'
import CustomButton from '@/app/components/basic/CustomButton'
import CustomInput from '@/app/components/basic/CustomInput'
import BaseCard from '@/app/components/cards/BaseCard'
import CommentItem from '@/app/components/cards/CommentItem'
import StatusSelect from '@/app/components/select/StatusSelect'
import UserSelect from '@/app/components/select/UserSelect'
import BaseCardSkeleton from '@/app/components/skeltons/BaseCardSkelton'
import CommentSkelton from '@/app/components/skeltons/CommentSkelton'
import { postData } from '@/app/types/definitions'
import { fetchUserWithId } from '@/helpers/fetchUserWithId'
import { deleteComment, getSingleTask, updateTask } from '@/services/posts.services'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type FormDataType = {
  comment: string;
  status: string;
  assignedTo: string[]
}

const SingleTask = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUserName] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormDataType>({
    comment: '',
    status: '',
    assignedTo: []
  })
  const [task, setTask] = useState<postData>()
  const [error, setError] = useState({})
  const profileReducer = useSelector((state: any) => state.profile)
  const { user } = profileReducer
  useEffect(() => {
    if (params?.id) {
      getTask(params?.id)
    }
  }, [params?.id])

  useEffect(() => {
    if (task) {
      setFormData((prev) => ({
        ...prev,
        status: task.status,
      }));
    }
  }, [task]);

  useEffect(() => {
    const fetchUsernames = async () => {
      if (task?.comments && Array.isArray(task.comments) && task.comments.length > 0) {
        try {
          const userPromises = task.comments.map(async (item) => {
            const res = await fetchUserWithId([item.userId]);
            return { userId: item.userId, username: res[item.userId] };
          });
          const userResults = await Promise.all(userPromises);
          const usernameMap = userResults.reduce((acc, { userId, username }) => {
            acc[userId] = username;
            return acc;
          }, {} as { [key: string]: string });
          setUserName((prev) => ({ ...prev, ...usernameMap }));

        } catch (error) {
          return error
        }
      };
    }
    fetchUsernames();
  }, [task?.comments]);



  const getTask = async (id: string) => {
    try {
      getSingleTask(id).then((res) => {
        if (res.success) {
          setTask(res?.data)
        } else {
          return;
        }
      })

    } catch (error) {
      return error
    }
  }

  const handleTaskStatus = (status: string) => {
    setFormData({
      ...formData,
      status: status
    })
  }

  const handleUserSelect = (selectedUsers: string[]) => {
    setFormData({
      ...formData,
      assignedTo: selectedUsers
    })
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.comment) {
      setError({
        comment: { message: 'Please add a valid comment' }
      });
      return;
    }
    setLoading(true)
    const updatedComments = [
      ...(task?.comments || []),
      {
        userId: user?._id || task?.userId,
        comment: formData.comment,
        createdAt: new Date().toISOString(),
      }
    ];
    const newAssigned = formData?.assignedTo?.length > 0 ? formData.assignedTo : [];
    const requestBody: postData = {
      _id: task?._id || '',
      todo: task?.todo || '',
      userId: task?.userId || '',
      assignedTo: task?.assignedTo || newAssigned,
      status: formData?.status,
      end_date: task?.end_date || '',
      comments: updatedComments,
    }
    await updateTask(requestBody)
      .then((res) => {
        if (res?.success) {
          setLoading(false)
          setFormData({ comment: '', status: res?.data?.status, assignedTo: res?.data?.assignedTo });
          setTask(res.data);
          setError({})
        } else {
          setError(res?.data?.errors);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.error('API Error:', err);
      });

  }

  const handleDeleteComment = async (postId: string, commentId: string) => {
    await deleteComment(postId, commentId).then((res) => {
      if (res.success) {
        setLoading(false)
        getTask(postId)
      }
    })
  }

  return (
    <Suspense fallback={<BaseCardSkeleton />}>
      <BaseCard>
        <h3 className="title font-bold text-xl text-teal-600 mb-4 first-letter-cap">
          {task?.todo}
        </h3>
        <div className="comments ml-4">
          <form
            onSubmit={handleUpdateTask}
            className="add-comment flex flex-col gap-4 w-full"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
              <StatusSelect
                name="Task Status"
                placeholder='Select Task Status'
                initialValue={task && task?.status}
                onSelectSubmit={handleTaskStatus}
              />
              <UserSelect
                name='Assigned'
                onSelectUsers={handleUserSelect}
                placeholder='Select Assigned Users'
                initialUsers={task && task?.assignedTo} />
              <CustomInput
                placeholder="Comment..."
                name="comment"
                value={formData?.comment}
                onChange={handleInputChange}
                error={error}
              />
              <CustomButton
                className="bg-teal-700"
                icon="send"
                label={loading ? 'Processing...' : 'Update'}
                type="submit"
              />
            </div>
          </form>

          {task?.comments && task?.comments?.toReversed().map((item, index) => (
            <Suspense fallback={<CommentSkelton />}>
              <CommentItem
                key={index}
                handleDeleteComment={handleDeleteComment}
                item={item}
                taskId={task?._id}
                userId={user?._id}
                username={username}
              />
            </Suspense>
          ))}
        </div>
      </BaseCard>
    </Suspense>
  )
}

export default SingleTask