import { useState } from 'react';

interface TokenResponse {
    token: string;
}

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken?.token;
        }
        return null;
    };

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: TokenResponse) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token,
    };
}
