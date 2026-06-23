"use client";

// UI components
import ElasticButton from "@/components/ui/elasticButton";
import TiltedCard from "@/components/TiltedCard";

export default function ProfileSection() {
  return (
    <section className="bg-primary pt-2 overflow-hidden">
      <div className="
      relative
      grid
      grid-cols-2 xl:grid-cols-3
      grid-rows-none
      px-4 py-6
      sm:p-20
      gap-8
      rounded-t-4xl
      bg-background
    ">
      <div className="col-span-full lg:col-span-1 xl:col-span-2">
        <h1>Yohann RENAULD</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur esse sed veniam labore eaque nulla pariatur laborum iusto necessitatibus unde expedita, fugit, fugiat at animi, perferendis voluptatum eum. Voluptatem velit rem blanditiis dolorum, voluptate recusandae explicabo molestiae odit dolore veritatis quae amet placeat neque fugit obcaecati aut sequi doloremque eos?</p>
        
        <div className="ms-auto my-4 w-fit">
          <ElasticButton
            anchor="/about-me"
          >
            Mieu me connaître
          </ElasticButton>
        </div>
      </div>
      <div className="col-span-full lg:col-span-1 xl:col-span-1 flex justify-center">
        <TiltedCard
          imageSrc={"https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"}
          altText="Photo de Yohann"
          captionText="C'est moi :)"
          scaleOnHover={1.05}
          containerWidth={"fit-content"}
          containerHeight={"fit-content"}
        />
      </div>
    </div>
    </section>
  );
}
