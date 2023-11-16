import React, { FC, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import tumbler from '../../../public/тумблеры.svg'
import tumbleroff from '../../../public/тумблер OFF.svg'
import deleteBtn from '../../../public/delete.svg'
import dragBtn from '../../../public/drag.svg'
import { CategoryItem } from '../page'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = 'ITEM'

const Category: FC<CategoryProps> = ({ category, update, index, moveItem }) => {
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

  const [isVisible, setIsVisible] = useState(category.isVisible)
  const [inputValue, setInputValue] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`/api/categories/${id}`)
      update()
    } catch (error) {
      console.error('Error deleting category:')
    }
  }
  const handleUpdateCategory = async (id: number) => {
    try {
      await axios.patch(`/api/categories/${id}`, {
        isVisible,
        title: inputValue,
      })
      update()
      setShowModal(false) // Close the modal after updating
      return { id, isVisible, title: inputValue }
    } catch (error) {
      console.error('Error updating category:')
    }
  }

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
    setIsVisible(category.isVisible)
    setInputValue('')
  }
  console.log(1)

  return (
    <>
      <div
        ref={(node) => ref(drop(node))}
        className=" bg-categories w-full h-[50px] flex justify-between px-5 items-center bg-bg border-4 border-categoriesBorder rounded-md "
      >
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
              openModal()
            }}
          />
        )}
        <div className="flex gap-5">
          <button
            className="pointer-events-auto"
            onClick={() => {
              setIsVisible(!isVisible)
              openModal()
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
          >
            <Image alt="" src={dragBtn} />
          </button>
        </div>
      </div>
      <div
        className={`flex px-[309px] justify-between items-center gap-7 bg-categories fixed bottom-0 w-screen left-0 ${
          !showModal && 'hidden'
        }`}
      >
        <button
          className="bg-green-600 rounded-sm h-16 w-full my-5"
          onClick={() => handleUpdateCategory(category.id)}
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
    </>
  )
}

export default Category

type CategoryProps = {
  category: CategoryItem
  update: () => void
  index: number
  moveItem: (a: number, b: number) => void
}
