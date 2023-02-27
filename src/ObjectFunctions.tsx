import { TTrailCompletion, Trail } from "../global";

function returnUniqueObjects(arr: Trail[]) {
    const uniqueObjects: Trail[] = [];

    arr.forEach(element => {
        if (!uniqueObjects.some(obj => JSON.stringify(obj) === JSON.stringify(element))) {
            uniqueObjects.push(element);
        }});

    return uniqueObjects;
};



//compares the trailCompletion array with Trails array to get
//an array of objects with trail length traversed for each date
function getValues(a: TTrailCompletion[], b: Trail[]) {
    let result: 
        {date: string, length: number}[] = [];

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (a[i].trail_id == b[j].id) {
          result.push({
            date: a[i].date,
            length: b[j].length
          })
        }
      }
    }
    return result;
}

export {getValues, returnUniqueObjects};