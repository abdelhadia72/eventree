import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <img src="/logo.png" className="text-center m-auto py-8 h-[250px]" alt="Eventree Logo" />
            <h1 className="text-3xl font-bold text-center mb-6">About Eventree</h1>
            <div className="text-lg text-gray-700 leading-relaxed max-w-[1000px] text-center m-auto mt-10">
                <p className="mb-4">
                    Welcome to <span className="font-bold">Eventree</span>, your ultimate event management platform.
                    Whether you're planning a small gathering or a large conference, Eventree provides you with the tools
                    you need to make your event a success.
                </p>
                <p className="mb-4">
                    At Eventree, we believe in the power of connection and community. Our platform is designed to help
                    you create, manage, and promote your events with ease. From detailed event creation forms to real-time
                    attendee management, we've got you covered.
                </p>
                <p className="mb-4">
                    Our mission is to make event management simple and accessible for everyone. With features like customizable
                    event pages, integrated ticketing, and analytics, you can focus on what matters most: creating memorable
                    experiences for your attendees.
                </p>
                <p className="mb-4">
                    Thank you for choosing Eventree. We look forward to helping you grow your events and build lasting connections.
                </p>
            </div>
        </div>
    );
}

export default About;
