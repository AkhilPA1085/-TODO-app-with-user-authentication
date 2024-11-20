import React from 'react'
import { ButtonType } from '../../types/definitions'
import Link from 'next/link'
import { TrashIcon, 
  PlusIcon, 
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon
 } from '@heroicons/react/24/outline'

const getIcon = (icon: string) => {
  switch (icon) {
    case 'delete':
      return TrashIcon;
    case 'add':
      return PlusIcon;
    case 'pencil':
      return PencilIcon
    case 'checked':
      return CheckIcon
    case 'close':
      return XMarkIcon
    case 'warning':
      return ExclamationTriangleIcon
    case 'send':
      return PaperAirplaneIcon
  }
  return PlusIcon;
}

const CustomButton = (
  {
    onClick,
    className,
    label,
    type,
    href,
    icon = 'plus',
    ...props
  }: ButtonType) => {
  const Icon = getIcon(icon)

  const Content = () => {
    return <>
      <Icon className='w-4 h-4'/>
      <span>{label}</span>
    </>
  }

  return href ? (<Link
    href={href}
    className={`bg-teal-700 p-4 text-white uppercase 
      rounded-md font-bold tracking-wider 
      inline-flex items-center justify-center gap-4 ${label && `gap-4`} ${className}`}
    {...props}>
    <Content />
  </Link>) : (
    <button
      onClick={onClick}
      className={`bg-teal-700 p-4 text-white uppercase 
        rounded-md font-bold tracking-wider 
        inline-flex items-center justify-center ${label && `gap-4`} ${className}`}
      type={type}
      {...props}>
      <Content />
    </button>
  )
}

export default CustomButton