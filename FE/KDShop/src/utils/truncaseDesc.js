export const truncateDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
    }
    return description;
};