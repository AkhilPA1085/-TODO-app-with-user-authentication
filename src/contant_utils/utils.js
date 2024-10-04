export const getStatusIcon = (status)=>{
    switch(status){
        case 'pending':
            return 'warning';
        case 'open':
            return 'open';
        case 'closed':
            return 'closed';
    }

}
export const getStatusColor = (status)=>{
    switch(status){
        case 'pending':
            return '! bg-amber-300';
        case 'open':
            return '!bg-red-600';
        case 'closed':
            return '! bg-green-600';
    }

}