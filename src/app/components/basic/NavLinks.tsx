import { BriefcaseIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const links = [
    {
        name: 'Home', href: '/', icon: HomeIcon
    },
    {
        name: 'Tasks', href: '/tasks', icon: BriefcaseIcon
    },
    {
        name: 'Users', href: '/users', icon: UsersIcon
    },
]

const NavLinks = () => {
    return (
        <>
            {links?.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={index}
                        href={link.href}
                        className='flex grow items-center 
                        justify-center 
                        gap-2 rounded-md bg-gray-50 p-3 text-sm 
                        font-medium hover:bg-sky-100 text-black'>
                        <LinkIcon className='w-6 h-6' />
                        <p className="hidden md:block text-black">
                            {link.name}
                        </p>
                    </Link>
                )
            })}
        </>
    )
}

export default NavLinks