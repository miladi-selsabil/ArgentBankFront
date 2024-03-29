import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Index from "../Components/Index";
function Layout() {
  return (
    <div className="container">
      <Header />

      <Index/>
      <Footer />
    </div>
  );
}
export default Layout;
