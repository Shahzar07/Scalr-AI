
"use client";
import { TimelineContent } from "./timeline-animation";
import React, { useRef } from "react";

// Mocking next/image behavior for standard browser env
const Image = ({ src, alt, width, height, className }: any) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

function ClientFeedback() {
    const testimonialRef = useRef<HTMLDivElement>(null);
  
    const revealVariants = {
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.15, // Reduced delay for smoother appearance
          duration: 0.5,
          ease: "easeOut"
        },
      }),
      hidden: {
        filter: "blur(4px)",
        y: 20,
        opacity: 0,
      },
    };
  
  return (
    <main className="w-full bg-white py-12 md:py-24">
      <section className="relative container mx-auto rounded-lg px-4 md:px-6" ref={testimonialRef}>
        <article className="max-w-screen-md mx-auto text-center space-y-4 mb-16" >
          <TimelineContent as="h1" className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight" animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            Trusted by the world's most <span className="text-blue-600">aggressive</span> builders
          </TimelineContent>
          <TimelineContent as="p" className="mx-auto text-slate-500 text-base md:text-lg max-w-xl" animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            Scalr is the unfair advantage for high-LTV systems. See what our elite partners have to say.
          </TimelineContent>
        </article>
        
        {/* Responsive Masonry-like Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-slate-50 overflow-hidden rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="relative z-10">
                <p className="text-slate-700 italic text-base md:text-lg leading-relaxed">
                  "Scalr has been a total game-changer for our agency. The indoctrination sequences they architected are converting leads at 4X our previous rate."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-slate-900 text-lg">Guillermo Rauch</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">CEO of Vercel</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                    alt="Guillermo Rauch"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-[2rem] border border-blue-500 p-6 md:p-8 shadow-xl shadow-blue-600/20">
              <article className="relative z-10">
                <p className="font-medium text-base md:text-lg">
                  "Unrivaled expertise. The monetisation audit revealed leaks we hadn't noticed for 2 years."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-white text-lg">Rika Shinoda</h2>
                    <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px]">CEO of Kintsugi</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                    alt="Rika Shinoda"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white/20"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-slate-900 text-white overflow-hidden rounded-[2rem] border border-slate-800 p-6 md:p-8 shadow-md">
              <article className="relative z-10">
                <p className="text-slate-300 text-sm md:text-base">
                  "Highly professional. Their innovative scaling systems transformed the way we deploy high-ticket offers."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-white text-lg">Reacher</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Founder of OdeaoLabs</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop"
                    alt="Reacher"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-2xl object-cover shadow-lg border-2 border-slate-700"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-slate-900 text-white overflow-hidden rounded-[2rem] border border-slate-800 p-6 md:p-8 shadow-md">
              <article className="relative z-10">
                <p className="text-slate-300 text-sm md:text-base">
                  "Exceeded every expectation. The whale offer architecture alone was worth 10X the investment."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-white text-lg">John D.</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">CEO of Labsbo</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop"
                    alt="John D."
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-2xl object-cover shadow-lg border-2 border-slate-700"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-slate-900 text-white overflow-hidden rounded-[2rem] border border-slate-800 p-6 md:p-8 shadow-md">
              <article className="relative z-10">
                <p className="text-slate-300 text-sm md:text-base">
                  "Exceptional support. They are partners in your success, not just another SaaS tool."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-white text-lg">Steven Sunny</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">CEO of Boxefi</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop"
                    alt="Steven Sunny"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-2xl object-cover shadow-lg border-2 border-slate-700"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <TimelineContent animationNum={7} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-[2rem] border border-blue-500 p-6 md:p-8 shadow-xl shadow-blue-600/20">
              <article className="relative z-10">
                <p className="font-medium text-base md:text-lg">
                  "A key partner in our growth. Scalr is mandatory for anyone serious about revenue architecture."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-white text-lg">Guillermo Rauch</h2>
                    <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px]">CEO of OdeaoLabs</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                    alt="Guillermo Rauch"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white/20"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent animationNum={8} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-slate-50 overflow-hidden rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="relative z-10">
                <p className="text-slate-700 italic text-base md:text-lg leading-relaxed">
                  "Truly a game-changer. The combination of deep expertise and commitment to excellence made a massive impact on our bottom line within weeks."
                </p>
                <div className="flex justify-between items-center pt-8">
                  <div>
                    <h2 className="font-black text-slate-900 text-lg">Paul Brauch</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">CTO of Spectrum</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                    alt="Paul Brauch"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>

        {/* Improved decorative footer elements */}
        <div className="mt-16 relative border-t border-slate-100 h-8 flex justify-between items-center">
          <div className="absolute left-0 top-0 w-3 h-3 bg-white border border-slate-300 rounded-sm -translate-y-1/2 -translate-x-1/2 shadow-sm"></div>
          <div className="absolute right-0 top-0 w-3 h-3 bg-white border border-slate-300 rounded-sm -translate-y-1/2 translate-x-1/2 shadow-sm"></div>
          <div className="w-full border-b border-slate-100 h-px"></div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
