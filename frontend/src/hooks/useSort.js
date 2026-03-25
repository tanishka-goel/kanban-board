import { useMemo, useState } from "react"

export const useSort = ({items}) =>{
    const [sortConfig, setSortConfig] = useState()

    const sortedItems = useMemo(()=>{
        const itemsToBeSorted = [...items]

        if (itemsToBeSorted){
            
        }
    },[items])
}