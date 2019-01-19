import React, { useState } from 'react';

import './index.css';

const App = () => {
	const [text, setText] = useState('');
	const [api, setApi] = useState('coolify');
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);

	const changeText = event => {
		setText(event.target.value);
	};

	const coolify = () => {
		setApi('coolify');
		setLoading(true);
		fetch(`https://cool-name-api.glitch.me/coolify?name=${text}`)
			.then(res => res.json())
			.then(data => {
				const results = Object.keys(data).map(key => data[key]);
				setResults(results);
				setLoading(false);
			});
	};

	const uncoolify = () => {
		setApi('uncoolify');
		setLoading(true);
		fetch(`https://cool-name-api.glitch.me/uncoolify?name=${text}`)
			.then(res => res.json())
			.then(data => {
				const results = Object.keys(data).map(key => data[key]);
				setResults(results);
				setLoading(false);
			});
	};

	return (
		<React.Fragment>
			<nav className="navbar">Cool Name</nav>
			<main>
				<div className="container">
					<div className="input">
						<div className="input__input">
							<label htmlFor="text" className="input__label">
								Enter some text
							</label>
							<input
								type="text"
								id="text"
								value={text}
								onChange={changeText}
								className="input__field"
								placeholder="Ex. My cool text"
							/>
						</div>
						<div className="input__buttons">
							<button className="btn" onClick={coolify}>
								Coolify
							</button>
							<button className="btn" onClick={uncoolify}>
								Uncoolify
							</button>
						</div>
					</div>
					{!loading ? (
						results.length !== 0 ? (
							<section className="result-section">
								<section className="results">
									<h1>Results</h1>
									{results.map((result, index) => (
										<div key={index} className="results__cool">
											{result}
										</div>
									))}
								</section>
								<section className="usage">
									<h1>API Usage</h1>
									<p className="usage__req">
										<code>
											$ curl -X GET 'https://cool-name-api.glitch.me/{api}?name={text}'
										</code>
									</p>
								</section>
							</section>
						) : null
					) : (
						<div className="loading">
							<div className="loader" />
						</div>
					)}
				</div>
			</main>
		</React.Fragment>
	);
};

export default App;
