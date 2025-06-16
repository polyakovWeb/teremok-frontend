import AppContent from "./components/AppContent/AppContent";
import { AuthProvider } from "./components/AuthContext/AuthContext";

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
