"use client";
import React, { useCallback, useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import BasicForm from "../forms/BasicForm";
import { createTask } from "@/services/posts.services";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserDetails } from "@/services/user.services";
import { setProfile } from "@/app/lib/features/profile/profileSlice";
import { ProfileState, TaskFormValues } from "@/app/types/definitions";

type CreateTodoProps = {
  fetchData: () => Promise<void>;
}


const CreateTodoModal = ({ fetchData }: CreateTodoProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const profileReducer = useSelector((state: ProfileState) => state.profile);
  const { user } = profileReducer;

  const getUserProfile = useCallback(
    async () => {
      await getSingleUserDetails().then((res) => {
        if (res?.data?.success) {
          dispatch(setProfile({ profile: res.data.user }));
        } else {
          dispatch(setProfile({ profile: null }));
        }
      });
    }, [])

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchData();
    }
  }, [user?._id,fetchData]);


  const handleModalToggle = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleSubmit = async (formData: TaskFormValues) => {
    setLoading(true);
    if (user && user._id) {
      const assignedTo = formData.assignedTo?.length
        ? formData.assignedTo
        : [user._id];
      const requestBody = {
        todo: formData.todo,
        assignedTo,
        userId: user._id,
        status: formData.status,
        end_date: formData.end_date,
      };
      const res = await createTask(requestBody);
      if (res?.success) {
        setLoading(false);
        setModalOpen(false);
        fetchData();
      } else {
        setError(res);
        setLoading(false);
      }
    }
  };
  
  return (
    <BaseModal
      label="Create Task"
      isOpen={isModalOpen}
      onOpenChange={handleModalToggle}
      buttonClass='bg-teal-700 hover:bg-teal-600'
    >
      <BasicForm
        handleSubmit={(formData: unknown) => handleSubmit(formData as TaskFormValues)}
        loading={loading}
        error={error} />
    </BaseModal>
  );
};

export default CreateTodoModal;
