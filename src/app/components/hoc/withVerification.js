import { useSelector } from "react-redux"

export const withVerification = (WrapperComponent) => {
    return (props) => {
        const profileReducer = useSelector((state) => state?.profile)
        const { user } = profileReducer
        const isVerified = user?.isVerified;

        if(!isVerified) return null;
        return <WrapperComponent {...props}/>
    }
}