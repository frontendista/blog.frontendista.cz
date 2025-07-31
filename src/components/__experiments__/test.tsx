import type React from "react";
import { useState } from "react";

export const Test: React.FC = () => {
	const [counter, setCounter] = useState(0);

	return (
		<button onClick={() => setCounter(counter + 1)}>
			Test {counter}
		</button>
	);
};
