import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from "@/components/RouteGuard";
import { Container } from "react-bootstrap";
import Layout from "@/components/Layout";
import style from "@/styles/Home.module.css";

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Container className={style.mainContainer}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    </RouteGuard>
  );
}
