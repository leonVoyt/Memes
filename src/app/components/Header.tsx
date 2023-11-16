import React, { FC } from 'react'
import logo from '../../../public/Logo (1).svg'
import Image from 'next/image'

const Header: FC<HeaderProps> = ({ setQuary }) => {
  return (
    <>
      <div className=" px-[311px] flex w-screen flex-col ">
        <header className="flex justify-between items-center">
          <div className="flex text-center items-center font-bold gap-2.5 text-3xl h-[76px]  w-full">
            <Image src={logo} alt="" />
            <span>Memes</span>
          </div>
          <input
            type="text"
            placeholder="search"
            className="h-10 w-[380px] text-white bg-categories pl-5"
            onChange={(e) => setQuary(e.target.value)}
          />
        </header>
      </div>
      <hr className="border-hrLine" />
    </>
  )
}

export default Header

type HeaderProps = {
  setQuary: (e: string) => void
}
