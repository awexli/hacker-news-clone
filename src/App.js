import styled, { createGlobalStyle } from 'styled-components';

import Article from './components/article';

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: hsl(228, 61%, 78%);
    --color-background-dark: #282c34; 
    --color-background-less-dark: hsl(232, 19%, 15%);
    
    --color-off-white: rgb(218, 218, 218);
    --color-grey: #a6a6a6;
    --color-wheat: wheat;

    --color-link: rgba(255, 125, 246, 0.849);
    --color-link-hover: rgba(255, 190, 251, 0.849);
  }
`;

const MainContainer = styled.main`
  background-color: var(--color-background-dark);
  margin: 0 auto;
  max-width: 60em;
  min-height: 100vh;
  color: var(--color-text);
`;

function App() {
  // someone clicks on an article card
  // article card
  return (
    <div className="App">
      <GlobalStyles />
      <MainContainer>
        <Article id={'25700135'}></Article>
      </MainContainer>
    </div>
  );
}

export default App;
