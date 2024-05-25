import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from "@/components/RouteGuard";
import { Container } from "react-bootstrap";

export default function App({ Component, pageProps }) {
  
    <Component {...pageProps} />

  return<RouteGuard><Container><Component {...pageProps} /></Container></RouteGuard> ;
  
}
