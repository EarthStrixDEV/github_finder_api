import React from 'react'
import { RepoProps } from '../types/Props.type'
import { useNavigate } from 'react-router-dom'

const UserWithRepo: React.FC<RepoProps> = ({searchRepo}) => {
    const navigate = useNavigate()
    const navigateToRepoWithUser = (users: string) => {
        navigate(`/${users}`)
    }
  return (
    <div>
        {
          searchRepo && searchRepo?.length > 0 ?
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row bg-gradient-to-r from-teal-200 to-green-200 my-5">
            {
              searchRepo?.map((data: any) => (
                <div className='bg-white rounded-md m-5 text-lg flex flex-col justify-between p-3 w-80' >
                  <div className='flex flex-col'>
                    <div className='bg-gradient-to-r from-green-300 to-teal-200 flex flex-row justify-start p-3 w-full text-wrap'>
                      <p><p className='text-xl font-bold'>Title</p> {data.login}</p>
                    </div>
                    <div>
                      <img src={data.avatar_url} alt="" className='w-full h-auto rounded-m object-cover' />
                    </div>
                    <div className='flex flex-row justify-start px-3 py-2'>
                      <p><p className='text-xl font-semibold'>Type</p> {data.type}</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-end'>
                    <button onClick={() => navigateToRepoWithUser(data.login)} className='p-3 w-full bg-gradient-to-b from-slate-100 to-green-200 active:bg-gradient-to-t active:from-slate-100 active:to-green-200'>View Repository</button>
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

export default UserWithRepo