import Main from "@/components/layouts/Main";
import { UIProvider } from "@/services/context";

const App = () => {
  return (
    <UIProvider>
      <Main />
    </UIProvider>
  );
};

export default App;
