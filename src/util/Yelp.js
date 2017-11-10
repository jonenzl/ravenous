const clientId = 'NgVM_qjLOgUqXrEki2zMLQ';
const secret = 'SplRO80XhOR3n5OeHc8RQQoA7KSGCfrJFvJpwiFl9ySINHlBR5H3UgrW9PWq6j5n';
let accessToken = '';

const Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {method: 'POST'}).then(response => {
      return response.json()
    }).then(jsonResponse => accessToken = jsonResponse.access_token);
  },
  
  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
        return response.json()
      }).then(jsonResponse => {
        if (jsonResponse.buinesses) {
          return jsonResponse.buinesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          });
        }
      });
    })
  }
};

export default Yelp;
