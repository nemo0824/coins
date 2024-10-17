import {create} from 'zustand'

interface SearchState{
    searchTerm: string;
    setSearchTerm: (term:string) => void;
}

const useSearchState = create<SearchState>((set) =>({
    searchTerm: '',
    setSearchTerm:(value:string)=>set({
        searchTerm: value
    })
}))

export default useSearchState;