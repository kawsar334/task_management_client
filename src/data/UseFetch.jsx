// import { useState, useEffect } from 'react';

// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         let isMounted = true;
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(url,

//                     {
//                         // ...options,
//                         credentials: 'include', // Include credentials (cookies, HTTP auth)
//                     }
//                 );
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const result = await response.json();
//                 if (isMounted) {
//                     setTimeout(() => {
//                         setData(result);
//                         setLoading(false);
//                     }, 1000); 
//                 }
//             } catch (err) {
    //                 if (isMounted) {
        //                     setError(err.message);
        //                     setLoading(false);
        //                 }
        //             }
        //         };
        
        //         fetchData();
        //         return () => {
            //             isMounted = false;
            //         };
            //     }, [url]); 
            
            //     return { data, loading, error };
            // };
            
            // export default useFetch;
            
import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    credentials: 'include', // Include credentials (cookies, HTTP auth)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (isMounted) {
                    setTimeout(() => {
                        setData(result);
                        setLoading(false);
                    }, 1000);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
};



// 
export const useSingletData = (url) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSingleData = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await res.json();
            setResponse(result); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, fetchSingleData };
};



export default useFetch;
