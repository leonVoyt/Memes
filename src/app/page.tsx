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

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/categories?q=${quary}`)

      setCategoriesList(response.data)
    }
    fetch()
  }, [quary, update])

  const moveItem = (fromIndex: number, toIndex: number) => {
    setCategoriesList((prevCategoriesList) => {
      const updatedItems = [...prevCategoriesList]
      const [movedItem] = updatedItems.splice(fromIndex, 1)
      updatedItems.splice(toIndex, 0, movedItem)
      return updatedItems
    })
  }

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
              {categoriesList.map(
                (el, index) =>
                  el.id !== 0 && (
                    <Category
                      key={el.id}
                      category={el}
                      update={handleUpdate}
                      index={index}
                      moveItem={moveItem}
                    />
                  )
              )}
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
      </div>
    </>
  )
}

export default React.memo(Page)

export type CategoryItem = {
  id: number
  title: string
  isVisible: boolean
}
