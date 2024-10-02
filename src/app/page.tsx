'use client'
import { useState, useEffect, Suspense } from "react";
import List from "./components/basic/List";
import { getSingleUserDetails } from "@/services/user.services";
import CustomInput from "./components/basic/CustomInput";
import CustomButton from "./components/basic/CustomButton";
import { createPost, deleteTodo, getSingleUserPosts } from "@/services/posts.services";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "./lib/features/profile/profileSlice";
import Navbar from "./components/basic/Navbar";
import { setPost } from "./lib/features/posts/postSlice";
import CustomLoader from "./components/basic/CustomLoader";


export default function Home() {
  const [inputValue, setInputValue] = useState<string>("")
  const dispatch = useDispatch()
  const profileReducer = useSelector((state: any) => state.profile)
  const { user } = profileReducer

  useEffect(() => {
    getUserProfile();
  }, [])

  useEffect(() => {
    if (user?._id) {
      userPosts();
    }
  }, [user?._id])

  const getUserProfile = async () => {
    await getSingleUserDetails().then((res) => {
      if (res.data.success) {
        dispatch(setProfile({ profile: res.data.user }))
      }
    })
  }

  const userPosts = async () => {
    await getSingleUserPosts(user?._id).then((res) => {
      if (res?.success) {
        dispatch(setPost({ posts: res?.todos }))
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user?._id) {
      await createPost({
        userId: user?._id,
        item: inputValue
      }).then((res) => {
        if (res?.success) {
          userPosts();
        }
      });
    }
    setInputValue('')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center 
    justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 
    font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">TODO</h1>
        {/* form */}
        <div className="flex justify-center items-center gap-10">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <CustomInput
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} />
            <CustomButton
              className="bg-black text-white"
              label="Add"
              icon="add" />
          </form>
          {/* TODO list */}
          <div className="h-5/6 overflow-y-auto w-full">
          <Suspense fallback={<CustomLoader/>}>
            <List
              fetchData={userPosts} />
          </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
