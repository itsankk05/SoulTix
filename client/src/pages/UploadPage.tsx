import { useState } from "react";
import { PinataSDK } from "pinata";

function UploadPage() {
  const [selectedFile, setSelectedFile]: any = useState();
  const [cid, setCid]: any = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  // State for ticket quantities
  const [goldTickets, setGoldTickets] = useState(0);
  const [goldTicketPrice, setGoldTicketPrice] = useState(0);

  const [silverTickets, setSilverTickets] = useState(0);
  const [silverTicketPrice, setSilverTicketPrice] = useState(0);

  const [platinumTickets, setPlatinumTickets] = useState(0);
  const [platinumTicketPrice, setPlatinumTicketPrice] = useState(0);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [goldImage, setGoldImage] = useState<File | null>(null);
  const [silverImage, setSilverImage] = useState<File | null>(null);
  const [platinumImage, setPlatinumImage] = useState<File | null>(null);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        `https://api.pinata.cloud/pinning/pinFileToIPFS`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData);

      const metaData = {
        name: name,
        description: `${description} | Venue: ${venue} | Event Date: ${eventDate} | Booking Date: ${bookingDate}`,
        image: `ipfs://${resData.IpfsHash}`,
        tickets: {
          gold: goldTickets,
          silver: silverTickets,
          platinum: platinumTickets,
        },
        price: {
          gold_ticket_price: goldTicketPrice,
          silver_ticket_price: silverTicketPrice,
          platinum_ticket_price: platinumTicketPrice,
        },
      };

      console.log(metaData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="pt-20 pb-10 text-3xl ">Add Event</div>
      <div className=" p-4 rounded-md flex items-center w-[550px] h-[600px] justify-center">
        <div className="flex flex-col gap-2">
          <form className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Event Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Description
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setVenue(e.target.value)}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Venue
              </label>
            </div>

            {/* <div className="grid md:grid-cols-2 md:gap-6"></div> */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="datetime-local"
                id="floating_date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Event Date & Time
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="datetime-local"
                id="floating_date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Booking Date & Time
              </label>
            </div>

            {/* Ticket Section */}
            <div className="mt-5">
              <h3 className="text-lg font-bold my-2">Ticket Types</h3>
              <div className="flex my-4 gap-12 items-center justify-center">
                <div>Number of Tickets</div>
                <div>Price of Tickets</div>
              </div>
              <div className="flex flex-col gap-4">
                {/* Gold Tickets */}
                <div className="flex justify-between items-center gap-4">
                  <label className="text-sm flex-1">Gold Tickets:</label>
                  <input
                    type="number"
                    min="0"
                    value={goldTickets}
                    onChange={(e) => setGoldTickets(Number(e.target.value))}
                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 flex-1"
                    placeholder="Count"
                  />
                  <input
                    type="number"
                    min="0"
                    value={goldTicketPrice}
                    onChange={(e) => setGoldTicketPrice(Number(e.target.value))}
                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 flex-1"
                    placeholder="Price"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files && setGoldImage(e.target.files[0])
                    }
                  />
                </div>

                {/* Silver Tickets */}
                <div className="flex justify-between items-center gap-4">
                  <label className="text-sm flex-1">Silver Tickets:</label>
                  <input
                    type="number"
                    min="0"
                    value={silverTickets}
                    onChange={(e) => setSilverTickets(Number(e.target.value))}
                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 flex-1"
                    placeholder="Count"
                  />
                  <input
                    type="number"
                    min="0"
                    value={silverTicketPrice}
                    onChange={(e) =>
                      setSilverTicketPrice(Number(e.target.value))
                    }
                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 flex-1"
                    placeholder="Price"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files && setSilverImage(e.target.files[0])
                    }
                  />
                </div>

                {/* Platinum Tickets */}
                <div className="flex justify-between items-center gap-4">
                  <label className="text-sm flex-1">Platinum Tickets:</label>
                  <input
                    type="number"
                    min="0"
                    value={platinumTickets}
                    onChange={(e) => setPlatinumTickets(Number(e.target.value))}
                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 flex-1"
                    placeholder="Count"
                  />
                  <input
                    type="number"
                    min="0"
                    value={platinumTicketPrice}
                    onChange={(e) =>
                      setPlatinumTicketPrice(Number(e.target.value))
                    }
                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 flex-1"
                    placeholder="Price"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files && setPlatinumImage(e.target.files[0])
                    }
                  />
                </div>
              </div>
            </div>
          </form>
          {/* <label className="form-label mr-2">
            Choose File
            <input type="file" onChange={changeHandler} className="hidden" />
          </label> */}
          <span>{selectedFile && selectedFile.name}</span>
        </div>
      </div>
      <button
        onClick={handleSubmission}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      {cid && (
        <div className="mt-4">
          <img
            className="max-w-full h-auto max-h-64"
            src={`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${cid}`}
            alt="ipfs image"
          />
        </div>
      )}
    </div>
  );
}

export default UploadPage;
