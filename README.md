# Hikeable Frontend Client

![Hikeable Banner](https://res.cloudinary.com/dsnm2ssxl/image/upload/q_auto,f_auto/w_1280,h_640,c_crop/v1678786793/Hikeable_Client_-_GitHub_Banner_b657zo.png)

## What is Hikeable?

[With 80% of its landmass occupied by mountains](https://spice.fsi.stanford.edu/docs/geography_of_japan), Japan is one of the most coveted destinations for nature lovers. Although the country is known for being a popular international tourist destination, the number of available English resources for hikers, trailblazers, and outdoors enthusiasts is scarce.

Introducing **Hikeable**: Hiking in Japan. Simplified.

**Hikeable** is an English web app built to enhance the hiking experience for new and experienced hikers in Japan. Users can search for trails by prefecture, see photos uploaded by previous visitors, and keep track of their completion data via their dashboard. After launching the interactive map, users can leave geolocated messages, allowing them to interact with others on the trail.

## Tech Stack

Hikeable utilizes [Next.js](https://nextjs.org/) for its server-side rendering and employs [Material UI](https://mui.com/) and [SASS](https://sass-lang.com/) for styling purposes.

Secure authentication is made possible by [Google Firebase](https://firebase.google.com/). [OpenStreetMap](http://openstreetmap.org) provides all mapping data and maps.

Additional Required Libraries:

- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Visual Crossing Weather](https://www.visualcrossing.com/weather-data)
- [Chart.js](https://www.chartjs.org/)

## Getting Started

Important: Hikeable requires `npm` for installation.

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project folder using Terminal or Command Prompt.
3. Run `npm install` to install the required dependencies.
4. Run `npm build` to build the application before use.
5. Finally, run `npm start` to run the server on your local machine.

## Environmental Variables

To successfully run `npm build`, please note that the following environment variables/API keys are required in a `.env` file:

```
NEXT_PUBLIC_APIKEY= Google Firebase
NEXT_PUBLIC_AUTHDOMAIN= Google Firebase
NEXT_PUBLIC_PROJECTID= Google Firebase
NEXT_PUBLIC_STORAGEBUCKET= Google Firebase
NEXT_PUBLIC_MESSAGINSENDERID= Google Firebase
NEXT_PUBLIC_APPID= Google Firebase
NEXT_PUBLIC_MEASSURMENTID= Google Firebase
NEXT_PUBLIC_WEATHERAPI= Visual Crossing
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= Cloudinary
NEXT_PUBLIC_CLOUDINARY_UPPLOAD_PRESET= Cloudinary
NEXT_PUBLIC_MAP_API= OpenStreetMap
NEXT_PUBLIC_BACKEND_URL= Django Backend
```

## Contributing

As an open-source project, **Hikeable** is built and maintained by volunteers living in Japan. If you are interested in contributing to **Hikeable**, please feel free to fork this repository, open a new issue, or submit a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE.md` file for details.
