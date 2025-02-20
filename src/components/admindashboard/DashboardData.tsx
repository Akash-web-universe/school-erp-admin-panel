import React from 'react'

const DashboardData = () => {
  return (
    <div className='grid grid-cols-12 p-7 space-x-4'>
        <div className='col-span-4 shadow-lg flex  flex-col justify-center items-center bg-gradient-to-r  from-[#9d6d2d]  to-[#e7ae59] rounded-[1rem] rounded-br-[1rem] p-[1rem]'>
            <h3 className='text-[3rem] font-bold'>1299</h3>
            <h6 className='text-[1.5rem]'>Students</h6>
        </div>
        <div className='col-span-4 shadow-lg flex  flex-col justify-center items-center bg-gradient-to-r  from-[#6bf3d3]  to-[#3baade] rounded-[1rem] rounded-br-[1rem] p-[1rem]'>
            <h3 className='text-[3rem] font-bold'>400</h3>
            <h6 className='text-[1.5rem]'>Students</h6>
        </div>
        <div className='col-span-4 shadow-lg flex  flex-col justify-center items-center bg-gradient-to-r  from-[#f4939f]  to-[#f4bb93] rounded-[1rem] rounded-br-[1rem] p-[1rem]'>
            <h3 className='text-[3rem] font-bold'>4267</h3>
            <h6 className='text-[1.5rem]'>Students</h6>
        </div>
        
        
    </div>
  )
}

export default DashboardData