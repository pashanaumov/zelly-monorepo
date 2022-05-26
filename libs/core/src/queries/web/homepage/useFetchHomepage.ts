import { useQuery } from 'react-query';

function fetchWebHomePage() {
  return fetch('http://localhost:1337/api/zelly-web-main-page', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 90a2cadce96c4c7dee5cdff88477b24f40e4913a85bf97690efe610dba457c9b324e931fb07ac051e64227e01225c1bea063a0432a5956f23709c5065e1cdfeff21e46d263505fd4caa4996e99f675c623e7a5a4480d83fa282dfc770bc7d864320ff4c9698da35ee0b8eb1423c163e6d231a6483c2d06c53ff56427a7a498f5',
    },
  }).then((response) => response.json());
}

export function useFetchHomePage() {
  const { isLoading, data, error, refetch } = useQuery('fetchWebHomePage', () => fetchWebHomePage());

  return {
    isLoading,
    data,
    error,
    refetch,
  };
}
