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

const updateBadgeStreak = async (userId: number | undefined) => {
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
};

const updateBadgeLength = async (userId: number | undefined) => {
    
    const url = `https://hikeable-backend.herokuapp.com/api/users/${userId}/completion-lengths`;
    const result = await axios.get(url);
    const totalLength = result.data.reduce((total, completion) => { 
        return total + completion.length
    }, 0);


    const badgeObjects = await axios.get(
        `https://hikeable-backend.herokuapp.com/api/users/${userId}/badges`
    )
    const listOfBadges = badgeObjects.data.map((obj) => obj.badges);

    console.log("🐓trying before the cases");
    console.log("total length is " , totalLength);

    switch (true){

        case (totalLength >= 50) :
            if (!listOfBadges.includes("50 KM")){
                addBadge(userId, "50 KM");
            };
            
        case (totalLength >= 30) :
            if (!listOfBadges.includes("30 KM")){
                addBadge(userId, "30 KM");
            };

        case (totalLength >= 20) :
            if (!listOfBadges.includes("20 KM")){
                addBadge(userId, "20 KM");
            };

        case (totalLength >= 15) :
            if (!listOfBadges.includes("15 KM")){
                addBadge(userId, "15 KM");
            };

        case (totalLength >= 10) :
            if (!listOfBadges.includes("10 KM")){
                addBadge(userId, "10 KM");
            };

        case (totalLength >= 7) :
            if (!listOfBadges.includes("7 KM")){
                addBadge(userId, "7 KM");
            };

        case (totalLength >= 5) :
            if (!listOfBadges.includes("5 KM")){
                addBadge(userId, "5 KM");
            };

        case (totalLength >= 3) :
            if (!listOfBadges.includes("3 KM")){
                addBadge(userId, "3 KM");
            };
        
    }



}





export {updateBadgeStreak, updateBadgeLength}