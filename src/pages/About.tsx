
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-content">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About LUXESTORE</h1>
            
            <div className="grid gap-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2023, LUXESTORE began with a simple mission: to provide premium tech products with exceptional customer service. What started as a small online shop has grown into a destination for tech enthusiasts who value quality, design, and performance.
                </p>
                <p className="text-muted-foreground">
                  Our team is passionate about curating only the finest products that meet our strict standards for quality, innovation, and sustainability. We believe that technology should enhance your lifestyle while looking beautiful in your space.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-medium mb-2">Quality First</h3>
                    <p className="text-sm text-muted-foreground">We rigorously test all products to ensure they meet our high standards for performance and durability.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-medium mb-2">Customer Focus</h3>
                    <p className="text-sm text-muted-foreground">Every decision we make puts our customers' needs and satisfaction at the center.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="font-medium mb-2">Sustainability</h3>
                    <p className="text-sm text-muted-foreground">We're committed to reducing our environmental impact through responsible sourcing and packaging.</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                <p className="text-muted-foreground mb-6">
                  LUXESTORE is powered by a diverse team of tech enthusiasts, design lovers, and customer service experts who share a passion for providing the best shopping experience possible.
                </p>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { name: "Sarah Johnson", role: "Founder & CEO" },
                    { name: "Michael Chen", role: "Head of Product" },
                    { name: "Priya Patel", role: "Customer Experience" },
                    { name: "David Kim", role: "Tech Specialist" }
                  ].map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-full mb-4"></div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
                <p className="text-muted-foreground">
                  When you shop with LUXESTORE, you're not just buying a product – you're investing in an experience. From our carefully curated selection to our responsive customer support, we're committed to exceeding your expectations at every step of your journey with us.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
