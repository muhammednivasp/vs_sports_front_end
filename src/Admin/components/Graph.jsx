import React, { useEffect, useState } from 'react';
import { adminApi } from '../../utils/api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend);



function Graph() {

  const [users, setUsers] = useState(0);
  const [clubs, setClubs] = useState(0);

  const data = {
    labels: ['Users','Clubs'],
    datasets: [
      {
        label: 'Poll',
        data: [clubs,users], // Updated data values for example
        backgroundColor: ['blue', 'yellow'],
        borderColor: ['yellow', 'blue'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };


  useEffect(() => {
    const datafetch = async () => {
      const { data } = await adminApi.get('/userscount', { withCredentials: true });
      const clubdata = await adminApi.get('/clubscount', { withCredentials: true });
      console.log(clubdata,"klklldsds");
      console.log(data, 'lklklklkk');
      setUsers(data.count);
      setClubs(clubdata.data.count)
    };
    datafetch();
  }, []);

  return (
    <div className="mx-auto mt-10 md:mt-16 bg-white md:h-[42rem] h-[32rem] p-2 pt-12 md:p-8">
      <div className="flex flex-col md:flex-row md:-mx-2">
        <div className="w-full md:w-1/2 md:px-2 mb-4 md:mb-0">
          <div className="md:w-full w-[22rem] h-[10rem] bg-blue-200 p-4 md:p-6 text-center">
            <h1 className="text-3xl">Users</h1>
            <h1 className="text-3xl mt-2">{users}</h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:px-2 mb-4 md:mb-0">
          <div className="md:w-full w-[22rem] h-[10rem] bg-blue-200 p-4 md:p-6 text-center">
            <h1 className="text-3xl">Clubs</h1>
            <h1 className="text-3xl mt-2">{clubs}</h1>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/2 md:px-2 mb-4 md:mb-0">

      <div className="mt-6">
        <div className=" w-[20rem] h-[20rem] md:h-[40rem] bg-white p-4 md:p-8">
          <Doughnut data={data} options={options} />
        </div>
      </div>
      </div>

    </div>
  );
}

export default Graph;
