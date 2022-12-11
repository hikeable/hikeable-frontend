function returnUniqueObjects(arr: object[]) {
    const uniqueObjects: object[] = [];

    arr.forEach(element => {
        if (!uniqueObjects.some(obj => JSON.stringify(obj) === JSON.stringify(element))) {
            uniqueObjects.push(element);
        }
    });

    return uniqueObjects;
}

export default returnUniqueObjects;