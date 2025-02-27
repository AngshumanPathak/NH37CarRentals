import AboutImage1 from "../../assets/images/AboutImage1.jpg"
import Reviews from "./Reviews"

const About = () => {


    
  return (
    <>
    <div className='p-10'>
      <h1 className="text-4xl font-bold mb-10">About us</h1>
      <hr className='text-yellow-300 mb-5'/>
      <div className='flex flex-col items-center sm:flex-row p-5 bg-gradient-to-r from-yellow-500 to bg-neutral-950 rounded-2xl'>
        <div className='w-auto sm:w-150 mt-6 text-black font-medium'>
            <p>
             Welcome to NH37 Car Rentals, Guwahati’s trusted self-drive car rental service. Whether you're looking for a rugged SUV for an adventure, a sleek sedan for business travel, or a compact hatchback for city drives, we have the perfect ride for you.
            </p>

            <p>
             Our diverse fleet is well-maintained and equipped to ensure a seamless driving experience. We prioritize customer satisfaction, offering flexible rental plans, competitive pricing, and hassle-free booking.
            </p>

            <p>
             Explore Guwahati and beyond on your own terms—book your car with us today and drive with confidence!
            </p>
        </div>
        <div  className='w-150 bg-transparent rounded-2xl'>
           <Reviews/>
        </div>
      </div>
      
    </div>
    
    </>
    
  )
}

export default About
