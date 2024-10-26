import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Redirect = () => {
    
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const authCode = queryParams.get('code');
       
    
        if (authCode) {
          // 인가 코드를 서버에 전달
          axios.post('http://localhost:8080/api/auth/kakao-token', { code: authCode })
            .then(response => {
              console.log('서버 응답:', response.data);
            })
            .catch(error => {
              console.error('에러 발생:', error);
            });
        }
      }, [location]);
  return (
    <div>Redirect</div>
  )
}

export default Redirect