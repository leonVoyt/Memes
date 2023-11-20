import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import tumbler from '../../../public/тумблеры.svg'
import tumbleroff from '../../../public/тумблер OFF.svg'
import deleteBtn from '../../../public/delete.svg'
import dragBtn from '../../../public/drag.svg'
import { CategoryItem } from '../page'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = 'ITEM'

const Category: FC<CategoryProps> = ({
  category,
  update,
  index,
  moveItem,
  setUpdatedCategories,
  openModal,
  isCloseModal,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id: category.id, index },
  })
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })
  useEffect(() => {
    handleSetDefault()
  }, [isCloseModal])
  const [isVisible, setIsVisible] = useState(category.isVisible)
  const [inputValue, setInputValue] = useState('')

  const handleDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`/api/categories/${id}`)
      update()
    } catch (error) {
      console.error('Error deleting category:')
    }
  }

  const handleUpdateCategory = async () => {
    openModal()
    setUpdatedCategories((prev) => {
      // Check if the category with the same id already exists in the array
      const existingIndex = prev.findIndex(
        (item: CategoryItem) => item.id === category.id
      )

      // If the category exists, update it; otherwise, add a new one
      if (existingIndex !== -1) {
        const updatedItems = [...prev]
        updatedItems[existingIndex] = {
          id: category.id,
          title: inputValue !== '' ? inputValue : category.title,
          isVisible,
        }
        return updatedItems
      } else {
        return [
          ...prev,
          {
            id: category.id,
            title: inputValue !== '' ? inputValue : category.title,
            isVisible: !isVisible,
          },
        ]
      }
    })
    update()
  }
  const handleSetDefault = () => {
    setIsVisible(category.isVisible)
    setInputValue('')
  }

  return category.id !== 0 ? (
    <>
      <div className=" bg-categories w-full h-[50px] flex justify-between px-5 items-center bg-bg border-4 border-categoriesBorder rounded-md ">
        {category.title ? (
          <span>{category.title}</span>
        ) : (
          <input
            type="text"
            value={inputValue}
            className="bg-transparent "
            placeholder="Enter Category Name"
            onChange={(e) => {
              setInputValue(e.target.value)
              handleUpdateCategory()
            }}
          />
        )}
        <div className="flex gap-5">
          <button
            className="pointer-events-auto"
            onClick={() => {
              setIsVisible(!isVisible)
              handleUpdateCategory()
            }}
          >
            <Image alt="" src={isVisible ? tumbler : tumbleroff} />
          </button>
          <button
            className="pointer-events-auto"
            onClick={() => handleDeleteCategory(category.id)}
          >
            <Image alt="" src={deleteBtn} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto"
            ref={(node) => ref(drop(node))}
          >
            <Image alt="" src={dragBtn} />
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className=" bg-categories w-full h-[50px] flex justify-between px-5 items-center bg-bg border-4 border-categoriesBorder rounded-md ">
        <span>{category.title}</span>

        <div className="flex gap-5">
          <button
            className="pointer-events-auto"
            onClick={() => {
              setIsVisible(!isVisible)
              handleUpdateCategory()
            }}
          >
            <Image alt="" src={isVisible ? tumbler : tumbleroff} />
          </button>
          <div
            className=" opacity-0 pointer-events-none"
            onClick={() => handleDeleteCategory(category.id)}
          >
            <Image alt="" src={deleteBtn} />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" opacity-0 pointer-events-none"
          >
            <Image alt="" src={dragBtn} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Category

type CategoryProps = {
  category: CategoryItem
  update: () => void
  index: number
  moveItem: (a: number, b: number) => void
  setUpdatedCategories: Dispatch<SetStateAction<CategoryItem[]>>
  openModal: () => void
  isCloseModal: boolean
}
