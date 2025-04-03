import Image from "next/image";
import StartButton from './components/StartButton';

/**
 * @description 欢迎页面组件
 * @returns {JSX.Element} 欢迎页面
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#8FB4C7] p-4">
      <div className="relative w-full max-w-3xl mx-auto">
        <Image
          src="/home/screen.png"
          alt="Retro Computer Screen"
          width={1200}
          height={900}
          className="w-full h-auto"
          priority
        />
        
        <div className="absolute top-[15%] left-[22%] right-[22%] bottom-[45%]">
          <div className="h-full flex flex-col items-center justify-start text-center space-y-2 text-[#85301C] fade-in">
            <h1 className="text-xl font-bold mb-2">
              Welcome to the FeedLogic™ Internship Program
            </h1>
            
            <div className="text-sm space-y-2">
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
              
              <p className="font-medium">
                Let&apos;s begin.
              </p>
            </div>

            <div className="mt-2">
              <StartButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
