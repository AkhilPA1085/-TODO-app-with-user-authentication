import { useSelector } from "react-redux";

export const withVerification = (WrapperComponent) => {
    const HOC = (props) => {
        const profileReducer = useSelector((state) => state?.profile);
        const { user } = profileReducer;
        const isVerified = user?.isVerified;

        if (!isVerified) return null;
        return <WrapperComponent {...props} />;
    };

    HOC.displayName = `withVerification(${WrapperComponent.displayName || WrapperComponent.name || "Component"})`;

    return HOC;
};
