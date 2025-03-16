
import { useParams, useLocation } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const TemplatePage = () => {
  const location = useLocation();
  const path = location.pathname.substring(1); // Remove the leading slash
  const title = path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-content">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            <div className="prose">
              <p className="text-muted-foreground">
                This page is currently under development. Please check back later for updates.
              </p>
              <p className="text-muted-foreground">
                If you have any questions or need assistance, please visit our{" "}
                <a href="/contact" className="text-primary underline hover:text-primary/80">
                  Contact page
                </a>{" "}
                or call our customer service at +1 (555) 123-4567.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplatePage;
