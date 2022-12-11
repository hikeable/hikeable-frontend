export default function getLastNDays(num) {
    let dates : string[] = [];
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    
    //loop through the last 7 days
    for (let i = 0; i < num; i++) {
    // subtract i days from today
    let date = new Date(today.getFullYear(), month, day - i);
    dates.push(`${date.getDate()}/${date.getMonth() + 1}`);
    }
    return dates.reverse();
  }