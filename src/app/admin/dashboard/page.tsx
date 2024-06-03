// pages/client/burger.tsx
"use client";
import Div from '@/components/UI/Div';
import Text from '@/components/UI/Text';
import React, { useState } from 'react';// Adjust according to your project structure

const Dashboard: React.FC = () => {
 
  return (
    <Div
    lightColor='bg-transparent'
    themeDivClasses={""}
    content={
      <div className=''>
        <Text themeDivClasses='text-3xl font-bold mb-5' content="Dashboard" />
      </div>
    }
  />
  );
};

export default Dashboard;
