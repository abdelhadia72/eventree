import {
  Search,
  ChevronRight,
  Podcast,
  UserRound,
  PartyPopper,
  Handshake,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import EventCard from "@/components/custom/EventCard.tsx";
import axio from "axios";
import { Star, ScanFace, QrCode, Mail } from "lucide-react";

const Landing = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axio
      .get("http://localhost:5000/api/events/")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ReviewCard = ({ author, review, stars }: Review) => {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg p-6 mb-6 transform transition-all duration-300">
        <p className="text-gray-800 mb-4 font-serif italic">
          &ldquo;{review}&rdquo;
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < stars ? "text-yellow-400" : "text-gray-300"}`}
                fill={i < stars ? "currentColor" : "none"}
              />
            ))}
          </div>
          <div className="flex items-center">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`}
              alt={author}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-600 font-semibold">{author}</span>
          </div>
        </div>
      </div>
    );
  };

  const reviews = [
    {
      author: "Elizabeth P.",
      review:
        "Eventree is a lifesaver! It helped me find and manage all the events I wanted to attend in one place. The app is so easy to use and I love the push notifications that keep me updated on event changes. I highly recommend Eventree to anyone who wants to stay organized and never miss out on a great event!",
      stars: 5,
    },
    {
      author: "David M.",
      review:
        "Eventree is a great way to connect with people who share your interests. I've used it to find events for everything from music festivals to tech conferences. The app is also a great way to meet new people and make friends. I've had a lot of positive experiences using Eventree and I would definitely recommend it to others.",
      stars: 4.5,
    },
    {
      author: "Sarah L.",
      review:
        "Eventree has made event planning a breeze! I've used it to create and manage events for both work and personal use. The app is easy to use and has all the features I need to create a successful event. I love the ability to invite guests, track RSVPs, and send out event updates. Eventree is a must-have for anyone who plans events.",
      stars: 3,
    },
    {
      author: "Michael T.",
      review:
        "Eventree is the perfect app for finding and attending events. The app has a wide variety of events to choose from, and it's easy to find events that interest you. I also love the fact that you can RSVP for events directly through the app. Eventree has made it so much easier for me to stay connected with my community and attend events that I'm interested in.",
      stars: 4,
    },
    {
      author: "Amanda B.",
      review:
        "Eventree is a great app for anyone who wants to get involved in their community. The app has a wide variety of events to choose from, and it's easy to find events that are happening in your area. I've used Eventree to find volunteer opportunities, social events, and educational workshops. Eventree is a great way to get out there and meet new people.",
      stars: 4.5,
    },
    {
      author: "Charles K.",
      review:
        "Eventree is a lifesaver for busy people like me. The app helps me stay organized and on top of all the events I have going on. I love the ability to set reminders for events and track my RSVPs. Eventree has made my life so much easier and I would definitely recommend it to others.",
      stars: 5,
    },
  ];

  return (
    <div className="holder">
      <div className=" max-w-[1300px] mx-auto">
        <div className="hero">
          <div className="hero mt-60">
            <h1 className="font-bold w-[50%] mx-auto text-4xl text-center">
              The people platform—Where interests become friendships
            </h1>
            <p className="text-xl mx-auto text-center w-[50%] mt-4">
              Go beyond basic keywords. Refine your search with laser focus
              using our powerful filters
            </p>
          </div>
          <div className="flex items-center justify-center py-4 mt-4">
            <div className="relative w-full max-w-[600px] ">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Seach for an event..."
                className="pl-10 rounded-md border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              />
              <button>
                <span className="absolute bg-red-500 m-1 inset-y-0 right-0 p-3 rounded-sm cursor-pointer transition-all flex items-center">
                  <ChevronRight className="h-5 w-5 text-white" />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* home page*/}
        <div className="spencers flex gap-8 my-16 mt-28 justify-center">
          <img
            className="max-w-[150px]"
            src="http://localhost:5000/uploads/1.svg"
            alt="spencer"
          />
          <img
            className="max-w-[150px]"
            src="http://localhost:5000/uploads/2.svg"
            alt="spencer"
          />
          <img
            className="max-w-[150px]"
            src="http://localhost:5000/uploads/3.svg"
            alt="spencer"
          />
          <img
            className="max-w-[150px]"
            src="http://localhost:5000/uploads/5.svg"
            alt="spencer"
          />
          <img
            className="max-w-[150px]"
            src="http://localhost:5000/uploads/6.svg"
            alt="spencer"
          />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-12 mt-24 px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <QrCode className="h-12 w-12 mb-2" />
            <h3>Scan QR Code</h3>
            <p className="w-[65%]">
              Seamless event check-in with a scan of your unique QR code.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Mail className="h-12 w-12 mb-2" />
            <h3>Reserve by Email</h3>
            <p className="w-[65%]">
              RSVP with ease; simply reply to your event invitation email.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <ScanFace className="h-12 w-12 mb-2" />
            <h3>Manage Attendees</h3>
            <p className="w-[65%]">
              Easily track RSVPs, view attendee lists, and manage your guest
              list.
            </p>
          </div>
        </section>
        {/*cat*/}
        <div className="category pt-8">
          <div className="flex text-2xl gap-24 justify-center mt-16">
            <div className="items flex flex-col justify-center items-center">
              <Podcast className="h-12 w-12 mb-2" />
              <p>Meetup</p>
            </div>
            <div className="items flex flex-col justify-center items-center">
              <UserRound className="h-10 w-10 mb-2" />
              <p>Meetup</p>
            </div>
            <div className="items flex flex-col justify-center items-center">
              <PartyPopper className="h-10 w-10 mb-2" />
              <p>Meetup</p>
            </div>
            <div className="items flex flex-col justify-center items-center">
              <Podcast className="h-10 w-10 mb-2" />
              <p>Meetup</p>
            </div>
            <div className="items flex flex-col justify-center items-center">
              <Handshake className="h-10 w-10 mb-2" />
              <p>Meetup</p>
            </div>
            <div className="items flex flex-col justify-center items-center">
              <Users className="h-10 w-10 mb-2" />
              <p>Meetup</p>
            </div>
            <div className="items flex flex-col justify-center items-center">
              <Podcast className="h-10 w-10 mb-2" />
              <p>Meetup</p>
            </div>
          </div>
        </div>
        {/*poster*/}
        <div className="poster mt-16 py-16">
          <div className="flex justify-center">
            <img
              className=" rounded-lg h-[500px] w-full bg-cover object-cover"
              src="http://localhost:5000/uploads/coffee-shop-meetup.jpg"
              alt="poster"
            />
          </div>
        </div>
        {/*events*/}
        <div className="container max-w-[1300px] pt-12">
          <h1 className="text-3xl mb-4">More event</h1>
          <div className="grid grid-cols-3 gap-4">
            {events &&
              events.slice(0, 6).map((event) => <EventCard event={event} />)}
          </div>
        </div>

        {/*review*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {reviews.map((review) => (
            <ReviewCard key={review.author} {...review} /> // Pass review data as props
          ))}
        </div>
      </div>
      {/*footer*/}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Eventree. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Landing;
