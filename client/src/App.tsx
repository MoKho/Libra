import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ChatInterface from "./components/ChatInterface";
import { MODEL_OPTIONS, TOPICS } from "./types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    const randomIndex1 = Math.floor(Math.random() * MODEL_OPTIONS.length);
    const randomModel1 = MODEL_OPTIONS[randomIndex1].value;

    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * MODEL_OPTIONS.length);
    } while (randomIndex2 === randomIndex1);
    const randomModel2 = MODEL_OPTIONS[randomIndex2].value;

    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    setModel1(randomModel1);
    setModel2(randomModel2);
    setTopic(randomTopic);
  }, []);

  const handleModel1Change = (value: string) => {
    if (value !== model2) {
      setModel1(value);
    }
  };

  const handleModel2Change = (value: string) => {
    if (value !== model1) {
      setModel2(value);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            py: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Libra
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Debater 1</InputLabel>
              <Select
                value={model1}
                label="Debater 1"
                onChange={(e) => handleModel1Change(e.target.value)}
              >
                {MODEL_OPTIONS.map((model) => (
                  <MenuItem
                    key={model.value}
                    value={model.value}
                    disabled={model.value === model2}
                  >
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Topic</InputLabel>
              <Select
                value={topic}
                label="Topic"
                onChange={(e) => setTopic(e.target.value)}
              >
                {TOPICS.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Debater 2</InputLabel>
              <Select
                value={model2}
                label="Debater 2"
                onChange={(e) => handleModel2Change(e.target.value)}
              >
                {MODEL_OPTIONS.map((model) => (
                  <MenuItem
                    key={model.value}
                    value={model.value}
                    disabled={model.value === model1}
                  >
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <ChatInterface model1={model1} model2={model2} topic={topic} />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;