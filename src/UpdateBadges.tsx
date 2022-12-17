import axios from "axios";
import { CompletedTrails } from "../components";

const addBadge =  async (userId: number | undefined, badge: string) => {
    const current = new Date();
    console.log("😇 adding a new badge");

    await axios ({
        method: "post",
        url: `https://hikeable-backend.herokuapp.com/api/users/${userId}/badges`,
        data: {
            user: userId,
            badges: badge,
            date: `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`,
        },
    })
}

const updateBadges = async (userId: number | undefined) => {
    // const fetchCompletionData = await axios.get(
    //     `https://hikeable-backend.herokuapp.com/api/users/${userId}/completedTrails`
    // );

    const url = "https://hikeable-backend.herokuapp.com/api/trails/completions";
    const result = await axios.get(url);
    const fetchCompletionData = result.data.filter((completions) => completions.user === userId)  
    console.log("🐓 completionsData");
    console.log(fetchCompletionData);

    const numberOfCompletions = fetchCompletionData.length;

    //first check if the badge already exists...
    const badgeObjects = await axios.get(
        `https://hikeable-backend.herokuapp.com/api/users/${userId}/badges`
    )
    const listOfBadges = badgeObjects.data.map((obj) => obj.badges);

    console.log("👻trying before the cases");
    console.log("number Of completions are : " , numberOfCompletions);

    switch (true){

        case (numberOfCompletions >= 7) :
            if (!listOfBadges.includes("Lucky Number 7")){
                addBadge(userId, "Lucky Number 7");
            };

        case ( (numberOfCompletions > 2) && (numberOfCompletions < 7)) :
            if (!listOfBadges.includes("Hat-trick")){
                addBadge(userId, "Hat-trick");
            };
            
        
        case ((numberOfCompletions > 1) && (numberOfCompletions <= 2)) :
                if (!listOfBadges.includes("First Base")){
                    addBadge(userId, "Power of Two");
                };


        case (numberOfCompletions === 1) :
            if (!listOfBadges.includes("First Base")){
                addBadge(userId, "First Base");
            };
            break;

        
        
    }


    
    // setData(fetchedCompletionData.data);
};

    // const getTrails =  () => {
        
    //     return completedTrails.map( async (singleCompletedTrail) => {

    //         const response = await axios ({
    //             method: "get",
    //             url: `https://hikeable-backend.herokuapp.com/api/trails/${singleCompletedTrail.trail_id}`
    //         })

    //         const trail = response.data;

    //         if (usersCompletedTrails.length >= 0)
    //             setUsersCompletedTrails( usersCompletedTrails =>  [ ...trail, ...usersCompletedTrails] );
    //     });
    // }





export {updateBadges}