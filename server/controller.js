const destinations = [
    {
        id: 1,
        name: "Koh Phi Phi, Thailand",
        type: "Beach",
        ranking: 5,
        image: "https://telegra.ph/file/282716e1d8de50149a5bd.jpg",
      },
      {
        id: 2,
        name: "New York City, USA",
        type: "Urban",
        ranking: 5,
        image: "https://i.natgeofe.com/n/874df281-d3e0-489a-98c0-6b840023b828/newyork_NationalGeographic_2328428.jpg",
      },
      {
        id: 3,
        name: "Banff National Park, Canada",
        type: "Nature",
        ranking: 5,
        image: "https://w.forfun.com/fetch/5d/5dd7e7270077cdf2d1e9201fd229f460.jpeg",
      },
      {
        id: 4,
        name: "Machu Picchu, Peru",
        type: "Culture",
        ranking: 5,
        image: "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666399221_42-mykaleidoscope-ru-p-machu-pikchu-nasledie-yunesko-krasivo-53.jpg",
      },
      // Add more destinations here
      // For example:
      {
        id: 5,
        name: "Bora Bora, French Polynesia",
        type: "Beach",
        ranking: 5,
        image: "https://www.tahiti.com/images1/gallery/Four-Seasons-Resort-Bora-Bora-Overwater-Bungalows-2000x1200%20(3)_29556.jpg",
      },
      {
        id: 6,
        name: "Tokyo, Japan",
        type: "Urban",
        ranking: 5,
        image: "https://madetrip.ru/wp-content/uploads/2022/03/tokio-4.jpeg",
      },
      {
        id: 7,
        name: "Yosemite National Park, USA",
        type: "Nature",
        ranking: 5,
        image: "https://mtdata.ru/u1/photoF357/20222186123-0/original.jpg",
      },
      {
        id: 8,
        name: "Rome, Italy",
        type: "Culture",
        ranking: 5,
        image: "https://colosseumrometickets.com/wp-content/uploads/2018/06/Aerial-view-of-the-Colosseum-known-as-Amphitheatrum-Flavium-symbol-of-the-city-of-Rome-of-Italy-and-one-of-the-seven-wonders-of-the-world.-In-ancient-times-it-was-used-for-gladiatorial-shows..jpg",
      },
      {
        id: 9,
        name: "London, England",
        type: "Urban",
        ranking: 5,
        image: "https://windowman.ru/wp-content/uploads/6/f/3/6f3a99a668461d28907654d824224d01.jpeg",
      },
      {
        id: 10,
        name: "Cairo, Egypt",
        type: "Culture",
        ranking: 5,
        image: "https://singbiker.files.wordpress.com/2012/07/img_1760-55x29.jpg",
      },
      {
        id: 11,
        name: "Lofoten, Norway",
        type: "Nature",
        ranking: 5,
        image: "https://s1.1zoom.ru/b5050/474/Norway_Lofoten_Mountains_Reine_From_above_592346_1920x1200.jpg",
      },
      {
        id: 12,
        name: "Crimea, Russia/Ukraine",
        type: "Beach",
        ranking: 5,
        image: "https://kartinkin.net/pics/uploads/posts/2022-07/1657758258_69-kartinkin-net-p-peschanie-plyazhi-krima-priroda-krasivo-fo-72.jpg",
      },
    ];
    
  
  let destinationId = 13;
  
  module.exports = {
    getDestinations: (req, res) => {
        const { type } = req.query;
        if (type && type !== "all") {
          const filteredDestinations = destinations.filter(
            (destination) => destination.type === type
          );
          res.status(200).send(filteredDestinations);
        } else {
          res.status(200).send(destinations);
        }
      },
      
    addDestination: (req, res) => {
      const { name, type, ranking, image } = req.body;
      const newDestination = {
        id: destinationId,
        name,
        type,
        ranking,
        image,
      };
      destinations.push(newDestination);
      res.status(200).send(destinations);
      destinationId++;
    },
  
    updateDestination: (req, res) => {
      const { id } = req.params;
      const { name, type, ranking, image } = req.body;
      const index = destinations.findIndex((destination) => destination.id === +id);
      if (index === -1) {
        res.status(404).send("Destination not found");
        return;
      }
      destinations[index] = {
        id: +id,
        name,
        type,
        ranking,
        image,
      };
      res.status(200).send(destinations);
    },
  
    deleteDestination: (req, res) => {
      const { id } = req.params;
      const index = destinations.findIndex((destination) => destination.id === +id);
      if (index === -1) {
        res.status(404).send("Destination not found");
        return;
      }
      destinations.splice(index, 1);
      res.status(200).send(destinations);
    },
  };
  