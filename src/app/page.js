import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Here at ST Pizza our pizza delivery service, we are dedicated to
            more than just crafting delicious pies we are committed to
            delivering an outstanding experience to every customer, every time.
            With a focus on quality ingredients, mouthwatering flavors, and
            timely delivery,
          </p>
          <p>
            We aim to be your top choice for satisfying your pizza cravings. Our
            team consists of passionate pizza enthusiasts who take pride in
            every pie we create. Whether you are enjoying a classic pepperoni or
            exploring one of our unique specialties, we strive to exceed your
            expectations with every bite.
          </p>
          <p>
            At ST Pizza, our mission is simple: to deliver happiness, one slice
            at a time.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Feed your cravings now"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="818254488">
            818 625 4488
          </a>
        </div>
      </section>
      <footer className="border-t p-8 text-center text-gray-500 mt-16">
        &copy; 2024 All rights reserved{" "}
      </footer>
    </>
  );
}
