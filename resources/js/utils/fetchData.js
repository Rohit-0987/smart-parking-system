export default async function fetchData(url) {
    const result = await fetch(url);
    return await result.json()
}