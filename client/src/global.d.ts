interface Starkey {
  supra?: any; // or specify the correct type if known
}

interface Window {
  starkey?: Starkey; // Define starkey as an object of type Starkey
}
