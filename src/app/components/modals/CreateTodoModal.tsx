"use client";
import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import BasicForm from "../forms/BasicForm";
import { createPost, getMyTodoList } from "@/services/posts.services";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserDetails } from "@/services/user.services";
import { setProfile } from "@/app/lib/features/profile/profileSlice";
import { setPost } from "@/app/lib/features/posts/postSlice";

const CreateTodoModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const profileReducer = useSelector((state: any) => state.profile);
  const { user } = profileReducer;

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (user?._id) {
      userPosts();
    }
  }, [user?._id]);

  const getUserProfile = async () => {
    await getSingleUserDetails().then((res) => {
      if (res?.data?.success) {
        dispatch(setProfile({ profile: res.data.user }));
      } else {
        console.log(res.data);
      }
    });
  };

  const userPosts = async () => {
    await getMyTodoList(user?._id).then((res) => {
      if (res?.success) {
        dispatch(setPost({ posts: res?.todos }));
      }
    });
  };

  const handleModalToggle = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    if (user && user?._id) {
      const assignedTo = formData.assignedTo?.length
        ? formData.assignedTo
        : [user._id];
      const requestBody = {
        todo: formData.todo,
        assignedTo: assignedTo,
        userId: user?._id,
        status: formData.status,
        end_date: formData.end_date,
      };
      await createPost(requestBody).then((res) => {
        if (res?.success) {
          setLoading(false);
          setModalOpen(false);
          userPosts();
        } else {
          setError(res);
          setLoading(false);
        }
      });
    }
  };
  return (
    <BaseModal
      label="Create Task"
      isOpen={isModalOpen}
      onOpenChange={handleModalToggle}
      buttonClass='bg-green-500 hover:bg-green-600'
    >
      <BasicForm handleSubmit={handleSubmit} loading={loading} error={error} />
    </BaseModal>
  );
};

export default CreateTodoModal;
