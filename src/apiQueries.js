const baseUrl = "https://localhost:8080/api/";
const productsBaseUrl = `${baseUrl}products`;
const groupsBaseUrl = `${baseUrl}groups`;
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoidWEuY29tLnN1cHJhLmRyaWZ0IiwiaWF0IjoxNjU3OTE0NTYzLCJleHAiOjE2NTc5MTU0NjN9.VbCm6ouxVyDJC1VRm0aEJ--2x3GK3rVAHiXVDDlFOnU';

export async function getAllProducts(){
    const response = await fetch (productsBaseUrl,
        {
            method: 'GET',
            headers: {
                Jwt: jwt
            }
        });
    return response.json();
}