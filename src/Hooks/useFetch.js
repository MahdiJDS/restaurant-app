import { useState, useEffect } from "react";

export const useFetch = (url, method = 'GET', searchQuery = '') => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
    };

    const deleteData = (id) => {
        setOptions({
            method: "DELETE",
        });
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setData(prevData => prevData.filter(item => item.id !== id));
                    alert('Item deleted successfully');
                } else {
                    throw new Error('Failed to delete');
                }
            })
            .catch((err) => {
                setError(err.message);
                alert('Error deleting item');
            });
    };

    useEffect(() => {
        const fetchData = async (fetchOptions) => {
            setIsLoading(true);

            try {
                const response = await fetch(url,fetchOptions);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();

                setIsLoading(false);
                setData(json);
                setError(null);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
        };

        if (method === 'GET' || (method === 'POST' && options)) {
            fetchData();
        }
     
    }, [url, method, options, searchQuery]);

    return { data, isLoading, error, postData, deleteData };
};
