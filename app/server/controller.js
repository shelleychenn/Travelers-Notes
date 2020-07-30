const axios = require('axios');
const { API_KEY } = require('./api_key');
const AttractionEntry = require('../db/Attraction');
const ReviewEntry = require('../db/Review');

module.exports = {
  saveAndSendReturnedAttraction: (req, res) => {
    let location = req.params.location_key_word;

    AttractionEntry.find({ search_key: location })
      .count()
      .then((count) => {
        if (count !== 0) {
          AttractionEntry.find({ search_key: location })
            .then((data) => {
              console.log('data found in database!');
              res.status(200).json(data);
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            });
        } else {
          let url = `https://tripadvisor1.p.rapidapi.com/locations/search?rapidapi-key=${API_KEY}&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=mi&query=${location}`;

          axios
            .get(url)
            .then((response) => {
              let attractions = response.data.data;
              let returnedAttractions = new AttractionEntry({
                search_key: location,
                attractions: attractions,
              });

              returnedAttractions
                .save()
                .then(() => {
                  console.log('data saved successfully!');
                  res.status(200).json(attractions);
                })
                .catch((err) => {
                  console.log(err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            });
        }
      });
  },

  loadMoreReviews: (req, res) => {
    let locationId = req.params.location_id;

    ReviewEntry.find({
      search_type: 'reviews',
      location_id: locationId,
    })
      .count()
      .then((count) => {
        if (count !== 0) {
          ReviewEntry.find({
            search_type: 'reviews',
            location_id: locationId,
          })
            .then((data) => {
              console.log('data found in database!');
              res.status(200).json(data);
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            });
        } else {
          let url = `https://tripadvisor1.p.rapidapi.com/reviews/list?rapidapi-key=${API_KEY}&limit=20&currency=USD&lang=en_US&location_id=${locationId}`;

          axios
            .get(url)
            .then((response) => {
              let reviews = response.data.data;
              console.log('reviews: ', reviews);
              let returnedReviews = new ReviewEntry({
                search_type: 'reviews',
                location_id: locationId,
                reviews: reviews,
              });

              returnedReviews
                .save()
                .then(() => {
                  console.log('data saved successfully!');
                  res.status(200).json(reviews);
                })
                .catch((err) => {
                  console.log(err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            });
        }
      });
  },
};
