import Loader from "react-js-loader";
import "./Loading.css";

function Loading() {
	return (
		<div className="container loader">
			<Loader
				type="spinner-default"
				bgColor="#24018F"
				color="#24018F"
				title="Загрузка..."
			/>
		</div>
	);
}

export default Loading;
