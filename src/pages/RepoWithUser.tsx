import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RepoProps } from '../types/Props.type'
import Logo from '../components/Logo'

type Url = string

const RepoWithUser: React.FC<RepoProps> = () => {
    // https://api.github.com/users/${firstUser}/repos
    const {users} = useParams()
    const [searchRepo ,setSearchRepo] = useState<[]>([])
    useEffect(() => {
        (async() => {
            const res_username = await fetch(`https://api.github.com/users/${users}/repos`,{
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
                }
                })
            const data_ : any = await res_username.json()
            setSearchRepo(data_)
        })()
    },[users])
    const handleClickToRepo = (url: Url) => {
        window.open(url ,'_blank')
    }
  return (
    <div className='flex flex-col items-center bg-gradient-to-r from-teal-500 to-green-400'>
        <div className='flex flex-col items-center m-5'>
            <Logo />
            <h1 className="text-white text-4xl font-bold my-5 drop-shadow-lg uppercase">{users}</h1>
        </div>
        {
          searchRepo && searchRepo?.length > 0 ?
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row bg-gradient-to-r from-teal-200 to-green-200 my-5">
            {
              searchRepo?.map((data: any) => (
                <div className='bg-white rounded-md m-5 text-lg flex flex-col justify-between p-3 w-80' >
                  <div className='flex flex-col'>
                    <div className='bg-gradient-to-r from-green-300 to-teal-200 flex flex-row justify-start p-3 w-full text-wrap'>
                      <p><p className='text-xl font-bold'>Title</p> {data.name}</p>
                    </div>
                    <div>
                      <img src={data.owner.avatar_url} alt="" className='w-full h-auto rounded-m object-cover' />
                    </div>
                    <div className='flex flex-col justify-start px-3 py-2'>
                      <p className='text-xl font-semibold my-2'>Description</p> 
                      <p className='text-wrap h-40 overflow-y-scroll' style={{msOverflowStyle:'none',scrollbarWidth:'none'}}>{data.description === null ? "No Description." : data.description}</p>
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Owner</p> {data.owner.login}</p>
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Archived</p> {data.archived === true ? "Archived" : "Not Archived"}</p>
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Create At</p> {data.created_at.slice(0,10)}</p>
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Push At</p> {data.pushed_at.slice(0,10)}</p>
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Update At</p> {data.updated_at.slice(0,10)}</p>
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Watcher</p> {data.watchers}</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-end'>
                    <button className='p-3 w-full bg-gradient-to-b from-slate-100 to-green-200 active:bg-gradient-to-t active:from-slate-100 active:to-green-200' onClick={() => handleClickToRepo(data.html_url)}>View Repository</button>
                  </div>
                </div>
              ))
            }
          </div>
          :
          <div className='bg-gradient-to-r from-red-200 to-green-200 p-3 text-2xl font-semibold rounded-md drop-shadow-md my-4'>
            <h1>Welcome To Github Finder</h1>
          </div>
        }
    </div>
  )
}

export default RepoWithUser