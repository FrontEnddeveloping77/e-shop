import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { LanguageProvider } from "./context/LanguageContext"; // Providerni import qilamiz
import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <div className="app">
            <LanguageProvider>
                <CartProvider> {/* <--- Buni qo'shdik */}
                    <RouterProvider router={router} />
                </CartProvider>
            </LanguageProvider>
        </div>
    );
}

export default App;