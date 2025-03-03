export const formattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
};

export const formattedTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
};