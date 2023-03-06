import {useLocation, useSearchParams} from "react-router-dom";
import {useCallback} from "react";
import {PLATFORM_LINK} from "../config/constants";

export const useRefLink = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const search = useLocation().search

    const openPlatformWithRefLink = useCallback(() => {


        const ref = new URLSearchParams(search).get('ref');
        if (ref !== null) {
            window.open(`${PLATFORM_LINK}/?ref=${ref}`)
            // window.location.href = `${PLATFORM_LINK}/?ref=${ref}`
        } else {
            window.open(PLATFORM_LINK)
            // window.location.href = PLATFORM_LINK
        }
        }, [])


    return [openPlatformWithRefLink]
}
