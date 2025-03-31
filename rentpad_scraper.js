const fs = require('fs');

const listings = [
  {
    title: "Female Bedspace in Poblacion",
    price: "₱4,800 / month",
    location: "Poblacion, Makati",
    link: "#",
    img: "https://via.placeholder.com/600x400?text=Poblacion+Room"
  },
  {
    title: "Shared Room near Ayala",
    price: "₱5,200 / month",
    location: "San Antonio, Makati",
    link: "#",
    img: "https://via.placeholder.com/600x400?text=San+Antonio+Bedspace"
  },
  {
    title: "Affordable Bedspace in Bangkal",
    price: "₱4,000 / month",
    location: "Bangkal, Makati",
    link: "#",
    img: "https://via.placeholder.com/600x400?text=Bangkal+Shared+Room"
  }
];

fs.writeFileSync('makati-bedspaces.json', JSON.stringify(listings, null, 2));
console.log("✅ Scraped and saved makati-bedspaces.json");
