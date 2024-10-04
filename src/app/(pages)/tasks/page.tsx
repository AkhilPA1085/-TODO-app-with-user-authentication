"use client";
import List from "@/app/components/basic/List";
import BasicForm from "@/app/components/forms/BasicForm";
import BaseModal from "@/app/components/modals/BaseModal";
import CreateTodoModal from "@/app/components/modals/CreateTodoModal";
import { setPost } from "@/app/lib/features/posts/postSlice";
import { postData } from "@/app/types/definitions";
import { createPost, getMyTodoList } from "@/services/posts.services";
import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<postData | null>(null);

  const dispatch = useDispatch();
  const profileReducer = useSelector((state: any) => state.profile);
  const { user } = profileReducer;
  const { post } = useSelector((state: any) => state.posts);
  const { posts } = post;

  useEffect(() => {
    userPosts();
  }, []);

  const handleModalToggle = (isOpen: boolean) => {
    setModalOpen(isOpen);
    if (!isOpen) {
      setCurrentItem(null);
    }
  };

  const userPosts = async () => {
    await getMyTodoList(user?._id).then((res) => {
      if (res?.success) {
        dispatch(setPost({ posts: res?.todos }));
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-gray-800 text-2xl font-bold">
          Tasks Created
        </h1>
        <CreateTodoModal/>
      </div>
      <List fetchData={userPosts} />
    </>
  );
};

export default Tasks;
