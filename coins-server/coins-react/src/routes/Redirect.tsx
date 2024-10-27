import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import store from '../lib/store';
import useUserStore from '../lib/store'
const Redirect = () => {
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const authCode = queryParams.get('code');
    const navigate = useNavigate();
    const { setUser } = store.useUserStore();
   

      // 사용자 정보를 가져오는 함수
  const getUserInfo = (accessToken:string) => {
    axios.post('http://localhost:8080/api/auth/kakao-user', { accessToken })
      .then(response => {
        const {nickname, profileImage} = response.data

        setUser(nickname, profileImage)

        navigate('/'); // 예시: 로그인 성공 후 홈으로 이동
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
           
        }    
        if (token) {
            getUserInfo(token); // 토큰을 사용해 유저 정보를 다시 불러옴
        }
       
      }, [authCode]);

     
  return (
    <div className='text-white'>로그인중입니다</div>
  )
}

export default Redirect