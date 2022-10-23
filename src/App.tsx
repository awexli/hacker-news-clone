import { Box, Container } from '@chakra-ui/react';
import { Article } from './components/article';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const theme = extendTheme({
  styles: {
    global: {
      a: {
        color: 'rgba(255, 125, 246, 0.849)',
        _hover: {
          color: 'rgba(255, 190, 251, 0.849)',
        },
      },
      p: {
        margin: '8px 0 8px 0'
      }
    },
  },
  colors: {
    hn: {
      text: 'hsl(228, 61%, 78%)',
      background_darker: '#hsl(232, 19%, 15%)',
      background_dark: '#282c34',
      off_white: 'rgb(218, 218, 218)',
      grey: '#a6a6a6',
      wheat: 'wheat',
    },
  },
});

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box bgColor="hn.background_dark">
          <Container
            margin="0 auto"
            maxWidth="70em"
            minHeight="100vh"
            color="hn.text"
          >
            <Article id={33297934}></Article>
          </Container>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
