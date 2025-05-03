import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import './postCss.css'
import { fetchAllPosts } from '../../APIServices/posts/postsAPI'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { deletePostAPI } from '../../APIServices/posts/postsAPI'
import NoDataFound from '../Alert/NoDataFound'
import AlertMessage from '../Alert/AlertMessage'
import PostCategory from '../Category/PostCategory'
import { fetchCategoriesAPI } from '../../APIServices/category/categoryAPI'
import { FaSearch } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'
import truncateString from '../../utils/truncateString'

const PostsList = () => {
  //filter state
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['lists-posts', { ...filters, page }],
    queryFn: () => fetchAllPosts({ ...filters, title: searchTerm, page, limit: 10 }),
  })

  //category filter handler
  const handleCategoryFilter = (categoryId) => {
    setFilters({ ...filters, category: categoryId })
    setPage(1)
    refetch()
  }

  //search handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  //handle submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setFilters({ ...filters, title: searchTerm })
    setPage(1)
    refetch()
  }
  //handle clear filters handler
  const clearFilters = () => {
    setFilters({})
    setSearchTerm('')
    setPage(1)
    refetch()
  }

  //handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage)
    refetch()
  }

  const postMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePostAPI
  })
  //Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['category-lists'],
    queryFn: fetchCategoriesAPI
  })
  // console.log(categoriesData);

  //delete handler
  // const deleteHandler = async (postId) => {
  //     postMutation.mutateAsync(postId).then(()=>{
  //         refetch()
  //     }).catch((e)=>console.log(e))
  // }

  // Show messages to the user
  // for Loading
  // if(isLoading) return <AlertMessage type='loading' message='Loading Please Wait'/>
  // for Error
  // if(isError) return <AlertMessage type='error' message='Something wrong happened'/>
  // No Post found
  // if(data?.posts?.length <= 0) return <NoDataFound/>

  // console.log(data)
  return (
    <section className="overflow-hidden bg-gray-50 min-h-screen">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-extrabold font-heading text-center mb-6 mt-16 text-gray-800">
          Blog Nest
        </h1>

        <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">
          Latest Articles
        </h2>

        {/* Searching Feature */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row items-center gap-2 mb-6 max-w-2xl mx-auto"
        >
          <div className="flex-grow flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search post"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-r-full"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-orange-500 border border-orange-500 rounded-full hover:bg-orange-50 flex items-center gap-1"
          >
            <MdClear className="h-4 w-4" />
            Clear Filters
          </button>
        </form>

        {/* Show Alert */}
        {data?.posts?.length <= 0 && <NoDataFound text='No Post Found' />}
        {isError && <AlertMessage type='error' message='Something wrong happened' />}
        {isLoading && <AlertMessage type='loading' message='Loading Please Wait' />}

        {/* Post category */}
        <PostCategory
          categories={categoriesData}
          onCategorySelect={handleCategoryFilter}
          onClearFilters={clearFilters}
        />

        {/* Posts */}
        <div className="flex flex-wrap mb-32 -mx-4 justify-center">
          {data?.posts?.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Link to={`/posts/${post._id}`}>
                <div className="bg-white border border-gray-100 hover:border-orange-500 transition-all duration-300 rounded-2xl h-full p-4 shadow-sm hover:shadow-md">
                  <div className="relative h-60 rounded-2xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={post?.image?.path}
                      alt={post?._id}
                    />
                  </div>
                  <div className="pt-4">
                    <div
                      className="text-sm text-gray-700 mb-3 rendered-html-content"
                      dangerouslySetInnerHTML={{ __html: truncateString(post?.description, 150) }}
                    />
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="text-gray-400">&bull;</span>
                      <span className="py-1 px-2 rounded border text-gray-600">
                        {post?.category?.categoryName}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center my-8 space-x-4">
          {page > 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Previous
            </button>
          )}

          <span className="text-sm font-semibold text-gray-700">
            Page {page} of {data?.totalPages}
          </span>

          {page < data?.totalPages && (
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default PostsList
