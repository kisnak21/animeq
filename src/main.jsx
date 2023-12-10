import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { GlobalContextProvider } from './Context/Global.jsx'
import GlobalStyle from './GlobalStyle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <GlobalStyle />
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</React.StrictMode>
)
