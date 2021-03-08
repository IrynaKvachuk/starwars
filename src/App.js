import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { Header, Layout } from "./layout";
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
