import React, { useState } from 'react'

import fiveimg from '../../assets/images/player/fiveimg.avif'
import secondimg from '../../assets/images/player/secondimg.webp'
import threeimg from '../../assets/images/player/threeimg.avif'
import bw2 from '../../assets/images/player/bw2.avif'
import bw1 from '../../assets/images/player/bw1.jpg'
import blackyone from '../../assets/images/player/blacky1.avif'
import blackytwo from '../../assets/images/player/blackycenter.avif'
import blackythree from '../../assets/images/player/blackyright.avif'

import { useLocation, useNavigate } from 'react-router-dom'

function Tournaments({ data }) {

  const [tournamentModal, setModal] = useState(false)
  const Navigate = useNavigate()

  const Tournamentsview = (data) => {
    Navigate((data === 'user' ? '/user/tournamentpage' : '/club/tournamentpage'), { state: data })
  }

  const ClubsView = (data) => {
    Navigate((data === 'user' ? '/user/clubspage' : '/club/clubspage'), { state: data })
  }
  const UpcomingMatchesview = (data) => {
    Navigate((data === 'user' ? '/user/upcomingpage' : '/club/upcomingpage'), { state: data })
  }

  return (

    <div className="mt-4 relative">
      <h1 className="text-5xl font-extrabold tracking-tight text-center"></h1>
      <ul className="mt-10 pb-8 px-[4rem] w-full flex overflow-x-auto gap-4 snap-x">
        <li className="snap-center">
          <button onClick={() => Tournamentsview(data)}>
            <div className="relative flex-shrink-0 h-80 max-w-[95vw] overflow-hidden rounded-3xl mb-20 bg-cover bg-center" style={{ backgroundImage: `url(${blackyone})` }}>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black/75"></div>
              <div className="relative h-40 w-[580px] p-12 flex flex-col justify-between items-start">
                <div>
                  <p className="font-medium text-white">explore</p>
                  <h1 className="mt-3 w-3/3 text-3xl font-semibold tracking-tight text-white">Tournaments</h1>
                </div>
                <h1
                  href="#"
                  className="px-4 py-3 rounded-lg bg-black text-red-200 text-sm font-medium"

                >
                  Browse Destinations
                </h1>
              </div>
            </div>
          </button>
        </li>
        <li className="snap-center">
          <button onClick={() => UpcomingMatchesview(data)}>
            <div className="relative flex-shrink-0 h-80 max-w-[95vw] overflow-hidden rounded-3xl mb-20 bg-cover bg-center" style={{ backgroundImage: `url(${blackytwo})` }}>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black/75"></div>
              <div className="relative h-40 w-[580px] p-12 flex flex-col justify-between items-start">
                <div>
                  <p className="font-medium text-white">show</p>
                  <h2 className="mt-3 w-3/3 text-3xl font-semibold tracking-tight text-white">Upcoming Matches</h2>
                </div>
                <a href="#" className="px-4 py-3 rounded-lg bg-white text-slate-900 text-sm font-medium">
                  Browse Destinations
                </a>
              </div>
            </div>
          </button>
        </li>
        <li className="snap-center">
          <button onClick={() => ClubsView(data)}>
            <div className="relative flex-shrink-0 h-80 max-w-[95vw] overflow-hidden rounded-3xl mb-20 bg-cover bg-center" style={{ backgroundImage: `url(${blackythree})` }}>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-black/75"></div>
              <div className="relative h-40 w-[580px] p-12 flex flex-col justify-between items-start">
                <div>
                  <p className="font-medium text-white">Find</p>
                  <h2 className="mt-3 w-3/3 text-3xl font-semibold tracking-tight text-white">
                    Club & Club Details
                  </h2>
                </div>
                <a href="#" className="px-4 py-3 rounded-lg bg-white text-slate-900 text-sm font-medium">
                  Browse Destinations
                </a>
              </div>
            </div>
          </button>
        </li>
      </ul>

      {tournamentModal && (
        <div className="inset-0 fixed flex justify-center items-center">
          <div className="w-full sm:w-1/2 lg:w-2/5 px-4">
            <div className="mb-2">
              <div className="bg-card-bg bg-cover bg-center text-white p-12 rounded-lg bg-black mt-4">
                <button
                  className="text-red-500 border-2 px-4 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider"
                  onClick={() => setModal(false)}
                >
                  Close
                </button>
                <h1 className="text-center font-bold text-xl text-yellow-300">
                  Add Tournament
                </h1>

                <h1 className="text-lg font-semibold">Tournament</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 flex items-center text-xl justify-center w-full px-2"
                  type='text' name='tournamentname' placeholder="Tournament Name"
                />
                <h1 className="text-lg font-semibold">Location</h1>
                <input
                  className="bg-green-600 h-12 mb-4 bg-opacity-60 items-center flex text-xl justify-center w-full px-2"
                  type='text' name='location' placeholder='Location'
                />

                <h1 className="text-lg font-semibold">Tournament Type</h1>

                <select className="bg-green-600 h-12 mb-4  bg-opacity-60 items-center flex text-xl justify-center w-full px-2" id="tournamenttype" name="tournamenttype" >

                  <option value=''  >Category</option>
                  <option className='text-black font-medium' value="League">League</option>
                  <option className='text-black font-medium' value="Nockout">Nockout</option>
                  <option className='text-black font-medium' value="Combo">Combo</option>
                </select>

                <div className="flex justify-center">
                  <button className="bg-white text-gray-800 px-4 py-2 m-2 rounded-lg w-32 font-semibold text-lg hover:text-red-400 hover:tracking-wider" >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default Tournaments