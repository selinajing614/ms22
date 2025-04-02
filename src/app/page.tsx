import Image from "next/image";
import StartButton from './components/StartButton';

/**
 * @description 欢迎页面组件
 * @returns {JSX.Element} 欢迎页面
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to the FeedLogic™ Internship Program
        </h1>
        
        <div className="text-lg text-gray-700 space-y-4">
          <p className="font-medium">
            Our mission: Make sure every user receives the content that fits them best.
          </p>
          
          <p>
            You&apos;ll be assisting FeedLogic AI, our personalization engine, as it learns 
            which creators and content deserve to be promoted.
          </p>
          
          <p>
            Don&apos;t worry — you&apos;re not making the final decisions. You&apos;re just 
            helping the system get a little bit smarter.
          </p>
          
          <p className="font-medium mt-6">
            Let&apos;s begin.
          </p>
        </div>

        <StartButton />
      </div>
    </main>
  );
}
