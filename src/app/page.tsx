"use client";
import { Suspense, useEffect, useState } from "react";
import List from "./components/tables/List";
import { getSingleUserDetails } from "@/services/user.services";
import { getMyTaskList } from "@/services/posts.services";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "./lib/features/profile/profileSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch();
  const profileReducer = useSelector((state: any) => state.profile);
  const { user } = profileReducer;
  const router = useRouter()

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
    await getMyTaskList(user?._id).then((res) => {
      if (res?.success) {
        setPosts(res?.todos)
      }
    });
  };

  if (!user?.isVerified) {
    router.replace('/login')
  }

  console.log('user?.isVerified',user?.isVerified)

  return (
    <main className="flex flex-col gap-8 row-start-2">
      <div className="flex justify-between items-center">
        <h1 className="text-teal-700 text-2xl font-bold">
          Tasks For You
        </h1>
      </div>
      <List fetchData={userPosts} posts={posts} />
    </main>
  );
}
