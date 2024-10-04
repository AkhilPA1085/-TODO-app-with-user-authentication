"use client";
import { useState, useEffect, Suspense } from "react";
import List from "./components/basic/List";
import { getSingleUserDetails } from "@/services/user.services";
import { createPost, getMyTodoList } from "@/services/posts.services";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "./lib/features/profile/profileSlice";
import Navbar from "./components/basic/Navbar";
import { setPost } from "./lib/features/posts/postSlice";
import CustomLoader from "./components/basic/CustomLoader";
import CreateTodoModal from "./components/modals/CreateTodoModal";

export default function Home() {
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

  return (
    <main className="flex flex-col gap-8 row-start-2">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-800 text-2xl font-bold">
          Tasks For You
        </h1>
        
      </div>
      <List fetchData={userPosts} />
    </main>
  );
}
