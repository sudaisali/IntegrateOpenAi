const axios = require('axios');
const readline = require('readline');

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function gptResponse(userInput) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const assistantResponse = response.data.choices[0].message.content.replace(userInput, '').trim();

    if (assistantResponse) {
      console.log('Assistant:', assistantResponse);
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function interaction() {
  while (true) {
    const userInput = await promptUser('User: ');

    if (userInput.toLowerCase() === 'exit') {
      break;
    }

    await gptResponse(userInput);
  }
}

function promptUser(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

interaction();
