import React, { useState } from 'react'
import Logo from '../components/Logo'
import Repo from '../components/Repo'
import UserWithRepo from '../components/UserWithRepo'

const Home = () => {
  const [searchRepo ,setSearchRepo] = useState<[]>([])
  const [username ,setUsername] = useState<string>("")
  const [category ,SetCategory] = useState<string>("username")

  const handleSubmitUsername = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // https://api.github.com/search/repositories?q=${query}
    switch (category) {
      case "username":
        const res_username = await fetch(`https://api.github.com/search/users?q=${username}`,{
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          }
        })
        const data_ : any = await res_username.json()
        setSearchRepo(data_.items)
        break;
      case "repository":
        const res = await fetch(`https://api.github.com/search/repositories?q=${username}`,{
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          }
        })
        const data: any = await res.json()
        setSearchRepo(data.items)
        break;
      default:
        break;
    }
  }

  return (
    <div className={`flex flex-col items-center bg-gradient-to-r from-teal-500 to-green-400 ${searchRepo && searchRepo?.length > 0 ? "h-max" : "h-screen"}`}>
      <Logo />
      <h1 className="text-white text-4xl font-bold my-5 drop-shadow-lg">Github Repository Search App</h1>
      <div className="bg-teal-200 rounded-md sticky top-3 drop-shadow-md">
        <form className="flex flex-row justify-between items-center p-3" onSubmit={handleSubmitUsername} >
          <label htmlFor="" className="text-lg font-semibold">
              Search Repository
              <input type="text" placeholder='Push username or repository here' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} name="repository" id="" className="w-96 bg-slate-100 p-2 mx-2 text-lg font-normal outline-none shadow-sm shadow-gray-400" />
          </label>
          <label htmlFor="">
            <select onChange={(event) => SetCategory(event.target.value)} name="" id="" className='p-2 mx-2 text-lg font-semibold shadow-sm shadow-gray-400 bg-slate-100 outline-none cursor-pointer'>
              <option value="username">Username</option>
              <option value="repository">Repository</option>
            </select>
          </label>
          <label htmlFor="">
              <button type="submit" className="p-3 mx-2 text-base font-semibold text-white bg-gradient-to-r from-green-300 to-red-400 rounded-md active:from-red-400 hover:scale-110 active:to-teal-300 transition-all duration-300 ease-out">Search</button>
          </label>
        </form>
      </div>
      {
        category === "username" ?
        <UserWithRepo searchRepo={searchRepo} />
        :
        <Repo searchRepo={searchRepo} />
      }
    </div>
  )
}

export default Home