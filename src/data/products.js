export const dummyProducts = [
  {
    id: 1,
    name: "Smartphone X",
    desc: "The Smartphone X is a powerful and sleek device featuring a high-resolution display, advanced camera system, and long-lasting battery.",
    price: 799.99,
    associatedInvoiceIds: []
  },
  {
    id: 2,
    name: "Macbook Pro",
    desc: "The Macbook Pro is a versatile and portable computer designed for productivity and entertainment.",
    price: 1299.99,
    associatedInvoiceIds: []
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    desc: "These Wireless Earbuds offer crystal-clear sound quality and a comfortable fit.",
    price: 99.99,
    associatedInvoiceIds: []
  },
  {
    id: 4,
    name: "Smartwatch Elite",
    desc: "The Smartwatch Elite is a stylish and feature-packed wearable device.",
    price: 249.99,
    associatedInvoiceIds: []
  },
  {
    id: 5,
    name: "Gaming Console",
    desc: "The Gaming Console delivers immersive gaming experiences with stunning graphics and responsive controls.",
    price: 399.99,
    associatedInvoiceIds: []
  },
];

export const dummyImages = [
  "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
]

export const totalImages = dummyImages.length

export const itemStructure = {
  id: null,
  name: "",
  desc: "",
  price: "",
  quantity: "",
  associatedInvoiceIds: []
}