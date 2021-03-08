import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import Header from "./layout/Header/Header";
import Layout from "./layout/Layout/Layout";
import Pages from "./pages";
import "./styles/main.scss";

const App = () => {
  return (
    <Layout>
      <Header />
      <Pages />
    </Layout>
  );
};

export default App;
