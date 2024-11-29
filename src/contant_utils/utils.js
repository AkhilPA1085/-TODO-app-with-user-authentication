export const getStatusIcon = (status) => {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'open':
            return 'open';
        case 'closed':
            return 'closed';
    }

}
export const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return '! bg-amber-300';
        case 'open':
            return '!bg-red-600';
        case 'closed':
            return '! bg-green-600';
    }

}

export const calculateTime = (date) => {
    const inputDate = new Date(date);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - inputDate.getTime();

    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''} ago`;

    return 'Just now';
};

export const formatDateTimeLocal = (date) => {
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};


