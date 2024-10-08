import React, { useState } from 'react'

const CarTable = ({ brandData }) => {
  const [isTableVisible, setIsTableVisible] = useState(true)
  const [sortDirection, setSortDirection] = useState('asc')

  const handleToggleTable = () => {
    setIsTableVisible(!isTableVisible)
  }

  const handleSort = () => {
    setSortDirection((prevDirection) =>
      prevDirection === 'asc' ? 'desc' : 'asc'
    )
  }

  const sortedBrandData = Object.entries(brandData).sort(([brandA], [brandB]) =>
    sortDirection === 'asc'
      ? brandA.localeCompare(brandB)
      : brandB.localeCompare(brandA)
  )

  return (
    <div className='px-10 mt-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Car Statistics
        </h2>
        <button
          onClick={handleSort}
          className='px-4 py-2 bg-green-500 text-white rounded ml-4 '
        >
          Sort by Brand ({sortDirection === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
        {!isTableVisible && (
          <button
            onClick={handleToggleTable}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            &darr;  Toggle Table
          </button>
        )}
        {isTableVisible && (
          <button
            onClick={handleToggleTable}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            &uarr;  Toggle Table
          </button>
        )}

      </div>

      {isTableVisible && (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
            <thead>
              <tr className='text-left bg-gray-200'>
                <th className='py-3 px-4 border-b font-semibold text-gray-600 text-center'>
                  Brand
                </th>
                <th className='py-3 px-4 border-b font-semibold text-gray-600 text-center'>
                  Model
                </th>
                <th className='py-3 px-4 border-b font-semibold text-gray-600 text-center'>
                  Number of Cars
                </th>
                <th className='py-3 px-4 border-b font-semibold text-gray-600 text-center'>
                  Total Value (Baht)
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBrandData.map(([brand, data]) => (
                <tr key={brand}>
                  <td className='py-3 px-4 border-b text-center'>{brand.split(' ')[0]}</td>
                  <td className='py-3 px-4 border-b text-center'>
                    {brand.split(' ').slice(1).join(' ')}
                  </td>
                  <td className='py-3 px-4 border-b text-center'>{data.count}</td>
                  <td className='py-3 px-4 border-b text-center'>{data.totalValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CarTable
