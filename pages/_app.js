import { ShipmentProvider } from "../context/shipmentContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ShipmentProvider>
      <Component {...pageProps} />
    </ShipmentProvider>
  );
}

export default MyApp;
