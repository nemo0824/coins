import {create} from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware';
interface SearchState{
    searchTerm: string;
    setSearchTerm: (term:string) => void;
}

export interface UserInfo{
    nickname:string;
    profileImage:string;
    setUser: (nickname: string, profileImage: string) => void;
    clearUser: (nickname:string, profileImage:string) => void;
    
}

interface UserLoginState {
    isLogged: boolean;
    setIsLogged: (loggedIn: boolean) => void;
}


// 사용자 정의 스토리지 타입 생성
const storage: PersistStorage<UserInfo> = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return Promise.resolve(value ? JSON.parse(value) : null);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
    return Promise.resolve();
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    return Promise.resolve();
  },
};
// Search 정보 관리
const useSearchState = create<SearchState>((set) =>({
    searchTerm: '',
    setSearchTerm:(value:string)=>set({
        searchTerm: value
    })
}))

// user 정보 관리
const useUserStore = create<UserInfo>()(
    persist<UserInfo>(
      (set) => ({
        nickname: '',
        profileImage: '',
        setUser: (nickname: string, profileImage: string) => set({ nickname, profileImage }),
        clearUser: () => set({ nickname: '', profileImage: '' })
      }),
      {
        name: 'user-storage', // 로컬 스토리지에 저장될 이름
        storage
      }
    )
  );

//  로그인 유무 정보 관리
const useUserLogin = create<UserLoginState>((set)=>({
    isLogged: false,
    setIsLogged: (loggedIn:boolean) => set({ isLogged: loggedIn }),
}))
export default {useSearchState, useUserStore, useUserLogin};
