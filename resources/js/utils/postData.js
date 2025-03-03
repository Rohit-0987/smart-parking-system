export default async function postData(url, body ) {
    const result = await fetch(url, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        method: 'POST',
        body: JSON.stringify({...body}) 
    });
    return await result.json()
}