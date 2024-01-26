import { useState, useEffect } from 'react';

function FromWho() {

    const [fromWho, setFromWho] = useState([]);
    useEffect(() => {
        const fromWhoFile = 'fromwho.json'
        const fetchData = async () => {
            const response = await fetch(fromWhoFile);
            const data = await response.json();
            setFromWho(data);
        };

        fetchData();
    }, []);

    const single = fromWho[fromWho.length - 1];

    return (
        <>
            {single && (
                <div>
                    <h1>{single.Title}</h1>
                    <p>{single.Description}</p>
                    <p>{single.Date}</p>
                    <p>{single.Writer}</p>
                    <p>{single.Speaker}</p>
                    {single.Quotes.map((quote, index) => (
                        <p key={index}>{quote}</p>
                    ))}
                    {single.Context.map((context, index) => (
                        <p key={index}>{context}</p>
                    ))} 

                </div>
            )}
        </>
    );
}

export default FromWho;