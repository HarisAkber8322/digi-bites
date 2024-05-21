// pages/profilepage.tsx
"use client";
import React from 'react';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import Div from '../../../components/UI/Div';
import Text from '../../../components/UI/Text';
import dynamic from 'next/dynamic';

const Profile = () => {
  const cards = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    icon: faSquare, // Replace with your desired icon
    name: `Card ${i + 1}`,
  }));

  return (
    <Div themeDivClasses="min-h-screen bg-gray-100" content={
      <>
        <Div themeDivClasses="relative" content={
          <>
            <Image
              src="/images/cover-photo.jpg" // Replace with actual cover photo path
              alt="Cover"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
            <Div themeDivClasses="absolute top-48 left-8" content={
              <Image
                src="/images/profile-photo.jpg" // Replace with actual profile photo path
                alt="Profile"
                width={150}
                height={150}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            } />
          </>
        } />
        <Div themeDivClasses="mt-16 p-8" content={
          <Div themeDivClasses="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" content={
            <>
              {cards.map((card) => (
                <Div key={card.id} themeDivClasses="flex flex-col items-center justify-center p-4 border rounded-lg bg-white shadow-md" content={
                  <>
                    <Text themeDivClasses="text-4xl" content={<FontAwesomeIcon icon={card.icon} />} />
                    <Text themeDivClasses="mt-2 text-lg font-semibold" content={card.name} />
                  </>
                } />
              ))}
            </>
          } />
        } />
      </>
    } />
  );
}

export default observer(dynamic(() => Promise.resolve(Profile), { ssr: false }));
