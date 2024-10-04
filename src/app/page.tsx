'use client'
import { useState, useEffect, Suspense } from "react";
import List from "./components/basic/List";
import { getSingleUserDetails } from "@/services/user.services";
import { createPost,getMyTodoList } from "@/services/posts.services";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "./lib/features/profile/profileSlice";
import Navbar from "./components/basic/Navbar";
import { setPost } from "./lib/features/posts/postSlice";
import CustomLoader from "./components/basic/CustomLoader";
import BaseModal from "./components/modals/BaseModal";
import BasicForm from "./components/forms/BasicForm";


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [isModalOpen, setModalOpen] = useState(false);
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
      if (res?.data?.success) {
        dispatch(setProfile({ profile: res.data.user }))
      } else {
        console.log(res.data)
      }
    })
  }

  const userPosts = async () => {
    await getMyTodoList(user?._id).then((res) => {
      if (res?.success) {
        dispatch(setPost({ posts: res?.todos }))
      }
    })
  }

  const handleModalToggle = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  const handleSubmit = async (formData: any) => {
    setLoading(true)
    if (user && user?._id) {
      const assignedTo = formData.assignedTo?.length ? formData.assignedTo : [user._id];
      const requestBody = {
        todo: formData.todo,
        assignedTo: assignedTo,
        userId: user?._id,
        status: formData.status,
        end_date: formData.end_date
      }
      await createPost(requestBody).then((res) => {
        if (res?.success) {
          setLoading(false)
          setModalOpen(false)
          userPosts();
        } else {
          setError(res)
          setLoading(false)
        }
      });
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center 
    justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 
    font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">TODO</h1>
        <BaseModal
          label="Create Task"
          isOpen={isModalOpen}
          onOpenChange={handleModalToggle}
        >
          <BasicForm
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </BaseModal>
        {/* form */}
        <div className="flex justify-center items-center gap-10">
          {/* TODO list */}
          <div className="h-5/6 overflow-y-auto w-full">
            <Suspense fallback={<CustomLoader />}>
              <List
                fetchData={userPosts} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
