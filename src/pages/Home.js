import React from "react";
import ProfileForm from "../components/ProfileForm";

const Home = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Tech Readiness Assessment</h1>
      <p className="mb-4">Please fill out your profile to begin the assessment.</p>
      <ProfileForm />
    </div>
  );
};

export default Home;
