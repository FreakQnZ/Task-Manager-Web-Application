"use client"

// import useSWR from "swr";
import { useEffect, useState } from 'react'
import Card from './components/card/card'
import AddCard from './components/card/newcard';
import Skeleton from './components/card/skeleton';
import { useUser } from '@clerk/nextjs';

// const fetcher = (url : any) => fetch(url).then((res) => {res.json})
export default function Home() {

  // const {data , error, isLoading} = useSWR(`http://localhost:3000/api/all?userId=veena`, fetcher)

  const { isSignedIn, user, isLoaded } = useUser()
  const uId = user?.id
  const [users, setUsers] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  async function fetchUsers() {
    setIsLoading(true);
    const res = await fetch(`http://localhost:3000/api/all?userId=${uId}`, { cache: 'no-store' });
    setUsers(await res.json())
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [uId]);


  // return (
  //   <main className=' h-full'>
  //     <h1 className=' text-3xl pl-10 pt-5 border-0 border-b-2 border-b-success w-fit pb-2 pr-4'>All tasks</h1>

  //   {/* {
  //     !users || !users.tasks ? <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid grid-cols-3'><Skeleton/></div> : (
  //       <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid grid-cols-3'>
  //         {users?.tasks.map((user: any, id: number) => {
  //           return (
  //             <div key={id}>
  //               <Card uId={uId} id={user._id} title={user.taskTitle} desc={user.taskDesc} func={fetchUsers}/>
  //             </div>
  //           );
  //         })}
  //         <AddCard uId={uId} func={fetchUsers}/>
  //       </div>
        
  //     )
  //   } */}

  //   {/* <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid grid-cols-3'>
  //     {users?.tasks && users.tasks.map((user: any, id: number) => {
  //       return (
  //         <div key={id}>
  //           <Card uId={uId} id={user._id} title={user.taskTitle} desc={user.taskDesc} func={fetchUsers}/>
  //         </div>
  //       );
  //     })}
  //     <AddCard uId={uId} func={fetchUsers}/>
  //   </div> */}

  //   {!users ? (
  //     <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid grid-cols-3'>
  //       <Skeleton />
  //     </div>
  //   ) : (
  //     <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid grid-cols-3'>
  //       {users.tasks?.map((user: any, id: number) => (
  //         <div key={id}>
  //           <Card uId={uId} id={user._id} title={user.taskTitle} desc={user.taskDesc} func={fetchUsers} />
  //         </div>
  //       ))}
  //       <AddCard uId={uId} func={fetchUsers} />
  //     </div>
  //   )}
  //   </main>
  // )

  if (isLoading) {
    return (
      <>
      <h1 className='text-3xl pl-10 pt-5 border-0 border-b-2 border-b-success w-fit pb-2 pr-4'>All tasks</h1>
      <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      </>
    );
  }

  return (
    <main className='h-full'>
      <h1 className='text-3xl pl-10 pt-5 border-0 border-b-2 border-b-success w-fit pb-2 pr-4'>All tasks</h1>
      <div className='m-2 p-2 mt-10 h-5/6 overflow-y-scroll grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {users.tasks?.map((user: any, id: number) => (
          <div key={id}>
            <Card uId={uId} id={user._id} title={user.taskTitle} desc={user.taskDesc} comp={user.comp} imp={user.imp} archive={user.archive} func={fetchUsers} />
          </div>
        ))}
        <AddCard uId={uId} func={fetchUsers} />
      </div>
    </main>
  );

}

// export default Home
