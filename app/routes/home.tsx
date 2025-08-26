import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import Loader from "~/components/Loader";
import { useState } from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "NailTheCV" },
    { name: "description", content: "Welcome to Nail the CV!" },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

    {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
    <Navbar />

    <section className="main-section">
        <div className="page-heading">
          <h1>Track your applications & Resume Ratings</h1>
          <h2>Review your resume and get AI powered feedback.</h2>
        </div>
    </section>


    {resumes.length > 0 &&(
       <div className="resumes-section">
         {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume = {resume}/>
    ))}
    </div>
    )}
   

   

    </main>
}
