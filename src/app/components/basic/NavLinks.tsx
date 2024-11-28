'use client'
import { BriefcaseIcon, ClipboardDocumentCheckIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import clsx from 'clsx';

const links = [
    {
        name: 'Tasks for me', href: '/', icon: ClipboardDocumentCheckIcon
    },
    {
        name: 'Created Tasks', href: '/tasks', icon: BriefcaseIcon
    },
    {
        name: 'Users', href: '/users', icon: UsersIcon
    },
]

const NavLinks = () => {
    const pathname = usePathname()
    return (
        <>
            {links?.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={index}
                        href={link.href}
                        className={
                        clsx('flex items-center justify-start rounded-md bg-gray-50 p-3 text-md font-bold hover:bg-sky-100 text-black md:w-full',
                            {
                                'bg-sky-100': pathname === link?.href
                            }
                        )}
                    >
                        <LinkIcon className='w-auto md:w-6 h-6' />
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