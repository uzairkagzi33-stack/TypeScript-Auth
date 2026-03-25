import { Link } from "@tanstack/react-router";

export default function ForgetPassword({ linkTo, linkText }) {
  return (
    <div
    className='flex items-center justify-between px-1 w-93.25 h-5'
    >
    <div 
    className='w-45 h-5 flex items-center'
    >

    <input
    type='checkbox'
    id='cb1'
    className='bg-blue-600'
    />
    <label
    htmlFor='cb1'
    className='text-slate-900 ml-2 text-[13px] leading-5'
    >
        Keep me logged in
    </label>
    </div>
    <div 
    className='text-slate-900  text-center h-5 text-[13px] leading-5 underline cursor-pointer hover:text-blue-600 active:text-blue-800'>
    <Link to={linkTo}>{linkText}</Link>
    </div>

    </div>
  )
}