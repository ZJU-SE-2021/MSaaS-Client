import React from "react";
import SkeletonContent from "react-native-skeleton-content";

export default function LoadingWrapper({children, isLoading = true, style, ...rest}) {
    const placeHolderLayout = Array(6).fill(
        {
            width: "100%",
            height: 80,
            marginTop: 5,
            marginBottom: 5,
        }
    )

    return <SkeletonContent
        containerStyle={{...style, flex: 1}}
        isLoading={isLoading}
        layout={placeHolderLayout}
        highlightColor='#F5F5F5'
        boneColor='#FFFFFF'
    >
        {children}
    </SkeletonContent>
}