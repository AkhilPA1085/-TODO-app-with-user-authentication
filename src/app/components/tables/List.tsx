"use client";
import React, { Suspense, useEffect, useState } from "react";
import { ApiResponse, postData, ProfileState } from "../../types/definitions";
import CustomButton from "../basic/CustomButton";
import { deleteTask, updateTask } from "@/services/posts.services";
import { useSelector } from "react-redux";
import BaseModal from "../modals/BaseModal";
import BasicForm from "../forms/BasicForm";
import CustomLoader from "../basic/CustomLoader";
import { fetchUserWithId } from "@/helpers/fetchUserWithId";
import Link from "next/link";
import TableSkeleton from "../skeltons/TableSkelton";

type List = {
  fetchData: () => Promise<void>;
  posts: postData[]
};

interface FormData {
  todo: string;
  assignedTo?: string[];
  status: string;
  end_date: string;
}

const List = ({ fetchData, posts }: List) => {
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<postData | null>(null);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  const profileReducer = useSelector((state: ProfileState) => state.profile);
  const { user } = profileReducer;

  useEffect(() => {
    if (posts?.length) {
      const assignedUserIds = posts.reduce((acc: string[], post: postData) => {
        return acc
          .concat(post.userId ? [post.userId] : [])
          .concat(post.assignedTo || [])
      }, [])
      fetchUserWithId(assignedUserIds).then((res) => {
        setUserNames(res)
      })
    }
  }, [posts])

  const handleEditModalToggle = (isOpen: boolean) => {
    setEditModalOpen(isOpen);
    if (!isOpen) {
      setCurrentItem(null);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteTask(id).then((res: ApiResponse) => {
      if (res.success) {
        setLoading(false);
        handleDeleteModalToggle(false)
        fetchData();
      }
    });
  };

  const handleEditSubmit = async (formData: unknown) => {
    const typedData = formData as FormData

    const assignedTo = typedData.assignedTo?.length
      ? typedData.assignedTo
      : user?._id ? [user._id] : [];
    const requestBody = {
      todo: typedData.todo,
      assignedTo: assignedTo,
      userId: user?._id || '',
      status: typedData.status,
      end_date: typedData.end_date,
      _id: currentItem?._id,
    };

    try {
      const res = await updateTask(requestBody);
      if (res.success) {
        fetchData();
        handleEditModalToggle(false);
      } else {
        console.error('Update failed:', res.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }

  };

  const openEditModal = (item: postData) => {
    setCurrentItem(item);
    handleEditModalToggle(true);
  };

  const handleDeleteModalToggle = (isOpen: boolean) => {
    setDeleteModalOpen(isOpen)
    if (!isOpen) {
      setDeleteItemId('');
    }
  }

  const openDeleteModal = (id: string) => {
    setDeleteItemId(id)
    handleDeleteModalToggle(true)
  }

  if (posts && posts.length === 0) {
    return <p className="text-teal-500">No Tasks created</p>
  }

  return (
    <Suspense fallback={<CustomLoader />}>
      <div className="overflow-x-auto text-black shadow-md rounded-md">
        <Suspense fallback={<TableSkeleton />}>
          <table className="min-w-full border-collapse rounded-md">
            <thead>
              <tr className="bg-teal-600">
                <th className="py-2 px-4 text-left text-white font-semibold">Task</th>
                <th className="py-2 px-4 text-left text-white font-semibold">Assignee</th>
                <th className="py-2 px-4 text-left text-white font-semibold">
                  Assigned For
                </th>
                <th className="py-2 px-4 text-left text-white font-semibold">Status</th>
                <th className="py-2 px-4 text-left text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post: postData, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white even:bg-teal-50"
                  >
                    <td className="py-2 px-4 text-gray-800 capitalize">
                      <Link href={`/tasks/${post?._id}`} className="text-black font-bold">
                        {post?.todo}
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-gray-800 capitalize">{userNames[post.userId] || "Loading..."}</td>
                    <td className="py-2 px-4 text-gray-800 capitalize">
                      {post?.assignedTo?.map((userId: string, idx: number) => (
                        <span key={idx} className="mr-4 rounded-md bg-blue-100 p-2 capitalize">
                          {userNames[userId] || "Loading..."}
                        </span>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-gray-800 capitalize">{post?.status}</td>
                    <td className="py-2 px-4 text-gray-800 flex items-center gap-4">
                      <CustomButton
                        onClick={() => post?._id && openDeleteModal(post?._id)}
                        icon="delete"
                        className="!bg-red-400 hover:bg-red-500"
                      />
                      <CustomButton
                        onClick={() => openEditModal(post)}
                        icon="pencil"
                        className="!bg-blue-400 text-white hover:bg-blue-500"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Suspense>
      </div>
      {/* Delete confirmation Modal */}
      <BaseModal isOpen={isDeleteModalOpen} onOpenChange={handleDeleteModalToggle}>
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold">Are You Sure?</h1>
          <div className="flex items-center gap-5">
            <CustomButton
              label={!loading ? 'Delete' : 'Processing...'}
              icon="delete"
              className="!bg-red-600"
              onClick={() => deleteItemId && handleDelete(deleteItemId)} />
            <CustomButton
              label="Cancel"
              icon="close"
              className="bg-teal-700 text-blue-400 border border-blue-400"
              onClick={() => handleDeleteModalToggle(false)} />
          </div>
        </div>
      </BaseModal>

      {/* Edit Modal */}
      <BaseModal isOpen={isEditModalOpen} onOpenChange={handleEditModalToggle}>
        {currentItem && (
          <BasicForm
            handleSubmit={handleEditSubmit}
            initialValues={currentItem}
            loading={loading}
          />
        )}
      </BaseModal>
    </Suspense>
  );
};

export default List;
