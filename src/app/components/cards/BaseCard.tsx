import { Card, CardBody } from '@nextui-org/react';
import React from 'react'

type BaseCardProps = {
    children: React.ReactNode,
    className?: string,
    shadow?: boolean,
}

const BaseCard = ({ children, className, shadow }: BaseCardProps) => {
    return (
        <Card className={className} shadow={shadow ? 'md' : 'none'}>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    )
}

export default BaseCard