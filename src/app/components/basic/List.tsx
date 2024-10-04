"use client";
import React, { Suspense, useState } from "react";
import { ListType, postData } from "../../types/definitions";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { deleteTodo, updateTodo } from "@/services/posts.services";
import { useSelector } from "react-redux";
import BaseModal from "../modals/BaseModal";
import BasicForm from "../forms/BasicForm";
import { getStatusIcon, getStatusColor } from "@/contant_utils/utils";
import CustomLoader from "./CustomLoader";

type List = {
  fetchData: () => Promise<void>;
};

const List = ({ fetchData }: List) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<postData | null>(null);

  const { post } = useSelector((state: any) => state.posts);
  const { posts } = post;
  const profileReducer = useSelector((state: any) => state.profile);
  const { user } = profileReducer;

  const handleModalToggle = (isOpen: boolean) => {
    setModalOpen(isOpen);
    if (!isOpen) {
      setCurrentItem(null);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteTodo(id).then((res: any) => {
      if (res.success) {
        fetchData();
      }
    });
  };

  const handleEditSubmit = async (formData: any) => {
    const assignedTo = formData.assignedTo?.length
      ? formData.assignedTo
      : [user._id];
    const requestBody = {
      todo: formData.todo,
      assignedTo: assignedTo,
      userId: user?._id,
      status: formData.status,
      end_date: formData.end_date,
      _id: currentItem?._id,
    };

    await updateTodo(requestBody).then((res) => {
      if (res.success) {
        fetchData();
        handleModalToggle(false);
      }
    });
  };

  const openEditModal = (item: postData) => {
    setCurrentItem(item);
    handleModalToggle(true);
  };

  return (
    <Suspense fallback={<CustomLoader />}>
      <div className="overflow-x-auto text-black">
        <table className="min-w-full border-collapse rounded-md">
          <thead>
            <tr className="bg-yellow-50">
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Task</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Assignee</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">
                Assigned For
              </th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Status</th>
              <th className="py-2 px-4 text-left text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: postData, index: any) => {
                return(
              <tr
                key={index}
                className="bg-white even:bg-gray-100"
              >
                <td className="py-2 px-4 text-gray-800">{post?.todo}</td>
                <td className="py-2 px-4 text-gray-800">{post?.userId}</td>
                <td className="py-2 px-4 text-gray-800">{post?.assignedTo}</td>
                <td className="py-2 px-4 text-gray-800">{post?.status}</td>
                <td className="py-2 px-4 text-gray-800 flex items-center gap-4">
                  <CustomButton
                    onClick={() => post?._id && handleDelete(post._id)}
                    icon="delete"
                    className="bg-red-400 hover:bg-red-500"
                  />
                  <CustomButton
                    onClick={() => openEditModal(post)}
                    icon="pencil"
                    className="bg-blue-400 text-white hover:bg-blue-500"
                  />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      <BaseModal isOpen={isModalOpen} onOpenChange={handleModalToggle}>
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
