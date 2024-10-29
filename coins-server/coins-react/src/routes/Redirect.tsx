import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import store from '../lib/store';

const Redirect = () => {
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const authCode = queryParams.get('code');
    const navigate = useNavigate();
    const { setUser } = store.useUserStore();
    // 로그인 처리 
    const { setIsLogged } = store.useUserLogin();
    
   

// 유저정보를 가져오는 함수
  const getUserInfo = (accessToken:string) => {
    axios.post('http://localhost:8080/api/auth/kakao-user', { accessToken })
      .then(response => {
        const {nickname, profileImage} = response.data
        setUser(nickname, profileImage)
        // 로그인 처리 true로 
        setIsLogged(true)
        navigate('/'); 
      })
      .catch(error => {
        console.error('사용자 정보 요청 중 오류 발생:', error);
      });
  };

  // 액세스 토큰을 가져오는 함수
  const getAccessToken = () => {
    axios.post('http://localhost:8080/api/auth/kakao-token', { code: authCode })
      .then(response => {
        const { accessToken } = response.data; // 액세스 토큰을 받아옴
        console.log('액세스 토큰:', accessToken);

        // 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);

        // 액세스 토큰을 사용해 사용자 정보 요청
        getUserInfo(accessToken);
      })
      .catch(error => {
        console.error('토큰 요청 중 오류 발생:', error);
      });
  };
    useEffect(() => {
        
        const token = localStorage.getItem('accessToken');
        
        if (authCode) {
            getAccessToken()
        }else if (token) {
            // 만약 로그인을 해본적있는사람은 access 토큰이있기때문에 유저정보를 다시불러오게
            getUserInfo(token); 
        }
       
      }, [authCode]);

     
  return (
    <div className='text-white'>로그인중입니다</div>
  )
}

export default Redirect 