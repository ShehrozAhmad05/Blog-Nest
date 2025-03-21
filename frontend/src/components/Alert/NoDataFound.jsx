// import React from 'react'

// const NoDataFound = () => {
//   return (
//     <div className='text-center mt-6'>
//         <h2>
//             No Post Found
//         </h2>
//     </div>
//   )
// }

// export default NoDataFound

import React from 'react';
import { FaRegSadTear } from 'react-icons/fa'; // Import an icon for better UI
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom';

const NoDataFound = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-12 text-gray-600">
            <FaRegSadTear className="text-6xl text-gray-400 mb-4" /> {/* Sad face icon */}
            <h2 className="text-2xl font-semibold">No Posts Found</h2>
            <p className="text-gray-500 mt-2 mb-2">
                It looks like there are no posts available. Try creating a new one!
            </p>
            <Link
                to="/create-post"
                className="relative inline-flex items-center gap-x-1.5 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 animate-pulse"
            >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Create Post
            </Link>
        </div>
    );
};

export default NoDataFound;
