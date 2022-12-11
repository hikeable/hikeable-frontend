import { Filter } from "../components";
import { LineChart } from "../components/LineChart";


const profile = () => {

//     let data = [
//         {
//             "id": 1,
//             "name": "test1",
//             "prefecture": "tokyo",
//             "latitude": "1.00000000",
//             "longitude": "1.00000000",
//             "length": "1.00",
//             "difficulty": 1,
//             "photo_url": "test1",
//             "map_url": "test1"
//         },
//         {
//             "id": 2,
//             "name": "test3",
//             "prefecture": "hokkaidou",
//             "latitude": "1.50000000",
//             "longitude": "1.50000000",
//             "length": "2.50",
//             "difficulty": 3,
//             "photo_url": "test3",
//             "map_url": "test3"
//         }
//     ]; 

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

 const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: [23, 50, 18, 0 , 100, 50, 100],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};



    return (
        <>
            <LineChart data={data}></LineChart>
          <div>
            User Profile
          </div>
          <div>
                First Name
          </div>
          <div>
                Last Name
          </div>
          <div>
                Change password
          </div>
          <div>
                Upload Picture
          </div>

        {/* <Filter trails = {data}></Filter> */}
            
        </>
    );
}

export default profile;