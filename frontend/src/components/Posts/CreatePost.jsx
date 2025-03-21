import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import { useMutation } from '@tanstack/react-query'
import { createPostAPI } from '../../APIServices/posts/postsAPI'
import AlertMessage from '../Alert/AlertMessage';
import { FaTimesCircle } from 'react-icons/fa';

const CreatePost = () => {
  //state for the wysiwyg 
  const [description, setDescription] = useState('')

  const [imageError, setImageError] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  //post mutation
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI
  })

  const formik = useFormik({
    initialValues: {
      //title: '',
      description: '',
      image: ''
    },
    validationSchema: Yup.object({
      //title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      image: Yup.string().required('Image is required')
    }),
    onSubmit: values => {
      //form data
      const formData = new FormData()
      formData.append('description', description)
      formData.append('image', values.image)
      postMutation.mutate(formData)
    }
  })

  //file upload logic
  //handle file change
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0]
    const fileSize = file.size / 1024 / 1024
    if (file.size > 1048576) {
      setImageError('Image size exceeds 1MB')
      return
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      setImageError('Image format is not supported')
      return
    }
    else {
      formik.setFieldValue('image', file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  //remove image
   const removeImage = () => {
     formik.setFieldValue('image', null)
     setImagePreview(null)
     setImageError('')
  }


  //get loading state
  const isLoading = postMutation.isPending
  //get error state
  const isError = postMutation.isError
  //get success
  const isSuccess = postMutation.isSuccess
  //error
  const errorMsg = postMutation?.error?.response?.data?.message



  //Show messages to the user
  //for Loading
  //for Error
  if (isError) return <AlertMessage type='error' message={errorMsg} />
  //No Post found

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Add New Post
        </h2>
        {/* show alert */}

        {isLoading && <AlertMessage type='loading' message='Loading Please Wait' />}
        {isSuccess && <AlertMessage type='success' message='Post Created Successfully' />}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Description Input - Using ReactQuill for rich text editing */}
          <div className="mb-12">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue("description", value);
              }}
              className='h-40'
            />
            {/* display err msg */}
            {formik.touched.description && formik.errors.description && (
              <span style={{ color: "red" }}>{formik.errors.description}</span>
            )}
          </div>

          {/* Category Input - Dropdown for selecting post category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            {/* display error */}
            {/* {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600">{formik.errors.category}</p>
            )} */}
          </div>

          {/* Image Upload Input - File input for uploading images */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <div className="flex justify-center items-center w-full">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              >
                Choose a file
              </label>
            </div>
            {/* Display error message */}
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-600">{formik.errors.image}</p>
            )}

            {/* error message */}
            {imageError && <p className="text-sm text-red-600">{imageError}</p>}

            {/* Preview image */}

            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button - Button to submit the form */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost