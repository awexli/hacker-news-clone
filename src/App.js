import { createGlobalStyle } from 'styled-components';

import Article from './components/Article';

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: hsl(228, 61%, 78%);
    --color-background-dark: hsl(230, 17%, 14%); 
    
    --color-off-white: rgb(218, 218, 218);
    --color-grey: #a6a6a6;
    --color-wheat: wheat;

    --color-link: rgba(255, 125, 246, 0.849);
    --color-link-hover: rgba(255, 190, 251, 0.849);
  }
`;

function App() {
  // someone clicks on an article card
  // article card
  return (
    <div className="App">
      <GlobalStyles />
      <Article id={'25007697'}></Article>
    </div>
  );
}

export default App;
