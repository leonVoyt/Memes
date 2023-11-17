'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Category from './components/Category'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from './components/Header'

const Page = () => {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([])
  const [update, setUpdate] = useState(false)
  const [quary, setQuary] = useState('')
  const [updatedCategories, setUpdatedCategories] = useState<CategoryItem[]>([])
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async () => {
    try {
      await axios.post('/api/categories')
      handleUpdate()
    } catch (error) {
      console.error(error)
    }
  }
  const handleUpdate = async () => {
    setUpdate(!update)
  }

  const handleUpdatedCategories = async () => {
    try {
      await axios.put('/api/categories', updatedCategories)
      closeModal()
      handleUpdate()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/categories?q=${quary}`)

      // Load the saved order from local storage
      const storedOrder = localStorage.getItem('categoriesOrder')
      const categoriesOrder = storedOrder ? JSON.parse(storedOrder) : []

      // Match the loaded order with fetched categories
      const updatedCategoriesList = response.data.map((category) => {
        const matchingOrder = categoriesOrder.find(
          (item) => item.id === category.id
        )
        return matchingOrder
          ? { ...category, order: matchingOrder.order }
          : category
      })
      setCategoriesList(updatedCategoriesList)
    }
    fetchData()
    //
  }, [quary, update])
  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setUpdatedCategories([])
    setShowModal(false)
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    setCategoriesList((prevCategoriesList: CategoryItem[]) => {
      const updatedItems = [...prevCategoriesList]
      // const updatedItems = prevCategoriesList

      const [movedItem] = updatedItems.splice(fromIndex, 1)
      updatedItems.splice(toIndex, 0, movedItem)
      const updatedOrder = updatedItems.map((el, index) => {
        return { ...el, order: index }
      })
      localStorage.setItem('categoriesOrder', JSON.stringify(updatedOrder))
      return updatedOrder
    })
  }
  console.log(categoriesList)

  return (
    <>
      <Header setQuary={setQuary} />
      <div className="text-white flex w-full items-start justify-center pt-10 ">
        <div className="w-[638px] flex flex-col gap-3">
          <button
            className="bg-addCategoriesBtn w-full h-[50px]"
            onClick={handleSubmit}
          >
            + Create a Category
          </button>
          <DndProvider backend={HTML5Backend}>
            <div>
              {categoriesList
                .sort((a, b) => a.order - b.order)
                .map((el, index) => (
                  <Category
                    key={el.id}
                    category={el}
                    update={handleUpdate}
                    index={index}
                    moveItem={moveItem}
                    setUpdatedCategories={setUpdatedCategories}
                    openModal={openModal}
                  />
                ))}
              {/* {categoriesList.find((el) => el.id === 1)?.title} */}
              {/* <Category
                key={categoriesList.find((el) => el.id === 1)?.id}
                category={categoriesList.find((el) => el.id === 1)}
                update={handleUpdate}
                index={0}
                moveItem={moveItem}
              /> */}
            </div>
          </DndProvider>
        </div>
        <div
          className={`flex px-[309px] justify-between items-center gap-7 bg-categories fixed bottom-0 w-screen left-0 ${
            !showModal && 'hidden'
          }`}
        >
          <button
            className="bg-green-600 rounded-sm h-16 w-full my-5"
            onClick={() => handleUpdatedCategories()}
          >
            Save Changes
          </button>
          <button
            className="border-4 rounded-sm border-categoriesBorder h-16 w-full my-5"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default React.memo(Page)

export type CategoryItem = {
  id: number
  title: string
  isVisible: boolean
  order?: number
}
